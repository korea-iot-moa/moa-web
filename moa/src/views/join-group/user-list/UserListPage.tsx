/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import userImg from "../../../images/userImg.png";
import { MeetingGroup, UserListDto } from "../../../types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { USER_LIST_PAGE_GET_API, USER_LIST_PAGE_IMG_API } from "../../../apis";

interface UserListProps {
  groupInfo: any;
}

const UserListPage: React.FC<UserListProps> = ({ groupInfo }) => {
  const [cookies] = useCookies(["token"]);
  const [userList, setUserList] = useState<UserListDto[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${USER_LIST_PAGE_GET_API}${groupInfo.groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUserList(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [groupInfo]);

  const handleReport = (userId: string) => {
    navigate(`/report/${groupInfo.groupId}/${userId}`);
  };

  return (
    <div css={s.mainBox}>
      <ul css={s.ulBox}>
        {userList.map((user) => (
          <li css={s.listItem} key={user.userId}>
            <div>
              <div css={s.userImgBox}>
                {!user.profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={USER_LIST_PAGE_IMG_API + user.profileImage}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
            </div>
            <div>
              <p>{user.nickName}</p>
            </div>
            <div>
              <button onClick={() => handleReport(user.userId)}>
                신고하기
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;

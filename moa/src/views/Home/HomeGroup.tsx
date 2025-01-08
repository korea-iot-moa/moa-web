/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import { useCookies } from "react-cookie";
import userAuthStore from "../../stores/auth.store";
import { MeetingGroup, Recommendation } from "../../types";
import useGroupStore from "../../stores/group.store";
import { useNavigate } from "react-router-dom";
import groupImg  from '../../images/moaLogo.png';

function HomeGroup() {
  const { userId } = userAuthStore();
  const [datas, setDatas] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  const navigator = useNavigate();

  const handleOpenGroup = (group: MeetingGroup | null) => {
    useGroupStore.getState().setGroupData(group); 
    navigator(`/meeting-group/${group?.groupId}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = cookies.token
        ? await axios.get(
            `http://localhost:8080/api/v1/meeting-group/home-recommendation`,
            {
              headers: { Authorization: `Bearer ${cookies.token}` },
              withCredentials: true,
            }
          )
        : await axios.get(`http://localhost:8080/api/v1/auth/meeting-group/group`);

      const groupData = response.data.data;
      setDatas(groupData);
    } catch (error) {
      console.error("데이터 가져오기 오류: ", error);
      alert("데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchLikes() {
      if (!cookies.token) return;
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/recommendation",
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        );

        const likedGroupIDs = response.data.data.map(
          (item: { groupId: number }) => item.groupId
        );
        setLikedGroups(likedGroupIDs);
      } catch (error) {
        console.error("찜 상태 가져오기 오류: ", error);
      }
    }
    fetchLikes();
  }, [cookies.token]);

  const toggleLike = (groupId: number) => {
    setLikedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleFetchData = async (groupId: number) => {
    if (!cookies.token) {
      alert("로그인 후 사용가능합니다.");
      return;
    }
    try {
      if (!likedGroups.includes(groupId)) {
        await axios.post<Recommendation>(
          `http://localhost:8080/api/v1/recommendation`,
          { groupId },
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        );
      } else {
        await axios.delete(
          `http://localhost:8080/api/v1/recommendation/user-id`,
          {
            data: { groupId },
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        );
      }
      toggleLike(groupId);
    } catch (error) {
      console.error("찜 상태 업데이트 오류: ", error);
      alert("찜 상태를 업데이트하는 중 문제가 발생했습니다.");
    }
  };

  const slices = [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 6, end: 10 },
  ];

  return (
    <div>
      <div css={s.container}>
        <div css={s.mainBox}>
          <p>추천 모임</p>
          <div css={s.line}></div>
          {loading ? (
            <p>데이터를 불러오는 중입니다...</p>
          ) : (
            slices.map(({ start, end }, index) => (
              <ul css={s.groupList} key={`slice-${index}`}>
                <div css={s.marginPaddingDel}>
                  {datas.length > start
                    ? datas[start]?.groupCategory || "카테고리가 없습니다."
                    : "카테고리가 없습니다."}
                </div>
                <ul css={s.marginPaddingDel}>
                  {datas.slice(start, end).map((data) => (
                    <li key={data.groupId} css={s.groupLi}>
                      <div>
                        <div css={s.imgDiv}>
                          {!data.groupImage ? (
                            <img
                              src={groupImg}
                              alt="userImage"
                              css={s.img}
                              onClick={() => handleOpenGroup(data)}
                            />
                          ) : (
                            <img
                              src={`http://localhost:8080/image/${data.groupImage}`}
                              css={s.img}
                              alt={data.groupImage}
                              onClick={() => handleOpenGroup(data)}
                            />
                          )}
                        </div>
                      </div>
                      <div css={s.line}></div>
                      <div css={s.listDetail}>
                        <p>{data.groupTitle}</p>
                        <p>
                          <button
                            css={s.click}
                            onClick={() => handleFetchData(data.groupId)}
                          >
                            {likedGroups.includes(data.groupId) ? (
                              <BsHeartFill style={{ color: "red" }} />
                            ) : (
                              <BsHeart />
                            )}
                          </button>
                        </p>
                      </div>
                      <div css={s.listDetail}>
                        <p>{data.groupDate}</p>
                        <p>{data.groupAddress}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeGroup;

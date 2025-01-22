/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { MeetingGroup, Recommendation } from "../../types";
import * as s from "./style";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import groupImg from "../../images/moaLogo.png";
import {
  PAGINATION_RECOMMENDATION_GET_API,
  PAGINATION_GROUP_IMG_API,
  PAGINATION_RECOMMENDATION_DELETE_API,
  PAGINATION_RECOMMENDATION_POST_API,
} from "../../apis";

interface PaginationScrollProps {
  datas: MeetingGroup[];
}

const PaginationScroll = ({ datas }: PaginationScrollProps) => {
  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  const navigator = useNavigate();

  const handleOpenGroup = async (group: MeetingGroup | null) => {
    navigator(`/meeting-group/${group?.groupId}`);
  };

  useEffect(() => {
    async function fetchLikes() {
      if (cookies.token) {
        try {
          const response = await axios.get(PAGINATION_RECOMMENDATION_GET_API, {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          });

          const likedGroupIDs = response.data.data.map(
            (item: { groupId: number }) => item.groupId
          );

          setLikedGroups(likedGroupIDs);
        } catch (error) {
          console.error("찜 상태를 가져오는 중 오류 발생: ", error);
        }
      }
    }
    fetchLikes();
  }, []);

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
    if (cookies.token) {
      try {
        if (!likedGroups.includes(groupId)) {
          await axios.post<Recommendation>(
            PAGINATION_RECOMMENDATION_POST_API,
            { groupId },
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );
        } else {
          await axios.delete(PAGINATION_RECOMMENDATION_DELETE_API, {
            data: { groupId: groupId },
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
        }
        toggleLike(groupId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const cutText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      {datas.length > 0 ? (
        <ul css={s.categoryList}>
          {datas.map((data, index) => (
            <li css={s.groupLi} key={index}>
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
                      src={`${PAGINATION_GROUP_IMG_API}${data.groupImage}`}
                      css={s.img}
                      alt={data.groupImage}
                      onClick={() => handleOpenGroup(data)}
                    />
                  )}
                </div>
              </div>
              <div css={s.line} onClick={() => handleOpenGroup(data)}></div>
              <div css={s.listDetail}>
                <p css={s.content} onClick={() => handleOpenGroup(data)}>
                  {cutText(data.groupTitle, 11)}
                </p>
                <p css={s.content}>
                  <button
                    css={s.click}
                    onClick={() => handleFetchData(data.groupId)}
                  >
                    {likedGroups.includes(data.groupId) ? (
                      <BsHeartFill style={{ color: "#FF7B54" }} />
                    ) : (
                      <BsHeart />
                    )}
                  </button>
                </p>
              </div>
              <div css={s.listDetail} onClick={() => handleOpenGroup(data)}>
                <p>{data.groupDate}</p>
                <p>{cutText(data.groupAddress, 4)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>검색결과를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default PaginationScroll;

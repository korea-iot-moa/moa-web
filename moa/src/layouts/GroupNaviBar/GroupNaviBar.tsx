/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import logo from "../../images/moaLo.png";
import { useNavigate } from "react-router-dom";
import { MeetingGroup } from "../../types";
import userAuthStore from "../../stores/auth.store";
import axios from "axios";
import { useCookies } from "react-cookie";
import "react-tooltip/dist/react-tooltip.css";
import defaultImg from "../../images/moaLo.png";

export default function GroupNaviBar() {
  const { userId } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const [groupList, setGroupList] = useState<MeetingGroup[]>([]);
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/user-list`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
          setGroupList(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }else {
        setGroupList([]);
      }
    };
    fetchGroup();
  }, [cookies.token]);

  const renderGroupPage = (groupId: number) => {
    navigator(`/join-group/${groupId}`);
  }



  return (
    <div css={s.naviBar}>
      <div css={s.imageBox} onClick={() => navigator("/")}>
        <img src={logo} alt="로고" css={s.logoImage} />
        <h1>MOA</h1>
      </div>
      <hr css={s.line} />
    
      {groupList.map((group) => (
        <div
          css={s.imageBox}
          onClick={() => renderGroupPage(group.groupId)}
          key={group.groupId}
          style={{ marginBottom: "15px" }}
          onMouseEnter={() => setHoveredGroupId(group.groupId)}
          onMouseLeave={() => setHoveredGroupId(null)}
        >
          {hoveredGroupId === group.groupId ? (
            <p>{group.groupTitle}</p> 
          ) : (
            <img
              src={group.groupImage ? `http://localhost:8080/image/${group.groupImage}` : `${defaultImg}`}
              alt="그룹 이미지"
              css={s.logoImage}
            />
          )}
        </div>
      ))}
    </div>
  );
}

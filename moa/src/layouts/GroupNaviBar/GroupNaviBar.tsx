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
import useGroupListStore from "../../stores/group.list.store";
import { FiPlusCircle } from "react-icons/fi";
import { GROUP_NAV_GET_API, GROUP_NAV_IMG } from "../../apis";

export default function GroupNaviBar() {
  const { userId } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const [groupList, setGroupList] = useState<MeetingGroup[]>([]);
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null);

  const { setGroupListStore } = useGroupListStore();
  const navigator = useNavigate();

  const handleNext = () => {
    navigator('/main/create-group');
  
  };
  useEffect(() => {
    const fetchGroup = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get(GROUP_NAV_GET_API, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
          setGroupList(response.data.data);
          setGroupListStore(response.data.data);
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
      <div css={s.imageBox} onClick={() => navigator("/main")}>
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
              src={group.groupImage ? `${GROUP_NAV_IMG}${group.groupImage}` : `${defaultImg}`}
              alt="그룹 이미지"
              css={s.logoImage}
            />
          )}
        </div>
      ))}
      {cookies.token && (
      <div css={s.bottomBox}>
        <hr css={s.line} />
        <div onClick={() =>handleNext()} css={s.createBox}>
          <FiPlusCircle css={s.createIcon}/>
        </div>
      </div>
      )}
    </div>
  );
}

/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FIND_GROUP_GET_API, JOIN_GROUP_ANSWER_IMG_API } from "../../../apis";
import moaLogo from "../../../images/moaLogo.png";
import axios from "axios";
import { MeetingGroup } from "../../../types";
import { useCookies } from "react-cookie";

function GroupAnswerResult() {
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);
  const [groupData, setGroupData] = useState<MeetingGroup | null>(null);
  const navigator = useNavigate();

  const fetchData = async () => {
    try {
      const responseGroup = await axios.get(`${FIND_GROUP_GET_API}${groupId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });

      setGroupData(responseGroup.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={s.container}>
      <div css={s.resultContainer}>
        <div css={s.groupImg}>
          <img
            src={
              groupData?.groupImage
                ? `${JOIN_GROUP_ANSWER_IMG_API}${groupData?.groupImage}`
                : moaLogo
            }
            alt="groupData?.groupImage"
            css={s.mainImg}
          />
        </div>
        <div css={s.groupDataDiv}>
          <p>{groupData?.groupTitle}</p>
          <ul css={s.dateBox}>
            <li>날짜: </li>
            <li>{groupData?.groupDate}</li>
          </ul>
        </div>
      </div>
      <div css={s.line3}></div>
      <p css={s.p}>모임 참여 신청이 완료됐습니다.</p>
      <button onClick={() => navigator(-3)} css={s.joinButton}>
        확인완료
      </button>
    </div>
  );
}

export default GroupAnswerResult;

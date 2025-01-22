/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { MeetingGroup, UserAnswer } from "../../../types";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { FIND_GROUP_GET_API, JOIN_GROUP_ANSWER_POST_API } from "../../../apis";

const JoinGroupAnswer = () => {
  const { groupId } = useParams();
  const [groupAnswer, setGroupAnswer] = useState<UserAnswer>({
    answerId: 0,
    groupId: Number(groupId),
    userId: "",
    userAnswer: "",
    answerDate: new Date(),
    isApproved: 2,
  });

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState<MeetingGroup | null>(null);

  const groupFetchData = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/signIn");
      return;
    }

    try {
      const responseGroup = await axios.get(`${FIND_GROUP_GET_API}${groupId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      const group = responseGroup.data.data;
      setGroupData(group);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    if (!groupData?.groupId) {
      console.error("groupId가 없습니다. 유효한 값을 확인하세요.");
      return;
    }

    if (!groupAnswer.userAnswer.trim()) {
      console.error("userAnswer가 비어 있습니다.");
      alert("신청사유를 입력해주세요.");
      return;
    }

    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/signIn");
      return;
    }

    try {
      const responseAnswer = await axios.post(
        JOIN_GROUP_ANSWER_POST_API,
        {
          groupId: groupId,
          userAnswer: groupAnswer.userAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );

      const answer = responseAnswer.data.data;
      setGroupAnswer(answer);
      navigate(`/group-join/join-group/${groupId}/group-user-answer/result`);
    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    groupFetchData();
  }, [groupData]);

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h4 css={s.title}>모임 참여 신청</h4>
      <div css={s.container}>
        <ul css={s.AnswerListBox} key={groupId}>
          <li css={s.questionTitle}>질문</li>
          <li css={s.questionContent}>{groupData?.groupQuestion}</li>
        </ul>
        <div css={s.line2}></div>
        <ul css={s.AnswerListBox}>
          <li css={s.answerTitle}>답변</li>
          <input
            css={s.answerContent}
            type="text"
            name="userAnswer"
            value={groupAnswer.userAnswer || ""}
            onChange={handleUserAnswerChange}
            placeholder="신청사유를 입력해주세요."
          />
        </ul>
        <div css={s.line2}></div>
        <p css={s.p}>작성 완료 되셨나요?</p>
        <button css={s.joinButton} onClick={fetchData}>
          답변 보내기
        </button>
      </div>
    </div>
  );
};

export default JoinGroupAnswer;

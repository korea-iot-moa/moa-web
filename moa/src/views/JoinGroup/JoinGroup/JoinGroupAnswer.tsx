/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { UserAnswer } from "../../../types";
import axios from "axios";
import { useCookies } from "react-cookie";
import useGroupStore from "../../../stores/group.store";
import { useNavigate, useParams } from "react-router-dom";

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

  // 데이터를 유지 전달
  const groupData = useGroupStore((state) => state.groupData);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  // 답변 데이터 전송 함수
  const fetchData = async () => {
    if (!cookies.token) return alert("로그인이 필요합니다.");
    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/user-answers`,
        {
          groupId: groupData?.groupId,
          userAnswer: groupAnswer.userAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data.data;
      
      setGroupAnswer(data);
      navigate(`/group/join-group/${groupId}/group-user-answer/result`);
      
    } catch (error) {
      console.error("데이터 로딩 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (!groupData) {
      console.log("로컬 스토리지에서 상태를 복원 중...");
    }
  }, [groupData]);

  // 사용자 답변 변경 핸들러
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
        <ul css={s.AnswerListBox} key={groupData?.groupId}>
          <li css={s.questionTitle}>질문</li>
          <li css={s.questionContent}>
            {groupData?.groupQuestion}
          </li>
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
        <button css={s.button} onClick={fetchData}>
          답변 보내기
        </button>
      </div>
    </div>
  );
};

export default JoinGroupAnswer;

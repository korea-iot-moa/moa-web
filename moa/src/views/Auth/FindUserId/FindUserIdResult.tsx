/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { User } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as s from "./style";

function FindUserIdResult() {
  const { userName, userBirthDate } = useParams<{
    userName: string;
    userBirthDate: string;
  }>();
  const [result, setResult] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // 불일치여부 확인
  const [isdata, setIsData] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/auth/userId`,
        {
          params: { userName, userBirthDate },
        }
      );
      const userIdData = response.data.data;
      setResult(userIdData);
      setIsData(true);
      if (userIdData.length > 0) {
        setIsData(false);
      }
    } catch (error) {
      console.error("데이터 로딩중 오류: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hideUserId = (id: string | undefined) => {
    const sliceId = id?.slice(0, -4);
    const changeId = "*".repeat(4);
    return sliceId + changeId;
  };

  const changeUserId = hideUserId(result?.userId);
  return (
    <div css={s.findUserIdContainer}>
      <h4 css={s.findUserIdTitle}>아이디 찾기</h4>
      <div css={s.findUserIdResultBox}>
      {loading ? (
        <p>로딩중....</p>
      ) : isdata ? (
        <>
        <ul css={s.findUserIdResultUl}>
          <li>"{result?.userName}" 님의 아이디는</li>
          <li>
            <p>{changeUserId}  입니다.</p>
          </li>
        </ul>
        <div css={s.findUserIdResultline}></div>
        <button css={s.findUserIdResultBtn} onClick={() => navigate('/signIn')}>로그인하기기</button>
        </>
      ) : (
        <p>죄송합니다. 아이디를 찾을 수 없습니다.</p>
      )}     
      </div>
    </div>
  );
}

export default FindUserIdResult;

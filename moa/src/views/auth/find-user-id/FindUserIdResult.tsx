/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { User } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as s from "./style";
import { Find_USERID_GET_API } from "../../../apis";

function FindUserIdResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [isData, setIsData] = useState<boolean>(false);

  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  
  useEffect(() => {

    if (!token || token.trim() === "") {
      console.error("유효하지 않은 토큰입니다.");
      alert("유효하지 않은 요청입니다.");
      return;
    }

    fetchData(token);
  }, [location]);

  const fetchData = async (token: string | null) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Find_USERID_GET_API}`, {params: {token}});
      const userIdData = response.data.data;
      if (userIdData) {
        setResult(userIdData);
        setIsData(true);
      } else {
        setIsData(false);
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={s.findUserIdContainer}>
      <h4 css={s.findUserIdTitle}>아이디 찾기</h4>
      <div css={s.findUserIdResultBox}>
        {loading ? (
          <p>로딩중....</p>
        ) : isData ? (
          <>
            <ul css={s.findUserIdResultUl}>
              <li>{result?.userName} 님의 아이디는</li>
              <li>
                <p>{result?.userId} 입니다.</p>
              </li>
            </ul>
            <div css={s.findUserIdResultline}></div>
            <button
              css={s.findUserIdResultBtn}
              onClick={() => navigate("/signIn")}
            >
              로그인하기기
            </button>
          </>
        ) : (
          <p>죄송합니다. 아이디를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default FindUserIdResult;

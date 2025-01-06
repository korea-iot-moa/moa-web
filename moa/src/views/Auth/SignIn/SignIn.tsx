/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import logoImg from "../../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignInResponseDto } from "../../../types";
import { useCookies } from "react-cookie";
import kakoLogo from '../../../images/kakaoLogo.png';
import naverLogo from '../../../images/naverLogo.png';

const ERROR_MESSAGES = {
  INVALID_ID: "영문, 숫자 8 ~ 14자 아이디를 입력 해 주세요.",
  INVALID_PASSWORD: "영문, 숫자, 특수기호 8~16자 비밀번호를 입력 해 주세요.",
  USER_NOT_FOUND: "아이디 또는 비밀번호를 확인해주세요.",
};

const idRegex = /^[a-zA-Z0-9]{8,14}$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;

export default function SignIn() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();

  const inputIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);

    if (value.trim()) {
      setIdError(false);
    }
  };

  const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.trim()) {
      setPasswordError(false);
    }
  };

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e instanceof KeyboardEvent && e.key !== "Enter") return;
    e.preventDefault();

    //! 유효성 검증

    // 아이디
    if (!userId.trim() || !idRegex.test(userId)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_ID);
      return;
    }

    // 비밀번호
    if (!password.trim() || !passwordRegex.test(password)) {
      setErrorMessage(ERROR_MESSAGES.INVALID_PASSWORD);
      return;
    }


    if (userId && password && !idError && !passwordError) {
      try {
        const signinData = {
          userId,
          password,
        };

        const response = await axios.post(
          `http://localhost:8080/api/v1/auth/login`,
          signinData
        );

        if (response.data) {
          signInSuccessResponse(response.data.data);
        }

        navigate("/main");
      } catch (error) {
        console.error(error);
        setErrorMessage(ERROR_MESSAGES.USER_NOT_FOUND);
      }
    }
  };

  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + exprTime);
    setCookies("token", token, {
      path: "/",
      expires,
    });
  };

  const signInSuccessResponse = (data: SignInResponseDto) => {
    if (data) {
      const { token, exprTime, user } = data;
      setToken(token, exprTime);
    }
  };


  return (
    <div css={s.fullBox}>
      <div css={s.innerBox}>
        <div css={logo.logoBox} onClick={() => navigate("/main")}>
          <img src={logoImg} alt="로고" css={logo.logo} />
        </div>
      </div>

      <form css={s.innerBox}>
        <input
          css={s.topInput(idError)}
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={inputIdChange}
        />
        <input
          css={s.bottomInput(passwordError)}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={inputPasswordChange}
        />

        {/* 에러 메시지 */}
        {errorMessage && <p css={s.errorMessage}>{errorMessage}</p>}

        

        <button css={s.signInBtn} onClick={handleSignIn}>
          로그인
        </button>
      </form>

      <div css={s.innerBox}>
        <div css={s.linkBox}>
          <a href="/findUserId" css={s.linkText}>
            아이디찾기
          </a>
          <a href="/findPassword" css={s.linkText}>
            비밀번호찾기
          </a>
          <a href="/signUp" css={s.linkText}>
            회원가입
          </a>
        </div>
      </div>

      <div css={s.innerBox}>
        <div css={s.anotherSignInBox} className="naver">
          <div css={s.anotherLogoBox}>
            <img src={naverLogo} alt="네이버로고" className="naver"/>
          </div>
          <div>
            <p>Naver 계정으로 로그인</p>
          </div>
        </div>
        <div css={s.anotherSignInBox} className="kakao">
          <div css={s.anotherLogoBox}>
            <img src={kakoLogo} alt="카카오로고" className="kakao"/>
          </div>
          <div>
          <p>Kakao 계정으로 로그인</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import logoImg from "../../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignInResponseDto } from "../../../types";
import { useCookies } from "react-cookie";

export default function SignIn() {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

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

    const idRegex = /^[a-zA-Z0-9]{8,14}$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;

    // 유효성 검증
    if (!userId.trim()) {
      setIdError(true);
    } else if (!idRegex.test(userId)) {
      setIdError(true);
    }

    if (!password.trim()) {
      setPasswordError(true);
    } else if (!passwordRegex.test(password)) {
      setPasswordError(true);
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

        navigate("/");
      } catch (error) {
        console.error(error);
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

  const navigator = useNavigate();

  return (
    <div css={s.fullBox}>
      <div css={s.innerBox}>
        <div css={logo.logoBox} onClick={() => navigate("/")}>
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
        {idError && (
          <p css={s.errorMessage}>
            영문, 숫자 8 ~ 14자 아이디를 입력 해 주세요
          </p>
        )}
        {passwordError && (
          <p css={s.errorMessage}>
            영문, 숫자, 특수기호 8~16자 비밀번호를 입력 해 주세요
          </p>
        )}

        <button css={s.signInBtn} onClick={handleSignIn}>
          로그인
        </button>
      </form>

      <div css={s.innerBox}>
        <div css={s.linkBox}>
          <a href="" css={s.linkText}>
            아이디찾기
          </a>
          <a href="" css={s.linkText}>
            비밀번호찾기
          </a>
          <a href="/signUp" css={s.linkText}>
            회원가입
          </a>
        </div>
      </div>

      {/* <div css={s.innerBox}>
        <div css={s.anotherSignIn}>
          <img src={kakao} alt="" css={s.img} />
        </div>
      </div>
      <div css={s.innerBox}>
        <div css={s.anotherSignIn}>
          <img src={naver} alt="" css={s.img} />
        </div>
      </div> */}
    </div>
  );
}

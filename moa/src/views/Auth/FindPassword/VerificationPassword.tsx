/** @jsxImportSource @emotion/react */
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import logoImg from "../../../images/moaLogo.png";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { truncate } from "fs/promises";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type ResetPassword = {
  newPassword: string;
  confirmPassword: string;
};

export default function VerifyToken() {
  const [resetData, setResetData] = useState<ResetPassword>({
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState<boolean>(false);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [cookies, setCookies, removeCookie] = useCookies(["PasswordResetToken"]);

  useEffect(() => {
    if (token) {
      setCookies("PasswordResetToken", token, { path: "/", maxAge: 1800 });
    }
  }, [token, setCookies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setResetData({
      ...resetData,
      [element.name]: element.value,
    });
  };

  const handleResetPassword = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }else {
      setIsPasswordMatch(true);
    }

    try {
      await axios.put("http://localhost:8081/api/v1/users/resetPassword", {
          newPassword: resetData.newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${cookies.PasswordResetToken}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          if (!!response.data.result) {
            setIsPasswordSuccess(true);
            removeCookie("PasswordResetToken", { path: "/" });
            localStorage.setItem("PasswordResetTokenDeleted", Date.now().toString());
            
            setTimeout(() => {
              window.close();
            }, 5000);
          }
        });
    } catch (error) {
      console.error(error);
      setIsPasswordSuccess(false);
    }
    
  }

  return (
    <div css={s.fullBox}>
      <div css={s.innerBox}>
        <div css={logo.logoBox}>
          <img src={logoImg} alt="로고" css={logo.logo} />
        </div>
        {!isPasswordSuccess ? (
          <>
            <div css={s.mainBox2}>
              <h1>비밀번호 찾기</h1>
              <input
                type="password"
                name="newPassword"
                value={resetData.newPassword}
                placeholder="새 비밀번호"
                onChange={handleInputChange}
                css={s.topInput}
              />
              <input
                type="password"
                name="confirmPassword"
                value={resetData.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleInputChange}
                css={s.bottomInput}
              />
              {!isPasswordMatch ? <p css={s.errorMessage}>비밀번호가 일치하지 않습니다.</p> : <></>}
            </div>
            <div css={s.bottomBox}>
              <button onClick={handleResetPassword}>비밀번호 변경</button>
            </div>
          </>
        ) : (
          <>
          <div css={s.mailBox}>
            <h2>비밀번호 변경 완료</h2>
            <h2>본 페이지로 이동해주세요.</h2>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

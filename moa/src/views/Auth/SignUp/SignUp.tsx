/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import logoImg from "../../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import { Gender, Hobby, Region } from "../../../types";

export default function SignUp() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [userGender, setUserGendet] = useState<Gender>();
  const [userBirthDate, setUserBirthDate] = useState<string>('');
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [profileImage, setProfileImage] = useState<string>('');
  const [region, setRegion] = useState<Region>();

  return (
    <div css={s.fullBox}>
      <div css={s.signUpBox}>
        <div>
          <div css={logo.logoBox} onClick={() => navigate("/")}>
            <img src={logoImg} alt="로고" css={logo.logo} />
          </div>
        </div>
        <div css={s.inputBox}>
          <label htmlFor="userId" css={s.label}>아이디</label>
          <div css={s.validBox} >
          <input css={s.validInput} type="text" value={userId} id="userId"/>
          <button css={s.validBtn}>중복</button>
          </div>
        </div>
        <div css={s.inputBox}>
        <label htmlFor="password" css={s.label}>비밀번호</label>
          <input css={s.input} type="text" value={password} id="password" />
        </div>
        <div css={s.inputBox}>
          <label htmlFor="confirmPassword" css={s.label}>비밀번호 확인</label>
          <input css={s.input} type="text" value={confirmPassword} id="confirmPassword" />
        </div>
        <div css={s.inputBox}>
        <label htmlFor="userBirthDate" css={s.label}>생년월일</label>
          <input css={s.input} type="text" value={userBirthDate} id="userBirthDate" />
        </div>
        <div css={s.inputBox}>
          <label htmlFor="userName" css={s.label}>이름</label>
          <input css={s.input} type="text" value={userName} id="userName" />
        </div>
        <div css={s.inputBox}>
          <label htmlFor="nickName" css={s.label}>닉네임</label>
          <input css={s.input} type="text" value={nickName} id="nickName" />
        </div>
        
        
      </div>
    </div>
  );
}

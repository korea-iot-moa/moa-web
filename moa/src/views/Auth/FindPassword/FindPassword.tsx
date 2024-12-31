/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import { useNavigate } from 'react-router-dom';
import logoImg from "../../../images/moaLogo.png";

export default function FindPassword() {

    const navigate = useNavigate();

  return (
    <div css={s.fullBox}>
      <div css={s.innerBox}>
        <div css={logo.logoBox} onClick={() => navigate("/")}>
          <img src={logoImg} alt="로고" css={logo.logo} />
        </div>

        <div css={s.mainBox}>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";
import * as logo from "../../styles/LogoStyle";
import logoImg from "../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import userImg from "../../images/userImg.png";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdStickyNote2 } from "react-icons/md";
import { BsPuzzleFill } from "react-icons/bs";

export default function InformationNaviBar() {
  const navigator = useNavigate();
  return (
    <div css={s.infoNaviBar}>
      <div css={s.naviBox}>
        <div css={s.naviDiv}>
          <IoExtensionPuzzle color="#FF7B54" fontSize="25px" />{" "}
          <p css={s.fontSt}>단기 모임</p>
        </div>
        <div css={s.naviDiv}>
          <BsPuzzleFill color="#FCD572" fontSize="25px" />{" "}
          <p css={s.fontSt}>정기 모임</p>
        </div>
        <div css={s.naviDiv}>
          <MdStickyNote2 color="#2C3E50" fontSize="25px" />
          <p css={s.fontSt}>후기 게시판</p>
        </div>
      </div>
      <div css={s.userInfoBox}>
        <div css={s.userImgBox}>
          <img src={userImg} alt="userImage" css={s.userImg} />
        </div>
        <div css={s.userNameBox}>유저 이름</div>
      </div>
    </div>
  );
}

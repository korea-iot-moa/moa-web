/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import * as s from "./style";
import * as logo from "../../styles/LogoStyle";
import logoImg from "../../images/moaLogo.png";
import { useNavigate } from "react-router-dom";
import userImg from "../../images/userImg.png";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdStickyNote2 } from "react-icons/md";
import { BsPuzzleFill } from "react-icons/bs";
import userAuthStore from "../../stores/auth.store";
import { useCookies } from "react-cookie";

export default function InformationNaviBar() {

  const {nickName, profileImage, isAuthenticated, logout} = userAuthStore();
  const [cookies, setCookies] = useCookies(['token'])

  useEffect(() => {
    if(!cookies.token) {
      logout();
    } 
  },[cookies.token, logout])

  // 이벤트 핸들러
  const handleLogoutClick = () => {
    setCookies('token', '', {expires: new Date()});
    logout();
  }

  


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
        <div css={s.naviDiv}
        onClick={() => navigator('/review')}>
          <MdStickyNote2 color="#2C3E50" fontSize="25px" />
          <p css={s.fontSt}>후기 게시판</p>
        </div>
      </div>
      <div css={s.userInfoBox}>
        {isAuthenticated ? (
          <>
            <div css={s.userImgBox}>
            {!profileImage ? (
              <img src={userImg} alt="userImage" css={s.userImg} />
            ) : (
              <img src={profileImage} alt="profileImage" css={s.userImg} />
            )}
            </div>
            <div css={s.userNameBox}>{nickName}</div>
            <div css={s.userNameBox} onClick={handleLogoutClick}>로그아웃</div>
          </>
        ) : (
          <div onClick={() => navigator('/signIn')} css={s.signBtn}>로그인 & 회원가입</div>
        )}
      </div>
    </div>
  );
}

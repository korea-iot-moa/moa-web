/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import userImg from "../../images/userImg.png";
import { IoExtensionPuzzle, IoSearchSharp } from "react-icons/io5";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdStickyNote2,
} from "react-icons/md";
import { BsPuzzleFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import userAuthStore from "../../stores/auth.store";
import { useCookies } from "react-cookie";
import HamburgerMenu from "../../components/HamburgerMenu";
import { INFORMATION_IMG } from "../../apis";
import useCategoryBarStore from "../../stores/categoryBar.store";

export default function InformationNaviBar() {
  const { nickName, profileImage, isAuthenticated, logout } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const category = useCategoryBarStore((state) => state.isOpen);
  const setCategory = useCategoryBarStore((state) => state.setIsOpen);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigator = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      logout();
      setMenuOpen(false);
    }
  }, [cookies.token, logout]);

  const handleClickButton = () => {
    setCategory(!category);
  };

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div css={s.mainContainer}>
      <div css={s.infoNaviBar}>
        <div css={s.naviBox}>
          <div
            css={s.naviDiv}
            onClick={() => navigator("/main/grouptype/shorttype")}
          >
            <IoExtensionPuzzle color="#FF7B54" fontSize="25px" />{" "}
            <p css={s.fontSt}>단기 모임</p>
          </div>
          <div
            css={s.naviDiv}
            onClick={() => navigator("/main/grouptype/regulartype")}
          >
            <BsPuzzleFill color="#FCD572" fontSize="25px" />{" "}
            <p css={s.fontSt}>정기 모임</p>
          </div>
          <div css={s.naviDiv} onClick={() => navigator("/review/main")}>
            <MdStickyNote2 color="#2C3E50" fontSize="25px" />
            <p css={s.fontSt}>후기 게시판</p>
          </div>
        </div>
        <div css={s.userInfoBox}>
          <div css={s.naviDiv} onClick={() => navigator("/main/search")}>
            <IoSearchSharp fontSize="25px" />
          </div>
          <button css={s.categoryBtn} onClick={handleClickButton}>
            {category ? (
              <span css={s.categoryBtnSpan}>
                <p>카테고리</p>
                <MdKeyboardArrowDown />
              </span>
            ) : (
              <span css={s.categoryBtnSpan}>
                <p>카테고리</p>
                <MdKeyboardArrowUp />
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <div css={s.userBox} onClick={handleMenuClick}>
              <div css={s.userImgBox}>
                {!profileImage ? (
                  <img src={userImg} alt="userImage" css={s.userImg} />
                ) : (
                  <img
                    src={INFORMATION_IMG + profileImage}
                    alt="profileImage"
                    css={s.userImg}
                  />
                )}
              </div>
              <div css={s.userNameBox}>{nickName}</div>
              <HiMenu css={s.iconSt} />
            </div>
          ) : (
            <div onClick={() => navigator("/signIn")} css={s.signBtn}>
              로그인 & 회원가입
            </div>
          )}
        </div>
      </div>
      {menuOpen && <HamburgerMenu />}
    </div>
  );
}

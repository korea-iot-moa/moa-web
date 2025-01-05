/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import * as s from './style';
import logoImg from "../../images/moaLo.png"
import mainVideo from "../../video/mainVideo.mp4";
import webAppMain from "../../images/webAppMain.png";
import 'animate.css';
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WebMainPage() {

  const videoElement = useMemo(
    () => (
      <video autoPlay muted loop css={s.backgroundVideo}>
        <source src={mainVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ),
    []
  );

  const handleClickWepAppPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/main')
  }

  console.log(videoElement);
  const navigate = useNavigate();

  return (
    <div css={s.fullBox}>
      <div css={s.videoContainer}>
        {videoElement}
        <div css={s.header}>
          <div css={s.headerTop}>
            <div css={s.logoBox} onClick={() => navigate('/')}>
              <img src={logoImg} alt="로고" css={s.smallLogo} />
              <h1>M O A</h1>
            </div>
            <div>
              <button css={s.button1} onClick={handleClickWepAppPage}>모아 시작</button>
            </div>
          </div>

          <div css={s.headerBottom}>
            <div css={s.leftBox}>
              <div className="animate__animated animate__backInUp">
                <div
                  css={s.logoBox} 
                  onClick={() => navigate('/')}
                >
                  <img src={logoImg} alt="로고" css={s.smallLogo} />
                  <h1>M O A</h1>  
              </div>
                <p>당신의 취미를 공유할 모임을 찾아보세요.</p>
                <p>함께 성장하고, 소통할 수 있는 공간이 </p>
                <p>여기에 있습니다!</p>
              </div>
              <div>
                <button className="animate__animated animate__backInUp" css={s.button2} onClick={handleClickWepAppPage}>
                  모아 시작하기
                </button>
              </div>
            </div>
            <div css={s.rightBox}>
              <div>
              <img className="animate__animated animate__zoomIn" src={webAppMain} alt="wepAppPage" />
              </div>
            </div>
          </div>
          <footer css={s.footer}>
            <div>
              <p css={s.fontSt}>저작권 정보 © 2025 Moa. All rights reserved.</p>
            </div>
            <div>
              <a href="https://github.com/korea-iot-moa" target="_blank">
                <FaGithub css={s.iconSt}/>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

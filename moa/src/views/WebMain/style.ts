import { css } from "@emotion/react";

export const fullBox = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const videoContainer = css`
  position: relative;
  width: 100%;
  height: 100vh;
  min-width: 786px;
  min-height: 911px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const backgroundVideo = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; 
`;

export const header = css`
  box-sizing: border-box;
  width: 80%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const headerTop = css`
  width: 100%;
  height: 20%;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const headerBottom = css`
  width: 100%;
  height: 60%;
  z-index: 1;
  padding: 30px;
  display: flex;
  flex-direction: row;
`;

export const leftBox = css`
  width: 50%;
  display: flex;
  flex-direction: column;

  > div:nth-child(1) {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    > p {
      margin: 5px;
      font-size: 28px;
      font-weight: bold;
      color: #fff;
    }
  }

  > div:nth-child(2) {
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const rightBox = css`
  width: 50%;
  height: auto;
  margin: 65px 50px;
  border-radius: 10px;
  overflow: hidden;

  > div {
    width: auto;
    height: auto;
    min-height: 420px;
    min-width: 610px;

    > img {
    box-sizing: border-box;
    object-fit: contain;
    object-position: center; 
    width: 100%;
    height: 100%;
  }
  }
  
`;

export const smallLogo = css`
  height: 75px;
  width: 100px;
`;


export const logoBox = css`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > h1 {
    color: #fff;
  }

`;

export const button1 = css`
  padding: 10px 30px;
  background-color: #FF7B54;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FCD572;
  }
`;

export const button2 = css`
  min-width: 170px;
  min-height: 45px;
  margin-top: 30px;
  width: 50%;
  padding: 10px 30px;
  background-color: #FF7B54;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FCD572;
  }
`;


export const footer = css`
  color: #fff;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div:nth-child(1) {
    display: flex;
    align-items: flex-end;
  }

  > div:nth-child(2) {
    display: flex;
    align-items: flex-end;
  }
`;

export const fontSt = css`
  color: #fff;
`;

export const iconSt = css`
  color: #fff;
  width: 50px;
  height: 50px;
`;
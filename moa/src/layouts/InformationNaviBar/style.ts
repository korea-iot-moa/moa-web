import { css } from '@emotion/react';

export const infoNaviBar = css`
  height: 100vh;
  width: 30%;
  overflow: hidden;
  background-color: #CFCFCF;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
`;

export const userInfoBox = css`
  width: 70%;
  height: 30%;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const userImgBox = css`
  margin: 20px 0;
  width: 65%;
  height: 60%;
  background-color: #CFCFCF;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const userImg = css`
  width: 100%;
  height: 100%;
`;

export const userNameBox = css`
  width: 65%;
  height: 15%;
  border-radius: 5px;
  background-color: #4A4848;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const naviBox = css`
  margin: 30px 0;
  width: 70%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const naviDiv = css`
  padding: 10px;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 150px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #C6C6C6;
  }
`

export const fontSt = css`
  margin: 0;
  margin-left: 15px;
  font-weight: 700;
  color: #0A3140;
  font-size: 16px;
`;
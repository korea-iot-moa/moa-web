import { css } from "@emotion/react";

export const infoNaviBar = css`
  box-sizing: border-box;
  padding: 10px;
  height: 70px;
  width: 100%;
  overflow: hidden;
  background-color: #cfcfcf;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const userInfoBox = css`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const userImgBox = css`
  margin-right: 10px;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const userImg = css`
  width: 100%;
`;

export const userNameBox = css`
  color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export const naviBox = css`
  display: flex;
  align-items: center;
`;

export const naviDiv = css`
  box-sizing: border-box;
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c6c6c6;
  }
`;

export const fontSt = css`
  margin: 0;
  margin-left: 15px;
  font-weight: 700;
  color: #0a3140;
  font-size: 16px;
`;

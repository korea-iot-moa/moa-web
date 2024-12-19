import { css } from "@emotion/react";

export const infoNaviBar = css`
  box-sizing: border-box;
  padding: 10px;
  height: 90px;
  width: 100%;
  overflow: hidden;
  background-color: #cfcfcf;
  border-radius: 0px 10px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-width: 765px;
`;

export const userInfoBox = css`
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const userImgBox = css`
  margin-right: 0;
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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const userImg = css`
  width: 100%;
  transition: transform 0.3s ease;
`;

export const userNameBox = css`
  color: #222222;
  font-weight: 600;
  padding: 10px;
`;

export const innerInfoBox = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const logoutBtn = css`
    color: #0a3140 ;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #cfcfcf;
  border: 1px solid #0a3140;
  cursor: pointer;
  &:hover{
    background-color: #afafaf;
    color: #fff;
    border: 1px solid #fff
  }
`;

export const signBtn = css`
  color: #0a3140 ;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #cfcfcf;
  border: 1px solid #0a3140;
  cursor: pointer;
  &:hover{
    background-color: #afafaf;
    color: #fff;
    border: 1px solid #fff;
  }
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

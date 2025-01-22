import { css } from "@emotion/react";

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const groupImgBox = css`
  box-sizing: border-box; 
  width: 100%;
  height: 300px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  background-color: #eee;
  padding: 10px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  > .default {
    object-fit: none;
  }
`;

export const groupInfoBox = css`
  box-sizing: border-box; 
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 30px;
`;

export const groupDetailBox = css`
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  min-height: 300px;
  padding:10px;
  background-color: #eee;
  border-radius: 10px;

  > div:nth-child(1) {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 20px;
  }
`;


export const infoPart = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;

  > p:nth-child(2) {
    margin-left: 20px;
  }
`;

export const mapBox = css`
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  min-height: 300px;
  padding:10px;
  background-color: #eee;
  border-radius: 10px; 

  > div:nth-child(1) {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0px;
  }
`;
import { css } from '@emotion/react';

export const fullBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const optionBtn = css`
  font-size: 30px;
  color: #4e4e4e;
  margin-left: 20px;
  cursor: pointer;
  &:hover{
    color: #2a2a2a;
  }
`;

export const topBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #4b4b4b;


  > h1 {
    padding: 0 10px;
    font-size: 24px;
  }

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

export const BtnSt = css`
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  gap: 10px;
  cursor: pointer;
`;

export const leaveBtn = css`
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  gap: 10px;
  cursor: pointer;

  &:hover{
    color: #f44336;
    border: 1px solid #f44336;
  }
`;


export const middleBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 80%;
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

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;  

export const groupInfoBox = css`
  box-sizing: border-box; 
  width: 100%;
  height: 65%;
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
  padding:20px;
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
  padding:20px;
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

export const iconSt = css`
  font-size: 20px;
`;
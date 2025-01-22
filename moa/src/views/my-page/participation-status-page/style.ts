import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const headerBox = css`
  width: 80%;
  height: 10%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0a3140;

  > h1 {
    margin: 5px 0;
    color: #0a3140;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const reviewBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;


export const reviewMain = css`
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 5px;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
`;

export const imgBox  = css`
  box-sizing: border-box;
  width: 30%;
  height: 100%;
  border-radius: 0 0 5px 5px;

  > div {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 5px;

    > img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 70%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const groupInfoBox = css`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  > div {
    box-sizing: border-box;
    width: 90%;
    height: 20%;
    pad: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin: 10px;
    border-bottom: 1px dashed #0a3140;
  }
`;

export const iconSt = css`
  width: 30px;
  height: 30px;
  `;


  export const answerInfoBox = css`
    box-sizing: border-box;
    width: 40%;
    height: 100%;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > div:nth-child(1) {
      box-sizing: border-box;
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 10px;
      
      > button {
        width: 80px;
        height: 30px;
        border: 1px  solid #f44336;
        border-radius: 5px;
        background-color: #fff;
        color: #f44336;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background-color: #f44336;
          color: #fff;
        }
      }
    }

    > div:nth-child(2) {
      box-sizing: border-box;
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 10px;

      > div {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px dashed #0a3140 ;
      }

      > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        p {
          font-size: 14px;

        }
      }

      > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
      }
    }
  `;

export const fontSt = (num: number) => css`
  font-size: 14px;
  font-weight: bold;
  color: ${num === 0 ? '#f44336' : num === 1 ? '#7BD04A' : '#000'};
`;
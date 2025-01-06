import { css } from "@emotion/react";

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

export const reviewHeader = css`
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;

  > button {
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #0a3140;
    color: #0a3140;
    cursor: pointer;

    &:hover {
      background-color: #0a3140;
      color: #fff;
    }
  }
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
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 70%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > div:nth-child(1) {
    box-sizing: border-box;
    width: 100%;
    height: 15%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px 10px;

    > p {
      margin: 0;
    }
  }
  
  > div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    height: 85%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    padding: 5px 10px;

    > p {
      margin: 0;
      word-wrap: break-word; 
      word-break: break-word; 
      white-space: pre-wrap; 
    }
  }
`;
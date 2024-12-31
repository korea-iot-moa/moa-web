import { css } from "@emotion/react";

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const header = css`
  width: 80%;
  height: 15%;
  display: flex;
  flex-direction: column;


  > h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    margin: 0;
  }

  > div {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    > button {
    width: 100px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #0a3140;
    color:  #0a3140;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color:  #0a3140;
    }

  }
  }
  
`;

export const mainBox = css`
  width: 80%;
  height: 85%;
`;

export const reviewBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  margin-top: 20px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #c4c4c4;
`;

export const reviewHeader = css`
  box-sizing: border-box;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > h2 {
    width: 50%;
    font-size: 18px;
    font-weight: bold;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 5px;
  }

  > div {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 5px;

    > p {
      padding: 0 10px;
      margin: 0;
    }
  }
`;

export const reviewMain = css`
  box-sizing: border-box;
  width: 100%;
  height: 80%;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 20px;

  > div:nth-child(1) {
    box-sizing: border-box;
    width: 30%;
    height: 100%;
    min-width: 200px;
    background-color: #eee;
    border-radius: 5px;
    padding: 10px;

    > div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;

      > img {
        width: 100%;
        height: 100%;
      }
    }

  }

  > div:nth-child(2) {
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 5px;
    width: 70%;
    height: 100%;
    padding: 10px;

    > p {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      margin: 0;
      padding: 10px;
      background-color: #fff;
      word-wrap: break-word;
      white-space: pre-line;
    }
  }
`;
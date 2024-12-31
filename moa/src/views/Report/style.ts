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
  height: 20%;
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

  > p {
    margin-left: 42px;
    color: #E50914;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 70%;
  background-color: #eee;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px 60px;
  gap: 20px;
`;

export const mainHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10%;

  > div:nth-child(1) {
    background-color: #fff;
    padding: 10px 40px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;

    > p {
      margin: 0;
    }

    > p:nth-child(1) {
      font-weight: bold;
    }

    > p:nth-child(2) {
      font-weight: bold;
      color: #E50914;
    }
  }

  > div:nth-child(2) {
    
    > select {
      padding: 10px 40px;
      border-radius: 5px;
      border: none;
      outline: none;
    }
  }
`;

export const content = css`
  box-sizing: border-box;
  width: 100%;
  height: 30%;
  background-color: #fff;
  border-radius: 5px;

  > textArea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 18px;
  }
`;

export const imgFile = css`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  gap: 10px;

  > div:nth-child(1) {
    box-sizing: border-box;
    width: 60%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;

    > img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      /* object-fit: cover; */
      border-radius: 5px;
      border: none;
    }
  }

  > div:nth-child(2) {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;

    > input {
      display: none;
    }

    > label {
      box-sizing: border-box;
      border: 1px solid black;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #fff;
      text-align: center;
      cursor: pointer;

      &:hover {
        border: 1px solid #000;
      }
    }
  }
`;

export const btnBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
  height: 10%;
  width: 40%;

  > button {
    width: 50%;
    padding: 10px 40px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
  }

  > button:nth-child(1) {
    &:hover {
      border: 1px solid #FF7B54;
      color: #FF7B54;
    }
  }

  > button:nth-child(2) {
    &:hover {
      border: 1px solid #E50914;
      color: #E50914;
    }
  }
    

`;
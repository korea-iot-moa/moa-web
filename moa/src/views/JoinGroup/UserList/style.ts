import { css } from "@emotion/react";

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 10px;
  background-color: #eee;
  border-radius: 5px;
`;

export const ulBox = css`
  width: 90%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
  gap: 10px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 5px;
`;

export const listItem = css`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: row;

  > div {
    height: 100%;
  }

  > div:nth-child(1) {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div:nth-child(2) {
    box-sizing: border-box;
    flex: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px;

    > p {
      font-size: 18px;
      font-weight: bold;
    }
  }

  > div:nth-child(3) {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    > button {
      width: 60%;
      height: 50%;
      background-color: #fff;
      color: #E50914;
      border: 1px solid #E50914;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        color: #fff;
        border: 1px solid #CA3232;
        background-color: #CA3232;
      }
    }
  }
`;

export const userImgBox = css`
  margin-right: 0;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
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
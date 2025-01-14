import { css } from "@emotion/react";


export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Botton =css `
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color:rgb(128, 132, 138);
  width: 15%;
  padding: 8px 10px;
  margin: 5px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #B0B8C4;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
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
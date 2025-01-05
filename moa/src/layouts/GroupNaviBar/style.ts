import { css } from "@emotion/react";

export const naviBar = css`
position: relative;
  box-sizing: border-box;
  border-radius: 10px 0px 0px 10px;
  height: 100%;
  width: 8%;
  padding: 10px;
  overflow: hidden;
  background-color: #4b4b4b;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  min-height: 730px;
`;

export const logoImage = css`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  object-fit: cover;
  border-radius: 5px;

`;

export const imageBox = css`
  box-sizing: border-box;
  padding: 5px;
  width: 60px;
  height: 60px;
  border-radius: 10%;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  

  & > img {
    width: 100%;
  }

  & > h1 {
    margin: 0;
    font-size: 10px;
  }

  & > p {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin: 0;
    width: 100%; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const line = css`
  border: none;
  height: 1px;
  background-color: #cfcfcf;
  margin: 10px 0px;
  width: 100%;
`;



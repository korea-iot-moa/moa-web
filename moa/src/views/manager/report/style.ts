import { css } from "@emotion/react";

export const ReportBox = css`
  width: 100%;
  height: auto;
  border: 1px solid gray; 
`;

export const LayerBox = css`
  width: 100%;
  height: auto;
  border: 1px solid gray; 
  margin-top: auto;
  visibility: hidden;
	position: absolute;
	opacity: 0;
  position: static;
	opacity: 1;
	visibility: visible;
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

export const Tab = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color:rgb(128, 132, 138);
  width: 20%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color:rgb(80, 82, 85);
  }

  &:focus {
    color: #fff;
    outline: 3px solid rgb(58, 59, 61);
  }
`;
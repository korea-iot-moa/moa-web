import { css } from "@emotion/react";

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

export const ReportBox = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const BottonBox = css`
  display: flex;
  justify-content:flex-start;
`;

export const Botton =css`
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
  &:hover {
    background-color: #B0B8C4;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
  }
`;

export const ContentBox = css`
  text-align: start;
  width : 60%;
  height: 20px;
  text-align:center;
  font-size: 14px;
  border-radius: 2px;
  text-align: left; 
   resize: none; 
  box-sizing: border-box; 
`;

export const DateBox = css`
  width : 60%;
  height: 20px;
  text-align:center;
  font-size: 16px;
  border-radius: 7px;
`;
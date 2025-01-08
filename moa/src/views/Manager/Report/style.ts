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
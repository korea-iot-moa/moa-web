import { css } from "@emotion/react";

export const LayerBox = css `
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
export const ReportBox = css `
display: flex;
flex-direction: row;
gap: 15px;
`;
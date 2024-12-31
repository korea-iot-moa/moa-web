import { css } from "@emotion/react";

export const mainContainer = css`
  box-sizing: border-box;
  padding: 10px;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0px 0px 10px 0px;
  min-width: 765px;
  overflow-y: visible;
  overflow-x: hidden;
  
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

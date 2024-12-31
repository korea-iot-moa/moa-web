import { css } from "@emotion/react";

export const fullDiv = css`
  box-sizing: border-box;
  margin: 0;
  padding: 50px 250px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #eee;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

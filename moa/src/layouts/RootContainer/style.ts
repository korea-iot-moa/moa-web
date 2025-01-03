import { css } from "@emotion/react";

export const mainContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`;

export const innerBox = css`
  border: 1px solid #000;
  box-sizing: border-box;
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const mainBox = css`
  border: 1px solid black;
  width: 100%;
  height: 50%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > input {
    padding: 12px 10px;
    width: 60%;
    border: 1px solid #000;

  &:focus {
    outline: #4d4d4d;
    border: 2px solid #4d4d4d;
  }
  }
`;
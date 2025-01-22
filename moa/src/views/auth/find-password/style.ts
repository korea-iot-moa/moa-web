import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const innerBox = css`
  box-sizing: border-box;
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const mainBox = css`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  > h1 {
  margin-bottom: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const topInput = css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border: 1px solid #ccc;
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomInput = css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-radius: 0 0 5px 5px;
  border: 1px solid #ccc;
  border-top:  1px solid #fff;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-top: 1px solid #fff;
    border: 1px solid #ccc;
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomBox = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    min-width: 60%;
    height: 45px;
    padding: 0 5px;
    font-size: 17px;
    border-radius: 5px;
    border: none;
    background-color: #FF7B54;
    color: #fff;
    cursor: pointer;

    &:hover, :active{
    background-color: #e5673b;
    border: none;
    outline: none;
  }
  }
`;

export const mailBox = css`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  > h2 {
    margin: 0;
  }
`;

export const errorMessage = css`
  color: red;
`;

export const mainBox2 = css`
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin-bottom: 20px;
  }
`;
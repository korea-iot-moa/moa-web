import { css } from '@emotion/react';

export const fullBox = css`
  height: 80%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const innerBox = css`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const topInput = (hasError: boolean) => css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid ${hasError ? "#E50914" : "#ccc"};

  &:focus {
    outline: none;
    border: 1px solid ${hasError ? "#E50914" : "#ccc"};
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomInput = (hasError: boolean) => css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${hasError ? "#E50914" : "#ccc"};
  border-top:  1px solid ${hasError ? "#E50914" : "#fff"};
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-top: 1px solid ${hasError ? "#E50914" : "#fff"};;
    border: 1px solid ${hasError ? "#E50914" : "#ccc"};
    z-index: 1;
    transition: border 0.5s ease;
  }
`;


export const signInBtn = css`
  width: 62%;
  margin-top: 50px;
  font-size: 17px;
  padding: 10px 5px 10px 5px;
  border-radius: 5px;
  border: none;
  background-color: #4b4b4b;
  color: #fff;
  cursor: pointer;
  &:hover, :active{
    background-color: #1a1a1a;
    border: none;
    outline: none;
  }
`;

export const linkBox = css`
  margin-top: 25px;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const linkText = css`
  font-size: 14px;
  font-style: none;
  text-decoration: none;
  color: #bbb;
  &:hover {
    text-decoration: underline;
  }
`;

export const img = css`
  height: 100%;
  width: 100%;
`;

export const anotherSignIn = css`
  width: 62%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
`;

export const errorMessage = css`
  color: #f44336;
  font-size: 16px;
  margin: 0;
`;
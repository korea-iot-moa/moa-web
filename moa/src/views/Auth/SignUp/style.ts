import { css } from '@emotion/react';

export const fullBox = css`
  height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  overflow-y: auto; 
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const signUpBox = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  padding-bottom: 50px;
  margin: 5% 0; 
  background-color: #fff;
`;

export const input = css`
  padding: 12px 10px;
  border-radius: 5px;
  border: 1px solid #ff8833 ;
  flex: 1; 

  &:focus {
    outline: #ff8833;
    border: 2px solid #ff8833;
  }
`;

export const validInput = css`
  padding: 12px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border:  1px solid #ff8833;
  flex: 1; 

  &:focus {
    outline: #ff8833;
    border: 2px solid #ff8833;
  }
`;

export const label = css`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff8833;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const validBox = css`
  display: flex;
  align-items: center;
  width: 100%; 
  justify-content: center;
`;

export const validBtn = css`
  height: 100%;
  background-color: #fff;
  border:  1px solid #ff8833 ;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
  color: #ff8833;

  &:hover{
    border: 1px solid #ff8833;
    background-color: #ff8833;
    color: #fff;
    outline: none;
  }
  
  &:focus, :active {
    outline: none;
  }
`;
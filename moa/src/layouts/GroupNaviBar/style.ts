import { css } from '@emotion/react';

export const naviBar = css`
  height: 100vh;
  width: 8%;
  overflow: hidden;
  background-color: #FF8833;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
`;

export const logoImage = css`
  width: 50px;
  height: 40px;
  transition: transform 0.3s ease;
`;

export const imageBox = css`
  border-radius: 20%;
  overflow: hidden;
  background-color: #fff;
  padding: 10px; 
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const line = css`
  border: none;          
  height: 1px;           
  background-color: #CFCFCF; 
  margin: 0; 
  width: 80%;
`;
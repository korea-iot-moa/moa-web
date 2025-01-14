import { css } from "@emotion/react";

export const fullBox = css`
  box-sizing: border-box;
  border-radius: 10px 0px 0px 10px;
  height: 100%;
  width: 8%;
  overflow: hidden;
  background-color: #FF7B54;
  display: flex;
  flex-direction: column;
  min-width: 80px;
  min-height: 730px;
`;

export const headerBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
`;

export const logoImage = css`
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  object-fit: cover;
  border-radius: 5px;

`;

export const imageBox = css`
  box-sizing: border-box;
  padding: 5px;
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
  border-radius: 10%;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  

  & > img {
    width: 100%;
  }

  & > h1 {
    margin: 0;
    font-size: 10px;
  }

  & > p {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin: 0;
    width: 100%; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const middleBox = css`
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 ;
  border-top: 1px solid #fff;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: scroll; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const bottomBox = css`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
`;

export const createBox = css`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const createIcon = css`
  font-size: 50px;
  color: #cfcfcf;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
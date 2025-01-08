import { css } from "@emotion/react";
import { Gender, Hobby } from "../../../types";

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
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  padding-bottom: 50px;
  margin: 0;
  background-color: #fff;
  min-width: 590px;
`;

export const pageStateBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 20px;
`;

export const input = css`
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 5px;
  border: 1px solid #4d4d4d;
  flex: 1;
  width: 100%;

  &:focus {
    outline: #000;
    border: 1px solid #000;
  }
`;

export const passwordBottom = css`
  box-sizing: border-box; 
  padding: 12px 10px;
  border-radius: 0 0 5px 5px;
  border: 1px solid #4d4d4d;
  border-top: none;
  flex: 1;
  width: 100%;

  &:focus {
    outline: #000;
    border: 1px solid #000;
    border-top: none;
  }
`;

export const passwordTop = css`
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #4d4d4d;
  flex: 1;
  width: 100%;

  &:focus {
    outline: #000;
    border: 1px solid #000;
  }
`;

export const validInput = css`
  padding: 12px 10px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #4d4d4d;
  flex: 1;

  &:focus {
    outline: #000;
    border: 1px solid #000;
  }
`;

export const labelBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;

`;

export const label = css`
  font-size: 14px;
  font-weight: bold;
  color: #4d4d4d;
  margin: 0;
`;

export const fieldBox = css`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 250px;
`;

export const validBox = css`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  min-width: 250px;
`;


export const genderBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > input {
    display: none;
  }

  & > input:checked + label {
    background-color: #4d4d4d;
    color: #fff;
    border: 1px solid #4d4d4d;
  }

  & > label:nth-of-type(1) {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px 0 0 5px;
    padding: 10px 20px;
    border-right: 1px solid #000;
    cursor: pointer;
    flex: 1;
    text-align: center;

    &:hover {
      border: 1px solid #4d4d4d;
      background-color: #4d4d4d;
      color: #fff;
    }
  }
  & > label:nth-of-type(2) {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    border-left: none;
    border-radius: 0 5px 5px 0;
    padding: 10px 20px;
    cursor: pointer;
    flex: 1;
    text-align: center;


    &:hover {
      border: 1px solid #4d4d4d;
      background-color: #4d4d4d;
      color: #fff;
    }
  }
`;

export const btnBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > button {
    width: 100px;
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
      border: 1px solid #4d4d4d;
      background-color: #4d4d4d;
      color: #fff;
    }
  }
`;

export const hobbyBox = css`
  box-sizing: border-box;
  width: 100%;
  background-color: #cfcfcf;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & > input {
    display: none;
  }

  & > input:checked + label {
    background-color: #4d4d4d;
    color: #fff;
  }

  & > label {
    font-size: 12px;
    font-weight: 500;
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
    background-color: #fff;
    color: #000;
    cursor: pointer;

    &:hover {
      background-color: #4d4d4d;
      color: #fff;
    }
  }
`;


export const validBtn = css`
  height: 100%;
  background-color: #fff;
  border: 1px solid #000;
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 11px;
  padding: 10px;
  color: #000;

  &:hover {
    border: 1px solid #4d4d4d;
    background-color: #4d4d4d;
    color: #fff;
    outline: none;
  }

  &:focus,
  :active {
    outline: none;
  }
`;

export const pageBtn = css`
  
`;

export const userImgBox = css`
  margin-right: 10px;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  position: relative; 
  overflow: hidden;
  z-index: 0;
  

`;

export const profileImgBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > input {
    display: none;
  }
`;

export const userImg = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const userImgGroup = css`
  position: relative;

  & > label {
    position: absolute;
    bottom: 5px; 
    right: 5px;
    color: #fff;
    padding: 5px 5px;
    border: none;
    border-radius: 25px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #9d9d9d;
    z-index: 9999;

    &:hover {
      background-color: #4f4f4f;
    }
    
  }
`;

export const errorMessage = css`
  color: #f44336;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
  margin: 0;
`;

export const okMessage = css`
  color: #03c75a;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
  margin: 0;
`;

export const title = css`
  font-size: 20px;
`;

export const rowFieldFullBox = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 60%;
  min-width: 250px;
  align-items: center;
  justify-content: space-between;
`;

export const rowFieldBox = css`
  box-sizing: border-box ;
  display: flex;
  flex-direction: column;
  width: 47%;
  min-width: 100px;
`;

export const birthDateInput = css`
  box-sizing: border-box;
  padding: 12px 10px;
  border-radius: 5px;
  border: 1px solid #4d4d4d;
  flex: 1;
  width: 100%;
  &:focus {
    outline: #000;
    border: 1px solid #000;
  }
`;


export const headerBox = css`
  width: 80%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > img {
    box-sizing: border-box;
    width: 100px;
  };

  > h1 {
    font-size: 30px;
    color: #0a3140;
  }
`;


export const selectBox = css`
  width: 60%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
`;

export const anotherSignInBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #aaa;
  width: 63%;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;

  > div:nth-child(2) p {
    font-size: 14px; 
    color: #2C3E50;      
    padding-left: 10px;
    font-weight: bold;
  }

  &:hover {
    > div:nth-child(2) p {
      color: #fff;
    }

    > div:nth-child(1) {
      border: none;
    }
  }
`;

export const anotherLogoBox = css`
  border-right: 1px solid #aaa;
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  .naver{
    width: 35px;
    height: 30px;
  }

  .kakao{
    width: 30px;
    height: 30px;
  }

  .moa {
    width: 40px;
    height: 30px;
  }
`;

export const allSignUpBox = css`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  > .naver {
    &:hover{
      background-color: #01C73C;
      border: 1px solid #01C73C;
    }
  }

  > .kakao {
    &:hover{
      background-color: #FDDC3F;
      border: 1px solid #FDDC3F;
    }
  }

  > .moa {
    &:hover{
      background-color: #FF7B54;
      border: 1px solid #FF7B54;
    }
  }
`;

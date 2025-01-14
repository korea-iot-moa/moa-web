import { css } from "@emotion/react";

export const AllBox = css`
display: flex;
justify-content: space-evenly;
`;
export const buttonBox = css`
  display: flex;
  flex-direction: row;
`;
export const TitleInput = css `
 width :70vh;
 height: 40px;
 font-size: 16px;
 font-weight: 500;
 border-radius: 7px;
 text-align: left; 
   resize: none;
  display: block;
  box-sizing: border-box; 

 `;

 export const ContentBox =css `
  width :70vh;
  height: 180px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 7px;
  padding: 10px;
  text-align: left; 
   resize: none;
   display: block;
  box-sizing: border-box; 
 `;

 
export const  bottomBox = css `
display: flex;
align-items:end;
`;
 
export const DateContainer = css`
display:flex; 
justify-content:center;
`;
export const DateBox = css `
  width :30%;
  height: 40px;
  text-align:center;
  border-radius: 7px;
`;

export const Tab =css `
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color:rgb(128, 132, 138);
  width: 20%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color:rgb(80, 82, 85);
  }

  &:focus {
    color: #fff;
    outline: 3px solid rgb(58, 59, 61);
  }
`;
export const rowFieldBox = css`
  box-sizing: border-box ;
  display: flex;
  flex-direction: column;
  width: 47%;
  min-width: 100px;
`;

export const labelBox = css`
  display: flex;
  align-items: center;
  flex-direction:row;
  margin-bottom: 5px;

`;

export const genderBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 40%;

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

export const label = css`
  font-size: 14px;
  font-weight: bold;
  color: #4d4d4d;
  margin: 0;
`;

export const activeTab = css`
  background-color: #000;
  color: #fff;
  padding: 10px 12px;
  width: 20%;
  border: none;
  border-radius: 7px;
  cursor: pointer;
`;
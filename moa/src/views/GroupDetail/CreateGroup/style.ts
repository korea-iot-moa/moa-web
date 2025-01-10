import { css } from '@emotion/react';
export const AllBox = css`
display: flex;
  justify-content: flex-start; 
  gap: 10px; 
  flex-wrap: wrap; 
  margin-bottom: 15px; 
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
    background-color: #B0B8C4;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
  }
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

export const TitleInput = css `
 width :70vh;
 height: 40px;
 font-size: 16px;
 font-weight: 500;
 border-radius: 7px;

 `;

 export const ContentBox =css `
  width :70vh;
  height: 180px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 7px;
   text-align: left; 
   resize: none;
   display: block;
  box-sizing: border-box; 
 `;
//  nth-of-type()
export const CreatorBox = css `
  display : flex;
  flex-direction : column;
  justify-content : center;

`;
export const CreatorBox_1 = css `
  display : flex;
  flex-direction : column;
  justify-content : center;
  & > div {
    margin : 25px;
  }
`;
export const BottomButtonContainer = css`
 display: flex;
 margin-left: 25px;
 justify-content: start;
 width: 100%; 
 margin-top: 150px; 
`;

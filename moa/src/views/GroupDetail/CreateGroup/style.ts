import { css } from '@emotion/react';

export const Container = css `
margin-top: 25px;
`;

export const AllBox = css`
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  gap: 10px; 
  flex-wrap: wrap; 
  margin-bottom: 15px; 
  
`;

export const Tab = css`
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: rgb(222, 222, 222);
  width: 20%; 
  padding: 10px 12px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box; 
  transition: none;

  &:hover {
    background-color: #f7e2d5;
  }

  &:focus {
    color: #fff;
    outline: none;
  }
`;

export const activeTab = css`
  background-color: #f7e2d5;
  color: #000;
  padding: 10px 12px; /* Tab과 동일하게 설정 */
  width: 20%; /* Tab과 동일하게 설정 */
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 7px;
  transition: none;
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
 padding-left: 15px;
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
 padding-left: 15px;

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
 padding-top: 100px;
 width: 100%; 
 margin-top: 10px; 
`;

export const ImgInput = css `
 width :50vh;
 height: 20px;
 font-size: 16px;
 font-weight: 500;
 border-radius: 7px;

 `;

 export const MoveButton =css `
  font-family: "IBM Plex Sans", sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color:rgb(255, 132, 25);
  width: 20%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: #fab77d;
  }

  &:focus {
    color: #fff;
    outline: 3px solid #DAE2ED;
  }
`;
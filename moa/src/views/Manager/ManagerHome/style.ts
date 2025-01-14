
import { css } from "@emotion/react";


export const modalContainer = css`
  text-align: center;
  margin-top: 50px;
`

export const openModalButton = css`
  padding: 0px 0px 0px 0px; 
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color:rgb(9, 28, 36);
  width: 15%;
  padding: 8px 10px;
  margin: 5px;
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

`  

export const modalOverlay= css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding :20px;
` 


export const modalContent =css`
  position: absolute;
  background: white;
  top: 40%;
  right: 40%;
  padding: 20px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;


export const closeModalButton = css`
  margin-top: 20px;
  padding: 0px 0px 0px 0px; 
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color:rgb(128, 132, 138);
  width: 15%;
  padding: 8px 10px;
  margin: 5px;
  border: none;
  border-radius: 7px;
  text-align: center;
`

export const Botton =css `
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color:rgb(9, 28, 36);
  width: 15%;
  padding: 8px 10px;
  margin: 5px;
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

export const userImgBox = css`
  margin-right: 0;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
export const userImg = css`
  width: 100%;
  transition: transform 0.3s ease;
`;

import { css } from "@emotion/react";


export const modalContainer = css`
  text-align: center;
  margin-top: 50px;
`


export const openModalButton = css`
  padding: 0px 0px 0px 0px; 
  font-size: 16px;
  cursor: pointer;
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
` 


export const modalContent =css`
  position: relative;
  background: white;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `


export const closeModalButton = css`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`


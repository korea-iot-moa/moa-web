import { css } from '@emotion/react';

export const container = css`
  width: 80%;
  margin: 0 auto;
  min-width: 400px;
  `

export const mainBox = css`
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  `

export const selectCategry =css`
  display: flex;
  flex-direction: row;
  list-style: none;
  width: 150px;
  justify-content: space-around;
  `

export const categoryList =css`
  padding: 0px; 
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  gap: 50px;
  font-size: 11px;
  padding: 0;
`
export const imgDiv = css`
  width: 100%;
  height: 80px;
  object-fit: contain;
  cursor: pointer;
`
export const img = css`
  width: 100%;
  height: 100%;
  transition: scale 0.1s;
  &:hover{
    scale: calc(1.2);
  }
`
export const groupLi = css`
  width: 165px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;  
  @media (min-width: 500px) {
    width: 140px;
}
`
export const line = css`
  border: 1px solid #ddd;
  margin: 10px 0px;
`
export const content = css`
  margin: 0px;
`

export const listDetail =css`
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
`

export const category =css`
  border-radius: 5px;
  background-color: orange;
  padding: 5px;
  box-sizing: border-box;
  color: white;
`

export const click =css`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  transition: scale 0.1s;

  &:active {
    scale: calc(1.5);
  }
`

import { css } from '@emotion/react';

export const container = css`
  width: 70%;
  margin: 0px auto;
  margin-top: 50px;
  max-width: 600px;
  min-width: 400px;
  `

export const resultLine = css`
  width: 100%;
  border: 1px solid #eee;
  margin-top: 10px;
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
  margin-top: 30px;
  padding: 0;
`

export const category =css`
  border-radius: 5px;
  background-color: orange;
  padding: 5px;
  box-sizing: border-box;
  color: white;
`

export const buttonDiv = css`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    
  }

  button:hover {
    color: rgb(100, 100, 100)
  }
  span {
    margin: 0px 5px;
  }
`
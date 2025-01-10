import { css } from '@emotion/react';

export const container =css`
  width: 80%;
  margin: 0px auto;
  margin-top: 50px;
  max-width: 600px;
  min-width: 400px;
`
export const headerDiv = css`
    /* @media screen and (min-width: 500px) {
    width: 520px;
} */
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

export const line = css`
  border: 1px solid #ddd;
  margin: 10px 0px;
`

export const groupList =css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  list-style: none;
`

export const groupLi =css`
  display: block;
  float: left;
  width: 190px;
  box-sizing: border-box;
  padding: 10px;
  margin: 0px;
  margin-top: 20px;
`

export const listDetail =css`
  display: flex;  
  flex-direction: row;
  justify-content: space-between;
  font-size: 10px;
`

export const content =css`
  margin: 0px;
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
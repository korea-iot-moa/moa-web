import { css } from '@emotion/react';

export const container =css`
  width: 80%;
  margin: 0px auto;
  margin-top: 50px;
  max-width: 700px;
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

export const line = css`
  border: 1px solid #ddd;
  margin: 10px 0px;
`

export const groupList =css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
  list-style: none;
  padding: 0px;
  margin: 20px;
`

export const groupLi =css`
  display: block;
  float: left;
  width: 200px;
  box-sizing: border-box;
  padding: 10px;
  margin: 0px;
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

export const marginPaddingDel =css`
  margin: 0px;
  padding: 0px;
`
export const click =css`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: none;
`
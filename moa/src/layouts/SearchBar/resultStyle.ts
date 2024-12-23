import { css } from '@emotion/react';

export const container = css`
  width: 80%;
  margin: 0 auto;
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

export const groupLi = css`
  flex: 1 1 150px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
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
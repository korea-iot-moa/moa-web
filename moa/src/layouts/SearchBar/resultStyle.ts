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

export const category =css`
  border-radius: 5px;
  background-color: orange;
  padding: 5px;
  box-sizing: border-box;
  color: white;
`
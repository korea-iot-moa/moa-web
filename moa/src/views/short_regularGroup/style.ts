import { css } from '@emotion/react';

export const mainContainer =css`
  width: 80%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
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
  flex: 200px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
`
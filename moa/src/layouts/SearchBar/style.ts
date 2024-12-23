import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const searchBar = css`
  width: 100%;
  height: 10%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 650px;
  margin: 30px auto;
`;

export const searchBarLine = css`
  width:60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.2px solid #ddd;
`

export const searchBtn = css`
  font-size: 25px;
  margin: 0px 10px 0px 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #777;
  cursor: pointer;
`

export const searchInput = css`
  width: 100%;
  height: 30%;
  border: none;
  outline: none;
  font-size: 16px;
  margin-bottom: 10px;
  &::placeholder {color: #ddd;}
`


//HobbyAndRegionCategory
export const categorybox = css`
  background-color: rgb(240, 240, 240);
  width: 420px;
  box-sizing: border-box;
  margin-top: 0px;
  padding: 15px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`
export const ulStyle = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px
`
export const buttonStyle = css`
  border: none;
  border-radius: 5px;
  font-size: 11px;
  height: 21px;
  margin: 5px;
`
export const cateogyTitle = css`
display: flex;
flex-direction: column;
align-items: flex-start;
`
export const categorySearchBtn = css`
  margin: 10px; 
  border: none;
  border-radius: 5px;
  background-color: rgb(194, 189, 189);
`

// KewordSearchGroupList style
export const keyword = css`
  
`

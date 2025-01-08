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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 650px;
  margin: 0px auto;
  margin-top: 100px;
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
`

export const searchTitleList = css`
  width: 55%;
  list-style: none;
  margin-top: 40px;

  li {
    border-bottom: 2px solid #eee;
    margin-bottom: 15px;
    padding: 0px 0px 5px 10px;
    transition: border-bottom 0.2s;
  }
  li:hover {
    border-bottom: 2px solid rgb(252, 86, 44);
    font-weight: 600;
  }

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: rgb(102, 102, 102);
  }
  button:hover {
    color: rgb(0, 0, 0);
  }
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
  padding: 0px;
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
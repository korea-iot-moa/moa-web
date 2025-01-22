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
  border-bottom: 1.2px solid #FF7B54;
`

export const searchBtn = css`
  font-size: 25px;
  margin: 0px 10px 0px 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #FF7B54;
  cursor: pointer;
  &:active{
    color:rgb(250, 86, 37);
  }
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

  >li {
    border-bottom: 2px solid #eee;
    margin-bottom: 15px;
    padding: 0px 0px 5px 10px;
    transition: border-bottom 0.2s;
  }
  >li:hover {
    border-bottom: 2px solid #FF7B54;
    font-weight: 600;
  }

  >li>button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: rgb(102, 102, 102);
  }
  li>button:hover {
    color: rgb(0, 0, 0);
  }
`

//HobbyAndRegionCategory
export const mainContainer = css`
  width: 100%;
  margin: 0px;
  display: flex;
  justify-content: end;
  padding-right: 230px;
  box-sizing: border-box;
  `

export const categorybox = css`
  position: absolute;
  z-index: 2;
  background-color: #fff;
  width: 305px;
  height: 300px;
  box-sizing: border-box;
  margin-top: 0px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8px 6px 2px rgba(0,0,0,0.1);
`
export const ulStyle = css`
  list-style: none;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
`
export const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  font-size: 11px;
  height: 21px;
  margin: 5px;
  padding: 5px;
`
export const cateogyTitle = css`
width: 300px;
display: flex;
flex-direction: column;
align-items: flex-start;
margin-top: 20px;
margin-left: 20px;
`
export const categorySearchBtn = css`
  width: 50px;
  margin: 10px; 
  border: none;
  border-radius: 5px;
  background-color: #FF7B54;
  color: #fff;
  padding: 3px;
  box-sizing: border-box;
  &:hover {
    background-color: #e5673b;
  }
`

export const buttonDiv = css`
  width: 300px;
  display: flex;
  justify-content: flex-end;
`
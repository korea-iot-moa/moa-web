import { css } from "@emotion/react";

export const findUserIdContainer = css`
  margin: 0;
  padding: 0;
`

export const findUserIdTitle = css`
  margin: 20px 40px;
`
export const inputBox = css`
  margin: 120px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const findUserIdForm = css`
  display: flex;
  flex-direction: column;
`

export const findUserIdInput1 = css`
  height: 40px;
  width: 320px;
  border-radius: 5px 5px 0px 0px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #999;
  font-size: 12px;
  margin-top: 20px;
  outline: none;
` 

export const findUserIdInput2 = css`
  height: 40px;
  width: 320px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-top: none;
  border-radius: 0px 0px 5px 5px;
  font-size: 12px;
  outline: none;
`  

export const findUserIdBtn = css`
  height: 40px;
  border: none;
  border-radius: 5px;
  margin-top: 30px;
  color: #fff;
  background-color: #FF7B54;
  transition: background-color 0.05s;
  &:hover {
    background-color: #e5673b
  }
`
export const findUserIdImg = css`
  width: 200px;
`

// FindUserIdResult
export const findUserIdResultBox = css`
  margin: 150px auto;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const findUserIdResultUl = css`
  list-style: none;
  font-size: 20px;
  li {
    margin-bottom: 10px;
  }
`

export const findUserIdResultline = css`
  width: 100%;
  border: 1px solid #FF7B54;
  margin: 50px;
`

export const findUserIdResultBtn = css`
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #FF7B54;
  cursor: pointer;
  transition: background-color 0.5s;
  &:hover {
    background-color: #e5673b;
  }
`
import { css } from "@emotion/react";

export const findUserIdContainer = css`
  margin: 0;
  padding: 0;
`

export const findUserIdTitle = css`
  margin: 20px 40px;
`
export const inputBox = css`
  margin: 80px auto;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const findUserIdForm = css`
  display: flex;
  flex-direction: column;
`
export const findUserIdLabel = css`
  margin-bottom: 5px;
` 
export const findUserIdInput = css`
  margin-bottom: 25px;
  height: 40px;
  border-radius: 5px;
  background-color: #eee;
  border: none;
  padding: 20px;
  box-sizing: border-box;
  font-size: 17px;
` 

export const findUserIdBtn = css`
  height: 40px;
  border: none;
  border-radius: 5px;
  margin-top: 30px;
  background-color: rgb(156, 156, 156);
  transition: background-color 0.5s;
  &:hover {
    background-color: rgb(108, 108, 108)
  }
`
export const findUserIdImg = css`
  width: 200px;
`


// FindUserIdResult
export const findUserIdResultBox = css`
  margin: 100px auto;
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
  border: 1px solid #333;
  margin: 50px;
`

export const findUserIdResultBtn = css`
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: rgb(177, 177, 177);
  cursor: pointer;
  transition: background-color 0.5s;
  &:hover {
    background-color: rgb(108, 108, 108)
  }
`
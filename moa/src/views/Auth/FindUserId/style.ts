import { css } from "@emotion/react";

export const findUserIdContainer = css`
  margin: 0;
  padding: 0;
`

export const findUserIdTitle = css`
  margin: 20px 40px;
`
export const inputBox = css`
  margin: 50px auto;
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
  transition: border 0.5s, scale 0.5s;
  &:focus {
    border: 1px solid #999;
    &::placeholder:active {
        scale: calc(0.8);
      }
  }
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
  transition: border 0.5s, scale 0.5s;
  &:focus {
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    &::placeholder:active {
        scale: calc(0.8);
      }
  }
` 

export const findUserIdInput3 = css`
  height: 40px;
  width: 320px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 0px 0px 5px 5px;
  font-size: 12px;
  outline: none;
  transition: border 0.5s, scale 0.5s;
  &:focus {
    border-radius: 0px 0px 5px 5px;
    border: 1px solid #999;
  }
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
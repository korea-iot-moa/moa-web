import { css } from "@emotion/react";

export const container = css`
  width: 80%;
  margin: 0 auto;
  max-width: 500px;
  min-width: 400px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
`
export const title = css`
  margin-left: 50px;
`
export const p = css`
  font-size: 15px;
` 
export const button = css`
  border: none;
  border-radius: 5px;
  font-size: 12px;
  height: 50px;
  cursor: pointer;
  :hover {
    background-color: rgb(200, 200, 200);
  }
  :active {
    background-color: rgb(170, 170, 170);
  }
`

// JoinGroupStart
export const listBox = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: rgb(230, 230, 230);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  margin: 0;
`
export const liststyle = css`
  list-style: circle;
  font-size: 10px; 
  li{
    margin-top: 10px;
  }
`
export const line = css`
  border: 1px solid #333;
  margin: 40px 0px 10px;
`

// JoinGroupAnswer
export const  AnswerListBox = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  list-style: none;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`
export const questionTitle = css`
  margin: 0; 
  font-size: 15px;
`
export const answerTitle = css`
  margin: 0; 
  font-size: 15px;
`
export const line2 = css`
  width: 100%;
  border: 1px solid #333;
  margin: 30px 0px;
`

export const questionContent = css`
  margin: 30px ;
  font-size: 12px;
`
export const answerContent = css`
  margin: 30px ;
  width: 85%;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px;
  border: 1px solid #333;
  outline: #333;
`

// GroupAnswerResult
export const resultContainer = css`
  display: flex;
  flex-direction: row;
  margin-top: 150px;
  width: 100%;
  img{
    width: 100%;
    height: 200px;
  } 
`
export const groupDataDiv = css`
  /* border: 1px solid #333; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
`

export const dateBox = css`
  width: 55%;
  display: flex;
  list-style: none;
  justify-content: space-between;
  padding: 0;
`

export const line3 = css`
  width: 100%;
  border: 1px solid #333;
  margin-top: 10px;
  margin-bottom: 20px;
`
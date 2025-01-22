import { css } from '@emotion/react';

export const fullBox = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const headerBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 10%;

  > h1 {
    color: #0a3140;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 50px; 
  margin: 0 auto; 
  justify-items: center; 
`;

export const noticeBox = css`
  box-sizing: border-box;
  width: 100%;
  max-height: 270px;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;


  > div:nth-child(1) {
    box-sizing: border-box;
    width: 100%;
    height: 15%;
    border-radius: 5px;
    background-color: #eee;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h2 {
      box-sizing: border-box;
      margin: 0;
    }
  }

  > div:nth-child(2) {
    box-sizing: border-box;
    width: 100%;
    height: 70%;
    border-radius: 5px;
    background-color: #eee;
    padding: 5px 10px;
    display: flex;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
    display: none;
    }
  scrollbar-width: none;
  -ms-overflow-style: none;
    
    > p {
      margin: 0;
      box-sizing: border-box;
    }
  }

  > div:nth-child(3) {
    box-sizing: border-box;
    width: 100%;
    height: 10%;
    border-radius: 5px;
    background-color: #eee;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    > p {
      margin: 0;
      box-sizing: border-box;
    }
  }
`;
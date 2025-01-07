import { css } from "@emotion/react";

export const fullBox = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const header = css`
  width: 80%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const backPage = css`
  cursor: pointer;
  font-size: 30px;
`;

export const imageBox  = css`
  box-sizing: border-box;
  width: 80%;
  height: 300px;
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;

  > img{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const tapBox = css`
  width: 80%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  
`;

export const tabBtn = (isActive: boolean) => css`
  box-sizing: border-box;
  width: 100px;
  height: 60px;
  font-size: 16px;
  background-color: #fff;
  border: none;
  border-bottom: ${isActive ? "1px solid black" : "none"};
  cursor: pointer;
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 80%;
  min-height: 500px;
  height: auto;
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;

  > div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
`;

export const categoryBox = css`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #eee;

  > span {
    width: auto;
    min-width: 80px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  > span:nth-child(1) {
    background-color: #FF7B54;
    color: #fff;
  }
  > span:nth-child(2) {
    background-color: #FCD572;
    color: #fff;
  }
  > span:nth-child(3) {
    background-color: #0a3140;
    color: #fff;
  }
`;

export const content = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;

  > h2 {
    margin-bottom: 20px;
  }

`;

export const supplies = css`
  box-sizing: border-box;
  width: 80%;
  height: 200px;
  margin: 50px 0;
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;

  > div {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 20px;

    > h2 {
      margin-bottom: 20px;
    }
  }
`;

export const mapBox = css`
  box-sizing: border-box;
  width: 80%;
  height: 300px;
  background-color: #eee;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const joinBox = css`
  width: 80%;
  height: 200px;
  display: flex;
  align-items: center;
  
  > button {
    width: 100%;
    height: 50px;
    font-size: 20px;
    background-color: #FF7B54;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: #FCD572;
    }
  }
`;
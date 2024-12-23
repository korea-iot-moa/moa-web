import { css } from '@emotion/react';

export const voteBox = css`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  width: 500px;
  height: 550px;
  position: relative; 
  margin: auto; 
  display: flex;
  flex-direction: column;
`;

export const headerBox = css`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  > h1 {
    font-size: 22px;
    margin: 0;
  }
`;

export const buttonStyle = (isSelected: boolean, baseColor: string, hoverColor: string) => css`
  width: 45%;
  padding: 10px 0;
  border-radius: 5px;
  background-color: ${isSelected ? baseColor : "#fff"};
  color: ${isSelected ? "#fff" : baseColor};
  border: 1px solid ${baseColor};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${hoverColor};
    color: #fff;
  }
`;

export const closeButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const mainBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #eee;
  padding: 10px 20px;
`;

export const dateBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const contentBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 50%;

  > textArea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 18px;
    padding: 10px;
    color: #2d2d2d;
  }
`;

export const selectBox = css`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const notification = css`
  color: #4d4d4d;
  margin-bottom: 0;
  padding-top: 10px;
`;

export const btnBox = css`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    padding: 10px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #4d4d4d;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const clearVoteBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #eee;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1E4DD9;
`;
import { css } from '@emotion/react';

export const fullBox = css`
  height: 80%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const innerBox = css`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > .naver {
    &:hover{
      background-color: #01C73C;
      border: 1px solid #01C73C;
    }
  }

  > .kakao {
    &:hover{
      background-color: #FDDC3F;
      border: 1px solid #FDDC3F;
    }
  }
`;

export const topInput = (hasError: boolean) => css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-radius: 5px 5px 0 0 ;
  border: 1px solid ${hasError ? "#E50914" : "#ccc"};

  &:focus {
    outline: none;
    border: 1px solid ${hasError ? "#E50914" : "#ccc"};
    z-index: 1;
    transition: border 0.5s ease;
  }
`;

export const bottomInput = (hasError: boolean) => css`
  width: 60%;
  height: 40px;
  font-size: 17px;
  padding-left: 10px;
  border-radius: 0 0 5px 5px;
  border: 1px solid ${hasError ? "#E50914" : "#ccc"};
  border-top:  1px solid ${hasError ? "#E50914" : "#fff"};
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-top: 1px solid ${hasError ? "#E50914" : "#fff"};;
    border: 1px solid ${hasError ? "#E50914" : "#ccc"};
    z-index: 1;
    transition: border 0.5s ease;
  }
`;


export const signInBtn = css`
  width: 63%;
  margin-top: 50px;
  font-size: 17px;
  border-radius: 5px;
  border: none;
  padding: 10px 10px;
  background-color: #4b4b4b;
  color: #fff;
  cursor: pointer;
  &:hover, :active{
    background-color: #1a1a1a;
    border: none;
    outline: none;
  }
`;

export const linkBox = css`
  margin-top: 25px;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const linkText = css`
  font-size: 14px;
  font-style: none;
  text-decoration: none;
  color: #bbb;
  &:hover {
    text-decoration: underline;
  }
`;

export const img = css`
  height: 100%;
  width: 100%;
`;



export const errorMessage = css`
  color: #f44336;
  font-size: 16px;
  margin: 0;
`;

export const anotherSignInBox = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #aaa;
  width: 63%;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;

  > div:nth-child(2) p {
    font-size: 14px; 
    color: #2C3E50;      
    padding-left: 10px;
    font-weight: bold;
  }

  &:hover {
    > div:nth-child(2) p {
      color: #fff;
    }

    > div:nth-child(1) {
      border: none;
    }
  }
`;

export const anotherLogoBox = css`
  border-right: 1px solid #aaa;
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  .naver{
    width: 35px;
    height: 30px;
  }

  .kakao{
    width: 30px;
    height: 30px;
  }
`;

export const logoImg = css`
  width: 30px;
  height: 30px;
`;

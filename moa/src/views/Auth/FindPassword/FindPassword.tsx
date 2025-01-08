/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import * as logo from "../../../styles/LogoStyle";
import { useNavigate } from 'react-router-dom';
import logoImg from "../../../images/moaLogo.png";
import axios from 'axios';

type findPasswordDto = {
  userId: string;
  userName: string;
  email: string;
}

export default function FindPassword() {
  const [ findPasswordData, setFindPasswordData ] = useState<findPasswordDto>({
    userId: "",
    userName: "",
    email: ""
  });

  const [ sendMailErrorMs, setSendMailErrorMs ] = useState<string>("");
  const [ sendMailError, setSendMailError ] = useState<boolean>(false);
  const [ hasSendMail, setHasSendMail ] = useState<boolean>(false);
  const [ isButtonDisabled, setIsButtonDisabled ] = useState<boolean>(false);

  const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const element = e.target;
  
      setFindPasswordData({
        ...findPasswordData,
        [element.name]: element.value,
      });
    };

    useEffect(() => {
      const handleStorageEvent = (event: StorageEvent) => {
        if (event.key === "PasswordResetTokenDeleted") {
          navigate("/signIn"); // 원하는 경로로 페이지 전환
        }
      };
    
      window.addEventListener("storage", handleStorageEvent);
    
      return () => {
        window.removeEventListener("storage", handleStorageEvent);
      };
    }, [navigate]);

    const handleSendEmail = async (
      e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      e.preventDefault();
    
      if(!isButtonDisabled) {
        try {
          setIsButtonDisabled(true);
          const response = await axios.post('http://localhost:8081/api/v1/mail/send', findPasswordData);
          if (!!response.data.result) {
            setHasSendMail(true);
          }
        } catch (error) {
          console.error(error);
          setSendMailError(true)
          setSendMailErrorMs("메일 전송 실패 입력 정보를 확인해주세요")
        } finally {
          setIsButtonDisabled(false);
        }
      }
    };


    

    return (
      <div css={s.fullBox}>
        <div css={s.innerBox}>
          <div css={logo.logoBox} onClick={() => navigate("/main")}>
            <img src={logoImg} alt="로고" css={logo.logo} />
          </div>
    
          {!hasSendMail ? (
            <>
              <div css={s.mainBox}>
                <h1>비밀번호 찾기</h1>
                <input
                  type="text"
                  placeholder="아이디"
                  name="userId"
                  value={findPasswordData.userId}
                  css={s.topInput}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="성명"
                  name="userName"
                  value={findPasswordData.userName}
                  css={s.middleInput}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  placeholder="인증 이메일"
                  name="email"
                  value={findPasswordData.email}
                  css={s.bottomInput}
                  onChange={handleInputChange}
                />
                {sendMailError && <p css={s.errorMessage}>{sendMailErrorMs}</p>}
              </div>
    
              <div css={s.bottomBox}>
                <button onClick={handleSendEmail} disabled={isButtonDisabled}>
                  {isButtonDisabled ? "메일 전송 중..." : "메일 인증"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div css={s.mailBox}>
                <h2>이메일 전송 완료</h2>
                <h2>링크를 확인해주세요.</h2>
              </div>
            </>
          )}
        </div>
      </div>
    );
    
}

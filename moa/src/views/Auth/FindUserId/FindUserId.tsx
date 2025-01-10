/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import Img from "../../../images/moaLogo.png" 

function FindUserId() {
  const [formData, setFormData] = useState({
    userName: "",
    userBirthDate: "",
    email: ""
  });

  const navigator = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setFormData({ ...formData, [element.name]: element.value });
  };

  const handleNavigator = (e:React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if("key" in e && e.key !== "Enter") return;
    if (!formData.userName || !formData.userBirthDate) {
      alert("이름, 휴대폰번호, 이메일을 입력해주세요");
    } else {
      navigator(`findUserId/${formData.userName}/${formData.userBirthDate}`);
    }
  };

  return (
    <div css={s.findUserIdContainer}>
      <h4 css={s.findUserIdTitle}>아이디 찾기</h4>
      <div css={s.inputBox}>
        <img src={Img} alt="img" css={s.findUserIdImg}/>
        <form onSubmit={(e) => e.preventDefault()} css={s.findUserIdForm}>
          <input
            css={s.findUserIdInput1}
            type="text"
            onChange={handleChange}
            name="userName"
            value={formData.userName}
            placeholder="이름을 입력해주세요."
            onKeyDown={handleNavigator}
          />
          <input
            css={s.findUserIdInput2}
            type="text"
            onChange={handleChange}
            name="userBirthDate"
            value={formData.userBirthDate}
            placeholder="휴대폰번호를 입력해주세요."
            onKeyDown={handleNavigator}
          />
          <button css={s.findUserIdBtn} onClick={handleNavigator}>
            아이디찾기
          </button>
        </form>
      </div>
    </div>
  );
}

export default FindUserId;

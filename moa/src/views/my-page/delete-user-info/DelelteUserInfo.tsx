import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { DELETE_USER_INFO_API } from "../../../apis";

function DeleteUserInfo() {
  const [passwordValue, setPasswordValue] = useState({ password: "" });
  const [cookies] = useCookies(["token", "password", "isChecked"]);
  const navigator = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteFetchData = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    if (passwordValue.password === null) {
      alert("비밀번호를 입력해주세요.");
    }

    if (cookies.token) {
      try {
        const comfirmed = window.confirm("탈퇴 하시겠습니까?");
        if (!comfirmed) return;

        const response = await axios.delete(DELETE_USER_INFO_API, {
          data: { password: passwordValue.password },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });

        if (response.data.data === null) {
          alert("탈퇴가 완료되었습니다.");
          navigator("/");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          document.cookie = "token=; Max-Age=0; path=/;";
        } else {
          alert("응답 데이터가 올바르지 않습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("탈퇴 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="withdrawalPage">
      {cookies.isChecked ? (
        <div className="confirmationSection">
          <h4 className="sectionTitle">탈퇴 본인 확인</h4>
          <input
            className="passwordInput"
            type="password"
            placeholder="비밀번호를 입력해주주세요."
            name="password"
            value={passwordValue.password}
            onChange={handlePasswordChange}
            onKeyDown={handleDeleteFetchData}
          />
          <button className="withdrawalButton" onClick={handleDeleteFetchData}>
            탈퇴하기
          </button>
        </div>
      ) : (
        <div className="errorSection">
          <p className="errorMessage">
            잘못된 접근방법입니다. 홈화면으로 페이지로 이동하세요.
          </p>
          <button className="redirectButton" onClick={() => navigator("/main")}>
            홈으로 이동
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteUserInfo;

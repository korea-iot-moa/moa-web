import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../types';

function DelelteUserInfo () {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [passwordValue, setPasswordValue] = useState({password:''});
  const [cookies] = useCookies(['token', 'isChecked']);
  const navigator = useNavigate();
  
  const fetchData = async() => {
    console.log(passwordValue.password);
    if(cookies.token) {
      try{
          const response = await axios.delete(`http://localhost:8081/api/v1/users/user`,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
              data: { password: passwordValue.password },
            });
          setUserInfo(response.data.data);
      } catch(error) {
        console.error("데이터 로딩중 오류 발생");
      }
    } 
  }
  console.log(cookies.isChecked);
  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDeleteUserInfo = async() => {
    const confirmed = window.confirm("탈퇴 하시겠습니까?");
    if (confirmed) {
      await fetchData(); // 서버에 탈퇴 요청
      navigator('/');    // 홈 페이지로 이동
    }
  }

  return (
    <div>
      { cookies.isChecked &&
      <div>
      <h4>탈퇴 본인 확인</h4><input
          type="password"
          placeholder='비밀번호를 입력하세요.'
          name='password'
          value={passwordValue.password}
          onChange={handlePasswordChange} /><button onClick={handleDeleteUserInfo}>탈퇴하기기</button>
      </div>
      }

      { !cookies.isChecked && 
      <div>
        <p>잘못된 접근방법입니다. 회원 탈퇴 확인 페이지로 이동하세요.</p>
        <button onClick={() => navigator('/mypage/MembershipWithdrawal')}>탈퇴확인 페이지로 이동</button>
      </div>
      }
    </div>
  )
}

export default DelelteUserInfo
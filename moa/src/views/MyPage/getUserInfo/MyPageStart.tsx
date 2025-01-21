import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './style.css'
import axios from 'axios';

function MyPageStart() {
  const navigator = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [formData, setFormData] = useState({password: ''});
  const [result, setResult] = useState<boolean>();
  const [errorMg, setErrorMg] = useState<String>('');
  const [appearMg, setAppearMg] = useState<boolean>(false);

  const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setFormData({...formData, [element.name]: element.value });
  }

  const fetchData = async () => {
      if (!cookies.token) {
        navigator('/main/signIn');
      }
      try {
        const response = await axios.post(`http://localhost:8081/api/v1/users/isPassword`, formData, 
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        const isPasswordValue = response.data.data;
        setResult(isPasswordValue);

        if (isPasswordValue === true) {
          navigator(`/mypage/userInfo/user/${isPasswordValue}`);
        } else {
          setErrorMg("비밀번호를 다시 입력해주세요");
          setAppearMg(true);
        }
      } catch (error) {
        console.error(error);
      }

  }

  const handleButtonGetInfo = (e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLInputElement>) => {
    if("key" in e && e.key !== "Enter") return;
    if(!formData.password){
      alert('비밀번호를 입력해주세요.');
      navigator('/mypage/userInfo');
    } 
      fetchData()
  }
  
  const handleButtonDeleteInfo = () => {
    navigator('/mypage/userInfo/MembershipWithdrawal');
  };
  

  return (
    <div>  

      <h4 className="mypageTitle">마이페이지</h4>
      <div className='mypageBox'>
        <h4 className='mypagesubTitle'>비밀번호 인증 후 내 정보 수정이 가능합니다.</h4>
        <div className='passowordBox'>
          <h4 className='mypagesubTitle'>비밀번호를 입력해주세요.</h4>
          <input type="password" 
          className='passwordCheckInput'
          name='password' 
          value= {formData.password || ""}
          placeholder='비밀번호를 입력해주세요'
          onChange={handleChangePassword}
          onKeyDown={handleButtonGetInfo}
          />
          <span className='errorMassage'>{ appearMg ? errorMg : '' }</span>
          <button className='infoUpdateBtn' onClick={handleButtonGetInfo}>내 정보 수정</button>
        </div>
        <button className='deleteUserIdBtn' onClick={handleButtonDeleteInfo}>회원탈퇴</button>
      </div>
    </div>
  )
}

export default MyPageStart
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserInfoStore from '../../../../stores/userInfo.store';
import { useCookies } from 'react-cookie';
import './style.css'

function MyPageStart() {
  const navigator = useNavigate();
  const passwordValue = useUserInfoStore((state) => state.passwordValue);
  const setPasswordValue = useUserInfoStore((state) => state.setPasswordValue);
  const [cookies, setCookies] = useCookies(['password']);

  useEffect(() => {
    if (cookies.password) {
      setPasswordValue({ password: cookies.password });
    }
  }, [cookies.password, setPasswordValue]);

  const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newPassword =e.target.value;
    setPasswordValue({ password: newPassword });
    setCookies('password', newPassword, {
      path:'/',
      maxAge:3600,
    });
  }

  const handleButtonGetInfo = () => {
    if(!passwordValue.password){
      alert('비밀번호를 입력해주세요.');
    }
    navigator('/mypage/userInfo');
  }
  
  const handleButtonDeleteInfo = () => {
    navigator('/mypage/MembershipWithdrawal');
  };
  

  return (
    <div>
      <h4 className="mypageTitle">마이페이지</h4>
      <div className='mypageBox'>
        <h4 className='mypagesubTitle'>비밀번호 인증 후 내 정보 수정이 가능합니다.</h4>
        <div className='passowordBox'>
          <h4 className='mypagesubTitle'>비밀번호를 입력해주세요.</h4>
          <input type="password" 
          className='passwordInput'
          name='password' 
          value={passwordValue.password || ''} 
          placeholder='비밀번호를 입력해주세요'
          onChange={handleChangePassword}
          />
          <button className='infoUpdateBtn' onClick={handleButtonGetInfo}>내 정보 수정</button>
        </div>
        <button className='deleteUserIdBtn' onClick={handleButtonDeleteInfo}>회원탈퇴</button>
      </div>
    </div>
  )
}

export default MyPageStart
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserInfoStore from '../../../../stores/userInfo.store';
import { useCookies } from 'react-cookie';
import './style.css'

function MyPageStart() {
  const navigator = useNavigate();
  const passwordValue = useUserInfoStore((state) => state.passwordValue);
  const setPasswordValue = useUserInfoStore((state) => state.setPasswordValue);
  const errorMg = useUserInfoStore((state) => state.errorMg);
  const [cookies, setCookies] = useCookies(['password']);

  const handleChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newPassword =e.target.value;
    setCookies('password', newPassword, {
      path:'/mypage/userInfo/user',
      maxAge:360,
    });
  }

  const handleButtonGetInfo = () => {
    if(!cookies.password){
      alert('비밀번호를 입력해주세요.');
      navigator('/mypage/userInfo');
    } else {
      navigator('/mypage/userInfo/user');
    }
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
          value={cookies.password || ''} 
          placeholder='비밀번호를 입력해주세요'
          onChange={handleChangePassword}
          />
          <span className='errorMassage'>{errorMg}</span>
          <button className='infoUpdateBtn' onClick={handleButtonGetInfo}>내 정보 수정</button>
        </div>
        <button className='deleteUserIdBtn' onClick={handleButtonDeleteInfo}>회원탈퇴</button>
      </div>
    </div>
  )
}

export default MyPageStart
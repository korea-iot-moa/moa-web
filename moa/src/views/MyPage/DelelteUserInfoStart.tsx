import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function DelelteUserInfoStart() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(['token', 'isChecked']);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (cookies.isChecked) {
      setIsChecked(cookies.isChecked);
    }
  }, [cookies.isChecked]);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }
  
  const handleNext = () => {
    if(!isChecked) {
      alert('확인란에 체크를 해주세요.');
    } else {
      navigate('/mypage/MembershipWithdrawal/enter');
      setCookies('isChecked', isChecked, { path: '/mypage/MembershipWithdrawal/enter', maxAge: 360})
    }
  }

  return (
    <div>
      {cookies.token ? 
      <div>
        <h4>회원탈퇴 확인</h4>
        <ul>
          <li>회원 탈퇴 후 계정 및 데이터는 복구가 불가능합니다.</li>
          <li>탈퇴 시 저장된 개인정보와 이용 기록은 모두 삭제됩니다.</li>
          <li>탈퇴 전에 신청한 모임 예약 및 참여 기록은 자동 취소 처리됩니다.</li>
          <li>탈퇴 후에는 회원 전용 서비스와 콘텐츠 이용이 제한됩니다.</li>
          <li>모임 참여 이력 및 리뷰 기록은 삭제되며 복구가 불가능합니다.</li>
          <li>탈퇴 요청 완료 후에는 철회가 불가능하니 신중하게 결정해주셔야합니다.</li>
          <li>가입 상태에서 부여된 특별 권한(관리자, 모임 주최자 등)이 상실됩니다.</li>
        </ul>
        <p>탈퇴시 주의사항 확인여부</p>
        <form action="">
        <input type="checkbox" checked={isChecked} onChange={handleCheckChange} />
        <label htmlFor="">네, 동의합니다.</label>
        </form>
        <button onClick={handleNext}>다음 페이지로 이동하기기</button>
      </div>
      :
      <div>
        <p>잘못된 접근방법입니다. 회원 탈퇴 확인 페이지로 이동하세요.</p>
        <button onClick={() => navigate('/signIn')}>로그인 이동</button>
      </div>
      }
    </div>
  )
}

export default DelelteUserInfoStart
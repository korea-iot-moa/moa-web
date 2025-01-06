import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FindUserId() {
  const [formData, setFormData] = useState({
    userName: "",
    userBirthDate: "",
  }) 
  const navigator = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target
    setFormData({...formData, [element.name]:element.value});
  }

  
  const handleNavigator = () => {
    
    if(!formData.userName || !formData.userBirthDate) {
      alert('이름 혹은 생일은 입력해주세요')
    } else {
      navigator(`findUserId/${formData.userName}/${formData.userBirthDate}`);
    }
  }
  
  return (
    <div>
      <h4>아이디 찾기</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="userName">이름</label>
      <input type="text" onChange={handleChange} name='userName' value={formData.userName} placeholder='이름을 입력해주세요.'/>
      <label htmlFor="birthDate">생년월일</label>
      <input type="text" onChange={handleChange} name='userBirthDate' value={formData.userBirthDate} placeholder='YYYYMMDD'/>
      </form>
      <button onClick={handleNavigator}>아이디찾기</button>
    </div>
  )
}

export default FindUserId;


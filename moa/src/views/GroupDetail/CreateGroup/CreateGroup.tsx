import React, { useEffect, useState } from 'react'
import { PostGroupResonseDto } from '../../../types/dto/response.dto'
import { useNavigate } from 'react-router-dom';



export default function CreateGroup() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    groupType: "",
    groupCategory: "",
    groupDate: "",
    meetingType: "",
    groupAddress: ""
  });


  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };


  const handleNext = () => {
    navigate('/main/create-group_1/:groupId',{
      state: {formData}
    }
  )};

  
  const handleCancel = () => {
    navigate("");
  }


  return (
    <div>
    <div>
      <strong><h2>모임 유형</h2></strong>
      <button onClick={() => handleInputChange("groupType", "단기모임")}>단기 모임</button>
      <button onClick={() => handleInputChange("groupType", "정기 모임")}>정기 모임</button>
    </div>
    <div>
      <strong><h2>모임 카테고리</h2></strong>
      <button onClick={() => handleInputChange("groupCategory", "취미")}>취미</button>
      <button onClick={() => handleInputChange("groupCategory", "문화_예술")}>문화_예술</button>
      <button onClick={() => handleInputChange("groupCategory", "스포츠_운동")}>스포츠_운동</button>
      <button onClick={() => handleInputChange("groupCategory", "푸드_맛집")}>푸드_맛집</button>
      <button onClick={() => handleInputChange("groupCategory", "자기개발")}>자기계발</button>
      <button onClick={() => handleInputChange("groupCategory", "여행")}>여행</button>
      <button onClick={() => handleInputChange("groupCategory", "힐링")}>힐링</button>
    </div>
    <div>
      <strong><h2>모임 날짜</h2></strong>
      <input 
        type='date'
        value={formData.groupDate}
        onChange={(e) => handleInputChange("groupDate", e.target.value)} 
      />
    </div>
    <div>
      <strong><h2>모임 장소</h2></strong>
      <button onClick={() => handleInputChange("meetingType", "온라인")}>온라인</button>
      <button onClick={() => handleInputChange("meetingType", "오프라인")}>오프라인</button>
    </div>
    <div>
      <strong><h2>모임 주소</h2></strong>
      <input 
        type='text' 
        value={formData.groupAddress}
        onChange={(e) => handleInputChange("groupAddress", e.target.value)} 
      />
    </div>
    <div>
      <button onClick={handleCancel}>취소</button>
      <button onClick={handleNext}>다음</button>
    </div>
  </div>
  )
}

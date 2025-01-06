import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PostGroupResonseDto } from '../../../types/dto/response.dto';
import { PostGroupRequestDto } from '../../../types/dto/request.dto';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { GroupCategory, GroupType, MeetingType } from '../../../types';

interface CreateGroup_1 {
  parseToNumGroupId: number;
}

const CreateGroup_1:React.FC<CreateGroup_1> = ({parseToNumGroupId}) => {
  const[groupTypes,setGroupTypes] = useState([])
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const location  = useLocation();
  const {formData} = location.state || {}
  const [formDetails, setFormDetails] = useState({
    groupTitle: '',
    groupContent: '',
    groupSupplies: '',
    groupQuestion: '',
  });
  
  


  const handleNext = () => {
    navigate('');
    alert('모임이 등록되었습니다.');
  };
  console.log(formData);
  const handlePrevePage = () => {
    navigate('/main/create-group');
  }
  const handleInputChange = (field: string, value: string) => {
    setFormDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //모임 생성
  const handlePostGroup = async() => {
    const postGroupRequestDto ={
      groupTitle : formDetails.groupTitle ,
      groupContent : formDetails.groupContent,
      // groupImage : imgFile,
      groupSupplies : formDetails.groupSupplies,
      groupQuestion : formDetails.groupQuestion,
      groupAddress: formData.groupAddress ,
      groupDate: formData.groupDate,
      groupCategory: formData.groupCategory,
      groupType: formData.groupType,
      meetingType:formData.meetingType
    };
    const url = `http://localhost:8080/api/v1/meeting-group`;
    if (cookies.token) {
      try {
        
        const response = await axios.post(url, postGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,  
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setGroupTypes(responseData); 
        console.log(responseData)
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handleUpdateGroup = async() => {
    const putGroupRequestDto ={
      groupTitle : formDetails.groupTitle ,
      groupContent : formDetails.groupContent,
      // groupImage : imgFile,
      groupSupplies : formDetails.groupSupplies,
      groupQuestion : formDetails.groupQuestion,
      groupAddress: formData.groupAddress ,
      groupDate: formData.groupDate,
      groupCategory: formData.groupCategory,
      groupType: formData.groupType,
      meetingType:formData.meetingType
    };
    const url = `http://localhost:8080/api/v1/meeting-group/${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        
        const response = await axios.put(url, putGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,  
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setGroupTypes(responseData); 
        console.log(responseData)
      } catch (error) {
        console.error(error);
      }
    }
  }


  
  return (
    <div>
        <strong><h2>모임 게시물</h2></strong>
      <div>
        <strong><h2>제목</h2></strong>
        <input type='text'
        value={formDetails.groupTitle}
        onChange={(e) => handleInputChange('groupTitle',e.target.value)}/>
      </div>
      <div>
        <strong><h2>내용</h2></strong>
        <input type='text' 
        value={formDetails.groupContent}
        onChange={(e) => handleInputChange('groupContent',e.target.value)}/>
      </div>
      <div>
        <strong><h2>준비물</h2></strong>
        <input type='text' 
        value={formDetails.groupSupplies}
        onChange={(e) => handleInputChange('groupSupplies',e.target.value)}/>
      </div>
      <div>
        <strong><h2>질문</h2></strong>
        <input type='text' 
        value={formDetails.groupQuestion}
        onChange={(e) => handleInputChange('groupQuestion',e.target.value)}/>
      </div>
      <div>
      <button onClick={handlePrevePage}>이전</button>
      <button onClick={() => handlePostGroup()}>완료</button>
      <button onClick={() => handleUpdateGroup()}>수정</button>
      </div>
    </div>
  )
}
export default CreateGroup_1;
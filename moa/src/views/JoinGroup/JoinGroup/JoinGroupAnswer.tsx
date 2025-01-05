import React, { useState } from 'react'
import {UserAnswer } from '../../../types'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useGroupStore from '../../../stores/group.store';
import { useParams } from 'react-router-dom';

const JoinGroupAnswer = () => {
const [groupAnswer, setGroupAnswer] = useState<UserAnswer>();
const groupData = useGroupStore((state) => state.groupData); 
const [cookies, setCookies] = useCookies(['token', 'groupId']);
const [loading, setloading] = useState<boolean>(false);
const { groupId } = useParams<{ groupId: string }>();
const numericGroupId = Number(groupId);
  
const stateGroupQuestion = () => {
  
}

const fetchData = async() => {
  if(cookies.token) {
    try{
      const response = await axios.post(`http://localhost:8081/api/v1/user-answers/${groupData?.groupId}`);
      setGroupAnswer(response.data.data);
    } catch(error) {
      console.error("데이터 로딩중 오류 발생");
    }
  }
}

const handleUserAnswerChange = () => {
  
}

  return (
    <div>
      <h4>모임참여신청</h4>
      <ul>
        <li>질문</li>
        <li>{groupData?.groupQuestion}</li>
        <li>답변</li>
        <li>
          <input 
          type="text" 
          name='userAnswer' 
          value={groupAnswer?.userAnswer}
          onChange={handleUserAnswerChange} 
          />
        </li>
      </ul>
    </div>
  )
}

export default JoinGroupAnswer
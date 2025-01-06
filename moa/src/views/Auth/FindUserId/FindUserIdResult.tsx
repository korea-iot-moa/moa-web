import React, { useEffect, useState } from 'react'
import { User } from '../../../types'
import { useParams } from 'react-router-dom'
import axios from 'axios';


function FindUserIdResult() {
  const { userName, userBirthDate }= useParams<{userName:string; userBirthDate:string}>();
  const [result, setResult] = useState<User | null>(null);

  const fetchData = async() => {     
    try {
      const resoponse = await axios.get(`http://localhost:8081/api/v1/auth/userId`,
        {
          params : { userName, userBirthDate },
        });
        setResult(resoponse.data.data);
    } catch (error){
      console.error('데이터 로딩중 오류: ', error);
    }
  } 

  useEffect(() => {
    fetchData()
  }, []);
  
  const hideUserId = (id:string | undefined) =>{
    const sliceId = id?.slice(0, -4);
    const changeId = "*".repeat(4);
    return sliceId + changeId;
  }
  
  const changeUserId = hideUserId(result?.userId);
  return (
    <div>
      <ul>
        <li>{result?.userName}님의 아이디는</li>
        <li><p>{changeUserId}</p></li>
      </ul>
    </div>
  )
}

export default FindUserIdResult
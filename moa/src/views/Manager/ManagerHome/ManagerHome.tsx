import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { GetUserListResponseDto } from '../../../types/dto/response.dto';
import Modal from '../Modal/modal';

interface ManagerHomeProps {
  parseToNumGroupId: number;
}


const ManagerHome: React.FC<ManagerHomeProps> = ({parseToNumGroupId}) => {
  console.log(parseToNumGroupId);
  const [userList,setUserList] = useState<GetUserListResponseDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<GetUserListResponseDto | null>(null);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);
  const  [additionalCount, setadditionalCount] =useState(0);
  useEffect(() => {
  fetchUserList();   
  },[groupId ,cookies.token]);

  useEffect(() => {
  setadditionalCount(userList.length + additionalCount); 
  }, [userList, additionalCount]);


  const openModal = (user: GetUserListResponseDto) => {
    setSelectedUser(user);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedUser(null);
  };
  

const fetchUserList = async() => {
  if(cookies.token){
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/user-list/${parseToNumGroupId}`,{
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      const responseData = response.data.data; 
      setUserList(responseData);
      console.log(responseData)
    }catch(error){
      console.error(error);
    } 
  }
};

if (userList.length === 0) {
  return <p>No users found.</p>;
}
  return (
    <div>
      <div>총 인원수 : {userList.length}</div>
      {userList.map((data) => (
        <div key={data.nickName}>
          <img src={data.profileImage} alt="프로필"/>
           {data.nickName}
           <button onClick={() => (data.nickName)}>등급</button>
           <button onClick={() => (data.nickName)}>탈퇴</button>
        </div>
          ))}
    </div>
  )
}


export default ManagerHome;
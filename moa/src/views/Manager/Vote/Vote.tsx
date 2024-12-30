import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

interface VoteProps {
  parseToNumGroupId : number;
}


const Vote: React.FC<VoteProps> = ({parseToNumGroupId}) => {
  const [userList,setUserList] =useState(0);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
  fetchUserList();
  fetchVoteResult();   
},[groupId ,cookies.token]);

const fetchUserList = async() => {
  if(cookies.token){
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/votes/${parseToNumGroupId}`,{
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      const responseData = response.data.data; 
      setUserList(responseData)
      console.log(responseData);
    }catch(error){
      console.error(error);
    }
  }
};
const fetchVoteResult = async() => {
  if(cookies.token){
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/votes/${parseToNumGroupId}`,{
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      const responseData = response.data.data; 
      setUserList(responseData)
      console.log(responseData);
    }catch(error){
      console.error(error);
    }
  }
};

  return (
    <div>
      
    </div>
  )
}
export default Vote;
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

export default function ManagerHome() {
  const [userList,setUserList] =useState(0);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchUserList = async() => {
    if(cookies.token){
      try{
        const response = await axios.get(`http://localhost:8080/api/v1/user-list/${groupId}`,{
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
      }catch(error){
        console.error(error);
      } 
    }else{
      
    }
  };
},[]);

  return (
    <div>
      <div>
        <div></div>
      </div>
      <div >
        
      </div>
    </div>
  )
}



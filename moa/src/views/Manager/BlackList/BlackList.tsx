import React, { useEffect, useState } from "react";
import Manager from "../index";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BlackListPageResponseDto } from "../../../types/dto/response.dto";

interface BlackListProps {
  parseToNumGroupId: number;
}

const BlackList: React.FC<BlackListProps> = ({ parseToNumGroupId }) => {
  const [blackUserList, setBlackUserList] = useState<BlackListPageResponseDto[]>([]);
  const { groupId} = useParams();
  const [cookies] = useCookies(["token"]);
  
  useEffect(() => {
    fetchBlackList();
  }, [parseToNumGroupId, cookies.token]);

  const fetchBlackList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/black-list/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        //
        const responseData = response.data.data.map((item: any, index: number) => ({
          ...item,
          blackListId: index+1
        }));
        setBlackUserList(responseData);
        console.log("transformed Data : "+ responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteBlackList = async(blackListId : number) => {
    const url  =  `http://localhost:8080/api/v1/black-list/${blackListId}`;

    if (cookies.token) {
      try {
        const response = await axios.delete(url,{
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        console.log(responseData);
        await fetchBlackList(); 
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div>총 인원수 : {blackUserList.length}</div>
      <ul>
        {blackUserList.map((data) => (
          <li key={data.blackListId}>
            {data.profileImage && (
              <img src={data.profileImage} alt="신고에 관한 사진 :  " />
            )}
            <strong>{ data.nickName}  --- </strong>
            <strong>{ data.userLevel}</strong>
            <button onClick={() => {
              handleDeleteBlackList(data.blackListId)}}>
              해제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlackList;

/** @jsxImportSource @emotion/react */
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetUserListResponseDto,
  PostUserLevelResponse,
  PutUserLevelReponseDto,
} from "../../../types/dto/response.dto";
import ReactModal from "react-modal";
import { closeModalButton, modalContent, openModalButton } from "./style";
import { UserList } from "../../../types";
import { PostUserLevelRequestDto } from "../../../types/dto/request.dto";

interface ManagerHomeProps {
  parseToNumGroupId: number;
}

ReactModal.setAppElement('#root')
const ManagerHome: React.FC<ManagerHomeProps> = ({ parseToNumGroupId }) => {
  const [userList, setUserList] = useState<GetUserListResponseDto[]>([]);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<"일반회원"| "우수회원">("일반회원");
  useEffect(() => {
    fetchUserList();
  }, [groupId, cookies.token]);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleNextMeetingPage = () => {
    navigate('/main/create-group')
};
  

  const fetchUserList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user-list/${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setUserList(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //등급 수정 
  const handleUserLevel = async(userId:string) => {
    const putUserLevelRequestDto: PostUserLevelRequestDto ={
      userId :userId,
      userLevel: selectedLevel
    }
  
    const url = `http://localhost:8080/api/v1/user-list/userLevel/${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        const reponse = await axios.put(url,putUserLevelRequestDto,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setUserList((prevList) => 
          prevList.map((user) => user.userId === userId 
        ? { ...user, userLevel: 
          reponse.data.data.userLevel
         } : user ) 
      ); 
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  //유저 추방
  const handleDeleteUser = async (userId: string) => {
    if (cookies.token) {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/user-list/van/${parseToNumGroupId}?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setUserList((userList) =>
          Array.isArray(userList)
            ? userList.filter((item) => item.userId !== userId)
            : []
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  //모임 삭제
  const handleDeleteGroup = async() => {
    const url  = `http://localhost:8080/api/v1/meeting-group/${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        await axios.delete(url,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
     
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (userList.length === 0) {
    return <p>No users found.</p>;
  }


  return (
    <div>
      <div>총 인원수 : {userList.length}</div>
      {userList.map((data) => (
        <div key={data.nickName} style={{ position: "relative" }}>
          <img src={data.profileImage} alt="프로필" />
          {data.nickName} - - -
          {typeof data.userLevel === "string"
            ? data.userLevel
            : "Unknown Level"}
          <button onClick={openModal} css={openModalButton}>
            등급
          </button>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="modalOverlay"
            css={modalContent}
          >
            <h2>등급 수정</h2>
            <p>
              일반회원 <input type="radio" name="userLevel" value="일반회원" 
              onChange={(e)=> setSelectedLevel(e.target.value  as "일반회원"|"우수회원")}/>
            </p>
            <p>
              우수회원 <input type="radio" name="userLevel" value="우수회원" 
               onChange={(e)=> setSelectedLevel(e.target.value as "일반회원"|"우수회원")}/>
            </p>
            <button onClick={() => handleUserLevel(data.userId)} css={closeModalButton}>
              변경
            </button>
            <button onClick={closeModal} css={closeModalButton}>
              닫기
            </button>
          </ReactModal>
          <button onClick={() => handleDeleteUser(data.userId)}>탈퇴</button>
        </div>
      ))}
      <div>
        <button onClick={() => handleNextMeetingPage() }>모임 수정</button>
        <button onClick={() => handleDeleteGroup()}>모임 삭제</button>
      </div>
    </div>
  );
};

export default ManagerHome;

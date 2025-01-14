/** @jsxImportSource @emotion/react */
import * as s from "./style"; 
import React, { useEffect, useState } from "react";
import Manager from "../index";
import axios from "axios";
import userImg from "../../../images/userImg.png";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BlackListPageResponseDto } from "../../../types/dto/response.dto";
import ReactModal from "react-modal";
import { closeModalButton, modalContent, userImgBox } from "../ManagerHome/style";
import { input } from "../../Auth/SignUp/style";

interface BlackListProps {
  parseToNumGroupId: number;
}

const BlackList: React.FC<BlackListProps> = ({ parseToNumGroupId }) => {
  const [blackUserList, setBlackUserList] = useState<
    BlackListPageResponseDto[]
  >([]);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputUserId, setInputUserId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"일반회원" | "우수회원"|"관리자">("관리자");


  useEffect(() => {
    fetchBlackList();
  }, [parseToNumGroupId, cookies.token]);

  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setInputUserId(""); 
  };
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
        const responseData = response.data.data.map(
          (item: any, index: number) => ({
            ...item,
            blackListId: index + 1,
          })
        );
        setBlackUserList(responseData);
        console.log("transformed Data : " + responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostBlackList = async () => {
    if (!inputUserId.trim()) {
      alert("사용자 ID를 입력해주세요.");
      return;
    }
    // if(selectedLevel === "관리자") {
    //   alert("관리자는 블랙리스트에 추가할 수 없습니다.");
    //   return;
    // }
    
    const url = `http://localhost:8080/api/v1/black-list/${parseToNumGroupId}`;

    if (cookies.token) {
      try {
        const response = await axios.post(url, {userId: inputUserId}, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        console.log(responseData);
        await fetchBlackList();
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteBlackList = async (blackListId: number) => {
    const url = `http://localhost:8080/api/v1/black-list/${blackListId}`;

    if (cookies.token) {

      try {
         await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        setBlackUserList((prevList) => prevList.filter((item) => item.blackListId !== blackListId));
        await fetchBlackList();
        alert("삭제 되었습니다")
      } catch (error) {
        console.error(error);
        alert("블랙리스트 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div css={s.fullBox}>
      <button css={s.Botton} onClick={openModal}>블랙리스트 추가</button>
      <div>총 인원수 : {blackUserList.length}</div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modalOverlay"
        css={modalContent}
      >
        <h3>블랙 리스트 등록</h3>
        <p>
          사용자 ID {" "}
          <input
            type="text"
            name="userId"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
          />
        </p>
        <button
          onClick={handlePostBlackList}
          css={closeModalButton}
        >
          등록
        </button>
        <button onClick={closeModal} css={closeModalButton}>
          닫기
        </button>
      </ReactModal>
      <ul>
        {blackUserList.map((data) => (
          <li key={data.blackListId}>
           <div>
          <div css={s.userImgBox}>
            {!data.profileImage ? (
              <img src={userImg} alt="userImage" css={s.userImg} />
            ) : (
              <img src={"http://localhost:8080/image/" + data.profileImage} alt="profileImage" css={s.userImg} />
            )}
            </div>
          </div>
            <strong>{data.nickName} --- </strong>
            <strong>{data.userLevel}</strong>
            <button
              css={s.Botton}
              onClick={() => {
                handleDeleteBlackList(data.blackListId);
              }}
            >
              해제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlackList;

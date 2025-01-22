/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactModal from "react-modal";
import userImg from "../../../images/userImg.png";
import {
  MANGE_HOME_DELTE_API,
  MANGE_HOME_GET_API,
  MANGE_HOME_PUT_API,
} from "../../../apis";
import { GetUserListResponseDto } from "../../../types/dto/response.dto";

interface ManagerHomeProps {
  parseToNumGroupId: number;
}

ReactModal.setAppElement("#root");

const ManagerHome: React.FC<ManagerHomeProps> = ({ parseToNumGroupId }) => {
  const [userList, setUserList] = useState<GetUserListResponseDto[]>([]);
  const [cookies] = useCookies(["token", "userId"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<"일반회원" | "우수회원">(
    "일반회원"
  );
  const [selectedUser, setSelectedUser] =
    useState<GetUserListResponseDto | null>(null);

  useEffect(() => {
    fetchUserList();
  }, [cookies.token]);

  const openModal = (user: GetUserListResponseDto) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `${MANGE_HOME_GET_API}${parseToNumGroupId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      setUserList(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLevel = async () => {
    if (!selectedUser || !cookies.token) return;

    const putUserLevelRequestDto = {
      userId: selectedUser.userId,
      userLevel: selectedLevel,
    };

    try {
      const response = await axios.put(
        `${MANGE_HOME_PUT_API}${parseToNumGroupId}`,
        putUserLevelRequestDto,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );

      setUserList((prevList) =>
        prevList.map((user) =>
          user.userId === selectedUser.userId
            ? { ...user, userLevel: response.data.data.userLevel }
            : user
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (cookies.userId === userId) {
      alert("관리자는 스스로 방출 안됩니다.");
      return;
    }

    try {
      await axios.delete(
        `${MANGE_HOME_DELTE_API}${parseToNumGroupId}?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      setUserList((prevList) =>
        prevList.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={s.box}>
      <h2>총 인원수: {userList?.length  || 0}</h2>
      {userList.map((user) => (
        <div key={user.userId} css={s.boxContainer}>
          <div css={s.userImgBox}>
            <img
              src={
                user.profileImage
                  ? `http://localhost:8080/image/${user.profileImage}`
                  : userImg
              }
              alt="userImage"
              css={s.userImg}
            />
          </div>
          <p>
            {user.nickName} 님의 등급: {" "}
            {typeof user.userLevel === "string" ? user.userLevel : "Unknown Level"}
          </p>
          <button onClick={() => openModal(user)} css={s.openModalButton}>
            등급 수정
          </button>
          <button
            onClick={() => handleDeleteUser(user.userId)}
            css={s.openModalButton}
          >
            추방
          </button>
        </div>
      ))}

      {selectedUser && (
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          overlayClassName="modalOverlay"
          css={s.modalContent}
        >
          <h2>등급 수정: {selectedUser.nickName}</h2>
          <label>
            <input
              type="radio"
              name="userLevel"
              value="일반회원"
              checked={selectedLevel === "일반회원"}
              onChange={() => setSelectedLevel("일반회원")}
            />
            일반회원{" "}
          </label>
          <label>
            <input
              type="radio"
              name="userLevel"
              value="우수회원"
              checked={selectedLevel === "우수회원"}
              onChange={() => setSelectedLevel("우수회원")}
            />
            우수회원
          </label>
          <div>
            <button onClick={handleUserLevel} css={s.closeModalButton}>
              변경
            </button>
            <button onClick={closeModal} css={s.closeModalButton}>
              닫기
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default ManagerHome;

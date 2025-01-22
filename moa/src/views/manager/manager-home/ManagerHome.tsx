/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetUserListResponseDto
} from "../../../types/dto/response.dto";
import ReactModal from "react-modal";
import userImg from "../../../images/userImg.png";
import { PostUserLevelRequestDto } from "../../../types/dto/request.dto";
import {
  MANGE_HOME_DELTE_API,
  MANGE_HOME_GET_API,
  MANGE_HOME_PUT_API,
} from "../../../apis";

interface ManagerHomeProps {
  parseToNumGroupId: number;
}

ReactModal.setAppElement("#root");
const ManagerHome: React.FC<ManagerHomeProps> = ({ parseToNumGroupId }) => {
  const [userList, setUserList] = useState<GetUserListResponseDto[]>([]);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token", "userId"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<"일반회원" | "우수회원">(
    "일반회원"
  );

  useEffect(() => {
    fetchUserList();
  }, [groupId, cookies.token]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const isAdmin = (level: string): boolean => {
    if (!["일반회원", "우수회원", "관리자"].includes(level)) {
      console.error(`Unknown user level detected: ${level}`);
      return false;
    }
    return level === "관리자";
  };
  const fetchUserList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${MANGE_HOME_GET_API}${parseToNumGroupId}`,
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

  const handleUserLevel = async (userId: string) => {
    const putUserLevelRequestDto: PostUserLevelRequestDto = {
      userId: userId,
      userLevel: selectedLevel,
    };

    const url = `${MANGE_HOME_PUT_API}${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        const reponse = await axios.put(url, putUserLevelRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        setUserList((prevList) =>
          prevList.map((user) =>
            user.userId === userId
              ? { ...user, userLevel: reponse.data.data.userLevel }
              : user
          )
        );
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (cookies.userId === userId) {
      alert("관리자는 스스로 방출 안됩니다 ");
      return;
    }
    if (cookies.token) {
      try {
        await axios.delete(
          `${MANGE_HOME_DELTE_API}${parseToNumGroupId}?userId=${userId}`,
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

  return (
    <div css={s.box}>
      <div>
        <h2>총 인원수 : {userList.length}</h2>
      </div>
      {userList.map((data) => (
        <div key={data.nickName} css={s.boxContainer}>
          <div>
            <div css={s.userImgBox}>
              {!data.profileImage ? (
                <img src={userImg} alt="userImage" css={s.userImg} />
              ) : (
                <img
                  src={"http://localhost:8080/image/" + data.profileImage}
                  alt="profileImage"
                  css={s.userImg}
                />
              )}
            </div>
          </div>
          <div>
            {data.nickName} 님의 등급 :
            {typeof data.userLevel === "string"
              ? data.userLevel
              : "Unknown Level"}
          </div>
          <button onClick={openModal} css={s.openModalButton}>
            등급
          </button>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="modalOverlay"
            css={s.modalContent}
          >
            <h2>등급 수정</h2>
            <p>
              일반회원{" "}
              <input
                type="radio"
                name="userLevel"
                value="일반회원"
                onChange={(e) =>
                  setSelectedLevel(e.target.value as "일반회원" | "우수회원")
                }
              />
            </p>
            <p>
              우수회원{" "}
              <input
                type="radio"
                name="userLevel"
                value="우수회원"
                onChange={(e) =>
                  setSelectedLevel(e.target.value as "일반회원" | "우수회원")
                }
              />
            </p>
            <button
              onClick={() => handleUserLevel(data.userId)}
              css={s.closeModalButton}
            >
              변경
            </button>
            <button onClick={closeModal} css={s.closeModalButton}>
              닫기
            </button>
          </ReactModal>
          <div>
            {typeof data.userLevel === "string" && isAdmin(data.userLevel) ? (
              ""
            ) : (
              <button
                css={s.openModalButton}
                onClick={() => handleDeleteUser(data.userId)}
              >
                추방
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagerHome;

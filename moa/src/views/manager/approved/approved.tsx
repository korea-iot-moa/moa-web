/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { GetResponseUserAnswer } from "../../../types/dto/response.dto";
import { PostUserAnswerRequestDto } from "../../../types/dto/request.dto";
import { APPROVED_USER_ANSWERS_DELETE_API, APPROVED_USER_ANSWERS_GET_API, APPROVED_USER_ANSWERS_POST_API } from "../../../apis";

interface ApprovedProps {
  parseToNumGroupId: number;
}

const Approved: React.FC<ApprovedProps> = ({ parseToNumGroupId }) => {
  const [approve, setApprove] = useState<GetResponseUserAnswer[]>([]);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (groupId && cookies.token) {
      fetchApprove();
      }
  }, [parseToNumGroupId, cookies.token]);
 
  const fetchApprove = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${APPROVED_USER_ANSWERS_GET_API}${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data?.data;
        if (Array.isArray(responseData)) {
          const mappedData = responseData.map((item) => ({
            ...item,
            groupTitle:
              item.groupTitle || item.MeetingGroup?.groupTitle || "N/A",
          }));
          setApprove(mappedData);
        } else {
          setApprove([]);
        }
      } catch (error) {
        console.error("Error fetching approval data:", error);
        setApprove([]);
      }
    }
  };

  const handleApproveUser = async (userId: string) => {
    const postResponseUserAnswer: PostUserAnswerRequestDto = {
      userId: userId,
      isApproved: 1,
    };

    if (cookies.token) {
      try {
        await axios.post(
          `${APPROVED_USER_ANSWERS_POST_API}${groupId}`,
          postResponseUserAnswer,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setApprove((prevApprove) =>
          Array.isArray(prevApprove)
            ? prevApprove.map((item) =>
                item.userId === userId ? { ...item, isApproved: 1 } : item
              )
            : []
        );
        fetchApprove();
      } catch (error) {
        console.error("Error approving user:", error);
      }
    }
  };

  const handlePutApproveUser = async (userId: string) => {
    const deleteUserAnswerRequestDto: PostUserAnswerRequestDto = {
      userId: userId,
      isApproved: 0,
    };
  
    if (cookies.token) {
      try {
        const response = await axios.put(
          `${APPROVED_USER_ANSWERS_DELETE_API}${groupId}`, deleteUserAnswerRequestDto,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          setApprove((prevApprove) =>
            Array.isArray(prevApprove)
              ? prevApprove.filter((item) => item.userId !== userId)
              : []
          );
        }
        fetchApprove();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <ul>
        {Array.isArray(approve) && approve.length > 0 ? (
          approve.map((data) => (
            <li key={data.answerId}>
              <strong>모임 이름: </strong>{" "}
              {data.groupTitle || data.MeetingGroup?.groupTitle || "N/A"}{" "}
              <strong>유저 아이디: </strong> {data.userId}{" "}
              <strong>승인 결과: </strong> {data.isApproved === 0 ? "거절" : 1 ? "승인" : "대기중"}
              <div css ={s.BottonBox}>
              <button css={s.Botton} onClick={() => handleApproveUser(data.userId)}>승인</button>
              <button css={s.Botton} onClick={() => handlePutApproveUser(data.userId)}>거절</button>
              </div>
            </li>
          ))
        ) : (
          <li>표시할 항목이 없습니다</li>
        )}
      </ul>
    </div>
  );
};

export default Approved;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { GetReponseUserAnswer } from "../../../types/dto/response.dto";
import { PostUserAnswerReqeustDto } from "../../../types/dto/request.dto";

interface ApprovedProps {
  parseToNumGroupId: number;
}

const Approved: React.FC<ApprovedProps> = ({ parseToNumGroupId }) => {
  const [approve, setApprove] = useState<GetReponseUserAnswer[]>([]);
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
          `http://localhost:8080/api/v1/user-answers/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );

        const responseData = response.data?.data;

        if (Array.isArray(responseData)) {
          setApprove(responseData);
        } else {
          console.error("Unexpected response data format:", responseData);
          setApprove([]);
        }
      } catch (error) {
        console.error("Error fetching approval data:", error);
        setApprove([]);
      }
    }
  };

  const handleApproveUser = async (userId: string) => {
  
    const postReponseUserAnswer: PostUserAnswerReqeustDto = {
      userId: userId,
      isApproved: 1,
    };

    if (cookies.token) {
      try {
        await axios.post(
          `http://localhost:8080/api/v1/user-answers/approved/${groupId}`,
          postReponseUserAnswer,
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

  const handleDeleteUser = async (userId: string) => {
    const deleteUserAnswerRequestDto: PostUserAnswerReqeustDto = {
      userId: userId,
      isApproved: 0,
    };

    if (cookies.token) {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/user-answers/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            data: deleteUserAnswerRequestDto,
            withCredentials: true,
          }
        );

        setApprove((prevApprove) =>
          Array.isArray(prevApprove)
            ? prevApprove.filter((item) => item.userId !== userId)
            : []
        );
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
              <strong>모임 이름: </strong>
              {data.grouptitle ? data.MeetingGroup.groupTitle : "N/A"} ---
              <strong>유저 아이디: </strong> {data.userId} ---
              <strong>승인 결과: </strong> {data.isApproved}
              <button onClick={() => handleApproveUser(data.userId)}>승인</button>
              <button onClick={() => handleDeleteUser(data.userId)}>거절</button>
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

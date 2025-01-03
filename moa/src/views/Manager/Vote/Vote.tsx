/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { GetVoteResponseDto } from "../../../types/dto/response.dto";
import { LayerBox } from "./style";
import { PostVoteRequestDto } from "../../../types/dto/request.dto";
import { MeetingGroup } from "../../../types";

interface VoteProps {
  parseToNumGroupId: number;
}

const Vote: React.FC<VoteProps> = ({ parseToNumGroupId }) => {
  const [vote, setVote] = useState<GetVoteResponseDto| null>(null);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);
  const [voteContent, setVoteContent] = useState<string>(""); 
  const [createDate, setCreateDate] = useState<string>(""); 
  const [closeDate, setCloseDate] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);


  useEffect(() => {
    console.log("투표 데이터 불러오기");
    fetchVote();
  }, [groupId, cookies.token]);

  const handleEditClick = (vote: GetVoteResponseDto) => {
    setIsEditing(true);
    setVoteContent(vote.voteContent);
    setCreateDate(createDate);
    setCloseDate(closeDate);
  };
  

  const fetchVote = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/votes/${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        console.log("조회 데이터"+responseData);
        setVote(responseData);
        console.log(responseData)
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handlePostVote = async(
    groupId: number,
    creatorId: string,
    voteContent: string,
    createDate: string,
    closeDate: string
  ) => {
    const postVoteRequestDto: PostVoteRequestDto = {
      groupId: groupId, 
      creatorId: creatorId, 
      voteContent: voteContent, 
      createDate: new Date(createDate), 
      closeDate: new Date(closeDate),
    };
    const url = `http://localhost:8080/api/v1/votes`;
    if (cookies.token) {
      try {
        console.log(postVoteRequestDto);
        const response = await axios.post(url, postVoteRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateVote = async(voteId : number) => {
    if (cookies.token) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/votes/${voteId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handleDeleteVote = async(voteId : number) => {
    if (cookies.token) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/v1/votes/${voteId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            data: voteId,
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setVote(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
    <button>투표 생성</button>
    {isEditing ? (
      <div css={LayerBox}>
        <p>
          <strong>투표 내용 :</strong>
          <input
            type="text"
            value={voteContent}
            onChange={(e) => setVoteContent(e.target.value)}
          />
        </p>
        <p>
          <strong>시작 날짜 :</strong>
          <input
            type="date"
            value={createDate}
            onChange={(e) => setCreateDate(e.target.value)}
          />
        </p>
        <p>
          <strong>마감 날짜 :</strong>
          <input
            type="date"
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
          />
        </p>
        <button
          onClick={() => {
            handleUpdateVote(vote!.voteId);
            setIsEditing(false); 
          }}
        >
          수정 완료
        </button>
        <button onClick={() => setIsEditing(false)}>취소</button>
      </div>
    ) : (
      <ul>
        {vote ? (
          <li key={vote.voteId}>
            <p>
              <strong>투표 내용:</strong> {vote.voteContent}
            </p>
            <p>
              <strong>생성 날짜:</strong>{" "}
              {new Date(vote.createDate).toLocaleDateString()}
            </p>
            <strong>마감 날짜:</strong>{" "}
            {new Date(vote.closeDate).toLocaleDateString()}
            <div>
              <button onClick={() => handleEditClick(vote)}>수정</button>
              <button onClick={() => handleDeleteVote(vote.voteId)}>삭제</button>
            </div>
          </li>
        ) : (
          <li>투표 데이터를 불러오는 중이거나 데이터가 없습니다.</li>
        )}
      </ul>
    )}
  </div>
  );
};
export default Vote;

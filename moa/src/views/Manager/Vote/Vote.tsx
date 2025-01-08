/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetVoteAnswerChartResponseDto,
  GetVoteResponseDto,
} from "../../../types/dto/response.dto";
import { Botton, BottonBox, LayerBox, ReportBox } from "./style";
import {
  PostVoteRequestDto,
  PutVoteRequestDto,
} from "../../../types/dto/request.dto";
import { MeetingGroup } from "../../../types";
import VoteAnswerChartComponent from "./VoteAnswerChartComponent";
import { GenderChartBox } from "../Chart/style";
import ReactModal from "react-modal";
import {
  closeModalButton,
  modalContent,
  openModalButton,
} from "../ManagerHome/style";

interface VoteProps {
  parseToNumGroupId: number;
}

const Vote: React.FC<VoteProps> = ({ parseToNumGroupId }) => {
  const [vote, setVote] = useState<GetVoteResponseDto | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { groupId } = useParams();
  const [cookies] = useCookies(["token","userId"]);
  const [voteContent, setVoteContent] = useState<string>("");
  const [createDate, setCreateDate] = useState<string>("");
  const [closeDate, setCloseDate] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [voteAnswerChart, setVoteAnswerChart] = useState<
    GetVoteAnswerChartResponseDto[]
  >([]);
  
  
  useEffect(() => {
    fetchVote();

    if (vote) {
      fetchVoteAnswerChart(vote.voteId);
    }
  }, [groupId, cookies.token]);

  const handleEditClick = (vote: GetVoteResponseDto) => {
    setIsEditing(true);
    setVoteContent(vote.voteContent);
    setCreateDate(new Date(vote.createDate).toISOString().slice(0, 10));
    setCloseDate(new Date(vote.closeDate).toISOString().slice(0, 10));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const fetchVote = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/votes/${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        console.log("조회 데이터" + responseData);
        setVote(responseData);
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostVote = async (
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
    const url = `http://localhost:8081/api/v1/votes`;
    
    if (cookies.token) {
      try {
       

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

  const handleUpdateVote = async (
    voteId: number,
    voteContent: string,
    createDate: string,
    closeDate: string
  ) => {
    const putVoteRequestDto: PutVoteRequestDto = {
      voteContent: voteContent,
      createDate: new Date(createDate),
      closeDate: new Date(closeDate),
    };
    const url = `http://localhost:8080/api/v1/votes/${voteId}`;
    if (cookies.token) {
      try {
        const response = await axios.put(url, putVoteRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setVote(responseData);
        setIsEditing(false);
        fetchVote();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteVote = async (voteId: number) => {
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

  const fetchVoteAnswerChart = async (voteId: number) => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/vote-results/${voteId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setVoteAnswerChart(responseData);
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} css={openModalButton}>
        투표 생성
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modalOverlay"
        css={modalContent}
      >
        <h2>투표</h2>
        <p>
          투표 내용{" "}
          <input
            type="text"
            value={voteContent}
            onChange={(e) => setVoteContent(e.target.value)}
          />
        </p>
        <p>
          생성 날짜{" "}
          <input
            type="date"
            value={createDate}
            onChange={(e) => setCreateDate(e.target.value)}
          />
        </p>
        <p>
          마감 날짜{" "}
          <input
            type="date"
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
          />
        </p>
        <button
          onClick={() =>{
            const creatorId = vote ? vote.creatorId : cookies.userId;
            handlePostVote(
              parseToNumGroupId,
              creatorId,
              voteContent,
              createDate,
              closeDate
            );
          }}
          css={closeModalButton}
        >
          등록
        </button>
        <button onClick={closeModal} css={closeModalButton}>
          닫기
        </button>
      </ReactModal>
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
              handleUpdateVote(
                vote!.voteId,
                voteContent,
                createDate,
                closeDate
              );
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
              <div css ={BottonBox}>
                <button css={Botton} onClick={() => handleEditClick(vote)}>수정</button>
                <button css={Botton} onClick={() => handleDeleteVote(vote.voteId)}>
                  삭제
                </button>
              </div>
            </li>
          ) : (
            <li>투표 데이터를 불러오는 중이거나 데이터가 없습니다.</li>
          )}
        </ul>
      )}
      <div>
        <div css={GenderChartBox}>
          <h1>투표결과 차트</h1>
          <VoteAnswerChartComponent data={voteAnswerChart} />
          <div css={ReportBox}>
            {voteAnswerChart.length > 0 && (
              <>
                <div>
                  <p>응답: {voteAnswerChart[0].voteAnswer}</p>
                  <p>투표 수: {voteAnswerChart[0].count}</p>
                  <p>비율: {voteAnswerChart[0].ratio}%</p>
                </div>
                <div>
                  <p>응답: {voteAnswerChart[1].voteAnswer}</p>
                  <p>투표 수: {voteAnswerChart[1].count}</p>
                  <p>비율: {voteAnswerChart[1].ratio}%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Vote;
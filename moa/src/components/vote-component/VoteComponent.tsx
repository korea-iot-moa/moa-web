/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import * as s from './style';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Vote, VoteAnswer, VoteResult } from '../../types';
import { format } from 'date-fns';
import userAuthStore from '../../stores/auth.store';
import { VOTE_API, VOTE_RESULT_GET_API, VOTE_RESULT_POST } from "../../apis";

type PropsType = {
  groupId: number;
  groupTitle: string;
  closeVote: () => void;
};

const VoteComponent: React.FC<PropsType> = ({ groupId, groupTitle, closeVote }) => {
  const { userId } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const [vote, setVote] = useState<Vote | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [closeDate, setCloseDate] = useState<string>('');
  const [voteState, setVoteState] = useState<boolean | null>(null); 
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [voteSelectData, setVoteSelectData] = useState<VoteResult>({
    voteResultId: null,
    voteId: 0, 
    userId: userId,
    voteAnswer: null,
    voteDate: new Date()
  });

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const voteResponse = await axios.get(`${VOTE_API}${groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        setVote(voteResponse.data.data);
      } catch (error) {
        console.error("투표 정보 호출 실패", error);
      }
    };

    fetchVote();
  }, [groupId, cookies.token]);

  useEffect(() => {
    if (vote) {
      setStartDate(formatDate(String(vote.createDate)));
      setCloseDate(formatDate(String(vote.closeDate)));
      
      const checkVoteParticipation = async () => {
        try {
          const response = await axios.get(`${VOTE_RESULT_GET_API}${vote?.voteId}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          setVoteState(response.data.data);
          setVoteSelectData((prev) => ({
            ...prev,
            voteId: vote.voteId,
          }))
        } catch (error) {
          console.error("투표 참여 여부 확인 실패", error);
        }
      };

      checkVoteParticipation();
    }
  }, [vote, cookies.token]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  };

  const handleSelectVote = (answer: VoteAnswer) => {
    setVoteSelectData((prev) => ({
      ...prev,
      voteAnswer: answer,
    }));

    setSelectedButton(answer);
  };

  const postVoteData = async () => {
    if (cookies.token) {
      try {
        await axios.post(VOTE_RESULT_POST, voteSelectData, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        closeVote()
      } catch (error) {
        console.error("투표 제출 실패", error);
      }
    }
  };

  if (voteState === null) {
    return <div>로딩 중...</div>; 
  }

  return (
    <div css={s.voteBox}>
      <button css={s.closeButton} onClick={closeVote}>x</button>
      <div css={s.headerBox}>
        <h1>{groupTitle} 의 투표</h1>
      </div>
      {voteState ? (
        <div css={s.clearVoteBox}>이미 제출된 투표입니다.</div>
      ) : (
        <div css={s.mainBox}>
          <div css={s.dateBox}>
            <p>시작일: {startDate}</p>
            <p>종료일: {closeDate}</p>
          </div>
          <div css={s.contentBox}>
            <textarea value={vote?.voteContent} readOnly />
          </div>
          <p css={s.notification}>※ 투표는 한번만 가능합니다.</p>
          <div css={s.selectBox}>
            <button
              css={s.buttonStyle(selectedButton === "O", "#1F89DA", "#1E4DD9")}
              onClick={() => handleSelectVote("O")}
            >
              O
            </button>
            <button
              css={s.buttonStyle(selectedButton === "X", "#f44336", "#d32f2f")}
              onClick={() => handleSelectVote("X")}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div css={s.btnBox}>
        <button onClick={postVoteData}>제출</button>
      </div>
    </div>
  );
};

export default VoteComponent;

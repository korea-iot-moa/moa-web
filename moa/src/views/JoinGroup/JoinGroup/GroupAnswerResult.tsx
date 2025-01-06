/** @jsxImportSource @emotion/react */
import * as s from './style'
import React from 'react'
import useGroupStore from '../../../stores/group.store';
import { useNavigate } from 'react-router-dom';

function GroupAnswerResult() {
  const groupData = useGroupStore((state) => state.groupData);
  const navigator = useNavigate();

  
  return (
    <div css={s.container}>
      <div css={s.resultContainer}>
        <img src={groupData?.groupImage} alt="groupData?.groupImage" />
        <div css={s.groupDataDiv}>
          <div>{groupData?.groupTitle}</div>
          <ul css={s.dateBox}>
            <li>날짜: </li>
            <li>{groupData?.groupDate}</li>
          </ul>
        </div>
      </div>
        <div css={s.line3}></div>
        <p css={s.p}>모임 참여 신청이 완료됐습니다.</p>
        <button onClick={() => navigator(-3)} css={s.button}>확인완료</button>
    </div>
  )
}

export default GroupAnswerResult

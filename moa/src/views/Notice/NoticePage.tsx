/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from './style';
import { Notice } from '../../types';
import axios from 'axios';
import { format } from 'date-fns';

export default function NoticePage() {
  const [ noticeData, setNoticeData ] = useState<Notice[]>([]);

  useEffect(() => {
    try{
      axios.get('http://localhost:8080/api/v1/notices', {
      }).then((response) => {
        setNoticeData(response.data.data);
      })
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <h1>공지사항</h1>
      </div>

      <div css={s.mainBox}>
        {noticeData.map((notice) => (
        <div css={s.noticeBox} key={notice.noticeId}>
          <div>
            <h2>{notice.noticeTitle}</h2>
          </div>
          <div>
            <p>{notice.noticeContent}</p>
          </div>
          <div>
            등록 날짜: {format(notice.noticeDate, "yyyy-MM-dd")}
          </div>
        </div>
        ))}

      </div>
    </div>
  )
}

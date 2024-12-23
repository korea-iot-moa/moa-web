/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import ManagerHome from './ManagerHome/ManagerHome'
import { useNavigate, useParams } from 'react-router-dom';
import { MeetingGroup } from "../../types";
import { backTag, ButtonBox, ButtonContainer, ButtonStyle, ManagerBox, ManagerInnerBox } from './style';
import { APPROVED_PAGE, BLACK_LIST_PAGE, CHAR_PAGE, REPORT_PAGE, UPDATE_GROUP_PAGE, USER_LIST_PAGE, VOTE_PAGE } from '../../contants';
import axios from 'axios';
//로그인 + 관리자 인지 체크 하는 로직  
interface  Address{
  label: string; 
  value: string;
}
const creatoId = "ckck7290" ;
export default function Index() {
  const { groupId } = useParams();
  const parseToNumGroupId = Number(groupId);
  const navigator = useNavigate();

  const address :Address[] =[
    {label:'유저리스트', value:USER_LIST_PAGE},
    {label:'블랙 리스트', value:BLACK_LIST_PAGE},
    {label:"차트", value:CHAR_PAGE},
    {label:"신고처리건",value:REPORT_PAGE},
    {label:"승인처리 건 ", value:APPROVED_PAGE},
    {label: '투표 관리', value:VOTE_PAGE},
    {label: "모임 수정및 삭제", value:UPDATE_GROUP_PAGE}
  ]
  if(creatoId === null ){
      alert("관리자만 접근 할수 있습니다.!!")
  }

  const handleManagerPageRender = (path : string,groupId: number) => {
    navigator(path.replace(':groupId', groupId.toString()));
};
  
  return (
  <>
    <div css ={ManagerBox}>
      <div css={ButtonBox}>
        <div css={backTag}></div>
        <div css={ButtonContainer}>
          <div css ={ButtonStyle}>
          {address.map((item, index) => ( 
            <button 
              key={index} 
              onClick={() => handleManagerPageRender(item.value, parseToNumGroupId)}
            > 
              {item.label}
            </button> 
          ))}
          
          </div>
        </div>
      </div>
      <ManagerHome/>
      <div css ={ManagerInnerBox}>
    </div>
    </div>
    
  </>
  )

}


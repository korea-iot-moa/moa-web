/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { MeetingGroup, Recommendation } from '../../types';
import * as s from './style'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useGroupStore from '../../stores/group.store';
import groupImg  from '../../images/moaLogo.png';

interface PaginationScrollProps {
  datas: MeetingGroup[];
}

const PaginationScroll = ({ datas }:PaginationScrollProps ) => {

  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  const navigator = useNavigate();

  // 중복 확인 상태관리
  const [duplicationUserAnswer, setDuplicationUserAnswer] = useState<boolean>(false);

  // 답변 중복확인 함수
  const handleOpenGroup = async(group:MeetingGroup | null) => {
    if(cookies.token){
      try{
        const response = await axios.get(`http://localhost:8081/api/v1/user-answers/duplication/${group?.groupId}`, 
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        );
        if(response.data.data === true) {
          alert("이미신청완료됐습니다");
          setDuplicationUserAnswer(true);
        } else {
          useGroupStore.getState().setGroupData(group); // 그룹 데이터 저장
          navigator(`/group-join/join-group/${group?.groupId}`);
        }
      }catch (error) {
        console.error(error);
      }
    }
  }
  
  useEffect(() => {
    async function fetchLikes() {
      if(cookies.token) {
        try{
          const response = await axios.get('http://localhost:8081/api/v1/recommendation', {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          });

          const likedGroupIDs = response.data.data.map((item: {groupId: number}) => item.groupId);

          setLikedGroups(likedGroupIDs);
        } catch(error) {
          console.error("찜 상태를 가져오는 중 오류 발생: ", error);
        }
      }
    }
    fetchLikes();
  }, []);

  const toggleLike = (groupId: number) => {
    setLikedGroups((prev) => 
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]);
  }
  
  const handleFetchData = async (groupId: number) => {
    if (!cookies.token) {
      alert("로그인 후 사용가능합니다.");
      return;
    }
    if (cookies.token) {
      try {
        if (!likedGroups.includes(groupId)) {
          await axios.post<Recommendation>(
            `http://localhost:8081/api/v1/recommendation`,
            { groupId },
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );

        } else {
          await axios.delete(
            `http://localhost:8081/api/v1/recommendation/user-id`,
            {
              data: { groupId: groupId },
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );
        }
        toggleLike(groupId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      { 
          datas.length > 0 ? 
        <ul css={s.categoryList} >
        {datas.map((data, index) => (
          <li css={s.groupLi} key={index} >
            <div>
              <div css={s.imgDiv}>
              {
                !data.groupImage ? (
                <img src={groupImg} alt='userImage' css={s.img} onClick={()=> handleOpenGroup(data)} />
                ) : (
                <img src={`http://localhost:8081/image/${data.groupImage}`} 
                css={s.img}
                alt={data.groupImage} 
                onClick={()=> handleOpenGroup(data)}
                />
                )
              }
              </div>
              </div>
            <div css={s.line} onClick={()=> handleOpenGroup(data)}></div>
            <div css={s.listDetail}>
              <p css={s.content} onClick={()=> handleOpenGroup(data)}>{data.groupTitle}</p>
              <p css={s.content}>
                <button css={s.click} onClick={() => handleFetchData(data.groupId)}>
                  {likedGroups.includes(data.groupId) ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />}
                </button>
              </p>
            </div>
            <div css={s.listDetail} onClick={()=> handleOpenGroup(data)}>
            <p>{data.groupDate}</p>
            <p>{data.groupAddress}</p>
            </div>
          </li>
        ))}
        </ul>
        :
        <p>검색결과를 찾을 수 없습니다.</p>
        }
    </div>
  )
}

export default PaginationScroll
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { MeetingGroup, Recommendation } from '../../../types';
import * as s from './style'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useGroupStore from '../../../stores/group.store';


const PaginationScroll = ({ data }: { data:MeetingGroup[] }) => {
  
  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  const setGroupData = useGroupStore((state) => state.setGroupData); //이건 임시용
  const navigator = useNavigate();

  const toggleLike = (groupId: number) => {
    setLikedGroups((prev) => 
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]);
  }

  const handleOpenGroup = (groupId: number) => {
    const group = data.find(group => group.groupId === groupId);
    if (group) {
      setGroupData(group);
      navigator(`/join-group/${groupId}`);
    }
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

  useEffect(() => {
    async function fetchLikes() {
      const response = await axios.get('http://localhost:8081/api/v1/recommendation', {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      setLikedGroups(response.data.data);
    }
    fetchLikes();
  }, []);

  return (
    <div>
      <ul css={s.categoryList}>
      {data.map((result, index) => (
        <li css={s.groupLi} key={index}>
          <div><img src={result.groupImage} alt={result.groupImage} onClick={()=> handleOpenGroup(result.groupId)}/></div>
          <div css={s.line}></div>
          <div css={s.listDetail}>
            <p css={s.content}>{result.groupTitle}</p>
            <p css={s.content}>
              <button css={s.click} onClick={() => handleFetchData(result.groupId)}>
                {likedGroups.includes(result.groupId) ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />}
              </button>
            </p>
          </div>
          <div css={s.listDetail}>
          <p>{result.groupDate}</p>
          <p>{result.groupAddress}</p>
          <p>{result.groupType}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default PaginationScroll
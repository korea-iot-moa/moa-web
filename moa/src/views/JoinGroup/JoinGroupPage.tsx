/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MeetingGroup } from '../../types';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { IoSettingsOutline, IoChatbubbleEllipsesOutline  } from "react-icons/io5";
import { LuVote, LuDoorOpen, LuCopy   } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { PiUserList } from "react-icons/pi";
import img from "../../images/moaLogo.png"
import NaverMapComponent from '../../components/NaverMap';
import VoteComponent from '../../components/VoteComponent/VoteComponent';

// 기본 주소
const baseUrl = "http://localhost:3000/meeting-group/";

export default function JoinGroupPage() {
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showVote, setShowVote] = useState<boolean>(false);

  // url 에서 그룹 id 추출
  const { groupId } = useParams();
  console.log(groupId);
  const parseToNumGroupId = Number(groupId);

  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  // clipboard api 사용 위해 변수명 변경
  const navigate = useNavigate();

  const handleManagerPageRender = (groupId: number) => {
    navigate(`/manager/${groupId}`)
  }

  //& 그룹정보 호출
  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/api/v1/meeting-group/${groupId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      }).then((response) => {
        setGroupInfo(response.data.data);
        setIsLoading(false); 
        console.log(groupInfo); 
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false); 
    }
  }, [location.pathname]);

  //* 링크 복사
  
   //* 링크 복사
  const handleLinkCopy = async(url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('코드 복사 완료');
    } catch (e) {
      alert('코드 복사 실패');
    }
  }
  
  

  return (
    <>
      <div css={s.fullBox(showVote)}> 
        <div css={s.topBox}>
          <div>
            <h1>{groupInfo?.groupTitle}</h1>
            <IoSettingsOutline css={s.optionBtn} onClick={() => handleManagerPageRender(parseToNumGroupId)}/>
          </div>
          <div>
            <button css={s.btnSt} onClick={() => setShowVote(true)}>
              <LuVote css={s.iconSt}/>
              투표
            </button>
            <button css={s.leaveBtn}>
              <LuDoorOpen css={s.iconSt} />
              모임 탈퇴
            </button>
          </div>
        </div>
        {showVote && (
          <div css={s.voteOverlay}>
            <VoteComponent groupId={Number(groupId)} groupTitle={groupInfo!.groupTitle} closeVote={() => setShowVote(false)} />
          </div>
        )}
        <div css={s.middleBox}>{/* 채팅, 회원목록, 복사링크 */}
          <div>
            <button css={s.btnSt}>
              <AiOutlineHome/>
              모임 홈
            </button>
            <button css={s.btnSt}>
              <IoChatbubbleEllipsesOutline/>
              채팅
            </button>
            <button css={s.btnSt}>
              <PiUserList/>
              회원 목록
            </button>
          </div>
          <div css={s.copyBox}>
            <h2>초대 링크</h2>
            <div>
              <input type="text"  value={baseUrl + groupInfo?.groupId} readOnly/>
              <LuCopy css={s.copyBtn} onClick={() => handleLinkCopy(baseUrl + groupId)}/>
            </div>
          </div>
        </div>
        <div css={s.mainBox}>
          <div css={s.groupImgBox}>
            {groupInfo?.groupImage ? (
              <img 
              src={`http://localhost:8080/image/${groupInfo.groupImage}`} alt="GROUP IMAGE" 
              />
            ) : (
              <img src={img} alt="DEFAULT IMAGE" className='default'/>
            )}
          </div>

          <div css={s.groupInfoBox}>
            <div css={s.groupDetailBox}>
              <div>
                <div css={s.infoPart}>
                  <p>카테고리 :</p>
                  <p>{groupInfo?.groupCategory}</p>
                </div>
                <div css={s.infoPart}>
                  <p>모임 유형 :</p>
                  <p>{groupInfo?.groupType}</p>
                </div>
                <div css={s.infoPart}>
                  <p>참여 유형 :</p>
                  <p>{groupInfo?.meetingType}</p>
                </div>
                <div css={s.infoPart}>
                  <p>모임 장소 :</p>
                  <p>{groupInfo?.groupAddress}</p>
                </div>
                <div css={s.infoPart}>
                  <p>준비물 :</p>
                  {groupInfo?.groupSupplies ? (  
                    <p>{groupInfo?.groupSupplies}</p>
                  ) : (
                    <p>x</p>
                  )}
                </div>
              </div>

            </div>
            <div css={s.mapBox}>
        <div>
          {/* 지도 */}
          {isLoading ? (
            <p>로딩 중...</p>
          ) : groupInfo?.groupAddress ? (
            <NaverMapComponent address={groupInfo?.groupAddress || ""} />
          ) : (
            <p>모임에서 장소를 제공하지 않습니다.</p>
          )}
        </div>
      </div>

          </div>

        </div>

      </div>
    </>
  )
}

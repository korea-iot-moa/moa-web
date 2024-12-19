/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MeetingGroup } from '../../types';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { IoSettingsOutline, IoChatbubbleEllipsesOutline  } from "react-icons/io5";
import { LuVote, LuDoorOpen  } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { PiUserList } from "react-icons/pi";
import img from "../../images/group.jpg"
import NaverMapComponent from '../../components/NaverMap';


const baseUrl = "http://localhost:3000";



export default function JoinGroupPage() {
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>();
  const [isLoading, setIsLoading] = useState(true);

  // url 에서 그룹 id 추출
  const { groupId } = useParams();
  const parseToNumGroupId = Number(groupId);

  const location = useLocation();
  const [cookies] = useCookies(["token"]);
  const navigator = useNavigate();

  const handleManagerPageRender = (groupId: number) => {
    navigator(`/manager/${groupId}`)
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
  // const handle = (url: string) => {
  //   navigator.clipboard.writeText(url)

  //   <button onClick={() => handle(`${baseUrl}${location.pathname}`)}>복사</button>
  // }
   //* 링크 복사

  
  

  return (
    <>
      <div css={s.fullBox}> 
        <div css={s.topBox}>
          <div>
            <h1>{groupInfo?.groupTitle}</h1>
            <IoSettingsOutline css={s.optionBtn} onClick={() => handleManagerPageRender(parseToNumGroupId)}/>
          </div>
          <div>
            <button css={s.BtnSt}>
              <LuVote css={s.iconSt}/>
              투표
            </button>
            <button css={s.leaveBtn}>
              <LuDoorOpen css={s.iconSt} />
              모임 탈퇴
            </button>
          </div>
        </div>
        <div css={s.middleBox}>{/* 채팅, 회원목록, 복사링크 */}
          <div>
            <button css={s.BtnSt}>
              <AiOutlineHome/>
              모임 홈
            </button>
            <button css={s.BtnSt}>
              <IoChatbubbleEllipsesOutline/>
              채팅
            </button>
            <button css={s.BtnSt}>
              <PiUserList/>
              회원 목록
            </button>
          </div>
        </div>
        <div css={s.mainBox}>
          <div css={s.groupImgBox}>
            {groupInfo?.groupImage ? (
              <img 
              src={`http://localhost:8080/image/${groupInfo.groupImage}`} alt="GROUP IMAGE" 
              />
            ) : (
              <img src={img} alt="DEFAULT IMAGE"/>
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

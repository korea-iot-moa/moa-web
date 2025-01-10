/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from './style'
import { ParticipationStatusDataDto } from '../../../types/dto/response.dto';
import { GROUP_MAIN_IMG_API, GROUP_PARTICIPATION_STATUS } from '../../../apis';
import img from "../../../images/moaLogo.png";
import { MdOutlineTitle } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { BsPuzzleFill } from "react-icons/bs";
import { PiPuzzlePieceFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { FaSignsPost } from "react-icons/fa6";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ParticipationStatusPage() {
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();
  
  const [ participationStatusData , setParticipationStatusData ] = useState<ParticipationStatusDataDto[]>([]); 

  useEffect(() => {
    if(!!cookies.token) {
      try {
        axios.get(GROUP_PARTICIPATION_STATUS, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }).then((response) => {
          setParticipationStatusData(response.data.data);
        })
      }catch (error) {
        console.error(error);
      }
    } else {
      navigate('/signIn')
    }
  },[])

  const handleCancellationRequest = async(answerId: number) => {
    try {
      axios.delete(`http://localhost:8080/api/v1/user-answers/${answerId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        maxRedirects: 0, 
      }).then(() => {
        setParticipationStatusData((prevData) =>
          prevData.filter((item) => item.answerId !== answerId)
        );
      })

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <h1>
          모임 신청 내역
        </h1>
      </div>

      <div css={s.mainBox}>
        {participationStatusData.map((data) => (
          <div css={s.reviewBox} key={data.answerId}>
            <div css={s.reviewMain}>
              <div css={s.imgBox}>
                <div>
                {data.groupImage ? (
                      <img
                        src={`${GROUP_MAIN_IMG_API}${data.groupImage}`}
                        alt="REVIEW IMAGE"
                      />
                    ) : (
                      <img src={img} alt="DEFAULT IMAGE" className="default" />
                    )}
                </div>
              </div>

              <div css={s.contentBox}> 
                <div css={s.groupInfoBox}>
                  <div>
                    <MdOutlineTitle color='#0a3140' css={s.iconSt} /> {data.groupTitle}
                  </div>
                  <div>
                    <IoExtensionPuzzle color="#FF7B54"  css={s.iconSt}/> {data.groupType}
                  </div>
                  <div>
                    <BsPuzzleFill color="#FCD572" css={s.iconSt}/> {data.meetingType}
                  </div>
                  <div>
                    <PiPuzzlePieceFill color="#7BD04A" css={s.iconSt}/> {data.groupCategory}
                  </div>
                </div>

                <div css={s.answerInfoBox}>
                  <div>
                    {data.isApproved === 0 ? 
                    <button onClick={() => handleCancellationRequest(data.answerId)}>내역 삭제</button> : 
                    <button onClick={() => handleCancellationRequest(data.answerId)}>신청 취소</button>
                    }
                    
                  </div>
                  <div>
                    <div><SlCalender color="#7BD04A" css={s.iconSt}/> <p>{new Date(data.answerDate).toLocaleDateString()}</p> </div>
                    <div>
                      <FaSignsPost color="#FCD572" css={s.iconSt}/> 
                        {data.isApproved === 0 ? <p css={s.fontSt(0)}>거절</p> : data.isApproved === 1 ? <p css={s.fontSt(1)}>승인</p> : <p css={s.fontSt(2)}>대기중</p>} 
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

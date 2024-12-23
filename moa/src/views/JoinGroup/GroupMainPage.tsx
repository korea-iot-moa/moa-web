/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from "./style";
import NaverMapComponent from '../../components/NaverMap';
import img from "../../images/moaLogo.png";
import { LuCopy } from "react-icons/lu";

interface MainBoxProps {
  groupInfo: any;
  isLoading: boolean;
}

const GroupMainPage: React.FC<MainBoxProps> = ({ groupInfo, isLoading }) => {
  return (
    <div css={s.mainBox}>
      <div css={s.groupImgBox}>
        {groupInfo?.groupImage ? (
          <img 
            src={`http://localhost:8080/image/${groupInfo.groupImage}`} 
            alt="GROUP IMAGE" 
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
  );
}

export default GroupMainPage;

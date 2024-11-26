/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from './style'
import logo from '../../images/moaLo.png'
import { useNavigate } from 'react-router-dom'
import { MeetingGroup } from '../../types';

export default function GroupNaviBar() {
  const [groupList, setGroupList] = useState<MeetingGroup[]>([]);
  

  const navigator = useNavigate();

  return (
      <div css={s.naviBar}> 
        <div css={s.imageBox} onClick={() => navigator('/')}>
          <img src={logo} alt="로고" css={s.logoImage} />
        </div>
        <hr css={s.line}/>
      </div>
  )
}

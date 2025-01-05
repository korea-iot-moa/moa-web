/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { BsHeart } from 'react-icons/bs';
import axios from 'axios';
import useGroupTypeStore from '../../stores/gruopType.store';
import * as s from "./style";
import { MeetingGroup } from '../../types';

function RegularGroup() {
  const [results, setResult] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchData = async() => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/auth/meeting-group/groupType`, {params: {groupType:"정기모임"}});

      const shortTypeData = response.data.data;
      setResult(shortTypeData);
    } catch(error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
  <div css={s.container}>
        <p>정기모임</p>
        <div></div>
        <div>
          {
            loading 
            ? <p></p>
              : 
              <ul css={s.groupList}>
                          {results.map((result) => (
                            <li css={s.groupLi} key={result.groupId}>
                              <div>{result.groupImage}</div>
                              <div css={s.line}></div>
                              <div css={s.listDetail}>
                                <p css={s.content}>{result.groupTitle}</p>
                                <p css={s.content}>
                                  <BsHeart />
                                </p>
                              </div>
                              <div css={s.listDetail}>
                                <p>{result.groupDate}</p>
                                <p>{result.groupAddress}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
            }
        </div>
      </div>
  )
}

export default RegularGroup;
/** @jsxImportSource @emotion/react */
import React from 'react'
import useSearchStore from '../../stores/search.store'
import { BsHeart } from 'react-icons/bs';
import * as s from './style'

function KeywordSearchGroupList() {
  const results = useSearchStore((state) => state.searchAllResults)
  const loading = useSearchStore((state) => state.searchLoading);
  const isResults = useSearchStore((state) => state.isSearchResults);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);

  return (
    <div>
      <h3 css={s.keyword}>"{searchKeyword}" 검색결과 입니다.</h3>
      {loading ? 
      <p>로딩중....</p> 
      : 
      isResults === null ?  null : !isResults ? (
        <ul>
      {results.map(result => (
        <li key={result.groupId}>
          <div>{result.groupImage}</div>
          <p>{result.groupTitle}</p>
          <p>{result.groupDate}</p>
          <p>{result.groupAddress}</p>
          <div>
            <BsHeart />
          </div>
        </li>
      ))}
      </ul>
      ) : (
      <p>검색결과가 없습니다.</p>
    )}
    </div>
  )
}

export default KeywordSearchGroupList
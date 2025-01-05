/** @jsxImportSource @emotion/react */
import React from 'react'
import useSearchStore from '../../stores/search.store'
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import * as s from './resultStyle'
// import useRecomendationStore from '../../stores/recomendation.store';
import Recommendation from '../../components/recommendation/RecommendationsClick';
import GetRecommendation from '../../components/recommendation/GetRecommendation';

function KeywordSearchGroupList() {
  const results = useSearchStore((state) => state.searchAllResults)
  const loading = useSearchStore((state) => state.searchLoading);
  const isResults = useSearchStore((state) => state.isSearchResults);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);

  return (
    <div css={s.container}>
    <div css={s.mainBox}>
      <h3 >"{searchKeyword}" 검색결과 입니다.</h3>
      {loading ? 
      <p>로딩중....</p> 
      : 
      isResults === null ?  null : !isResults ? (
        <ul css={s.categoryList}>
      {results.map(result => (
        <li css={s.groupLi} key={result.groupId}>
          <div>{result.groupImage}</div>
          <div css={s.line}></div>
          <div css={s.listDetail}>
            <p css={s.content}>{result.groupTitle}</p>
            <p css={s.content}>
            </p>
          </div>
          <div css={s.listDetail}>
          <p>{result.groupDate}</p>
          <p>{result.groupAddress}</p>
          </div>
        </li>
      ))}
      </ul>
      ) : (
      <p>검색결과가 없습니다.</p>
    )}
    </div>
    </div>
  )
}

export default KeywordSearchGroupList
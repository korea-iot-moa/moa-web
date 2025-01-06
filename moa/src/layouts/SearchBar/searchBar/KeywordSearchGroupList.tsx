/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from '../resultStyle'
import usePaginationScroll from "../../../components/paginationScroll/usePaginationScroll";
import { useParams } from 'react-router-dom';
import PaginationScroll from '../../../components/paginationScroll/PaginationScroll';

function KeywordSearchGroupList() {
  const { keyword } = useParams<{ keyword: string }>();
  const searchKeyword = keyword || '';
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: 'http://localhost:8081/api/v1/auth/meeting-group',
    limit: 10,
    extraParams: { keyword: searchKeyword },
  });

  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div css={s.container}>
      <h3 >"{keyword}" 검색결과 입니다.</h3>
      <div>
        <button onClick={() => handleSortChange("recent")}>최신순</button>
        <button onClick={() => handleSortChange("default")}>기본순</button>
        <button onClick={() => handleSortChange("past")}>과거순</button>
        <button onClick={() => handleSortChange("recommendation")}>추천순</button>
      </div>
      <div>
      {loading ? (
          <p>로딩 중...</p>
        ) : (
          <PaginationScroll datas={data}/>
            )}
    </div>
    </div>
  )
}

export default KeywordSearchGroupList
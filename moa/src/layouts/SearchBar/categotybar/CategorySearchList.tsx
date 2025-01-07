/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "../resultStyle";
import usePaginationScroll from "../../../components/paginationScroll/usePaginationScroll";
import { useParams } from "react-router-dom";
import PaginationScroll from "../../../components/paginationScroll/PaginationScroll";

function CategorySearchList() {
  const { groupCategory, region} = useParams<{ groupCategory?: string; region?: string }>();
  const groupCategoryWord = groupCategory || '';
  const regionWord = region || '';
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: 'http://localhost:8080/api/v1/auth/meeting-group/groupCategory',
    limit: 10,
    extraParams: { groupCategory:groupCategoryWord, region: regionWord },
  });

  // 모임필터 핸들들
  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div css={s.container}>
      <div css={s.mainBox}>
        <h3>카테고리 검색결과</h3>
        <ul css={s.selectCategry}>
          <li css={s.category}>{groupCategory}</li>
          <li>|</li>
          <li css={s.category}>{region}</li>
        </ul>
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
    </div>
  );
}

export default CategorySearchList;

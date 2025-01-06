/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react'
import PaginationScroll from '../../components/paginationScroll/PaginationScroll';
import usePaginationScroll from '../../components/paginationScroll/usePaginationScroll';


function RegularGroup() {
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: "http://localhost:8081/api/v1/auth/meeting-group/groupType",
    limit: 10,
    extraParams: {groupType: "정기모임"}
  });

  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div css={s.container}>
      <p>정기모임</p>
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

export default RegularGroup;
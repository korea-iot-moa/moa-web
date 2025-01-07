/** @jsxImportSource @emotion/react */
import * as s from "./style";
import PaginationScroll from '../../components/paginationScroll/PaginationScroll';
import usePaginationScroll from '../../components/paginationScroll/usePaginationScroll';
import { useState } from "react";

function ShortGroup() {
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: "http://localhost:8081/api/v1/auth/meeting-group/groupType",
    limit: 10,
    extraParams: {groupType: "단기모임"}
  });

  const [isClick, setIsClick] = useState<boolean>(false);

  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div css={s.container}>
      <p>단기모임</p>
      <div css={s.buttonDiv}>
        <button onClick={() => handleSortChange("recent")}>최신순</button>
        <span>|</span>
        <button onClick={() => handleSortChange("default")}>기본순</button>
        <span>|</span>
        <button onClick={() => handleSortChange("past")}>과거순</button>
        <span>|</span>
        <button onClick={() => handleSortChange("recommendation")}>추천순</button>
      </div>
      <div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <PaginationScroll datas={data} />
            )}
      </div>
    </div>
  );
}


export default ShortGroup;
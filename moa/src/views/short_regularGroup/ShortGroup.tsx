/** @jsxImportSource @emotion/react */
import * as s from "./style";
import PaginationScroll from '../../components/paginationScroll/PaginationScroll';
import usePaginationScroll from '../../components/paginationScroll/paginationScroll/UsePaginationScroll';
import { useNavigate } from "react-router-dom";

function ShortGroup() {
  const navigator = useNavigate();

  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: "http://localhost:8081/api/v1/auth/meeting-group/groupType",
    recommendationApiUrl: "http://localhost:8081/api/v1/auth/recommendation",
    limit: 10,
    extraParams: {groupType: "단기모임"}
  });

  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div css={s.container}>
      <p>단기모임</p>
      <div>
        <button onClick={() => handleSortChange("recommendation")}>기본순</button>
        <button onClick={() => handleSortChange("default")}>추천순</button>
      </div>
      <div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <PaginationScroll data={data}/>
            )}
      </div>
    </div>
  );
}


export default ShortGroup;
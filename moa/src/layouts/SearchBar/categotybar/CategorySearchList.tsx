/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "../resultStyle";
import usePaginationScroll from "../../../components/paginationScroll/usePaginationScrollhook";
import { useParams } from "react-router-dom";
import PaginationScroll from "../../../components/paginationScroll/PaginationScroll";
import { CATEGORY_GET_API } from "../../../apis";

function CategorySearchList() {
  const { groupCategory, region } = useParams<{
    groupCategory?: string;
    region?: string;
  }>();
  const groupCategoryWord = groupCategory || "";
  const regionWord = region || "";
  const { data, loading, resetAndFetchData, updateParams } = usePaginationScroll({
    apiUrl: CATEGORY_GET_API,
    limit: 10,
    extraParams: { groupCategory: groupCategoryWord, region: regionWord },
  });

  const [btnStatus, setBtnStatus] = useState<string>("default");

  const handleSortChange = (sortBy: string) => {
    setBtnStatus(sortBy);
    resetAndFetchData(sortBy);
  };

  React.useEffect(() => {
    updateParams({ groupCategory: groupCategoryWord, region: regionWord });
  }, [groupCategoryWord, regionWord]);

  const btnStyle = (button: string) => ({
    color: btnStatus === button ? "#FF7B54" : "black",
  });

  const buttons = [
    { label: "기본순", sortBy: "default" },
    { label: "최신순", sortBy: "recent" },
    { label: "과거순", sortBy: "past" },
    { label: "추천순", sortBy: "recommendation" },
  ];

  return (
    <div css={s.container}>
      <div css={s.mainBox}>
        <h3>카테고리 검색결과</h3>
        <ul css={s.selectCategry}>
          <li css={s.category}>{groupCategory}</li>
          <li>|</li>
          <li css={s.category}>{region}</li>
        </ul>
        <div css={s.buttonContainer}>
          <div css={s.buttonDiv}>
            {buttons.map((button, index) => (
              <div key={index}>
                <button
                  style={btnStyle(button.sortBy)}
                  value={button.sortBy}
                  onClick={() => handleSortChange(button.sortBy)}
                >
                  {button.label}
                </button>
                {index < buttons.length - 1 && <span>|</span>}
              </div>
            ))}
          </div>
        </div>
        <div css={s.resultLine}></div>
        <div>
          {loading ? <p>로딩 중...</p> : <PaginationScroll datas={data} />}
        </div>
      </div>
    </div>
  );
}

export default CategorySearchList;

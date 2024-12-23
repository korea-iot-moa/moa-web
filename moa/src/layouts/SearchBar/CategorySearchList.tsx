/** @jsxImportSource @emotion/react */
import React from "react";
import { BsHeart } from "react-icons/bs";
import useSearchStore from "../../stores/search.store";
import * as s from "./resultStyle";

function CategorySearchList() {
  const results = useSearchStore((state) => state.results);
  const isResults = useSearchStore((state) => state.isResults);
  const loading = useSearchStore((state) => state.loading);
  const groupCategory = useSearchStore((state) => state.groupCategory);
  const region = useSearchStore((state) => state.region);

  return (
    <div css={s.container}>
      <div css={s.mainBox}>
        <h3>카테고리 검색결과</h3>
        <ul css={s.selectCategry}>
          <li css={s.category}>{groupCategory}</li>
          <li>|</li>
          <li css={s.category}>{region}</li>
        </ul>
        {loading ? (
          <p>검색중....</p>
        ) : isResults === null ? null : !isResults ? (
          <p>검색결과가 없습니다.</p>
        ) : (
          <ul css={s.categoryList}>
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
        )}
      </div>
    </div>
  );
}

export default CategorySearchList;

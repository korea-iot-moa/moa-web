/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "../style";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const navigator = useNavigate();

    const handleSearch = async ( e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
      if ("key" in e && e.key !== "Enter") {
        return;
      }
      if(keyword.trim()){
        navigator(`/main/search/searchresult/${keyword}`);
      }
    }
  
  const handleKwordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div css={s.container}>
      <div css={s.searchBar}>
        <div css={s.searchBarLine}>
          <button css={s.searchBtn} value={keyword} 
          onClick={handleSearch}
          >
            <IoSearchOutline />
          </button>
          <input
            css={s.searchInput}
            type="search"
            value={keyword}
            onChange={handleKwordList}
            onKeyDown={handleSearch}
            placeholder="모임 이름을 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
}

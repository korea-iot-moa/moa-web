/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect } from "react";
import * as s from "./style";
import { IoSearchOutline } from "react-icons/io5";
import useSearchStore from "../../stores/search.store";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const keyword = useSearchStore((state) => state.keyword);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResults = useSearchStore((state) => state.searchResults);

  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const setSearchAllResults = useSearchStore((state) => state.setSearchAllResults);
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const setSearchLoading = useSearchStore((state) => state.setSearchLoading);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);
  const setIsSearchResult = useSearchStore((state) => state.setIsSearchResults);

  const navigator = useNavigate();
  
  const fetchData = async () => {
    setSearchLoading(true);
    
    if (!keyword.trim()) {
      setSearchResults([]);
      setIsSearchResult(null);
      setSearchLoading(false);
      return;
    }

    try {
      const response = await axios.get(
          `http://localhost:8081/api/v1/auth/meeting-group`,
          { params: { keyword } }
        );
        const keywordData = response.data.data;
        setSearchAllResults(keywordData);
        
        if(keywordData.length > 0) {
          setIsSearchResult(false);
        } else {
          setIsSearchResult(true);
        }
        
      } catch (error) {
        console.log("Errorfetching data: ", error);
      } finally {
        setSearchLoading(false);
      }
    } 

    const handleSearch = async ( e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
      if ("key" in e && e.key !== "Enter") {
        return;
      }

      await fetchData();
      navigator("/search/searchresult");
      setSearchKeyword(keyword);
    }
  
  const handleKwordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // const handleFetchDataEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
  //   if(e.key === "Enter") {
  //     e.preventDefault();
  //     setSearchKeyword(keyword);
  //     navigator("/search/searchresult");
  //   }
  // }

  return (
    <div css={s.container}>
      <div css={s.searchBar}>
        <div css={s.searchBarLine}>
          <button css={s.searchBtn} value={searchKeyword} 
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
        <div>
          {/* <ul>
            {searchResults.map((searchResult, index) => (
              <li key={index}>{searchResult.groupTitle}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

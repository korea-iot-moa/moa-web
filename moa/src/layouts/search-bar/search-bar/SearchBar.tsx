/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "../style";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MeetingGroup } from "../../../types";
import { SEARCHBAR_GET_API } from "../../../apis";

export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<MeetingGroup[]>([]);
  const navigator = useNavigate();

  const handleSearch = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") {
      return;
    }
    if (keyword.trim()) {
      navigator(`/main/search/searchresult/${keyword}`);
    }
  };

  const fetchData = async (keyword: string) => {
    if (keyword.trim()) {
      try {
        const response = await axios.get(SEARCHBAR_GET_API, {
          params: { keyword },
        });
        const datas: MeetingGroup[] = response.data.data;

        const uniqueData = Array.from(
          datas
            .reduce((map, data) => map.set(data.groupTitle, data), new Map())
            .values()
        );

        const uniqueDatSlice = uniqueData.slice(0, 5);

        if (keyword !== "") {
          setResults(uniqueDatSlice);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    fetchData(keyword);
  }, [keyword]);

  const handleKeywordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClickSandValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <div css={s.container}>
      <div css={s.searchBar}>
        <div css={s.searchBarLine}>
          <button css={s.searchBtn} value={keyword} onClick={handleSearch}>
            <IoSearchOutline />
          </button>
          <input
            css={s.searchInput}
            type="search"
            value={keyword}
            onChange={handleKeywordList}
            onKeyDown={handleSearch}
            placeholder="모임 이름을 입력해주세요."
          />
        </div>
      </div>
      <ul css={s.searchTitleList}>
        {results.map((result, index) => (
          <li key={index}>
            <button onClick={handleClickSandValue} value={result.groupTitle}>
              {result.groupTitle}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

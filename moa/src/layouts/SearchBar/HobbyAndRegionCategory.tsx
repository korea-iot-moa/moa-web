/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useState } from "react";
import useSearchStore from "../../stores/search.store";
import { useNavigate } from "react-router-dom";

function HobbyAndRegionCategory ()  {
  const setGroupCategory = useSearchStore((state) => state.setGroupCategory);
  const setRegion = useSearchStore((state) => state.setRegion);
  const setResults = useSearchStore((state) => state.setResults);
  const setIsResults = useSearchStore((state) => state.setIsResults);
  const setLoading = useSearchStore((state) => state.setLoading);
  const groupCategory = useSearchStore((state) => state.groupCategory);
  const region = useSearchStore((state) => state.region);
  const navigator = useNavigate();
  const [openClose, setOpenClose] = useState<boolean>(false);


  const handleHobbyFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    setGroupCategory(selectCategory);
  };

  const handleResionFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    setRegion(selectCategory);
  };

  const categoryButtonStyle = (button: string) => ({
        backgroundColor: groupCategory === button ? "red" : "rgb(194, 189, 189)",
        color: groupCategory === button ? "white" : "black" 
  });

  const regionButtonStyle = (button:string) => ({
      backgroundColor: region === button ? "red" : "rgb(194, 189, 189)",
      color: region === button ? "white" : "black" 
  });

  const handlefetchCategoryBtn = async (e:React.MouseEvent<HTMLButtonElement>) => {
    navigator('/search/categoryresult')
    if(!groupCategory || !region){
      alert("카테고리와 지역을 모두 선택해주세요.");
      return;
    }
    setOpenClose(prev=> !prev);

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/auth/meeting-group/groupCategory`,
        { params: { groupCategory, region } }
      );
      const categoryData = response.data.data;
      setResults(categoryData);
      
      if(categoryData.length > 0){
        setIsResults(true);
      } else {
        setIsResults(false);
      };
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {openClose ? 
      null
      :
      <div css={s.categorybox}>
        <div css={s.cateogyTitle}>
          <p>카테고리</p>
          <ul css={s.ulStyle}>
            {["취미", "문화_예술", "스포츠_운동", "푸드_맛집", "자기계발", "여행", "연애", "힐링"].map((category) => (
              <li key={category}>
                <button
                  css={s.buttonStyle}
                  style={categoryButtonStyle(category)}
                  onClick={handleHobbyFilterClick}
                  value={category}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>지역</p>
          <ul css={s.ulStyle}>
              {["서울", "인천", "대전", "광주", "세종", "울산", "부산", "대구", "경기", "충북", "충남", "강원", "전북", "전남", "경북", "경남", "제주"].map(
                (region) =>(
                  <li key={region}>
                    <button
                    css={s.buttonStyle}
                      style={regionButtonStyle(region)} 
                      onClick={handleResionFilterClick} 
                      value={region}
                    >
                      {region}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
                <button 
                css = {s.categorySearchBtn}
                onClick={handlefetchCategoryBtn}>검색</button>
      </div>
      }
    </div>
  );
};

export default HobbyAndRegionCategory;

/** @jsxImportSource @emotion/react */
import * as s from "../style";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategoryBarStore from "../../../stores/categoryBar.store";

const HobbyAndRegionCategory = () => {
  const [groupCategory, setGroupCategory] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const navigator = useNavigate();
  const category = useCategoryBarStore((state) => state.isOpen);
  const setCategory = useCategoryBarStore((state) => state.setIsOpne);

  // 취미카테고리 버튼 이벤트 핸들러
  const handleHobbyFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    setGroupCategory(selectCategory);
  };

  // 지역카테고리 버튼 이벤트 핸들러
  const handleResionFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value;
    setRegion(selectCategory);
  };

  // 취미버튼 스타일
  const categoryButtonStyle = (button: string) => ({
    backgroundColor:
      groupCategory === button ? "#FF7B54" : "rgb(224, 224, 224)",
    color: groupCategory === button ? "white" : "black",
  });

  // 지역버튼 스타일
  const regionButtonStyle = (button: string) => ({
    backgroundColor: region === button ? "#FF7B54" : "rgb(224, 224, 224)",
    color: region === button ? "white" : "black",
  });

  // 검색버튼 이벤트 핸들러
  const handlefetchCategoryBtn = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!groupCategory || !region) {
      alert("취미 혹은 지역을 선택해주세요.");
    } else {
      navigator(`/main/search/categoryresult/${groupCategory}/${region}`);
    }
    setCategory(false);
  };

  return (
    <div css={s.mainContainer}>
      {category ? (
        <div css={s.categorybox}>
          <div css={s.cateogyTitle}>
            <p>카테고리</p>
            <ul css={s.ulStyle}>
              {[
                "취미",
                "문화_예술",
                "스포츠_운동",
                "푸드_맛집",
                "자기계발",
                "여행",
                "연애",
                "힐링",
              ].map((category) => (
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
          <div css={s.cateogyTitle}>
            <p>지역</p>
            <ul css={s.ulStyle}>
              {[
                "서울",
                "인천",
                "대전",
                "광주",
                "세종",
                "울산",
                "부산",
                "대구",
                "경기",
                "충북",
                "충남",
                "강원",
                "전북",
                "전남",
                "경북",
                "경남",
                "제주",
              ].map((region) => (
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
          {category && (
            <div css={s.buttonDiv}>
              <button
                css={s.categorySearchBtn}
                onClick={handlefetchCategoryBtn}
              >
                검색
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default HobbyAndRegionCategory;

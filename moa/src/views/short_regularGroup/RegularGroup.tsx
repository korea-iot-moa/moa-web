/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react'
import PaginationScroll from '../../components/paginationScroll/PaginationScroll';
import usePaginationScroll from '../../components/paginationScroll/usePaginationScroll';


function RegularGroup() {
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: "http://localhost:8081/api/v1/auth/meeting-group/groupType",
    limit: 10,
    extraParams: {groupType: "정기모임"}
  });

  const [btnStatus, setBtnStatus] = useState<string>('default');
  
    const handleSortChange = (sortBy: string) => {
      setBtnStatus(sortBy);
      resetAndFetchData(sortBy);
    };
  
    const btnStyle = (button: string) => ({
      color: btnStatus === button ? "red" : "black" 
    })
  
    const buttons = [
      { label: "기본순", sortBy: "default" },
      { label: "최신순", sortBy: "recent" },
      { label: "과거순", sortBy: "past" },
      { label: "추천순", sortBy: "recommendation" },
    ];

  return (
    <div css={s.container}>
      <h3>정기모임</h3>
        <div css={s.buttonDiv}>
          {
            buttons.map((button, index) => (
              <div key={index}>
                <button style={btnStyle(button.sortBy)}
                value={button.sortBy} 
                onClick={() => handleSortChange(button.sortBy)}
                >
                  {button.label}
                </button>
                {index < buttons.length -1 &&  <span>|</span>}
              </div>
            ))
          }
        </div>
        <div css={s.resultLine}></div>
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
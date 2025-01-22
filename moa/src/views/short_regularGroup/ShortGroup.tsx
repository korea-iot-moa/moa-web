/** @jsxImportSource @emotion/react */
import * as s from "./style";
import PaginationScroll from "../../components/paginationScroll/PaginationScroll";
import usePaginationScroll from "../../components/paginationScroll/usePaginationScrollhook";
import { useState } from "react";
import { GROUP_TYPE_API } from "../../apis";

function ShortGroup() {
  const { data, loading, resetAndFetchData } = usePaginationScroll({
    apiUrl: GROUP_TYPE_API,
    limit: 10,
    extraParams: { groupType: "단기모임" },
  });

  const [btnStatus, setBtnStatus] = useState<string>("default");

  const handleSortChange = (sortBy: string) => {
    setBtnStatus(sortBy);
    resetAndFetchData(sortBy);
  };

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
      <div>
        <h3>단기모임</h3>
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
        <div css={s.resultLine}></div>
      </div>
      <div>
        {loading ? <p>로딩 중...</p> : <PaginationScroll datas={data} />}
      </div>
    </div>
  );
}

export default ShortGroup;

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { MeetingGroup } from '../../types';
import * as s from "./style";

interface PaginationScrollProps {
  fetchPageData: (page: number) => Promise<MeetingGroup[]>
  totalProducts: number;
  productsPerPage: number;
}


const PaginationScroll:React.FC<PaginationScrollProps> = ({ fetchPageData, totalProducts,  productsPerPage}) => {
  const [items, setItems] = useState<MeetingGroup[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    loadPageData(currentPage);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const loadPageData = async (page: number): Promise<void> => {
    if (page > totalPages) return;
    setLoading(true);
    try {
      const newItems = await fetchPageData(page);
      if (!Array.isArray(newItems)) {
        console.error("데이터가 배열이 아닙니다.", newItems);
        return;
      }
      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (error) {
      console.error("데이터 로드 중 오류 발생: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500
    ) {
      if(!loading && currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };


  return (
    <div>
      {items.map((item) => (                     
        <li css={s.groupLi} key={item.groupId}>
          <div>{item.groupImage}</div>
          <div css={s.line}></div>
          <div css={s.listDetail}>
            <p css={s.content}>{item.groupTitle}</p>
            <p css={s.content}>
            </p>
          </div>
          <div css={s.listDetail}>
            <p>{item.groupDate}</p>
            <p>{item.groupAddress}</p>
          </div>
        </li>
  

      ))}
      {loading && <p>로딩 중...</p>}
      {currentPage >= totalPages && <p>모든 데이터를 불러왔습니다.</p>}
    </div>
  );
};

export default PaginationScroll
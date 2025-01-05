/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { MeetingGroup } from '../../../types';
import axios from 'axios';

interface PaginationScrollProps<T> {
  apiUrl: string; // 기본 API URL
  recommendationApiUrl?: string; // 추천순 API URL (선택적)
  limit: number; // 한 페이지의 데이터 수
  extraParams?: Record<string, string>;
}

function UsePaginationScroll<T> ({ 
  apiUrl,
  recommendationApiUrl,
  limit,
  extraParams = {},
  }:PaginationScrollProps<T>) { 
  const [data, setData] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("default");

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
        const api = sortBy === "recommendation" && recommendationApiUrl ? recommendationApiUrl : apiUrl;
        const response = await axios.get(api, {
          params: {page, limit, sortBy, ...extraParams },
        });
        setData((prev) => [...prev, ...response.data.data]);
        setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("데이터 요청 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const resetAndFetchData = (newSortBy: string) => {
    setSortBy(newSortBy);
    setData([]);
    setCurrentPage(1);
    fetchData(1);
  };
  

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (sortBy) {
      resetAndFetchData(sortBy);
    }
  }, [sortBy]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      currentPage < totalPages &&
      !loading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, totalPages]);


  return { data, loading, resetAndFetchData }
    
};

export default UsePaginationScroll;
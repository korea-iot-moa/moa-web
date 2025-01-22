/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { MeetingGroup } from "../../types";
import axios from "axios";

interface PaginationScrollProps<T> {
  apiUrl: string;
  limit: number;
  extraParams?: Record<string, string>;
}

function usePaginationScroll<T>({
  apiUrl,
  limit,
  extraParams = {},
}: PaginationScrollProps<T>) {
  const [data, setData] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("default");
  const [params, setParams] = useState(extraParams); // extraParams를 상태로 관리

  const fetchData = async (page: number, updatedParams = params) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: { page, limit, sortBy, ...updatedParams },
      });
      const newData = response.data.data;

      const sortedData = [...newData].sort((a, b) => {
        if (sortBy === "recent") {
          return (
            new Date(b.groupDate).getTime() - new Date(a.groupDate).getTime()
          );
        } else if (sortBy === "recommendation") {
          return b.recommendationCount - a.recommendationCount;
        } else if (sortBy === "past") {
          return (
            new Date(a.groupDate).getTime() - new Date(b.groupDate).getTime()
          );
        } else {
          return a.groupId - b.groupId;
        }
      });

      setData((prev) => {
        const combinedData = [...prev, ...sortedData];
        return combinedData.filter(
          (item, index, self) =>
            self.findIndex((i) => i.groupId === item.groupId) === index
        );
      });

      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("데이터 요청 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    fetchData(1);
  }, [sortBy]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
    fetchData(1, params);
  }, [params]);

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

  const updateParams = (newParams: Record<string, string>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return { data, loading, resetAndFetchData: setSortBy, updateParams };
}

export default usePaginationScroll;

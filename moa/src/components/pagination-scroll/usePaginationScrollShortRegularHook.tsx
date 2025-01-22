/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { MeetingGroup } from "../../types";
import axios from "axios";

interface PaginationScrollProps<T> {
  apiUrl: string;
  limit: number;
  extraParams?: Record<string, string>;
}

function usePaginationScrollShortRegularHook<T>({
  apiUrl,
  limit,
  extraParams = {},
}: PaginationScrollProps<T>) {
  const [data, setData] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("default");

  const fetchData = async (page: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: { page, limit, sortBy, ...extraParams },
      });
      const newData = response.data.data;

      const sortedData = [...newData].sort((a, b) => {
        if (sortBy === "recent") {
          const dateA = new Date(a.groupDate).getTime();
          const dateB = new Date(b.groupDate).getTime();
          return dateB - dateA;
        } else if (sortBy === "recommendation") {
          return b.recommendationCount - a.recommendationCount;
        } else if (sortBy === "past") {
          const dateA = new Date(a.groupDate).getTime();
          const dateB = new Date(b.groupDate).getTime();
          return dateA - dateB;
        } else {
          return a.groupId - b.groupId;
        }
      });

      setData((prev) => {
        const combinedData = [...prev, ...sortedData];
        const uniqueData = combinedData.filter(
          (item, index, self) =>
            self.findIndex((i) => i.groupId === item.groupId) === index
        );
        return uniqueData;
      });

      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    fetchData(currentPage);
  }, [currentPage, sortBy]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
    fetchData(1);
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

  return { data, loading, resetAndFetchData: setSortBy, extraParams };
}

export default usePaginationScrollShortRegularHook;

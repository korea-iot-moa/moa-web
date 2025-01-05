import React, { useEffect, useState } from "react";
import { MeetingGroup } from "../../types";
import axios from "axios";

function GetRecommendation() {
  const [results, setResults] = useState<MeetingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchDataGet = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/api/v1/recommendation", {
        params: { page, limit: 10, sortBy: "recommendation" },
      });
      setResults((prev) => [...prev, ...response.data.data]);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("추천 데이터 로드 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = () => {
    setResults([]);
    setCurrentPage(1);
    fetchDataGet(1);
  };

  useEffect(() => {
    fetchDataGet(currentPage);
  }, [currentPage]);

  return (
    <div>
      <button onClick={handleRecommendationClick}>추천순</button>
      {/* <PaginationScroll
        results={results}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
}

export default GetRecommendation;

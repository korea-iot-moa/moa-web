import usePagination from '@mui/material/usePagination/usePagination';
import React from 'react'
import usePaginationScroll from '../paginationScroll/usePaginationScroll';

interface RecommendationPageProps {
  apiUrl: string;
  extraParams?: Record<string, string>
}

function RecommendationPage() {
  const apiUrl = "http://localhost:8080/api/v1/recommendation";
  const { data, loading, resetAndFetchData} = usePaginationScroll({
    apiUrl,
    limit: 10,
    // sortBy: "recommendatoin",
  });

  const handleSortChange = (sortBy: string) => {
    resetAndFetchData(sortBy);
  };

  return (
    <div>
      <button onClick={() => handleSortChange("recommendatoin")}>추천순</button>
      <button onClick={() => handleSortChange("latest")}>최신순</button>
    </div>
  )
}

export default RecommendationPage
import React from 'react'
import UsePaginationScroll from '../paginationScroll/paginationScroll/UsePaginationScroll';

function RecommendationPage() {
  const apiUrl = "http://localhost:8081/api/v1/recommendation";
  const { data, loading, resetAndFetchData} = UsePaginationScroll({
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
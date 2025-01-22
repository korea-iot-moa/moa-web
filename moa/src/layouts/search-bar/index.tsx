import React from "react";
import SearchBar from "./search-bar/SearchBar";
import { Route, Routes } from "react-router-dom";
import KeywordSearchGroupList from "./search-bar/KeywordSearchGroupList";
import CategorySearchList from "./category-bar/CategorySearchList";

function index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route
          path="/searchresult/:keyword"
          element={<KeywordSearchGroupList />}
        />
        <Route
          path="/categoryresult/:groupCategory/:region"
          element={<CategorySearchList />}
        />
      </Routes>
    </div>
  );
}

export default index;

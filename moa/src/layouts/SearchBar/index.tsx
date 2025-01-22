import React from "react";
import SearchBar from "./searchBar/SearchBar";
import { Route, Routes } from "react-router-dom";
import KeywordSearchGroupList from "./searchBar/KeywordSearchGroupList";
import CategorySearchList from "./categotybar/CategorySearchList";

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

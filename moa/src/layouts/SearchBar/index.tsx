import React from 'react'
import SearchBar from './SearchBar';
import { Route, Routes } from 'react-router-dom';
import KeywordSearchGroupList from './KeywordSearchGroupList';

function SearchResult() {
  return (
    <div>
      <SearchBar/>
      <Routes>
        <Route path='/searchresult' element={<KeywordSearchGroupList />}/>
      </Routes>
    </div>
  )
}

export default SearchResult;
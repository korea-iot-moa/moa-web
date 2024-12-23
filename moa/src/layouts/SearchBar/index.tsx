import React from 'react'
import SearchBar from './SearchBar';
import { Route, Routes } from 'react-router-dom';
import KeywordSearchGroupList from './KeywordSearchGroupList';
import CategorySearchList from './CategorySearchList';

function SearchResult() {
  return (
    <div>
      <SearchBar/>
      <Routes>
        <Route path='/searchresult' element={<KeywordSearchGroupList />}/>
        <Route path='/categoryresult' element={<CategorySearchList />} />
      </Routes>
    </div>
  )
}

export default SearchResult;
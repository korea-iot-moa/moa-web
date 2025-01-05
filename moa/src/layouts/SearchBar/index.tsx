import React from 'react'
import SearchBar from './SearchBar';
import { Route, Routes } from 'react-router-dom';
import KeywordSearchGroupList from './KeywordSearchGroupList';
import CategorySearchList from './CategorySearchList';

function index() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SearchBar/>}/>
        <Route path='/searchresult' element={<KeywordSearchGroupList />}/>
        <Route path='/categoryresult' element={<CategorySearchList />} />
      </Routes>
    </div>
  )
}

export default index;
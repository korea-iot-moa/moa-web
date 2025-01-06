import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FindUserId from './FindUserId'
import FindUserIdResult from './FindUserIdResult';

function index() {
  return (
    <div>
    <Routes>
    <Route path="/findUserId/*" element={<FindUserId />} />
    <Route path="/findUserId/:userName/:userBirthDate" element={<FindUserIdResult />} />
    </Routes>  
    </div>
  )
}

export default index;
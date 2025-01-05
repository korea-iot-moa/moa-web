import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyPageStart from './MyPageStart'
import GetUserInfo from './GetUserInfo'
import DelelteUserInfoStart from './DelelteUserInfoStart'
import DelelteUserInfo from './DelelteUserInfo'
export default function index() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MyPageStart/>}/>
        <Route path='/userInfo' element={<GetUserInfo />}/>
        <Route path='/MembershipWithdrawal' element={<DelelteUserInfoStart />}/>
        <Route path='/MembershipWithdrawal/enter' element={<DelelteUserInfo/>}/>
      </Routes>
    </div>
  )
}

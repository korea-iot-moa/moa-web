import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyPageStart from './MyPageReview/getUserInfo/MyPageStart'
import GetUserInfo from './MyPageReview/getUserInfo/GetUserInfo'
import DelelteUserInfoStart from './MyPageReview/deleteUserInfo/DelelteUserInfoStart'
import DelelteUserInfo from './MyPageReview/deleteUserInfo/DelelteUserInfo'
export default function index() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<MyPageStart/>}/>
        <Route path='/user' element={<GetUserInfo />}/>
        <Route path='/MembershipWithdrawal' element={<DelelteUserInfoStart />}/>
        <Route path='/MembershipWithdrawal/enter' element={<DelelteUserInfo/>}/>
      </Routes>
    </div>
  )
}

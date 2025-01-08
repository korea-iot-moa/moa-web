import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyPageStart from './getUserInfo/MyPageStart'
import GetUserInfo from './getUserInfo/GetUserInfo'
import DelelteUserInfoStart from './deleteUserInfo/DelelteUserInfoStart'
import DelelteUserInfo from './deleteUserInfo/DelelteUserInfo'
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

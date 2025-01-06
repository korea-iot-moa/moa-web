import React from 'react'
import { Route, Routes } from 'react-router-dom'
import JoinGroupStart from './JoinGroupStart'
import JoinGroupAnswer from './JoinGroupAnswer'
import GroupAnswerResult from './GroupAnswerResult';
export default function Index() {

  return (
    <div>
      <Routes>
        <Route path={`/join-group/:groupId`} element={<JoinGroupStart />}/>
        <Route path={`/join-group/:groupId/group-user-answer`} element={<JoinGroupAnswer />}/>
        <Route path={`/join-group/:groupId/group-user-answer/result`} element={<GroupAnswerResult />}/>
      </Routes>
    </div>
  )
}

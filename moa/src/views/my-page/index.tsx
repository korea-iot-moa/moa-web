import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPageStart from "./get-user-info/MyPageStart";
import GetUserInfo from "./get-user-info/GetUserInfo";
import DelelteUserInfoStart from "./delete-user-info/DelelteUserInfoStart";
import DelelteUserInfo from "./delete-user-info/DelelteUserInfo";
export default function index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyPageStart />} />
        <Route path="/user/:booleanResult" element={<GetUserInfo />} />
        <Route
          path="/MembershipWithdrawal"
          element={<DelelteUserInfoStart />}
        />
        <Route
          path="/MembershipWithdrawal/enter"
          element={<DelelteUserInfo />}
        />
      </Routes>
    </div>
  );
}

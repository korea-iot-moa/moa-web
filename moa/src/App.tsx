import React from "react";
import RootLayout from "./layouts/RootLayout/RootLayout";
import RootContainer from "./layouts/RootContainer/RootContainer";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/index";
import GroupNaviBar from "./layouts/GroupNaviBar/GroupNaviBar";
import InformationNaviBar from "./layouts/InformationNaviBar/InformationNaviBar";
import SearchBar from "./layouts/SearchBar/SearchBar";
import Review from "./views/Review/Review";
import MainContainer from "./layouts/MainContainer/MainContainer";
import SignUp from "./views/Auth/SignUp/SignUp";
import SignIn from "./views/Auth/SignIn/SignIn";

function App() {
  return (
    <RootLayout>
      <GroupNaviBar />

      <RootContainer>
        <InformationNaviBar />
        <MainContainer>
          <Routes>
            {/* 메인 영역 라우트 설정 */}
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </Routes>
        </MainContainer>
      </RootContainer>
    </RootLayout>
  );
}

export default App;

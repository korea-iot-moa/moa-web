import React, { useEffect, useState } from "react";
import RootLayout from "./layouts/RootLayout/RootLayout";
import RootContainer from "./layouts/RootContainer/RootContainer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./views/Home/index";
import GroupNaviBar from "./layouts/GroupNaviBar/GroupNaviBar";
import InformationNaviBar from "./layouts/InformationNaviBar/InformationNaviBar";
import MainContainer from "./layouts/MainContainer/MainContainer";
import SignUp from "./views/Auth/SignUp/SignUp";
import SignIn from "./views/Auth/SignIn/SignIn";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import userAuthStore from "./stores/auth.store";
import { JOIN_GROUP_PAGE, REPORT_POST_PAGE } from "./contants";
import GroupHeader from "./views/JoinGroup/GroupHeader";
import SearchResult from "./layouts/SearchBar";
import CategorySearchList from "./layouts/SearchBar/CategorySearchList";
import ShortGroup from "./views/short_regularGroup/ShortGroup";
import RegularGroup from "./views/short_regularGroup/RegularGroup";
import Manager from "./views/Manager";
import {ThemeProvider,createTheme,Theme } from "@mui/material/styles";
import ReportPage from "./views/Report/ReportPage";
import CreateReview from "./views/Review/CreateReview/CreateReview";
import ReviewMain from "./views/Review/ReviewMain/ReviewMain";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light', // 또는 'dark'
    },
  });
  interface TokenUser {
    userId: string;
    nickName: string;
    profileImage: string | null;
  }

  const [cookies] = useCookies(["token"]);
  const { login, logout } = userAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      try {
        const decodedToken: any = jwtDecode(cookies.token);
        login({
          userId: decodedToken.userId,
          nickName: decodedToken.nickName,
          profileImage: decodedToken.profileImage,
        });
      } catch (e) {
        console.error("Invalid Token", e);
        logout();
      }
    } else {
      logout();
    }
  }, [cookies.token, login, logout]);
  return (
  <ThemeProvider theme={theme}>
    <RootLayout>
      <GroupNaviBar />
      <RootContainer>
        <InformationNaviBar />
        <MainContainer>
          <Routes>
            {/* 메인 영역 라우트 설정 */}
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path={JOIN_GROUP_PAGE} element={<GroupHeader/>} />
            <Route path='/search/*' element={
          <Routes>
            <Route path='/' element={<SearchResult />}/>
            <Route path='/categoryresult' element={<CategorySearchList />} />
            <Route path='/grouptype/shorttype' element={<ShortGroup />}/>
            <Route path='/grouptype/regulartype' element={<RegularGroup />}/>
          </Routes>
        }/>
            < Route path="/manager/:groupId" element ={ <Manager />} />          
            <Route path={JOIN_GROUP_PAGE} element={<GroupHeader />} />
            <Route path={REPORT_POST_PAGE} element={<ReportPage />} />
            <Route
              path="/search/*"
              element={
                <Routes>
                  <Route path="/" element={<SearchResult />} />
                  <Route
                    path="/categoryresult"
                    element={<CategorySearchList />}
                  />
                  <Route path="/grouptype/shorttype" element={<ShortGroup />} />
                  <Route
                    path="/grouptype/regulartype"
                    element={<RegularGroup />}
                  />
                </Routes>
              }
            />
            <Route path="/manager/user-list/:groupId" element={<Manager />} />

            <Route
              path="/review/*"
              element={
                <Routes>
                  <Route path="main" element={<ReviewMain />} />
                  {cookies.token ? (
                    <Route path="create" element={<CreateReview />} />
                  ) : (
                    <Navigate to="main" replace />
                  )}
                </Routes>
              }
            />
          </Routes>
        </MainContainer>
      </RootContainer>
    </RootLayout>
  </ThemeProvider>
  );
}

export default App;

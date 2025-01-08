import React, { useEffect, useState } from "react";
import RootLayout from "./layouts/RootLayout/RootLayout";
import RootContainer from "./layouts/RootContainer/RootContainer";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./views/Home/index";
import GroupNaviBar from "./layouts/GroupNaviBar/GroupNaviBar";
import InformationNaviBar from "./layouts/InformationNaviBar/InformationNaviBar";
import MainContainer from "./layouts/MainContainer/MainContainer";
import SignUp from "./views/Auth/SignUp/SignUp";
import SignIn from "./views/Auth/SignIn/SignIn";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import userAuthStore from "./stores/auth.store";
import * as p from "./contants";
import GroupHeader from "./views/JoinGroup/GroupHeader";
import SearchResult from "./layouts/SearchBar";
import CategorySearchList from "./layouts/SearchBar/categotybar/CategorySearchList";
import ShortGroup from "./views/short_regularGroup/ShortGroup";
import RegularGroup from "./views/short_regularGroup/RegularGroup";
import Manager from "./views/Manager";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import ReportPage from "./views/Report/ReportPage";
import CreateReview from "./views/Review/CreateReview/CreateReview";
import ReviewMain from "./views/Review/ReviewMain/ReviewMain";
import MyPage from "./views/MyPage/index";
import FindPassword from "./views/Auth/FindPassword/FindPassword";
import VerificationPassword from "./views/Auth/FindPassword/VerificationPassword";
import NoticePage from "./views/Notice/NoticePage";
import WebMainPage from "./views/WebMain/WebMainPage";
import CreateGroup from "./views/GroupDetail/CreateGroup/CreateGroup";
import CreateGroup_1 from "./views/GroupDetail/CreateGroup/CreateGroup_1";
import FindUserId from "./views/Auth/FindUserId/index";
import JoinGroup from "./views/JoinGroup/JoinGroup/index";
import MyPageReview from "./views/MyPage/MyPageReview";
import GroupDetailPage from "./views/GroupDetail/GroupDetailPage/GroupDetailPage";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  interface TokenUser {
    userId: string;
    nickName: string;
    profileImage: string | null;
  }

  const [cookies] = useCookies(["token"]);
  const { login, logout } = userAuthStore();

  const location = useLocation();

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
    <>
      {location.pathname === p.WEB_MAIN ? (
        <Routes>
          <Route path={p.WEB_MAIN} element={<WebMainPage />} />
        </Routes>
      ) : (
        <RootLayout>
          <GroupNaviBar />
          <RootContainer>
            <InformationNaviBar />
            <MainContainer>
              <Routes>
                {/* 메인 영역 라우트 설정 */}
                <Route path={p.WEB_APP_MAIN} element={<Home />} />
                <Route path={p.SIGN_UP_PAGE} element={<SignUp />} />
                <Route path={p.SIGN_IN_PAGE} element={<SignIn />} />
                <Route path={p.FIND_PASSWORD_PAGE} element={<FindPassword />} />
                <Route
                  path={p.FIND_PASSWORD_PAGE}
                  element={<FindPassword />}
                />
                <Route path={p.FIND_USERID_PAGE} element={<FindUserId />} />
                <Route
                  path={p.FIND__VERIFY_PASSWORD_PAGE}
                  element={<VerificationPassword />}
                />
                <Route path={p.JOIN_GROUP_PAGE} element={<GroupHeader />} />
                <Route path={p.REPORT_POST_PAGE} element={<ReportPage />} />
                <Route
                  path="/search/*"
                  element={
                    <Routes>
                      <Route path="/" element={<SearchResult />} />
                      <Route
                        path="/categoryresult"
                        element={<CategorySearchList />}
                      />
                      <Route
                        path="/grouptype/shorttype"
                        element={<ShortGroup />}
                      />
                      <Route
                        path="/grouptype/regulartype"
                        element={<RegularGroup />}
                      />
                    </Routes>
                  }
                />
                <Route path="/main/create-group" element={<CreateGroup />} />
                <Route
                path="/main/create-group"
                element={<CreateGroup/>}
                />
                {/* <Route
                path="/main/create-group_1/:groupId"
                element={<CreateGroup_1/>}
                /> */}
                <Route
                  path="/main/create-group_1"
                  element={<CreateGroup_1 />}
                />
                <Route
                  path="/main/manager/user-list/:groupId"
                  element={
                    <ThemeProvider theme={theme}>
                      <Manager />
                    </ThemeProvider>
                  }
                />
                <Route
                  path="/review/*"
                  element={
                    <Routes>
                      {/* 리뷰 메인 */}
                      <Route path={p.REVIEW_MAIN} element={<ReviewMain />} />

                      {/* 리뷰 생성 페이지 */}
                      <Route
                        path={p.CREATE_REVIEW_PAGE}
                        element={
                          cookies.token ? (
                            <CreateReview />
                          ) : (
                            <Navigate to={p.SIGN_IN_PAGE} replace />
                          )
                        }
                      />

                      {/* 리뷰 마이페이지 */}
                      <Route
                        path={p.MY_PAGE_REVIEW}
                        element={
                          cookies.token ? (
                            <MyPageReview />
                          ) : (
                            <Navigate to={p.SIGN_IN_PAGE} replace />
                          )
                        }
                      />
                    </Routes>
                  }
                />
                {/* 공지사항 페이지 */}
                <Route path={p.NOTICE_PAGE} element={<NoticePage />} />
                <Route
                  path={p.NOTICE_PAGE}
                  element={<NoticePage />}
                />
              {/* 모임참여 신청 */}
              <Route path={p.GROUP_JOIN_PAGE} element={
                          cookies.token ? (
                            <JoinGroup />
                          ) : (
                            <Navigate to={p.SIGN_IN_PAGE} replace />
                          )} />
              {/* 마이페이지 내정보 수정 */}
              <Route path={p.MY_PAGE} element={
                          cookies.token ? (
                            <MyPage />
                          ) : (
                            <Navigate to={p.SIGN_IN_PAGE} replace />
                          )} />
              {/* 그룹 상세 페이지 */}
              <Route path={p.GROUP_DETAIL} element={<GroupDetailPage />}/>
              </Routes>
            </MainContainer>
          </RootContainer>
        </RootLayout>
      )}
    </>
  );
}

export default App;

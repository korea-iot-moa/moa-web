import React, { useEffect } from "react";
import RootLayout from "./layouts/root-layout/RootLayout";
import RootContainer from "./layouts/root-container/RootContainer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import * as p from "./constants";
import Home from "./views/home/index";
import GroupNaviBar from "./layouts/group-navi-bar/GroupNaviBar";
import InformationNaviBar from "./layouts/information-navi-bar/InformationNaviBar";
import MainContainer from "./layouts/main-container/MainContainer";
import SignUp from "./views/auth/signup/SignUp";
import SignIn from "./views/auth/signin/SignIn";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import userAuthStore from "./stores/auth.store";
import GroupHeader from "./views/join-group/GroupHeader";
import Manager from "./views/manager";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReportPage from "./views/report/ReportPage";
import CreateReview from "./views/review/create-review/CreateReview";
import ReviewMain from "./views/review/review-main/ReviewMain";
import MyPage from "./views/my-page/index";
import FindPassword from "./views/auth/find-password/FindPassword";
import VerificationPassword from "./views/auth/find-password/VerificationPassword";
import NoticePage from "./views/notice/NoticePage";
import WebMainPage from "./views/web-main/WebMainPage";
import CreateGroup from "./views/group-detail/create-group/CreateGroup";
import FindUserId from "./views/auth/find-user-id/index";
import JoinGroup from "./views/join-group/join-group/index";
import MyPageReview from "./views/my-page/mypage-review/MyPageReview";
import GroupDetailPage from "./views/group-detail/group-detail-page/GroupDetailPage";
import AuthRedirectHandler from "./views/auth/signup/AuthRedirectHandler";
import SnsSuccess from "./views/auth/signin/SnsSuccess";
import ParticipationStatusPage from "./views/my-page/participation-status-page/ParticipationStatusPage";
import SearchBar from "./layouts/search-bar/index";

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
                <Route path={p.WEB_APP_MAIN} element={<Home />} />
                <Route path={p.SIGN_UP_PAGE} element={<SignUp />} />
                <Route path={p.AUTH_PAGE} element={<AuthRedirectHandler />} />
                <Route path={p.SIGN_IN_PAGE} element={<SignIn />} />
                <Route path={p.SNS_SUCCESS_PAGE} element={<SnsSuccess />} />
                <Route path={p.FIND_PASSWORD_PAGE} element={<FindPassword />} />
                <Route path={p.FIND_USERID_PAGE} element={<FindUserId />} />
                <Route
                  path={p.FIND__VERIFY_PASSWORD_PAGE}
                  element={<VerificationPassword />}
                />
                <Route path={p.JOIN_GROUP_PAGE} element={<GroupHeader />} />
                <Route path={p.REPORT_POST_PAGE} element={<ReportPage />} />
                <Route path={p.SEARCH_PAGE} element={<SearchBar />} />
                <Route path={p.CREATE_GROUP} element={<CreateGroup />} />
                <Route
                  path={p.USER_LIST_PAGE}
                  element={
                    <ThemeProvider theme={theme}>
                      <Manager />
                    </ThemeProvider>
                  }
                />
                <Route
                  path={p.REVIEW_PAGE}
                  element={
                    <Routes>
                      <Route path={p.REVIEW_MAIN} element={<ReviewMain />} />

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
                <Route path={p.NOTICE_PAGE} element={<NoticePage />} />
                <Route path={p.NOTICE_PAGE} element={<NoticePage />} />
                <Route
                  path={p.GROUP_JOIN_PAGE}
                  element={
                    cookies.token ? (
                      <JoinGroup />
                    ) : (
                      <Navigate to={p.SIGN_IN_PAGE} replace />
                    )
                  }
                />
                <Route
                  path={p.MY_PAGE}
                  element={
                    cookies.token ? (
                      <MyPage />
                    ) : (
                      <Navigate to={p.SIGN_IN_PAGE} replace />
                    )
                  }
                />
                <Route path={p.GROUP_DETAIL} element={<GroupDetailPage />} />
                <Route
                  path={p.PARTICIPATION_STATUS_PAGE}
                  element={
                    cookies.token ? (
                      <ParticipationStatusPage />
                    ) : (
                      <Navigate to={p.SIGN_IN_PAGE} replace />
                    )
                  }
                />
              </Routes>
            </MainContainer>
          </RootContainer>
        </RootLayout>
      )}
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import RootLayout from "./layouts/RootLayout/RootLayout";
import RootContainer from "./layouts/RootContainer/RootContainer";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/index";
import GroupNaviBar from "./layouts/GroupNaviBar/GroupNaviBar";
import InformationNaviBar from "./layouts/InformationNaviBar/InformationNaviBar";
import Review from "./views/Review/Review";
import MainContainer from "./layouts/MainContainer/MainContainer";
import SignUp from "./views/Auth/SignUp/SignUp";
import SignIn from "./views/Auth/SignIn/SignIn";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import userAuthStore from "./stores/auth.store";
import { JOIN_GROUP_PAGE } from "./contants";
import JoinGroupPage from "./views/JoinGroup/JoinGroupPage";
import NaverMapComponent from "./components/NaverMap"
import SearchResult from "./layouts/SearchBar";
import CategorySearchList from "./layouts/SearchBar/CategorySearchList";
import ShortGroup from "./views/short_regularGroup/ShortGroup";
import RegularGroup from "./views/short_regularGroup/RegularGroup";
import Manager from "./views/Manager";


function App() {
  interface TokenUser {
    userId: string;
    nickName: string;
    profileImage: string | null;
  }

  const [cookies] = useCookies(["token"]);
  const { login, logout } = userAuthStore();

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
            <Route path="/review" element={<Review />} />

            <Route path={JOIN_GROUP_PAGE} element={<JoinGroupPage />} />
            <Route path='/search/*' element={
          <Routes>
            <Route path='/' element={<SearchResult />}/>
            <Route path='/categoryresult' element={<CategorySearchList />} />
            <Route path='/grouptype/shorttype' element={<ShortGroup />}/>
            <Route path='/grouptype/regulartype' element={<RegularGroup />}/>
          </Routes>
        }/>
            <Route path="/manager/user-list/:groupId" element={<Manager/>}/>

          </Routes>
        </MainContainer>
      </RootContainer>
    </RootLayout>
  );
}

export default App;

/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { css } from "@emotion/react";
import { useCookies } from 'react-cookie';
import userAuthStore from '../stores/auth.store';
import { useNavigate } from 'react-router-dom';

const boxSt = css`
  width: 200px;
  max-width: 300px;
  position: absolute;
  top: 100%; 
  right: 50px; 
  z-index: 3; 
  border-radius: 10px;
  padding: 2;

  @media (max-width: 1240px) {
    right: calc(100% - 750px); 
  }
`;

const leaveBtnSt = css`
  color: #f44336;
  font-weight: bold;
`;

const defaultBtnSt = css`
  color: #0a3140;
  font-weight: bold;
`;


export default function HamburgerMenu() {
  const { logout } = userAuthStore();
  const [ cookies, setCookies, removeCookie ] = useCookies(["token"]);
  const navigator = useNavigate();

  const handleLogoutClick = () => {
    setCookies("token", "", { expires: new Date() });
    removeCookie("token", { path: "/" });
    logout();
    navigator("/main");
  };

  React.useEffect(() => {
      if (!cookies.token) {
        logout();
      }
    }, [cookies.token, logout]);


  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
      }}
      css={boxSt}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemText css={defaultBtnSt} primary="로그아웃" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator('/mypage/userInfo')}>
              <ListItemText css={defaultBtnSt} primary="회원정보 수정" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator("/review/myPage")}>
              <ListItemText css={defaultBtnSt} primary="내 후기 관리" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator('/mypage/participationStatus')}>
              <ListItemText css={defaultBtnSt} primary="내 모임 관리" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigator('/notice')}>
              <ListItemText css={defaultBtnSt} primary="공지사항" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() =>navigator('/mypage/MembershipWithdrawal')} css={leaveBtnSt}>
              <ListItemText  primary="회원탈퇴" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

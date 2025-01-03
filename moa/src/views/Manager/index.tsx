import * as React from "react";
import styled from "@emotion/styled";
import {
  Tab as BaseTab,
  TabsList as BaseTabsList,
  TabPanel as BaseTabPanel,
  tabClasses,
  buttonClasses,
} from "@mui/base";
import { createTheme, ThemeProvider, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Tabs } from "@mui/base/Tabs";
import ManagerHome from "./ManagerHome/ManagerHome";

import { useParams } from "react-router-dom";
import BlackList from "./BlackList/BlackList";
import Chart from "./Chart/Chart";
import Vote from "./Vote/Vote";
import Report from "./Report/Report";
import Approved from "./Approved";

const creatoId = "ckck7290";

export default function Index() {
  const { groupId } = useParams();
  console.log(groupId);
  // const navigator = useNavigate();
  const parseToNumGroupId = Number(groupId);

  if (!creatoId) {
    alert("관리자만 접근 할 수 있습니다!");
    return null;
  }


  return (
    <div>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>유저</Tab>
          <Tab value={1}>차트</Tab>
          <Tab value={2}>투표</Tab>
          <Tab value={3}>블랙</Tab>
          <Tab value={4}>신고</Tab>
          <Tab value={5}>승인</Tab>
        </TabsList>
        <TabPanel value={0}>
          {/* 각 컴포넌트에 index.tsx 해당 파일에 있는 groupId값을 props로 전달하기 */}
          <ManagerHome  parseToNumGroupId={parseToNumGroupId}/>
        </TabPanel>
        <TabPanel value={1}>
          <Chart  parseToNumGroupId={parseToNumGroupId}/>
        </TabPanel>
        <TabPanel value={2}>
          <Vote  parseToNumGroupId={parseToNumGroupId}/>
        </TabPanel>
        <TabPanel value={3}>
          <BlackList parseToNumGroupId={parseToNumGroupId} />
        </TabPanel>
        <TabPanel value={4}>
          <Report  parseToNumGroupId={parseToNumGroupId}/>
        </TabPanel>
        <TabPanel value={5}>
          <Approved parseToNumGroupId={parseToNumGroupId}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

const theme = createTheme({
  palette: {
    mode: "light", // 또는 'dark'
    grey: {
      50: "#F3F6F9",
      100: "#E5EAF2",
      200: "#DAE2ED",
      300: "#C7D0DD",
      400: "#B0B8C4",
      500: "#9DA8B7",
      600: "#6B7A90",
      700: "#434D5B",
      800: "#303740",
      900: "#1C2025",
    },
  },
});

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 10px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: space-evenly;

  &:hover {
    background-color: ${grey[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${grey[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${grey[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)<{ theme?: Theme }>(
  ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 20px 12px;
  ackground: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `
);

const TabsList = styled(BaseTabsList)<{ theme?: Theme }>(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${grey[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  place-content: space-between center;
  box-shadow: 0 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

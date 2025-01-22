/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetGenderChartResponseDto,
  GetQuarterCharResponseDto,
} from "../../../types/dto/response.dto";
import { AllBox, GenderChartBox, QuartChartName, QuarterBox } from "./style";
import GenderChartComponent from "./GenderChartComponent";
import QuarterChartComponent from "./QuarterChartComponent";
import { GENDER_CHART_GET_API, USER_CHART_API } from "../../../apis";

interface ChartProps {
  parseToNumGroupId: number;
}

const Chart: React.FC<ChartProps> = ({ parseToNumGroupId }) => {
  const [genderChart, setGenderChart] = useState<GetGenderChartResponseDto[]>(
    []
  );
  const [quarterChart, setQuarterChart] = useState<GetQuarterCharResponseDto[]>(
    []
  );
  const { groupId } = useParams();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    fetchGenderChart();
    fetchUserChart();
  }, [groupId, cookies.token]);

  const fetchGenderChart = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${GENDER_CHART_GET_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setGenderChart(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchUserChart = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${USER_CHART_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setQuarterChart(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div css={AllBox}>
      <div css={GenderChartBox}>
        <h1>성별 차트</h1>
        <GenderChartComponent data={genderChart} />
        <div>
          <div>남성 : 💙</div>
          <div>여성 : 🍎 </div>
        </div>
      </div>
      <div css={QuarterBox}>
        <h1 css={QuartChartName}>분기별 유입율 </h1>
        <QuarterChartComponent data={quarterChart} />
      </div>
    </div>
  );
};
export default Chart;

/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GetReportListResponseDto } from "../../../types/dto/response.dto";


import {
  DeleteReportResponseDto,
  PostReportRequestDto,
} from "../../../types/dto/request.dto";
import { ReportResult } from "../../../types";
import { REPORT_API, REPORT_IMG_API } from "../../../apis";
import { LayerBox } from "./style";
interface ReportProps {
  parseToNumGroupId: number;
}

const Report: React.FC<ReportProps> = ({ parseToNumGroupId }) => {
  const [reportList, setReportList] = useState<GetReportListResponseDto[]>([]);
  const [cookies] = useCookies(["token"]);
  const [openState, setOpenState] = useState<Record<number, boolean>>({});
  const [reportImg, setReportImg] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  
  useEffect(() => {
    if (parseToNumGroupId && cookies.token) {
      fetchReportList();
    }
  }, [parseToNumGroupId, cookies.token]);

  const fetchReportList = async () => {
    if (cookies.token) {
      try {
        const response = await axios.get(
          `${REPORT_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
        setReportList(responseData);
        
      if (responseData.reportImage) {
        const imageUrl = `${REPORT_IMG_API}${responseData.reportImage}`;
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(reportImg);
      }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePostReport = async (
    reportUser: string,
    reportResult: ReportResult
  ) => {
    if (cookies.token) {
      try {
        const postReportRequestDto: PostReportRequestDto = {
          reportUser: reportUser,
          reportResult,
        };
        
        const response = await axios.post(
          `${REPORT_API}${parseToNumGroupId}`,
          postReportRequestDto,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setReportList((prevList) =>
          prevList.filter((item) => item.reportUser !== reportUser)
        );
      } catch (error) {
        console.error(error);
        setReportList([]);
      }
    }
  };

  const openHiddenBox = (reportId: number) => {
    setOpenState((openState) => ({
      ...openState,
      [reportId]: !openState[reportId],
    }));
  };

  const handleDeleteReport = async (
    userId: string,
    reportResult: ReportResult
  ) => {
    if (cookies.token) {
      try {
        const deleteReportRequestDto: DeleteReportResponseDto = {
          userId: userId,
          reportResult: reportResult,
        };
        const response = await axios.delete(
          `${REPORT_API}${parseToNumGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            data: deleteReportRequestDto,
            withCredentials: true,
          }
        );
        const responseData = response.data.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3>신고 접수건: {reportList?.length || 0} </h3>
      <ul>
        {reportList.map((data) => (
          <li key={data.reportId}>
            <strong> 신고한 사람: </strong> {data.userId} ---
            <strong> 신고 받은 사람: </strong> {data.reportUser}
            <button css ={s.Botton}  onClick={() => openHiddenBox(data.reportId)}> 오픈 </button>
            <div
              css={LayerBox}
              style={{
                visibility: openState[data.reportId] ? "visible" : "hidden",
              }}
            >
              <p>
                <strong>신고한 내용:</strong> {data.reportDetail}
              </p>
              <p>
                <strong>신고 종류:</strong> {data.reportType}
              </p>
              <div>
                <img
                  src={data.reportImage ? data.reportImage : undefined}
                  alt={
                    data.reportImage ? "신고 이미지 미리보기" : "기본 이미지"
                  }
                  onError={(e) => (e.currentTarget.src = "")} 
                  style={{
                    width: "100px", 
                    height: "100px",
                    objectFit: "cover", 
                  }}
                />
              </div>
              <button
                css={s.Botton}
                onClick={() =>
                  handlePostReport(data.reportUser, "추방" as ReportResult)
                }
              >
                방출
              </button>
              <button
                css={s.Botton}
                onClick={() =>
                  handleDeleteReport(data.userId, "유지" as ReportResult)
                }
              >
                완료
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Report;

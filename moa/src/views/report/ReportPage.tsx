/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { IoArrowBackOutline } from "react-icons/io5";
import { PostReportDto } from "../../types";
import userAuthStore from "../../stores/auth.store";
import img from "../../images/moaLogo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { REPORT_POST_API } from "../../apis";

export default function ReportPage() {
  const { groupId, reportUserId } = useParams();
  const groupIdNum = Number(groupId);

  const { userId } = userAuthStore();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [postClear, setPostClear] = useState<boolean>(false);
  const [reportImg, setReportImg] = useState<any>(null);
  const [reportData, setReportData] = useState<PostReportDto>({
    groupId: groupIdNum,
    reportDetail: "",
    reportType: "욕설",
    reportUser: reportUserId || "",
    reportImage: null,
  });

  const backPage = () => {
    navigate(-1);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = e.target;

    setReportData({
      ...reportData,
      [element.name]: element.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const element = e.target;

    setReportData({
      ...reportData,
      [element.name]: element.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const imgFile: FileList = e.target.files;
      setReportData((prev) => ({
        ...prev,
        [e.target.name]: imgFile[0],
      }));
    }
  };

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setReportImg(e.target?.result);
    };

    if (!!reportData.reportImage) {
      fileReader.readAsDataURL(reportData.reportImage);
    }
  }, [reportData.reportImage]);

  const handleReset = () => {
    const groupIdNum = Number(groupId);
    setReportData({
      groupId: groupIdNum,
      reportDetail: "",
      reportType: "욕설",
      reportUser: reportUserId || "",
      reportImage: null,
    });
    setReportImg(undefined);
  };

  const handlePostReportData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const reportDataForm = new FormData();

    Object.entries(reportData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "reviewImage" && value instanceof File) {
          reportDataForm.append(key, value);
        } else {
          reportDataForm.append(key, String(value));
        }
      }
    });

    try {
      const response = await axios.post(REPORT_POST_API, reportDataForm, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.result) {
        setOpenModal(true);
        setModalMessage("신고 등록 완료");
        setPostClear(true);
      }
    } catch (error) {
      console.error(error);
      setOpenModal(true);
      setPostClear(false);
      setModalMessage("신고 등록에 실패하였습니다.");
    }
  };

  const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/join-group/${groupId}`);
  };

  return (
    <div css={s.fullBox}>
      <div css={s.header}>
        <h1>
          <IoArrowBackOutline css={s.backPage} onClick={backPage} /> 신고 게시판
        </h1>
        <p>
          ※ 신고 사항은 해당 모임의 관리자만 확인이 가능하고 수정이 불가하니
          신중하게 작성해 주세요.
        </p>
      </div>
      <div css={s.mainBox}>
        <div css={s.mainHeader}>
          <div>
            <p>신고 대상: </p>
            <p>{reportUserId}</p>
          </div>
          <div>
            <select
              name="reportType"
              id="reportReason"
              value={reportData.reportType}
              onChange={handleSelectChange}
            >
              <option value="욕설">욕설</option>
              <option value="사기">사기</option>
              <option value="성추행">성추행</option>
              <option value="폭행">폭행</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>

        <div css={s.content}>
          <textarea
            name="reportDetail"
            id="reportContent"
            placeholder="신고 내용"
            value={reportData.reportDetail}
            onChange={handleContentChange}
          ></textarea>
        </div>

        <div css={s.imgFile}>
          <div>
            {!reportImg ? (
              <img src={img} />
            ) : (
              <img src={reportImg} alt="미리보기 사진" />
            )}
          </div>
          <div>
            <input
              type="file"
              id="reportImage"
              name="reportImage"
              onChange={handleFileChange}
            />
            <label htmlFor="reportImage">파일 선택</label>
          </div>
        </div>
      </div>
      <div css={s.btnBox}>
        <button onClick={handleReset}>초기화</button>
        <button onClick={handlePostReportData}>등록</button>
      </div>
      {openModal && (
        <div css={s.modalBox}>
          {modalMessage}
          {postClear ? (
            <button onClick={handleModal}>완료</button>
          ) : (
            <button onClick={() => setOpenModal(false)}>닫기</button>
          )}
        </div>
      )}
    </div>
  );
}

/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PostGroupResonseDto } from "../../../types/dto/response.dto";
import { PostGroupRequestDto } from "../../../types/dto/request.dto";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GroupCategory, GroupType, MeetingType } from "../../../types";
import { bottomBox, Tab } from "./style";
import { AllBox } from "../../Manager/Chart/style";

const CreateGroup_1 = () => {
  const [groupImage, setGroupImage] = useState([]);
  const [privewImage, setPriviewImage] = useState([]);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [cookies] = useCookies(["token", "userId"]);
  const location = useLocation();
  const [isPosting, setIsPosting] = useState(false);
  const { formData } = location.state || {};
  const [formDetails, setFormDetails] = useState({
    groupTitle: "",
    groupContent: "",
    groupSupplies: "",
    groupImage: [],
    groupQuestion: "",
  });

  const handlePrevePage = () => {
    navigate("/main/create-group");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //모임 생성
  const handlePostGroup = async () => {
    if (isPosting) return;
    setIsPosting(true);
    const postGroupRequestDto = {
      groupTitle: formDetails.groupTitle,
      groupContent: formDetails.groupContent,
      groupSupplies: formDetails.groupSupplies,
      groupQuestion: formDetails.groupQuestion,
      groupAddress: formData.groupAddress,
      groupDate: formData.groupDate,
      groupCategory: formData.groupCategory,
      groupType: formData.groupType,
      meetingType: formData.meetingType,
      groupImage:formDetails.groupImage
    };
    const url = `http://localhost:8080/api/v1/meeting-group`;
    if (cookies.token) {
      try {
        const response = await axios.post(url, postGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          alert("모임 등록되었습니다");
          navigate("/main");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    
  }

  return (
    <div css={s.CreatorBox_1}>
      <strong>모임 게시물</strong>
      <div>
        <strong>
          <h2>제목</h2>
        </strong>
        <input
          type="text"
          css={s.TitleInput}
          placeholder="모임 제목 "
          value={formDetails.groupTitle}
          onChange={(e) => handleInputChange("groupTitle", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>내용</h2>
        </strong>
        <input
          type="text"
          css={s.ContentBox}
          placeholder="모임에 대한 소개말"
          value={formDetails.groupContent}
          onChange={(e) => handleInputChange("groupContent", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>준비물</h2>
        </strong>
        <input
          type="text"
          css={s.TitleInput}
          placeholder="모임 필요한 준비물"
          value={formDetails.groupSupplies}
          onChange={(e) => handleInputChange("groupSupplies", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>질문</h2>
        </strong>
        <input
          type="text"
          css={s.TitleInput}
          placeholder="설정하고 싶은 질문"
          value={formDetails.groupQuestion}
          onChange={(e) => handleInputChange("groupQuestion", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>모임사진 등록</h2>
        </strong>

        <input
          type="file"
          id="groupImage"
          name="groupImage"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div css={bottomBox}>
        <button css={Tab} onClick={handlePrevePage}>
          이전
        </button>
        <button css={Tab} onClick={handlePostGroup}>
          완료
        </button>
      </div>
    </div>
  );
};
export default CreateGroup_1;
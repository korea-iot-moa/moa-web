/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AllBox, DateBox, Tab } from "../../GroupDetail/CreateGroup/style";
import { buttonBox } from "./style";
import { GroupType } from "../../../types";
import { useNavigate } from "react-router-dom";

interface GroupUpdateProps {
  parseToNumGroupId: number;
}

const GroupUpdate: React.FC<GroupUpdateProps> = ({ parseToNumGroupId }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [shouldReload, setShouldReload] = useState(false);
  const [formData, setFormData] = useState({
    groupType: "",
    groupCategory: "",
    groupDate: "",
    meetingType: "",
    groupAddress: "",
    groupTitle: "",
    groupContent: "",
    groupSupplies: "",
    groupQuestion: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      const url = `http://localhost:8080/api/v1/auth/meeting-group/${parseToNumGroupId}`;
      if (cookies.token) {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
          setFormData(response.data.data || {});
        } catch (error) {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        }
      }
    };

    fetchGroupData();
  }, [parseToNumGroupId, cookies.token]);

  const handleUpdateGroup = async () => {
    const putGroupRequestDto = {
      groupTitle: formData.groupTitle,
      groupContent: formData.groupContent,
      groupSupplies: formData.groupSupplies,
      groupQuestion: formData.groupQuestion,
      groupAddress: formData.groupAddress,
      groupDate: formData.groupDate,
      groupCategory: formData.groupCategory,
      groupType: formData.groupType,
      meetingType: formData.meetingType,
    };
    const url = `http://localhost:8080/api/v1/meeting-group/${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        const response = await axios.put(url, putGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        const responseData = response.data.data;
        setFormData(responseData);
        console.log(responseData);
        alert("수정이 완료 되었습니다");
        navigate(`/main/manager/user-list/${parseToNumGroupId}`)
        setShouldReload((prev) => !prev);
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteGroup = async () => {
    const url = `http://localhost:8080/api/v1/meeting-group/${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        alert("모임 삭제가 되었습니다");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <strong>
        <h4>모임 유형</h4>
      </strong>
      <div css={s.buttonBox}>
        <button
          css={formData.groupType === "단기모임" ? s.activeTab : s.Tab}
          value="단기모임"
          onClick={() => handleInputChange("groupType", "단기모임")}
        >
          단기 모임
        </button>
        <button
          css={formData.groupType === "정기모임" ? s.activeTab : s.Tab}
          value="정기모임"
          onClick={() => handleInputChange("groupType", "정기모임")}
        >
          정기 모임
        </button>
      </div>
      <div>
        <h1 css={s.label}>*모임 카테고리</h1>{" "}
        <div css={s.AllBox}>
          <button
            css={formData.groupCategory === "취미" ? s.activeTab : s.Tab}
            value="취미"
            onClick={() => handleInputChange("groupCategory", "취미")}
          >
            취미
          </button>
          <button
            css={formData.groupCategory === "문화_예술" ? s.activeTab : s.Tab}
            value="문화_예술"
            onClick={() => handleInputChange("groupCategory", "문화_예술")}
          >
            문화_예술
          </button>
          <button
            css={formData.groupCategory === "스포츠_운동" ? s.activeTab : s.Tab}
            value="스포츠_운동"
            onClick={() => handleInputChange("groupCategory", "스포츠_운동")}
          >
            스포츠_운동
          </button>
          <button
            css={formData.groupCategory === "푸드_맛집" ? s.activeTab : s.Tab}
            value="푸드_맛집"
            onClick={() => handleInputChange("groupCategory", "푸드_맛집")}
          >
            푸드_맛집
          </button>
          <button
            css={formData.groupCategory === "자기계발" ? s.activeTab : s.Tab}
            value="자기계발"
            onClick={() => handleInputChange("groupCategory", "자기계발")}
          >
            자기계발
          </button>
          <button
            css={formData.groupCategory === "힐링" ? s.activeTab : s.Tab}
            value="힐링"
            onClick={() => handleInputChange("groupCategory", "힐링")}
          >
            힐링
          </button>
          <button
            css={formData.groupCategory === "연애" ? s.activeTab : s.Tab}
            value="연애"
            onClick={() => handleInputChange("groupCategory", "연애")}
          >
            연애
          </button>
          <button
            css={formData.groupCategory === "여행" ? s.activeTab : s.Tab}
            value="여행"
            onClick={() => handleInputChange("groupCategory", "여행")}
          >
            여행
          </button>
        </div>
      </div>
      <div>
        <strong>
          <h2>모임 날짜</h2>
        </strong>
        <input
          type="date"
          css={s.DateBox}
          value={formData.groupDate || ""}
          onChange={(e) => handleInputChange("groupDate", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>모임 장소</h2>
        </strong>
        <div css={s.buttonBox}>
          <button
            css={formData.meetingType === "온라인" ? s.activeTab : s.Tab}
            value="온라인"
            onClick={() => handleInputChange("meetingType", "온라인")}
          >
            온라인
          </button>
          <button
            css={formData.meetingType === "오프라인" ? s.activeTab : s.Tab}
            value="오프라인"
            onClick={() => handleInputChange("meetingType", "오프라인")}
          >
            오프라인
          </button>
        </div>
      </div>
      <div>
        <strong>
          <h2>모임 주소</h2>
        </strong>
        <textarea
          css={s.TitleInput}
          placeholder="모임 주소"
          value={formData.groupAddress}
          onChange={(e) => handleInputChange("groupAddress", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>제목</h2>
        </strong>
        <textarea
          placeholder="모임 제목 설정"
          css={s.TitleInput}
          value={formData.groupTitle}
          onChange={(e) => handleInputChange("groupTitle", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>내용</h2>
        </strong>
        <textarea
          placeholder="모임 내용"
          css={s.ContentBox}
          value={formData.groupContent}
          onChange={(e) => handleInputChange("groupContent", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>준비물</h2>
        </strong>
        <textarea
          placeholder="준비물"
          css={s.TitleInput}
          value={formData.groupSupplies}
          onChange={(e) => handleInputChange("groupSupplies", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>질문</h2>
        </strong>
        <textarea
          css={s.TitleInput}
          placeholder="모임가입시 질문"
          value={formData.groupQuestion}
          onChange={(e) => handleInputChange("groupQuestion", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>사진</h2>
        </strong>
        <input type="file" />
      </div>
      <div css={s.buttonBox}>
        <button css={s.Tab} onClick={handleUpdateGroup}>
          수정
        </button>
        <button css={s.Tab} onClick={handleDeleteGroup}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default GroupUpdate;

/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AllBox, DateBox, Tab } from "../../GroupDetail/CreateGroup/style";
import { buttonBox } from "./style";

interface GroupUpdate {
  parseToNumGroupId: number;
}

const GroupUpdate: React.FC<GroupUpdate> = ({ parseToNumGroupId }) => {
  const [cookies] = useCookies(["token"]);
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
      const url = `http://localhost:8080/api/v1/meeting-group/${parseToNumGroupId}`;
      if (cookies.token) {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
          setFormData(response.data.data); // 기존 데이터를 설정
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
      // groupImage : imgFile,
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
        alert("수정이 완료 되었습니다 ");
        setShouldReload((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //모임 삭제
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
      <div>
        <strong>
          <h2>모임 유형</h2>
        </strong>
        <div css={s.buttonBox}>
          <button
            css={Tab}
            onClick={() => handleInputChange("groupType", "단기모임")}
          >
            단기 모임
          </button>
          <button
            css={Tab}
            onClick={() => handleInputChange("groupType", "정기모임")}
          >
            정기 모임
          </button>
        </div>
      </div>
      <div>
        <strong>
          <h2>모임 카테고리</h2>
        </strong>
        <div css={AllBox}>
          <button css ={Tab} onClick={() => handleInputChange("groupCategory", "취미")}>
            취미
          </button>
          <button css ={Tab}
            onClick={() => handleInputChange("groupCategory", "문화_예술")}
          >
            문화_예술
          </button>
          <button css ={Tab}
            onClick={() => handleInputChange("groupCategory", "스포츠_운동")}
          >
            스포츠_운동
          </button>
          <button css ={Tab}
            onClick={() => handleInputChange("groupCategory", "푸드_맛집")}
          >
            푸드_맛집
          </button>
          <button css ={Tab}
            onClick={() => handleInputChange("groupCategory", "자기개발")}
          >
            자기계발
          </button>
          <button css ={Tab} onClick={() => handleInputChange("groupCategory", "여행")}>
            여행
          </button>
          <button css ={Tab} onClick={() => handleInputChange("groupCategory", "힐링")}>
            힐링
          </button>
        </div>
      </div>
      <div>
        <strong>
          <h2>모임 날짜</h2>
        </strong>
        <input
          type="date"
          css={DateBox}
          value={formData.groupDate}
          onChange={(e) => handleInputChange("groupDate", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>모임 장소</h2>
        </strong>
        <div css={s.buttonBox}>
        <button css ={Tab} onClick={() => handleInputChange("meetingType", "온라인")}>
          온라인
        </button>
        <button css ={Tab} onClick={() => handleInputChange("meetingType", "오프라인")}>
          오프라인
        </button>
        </div>
      </div>
      <div>
        <strong>
          <h2>모임 주소</h2>
        </strong>
        <input
          type="text"
          css={s.TitleInput}
          placeholder={formData.groupAddress}
          value={formData.groupAddress}
          onChange={(e) => handleInputChange("groupAddress", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>제목</h2>
        </strong>
        <input
          placeholder="모임 제목 설정"
          css={s.TitleInput}
          type="text"
          value={formData.groupTitle}
          onChange={(e) => handleInputChange("groupTitle", e.target.value)}
        />
      </div>
      <div>
        <strong>
          <h2>내용</h2>
        </strong>
        <input
          placeholder=""
          css={s.ContentBox}
          type="text"
          value={formData.groupContent}
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
          value={formData.groupSupplies}
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
          value={formData.groupQuestion}
          onChange={(e) => handleInputChange("groupQuestion", e.target.value)}
        />
      </div>
      <div css={buttonBox}>
        <button css ={Tab} onClick={() => handleUpdateGroup()}>수정</button>
        <button css ={Tab} onClick={() => handleDeleteGroup()}>삭제</button>
      </div>
    </div>
  );
};

export default GroupUpdate;

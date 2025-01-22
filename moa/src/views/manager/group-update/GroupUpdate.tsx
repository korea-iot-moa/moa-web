/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import groupImage from "../../../images/group.jpg";
import { GROUP_UPDATE_API, MANGE_HOME_IMG_API } from "../../../apis";

interface GroupUpdateProps {
  parseToNumGroupId: number;
}

const GroupUpdate: React.FC<GroupUpdateProps> = ({ parseToNumGroupId }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [groupImg, setGroupImg] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
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
    groupImg: null,
  });

  useEffect(() => {
    fetchGroupData();
  }, [parseToNumGroupId, cookies.token]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setGroupImg(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const fetchGroupData = async () => {
    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;

    if (!cookies.token) {
      console.error("토큰이 없습니다. 데이터를 가져올 수 없습니다.");
      return;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });

      const data = response.data.data;

      if (!data) {
        console.error("응답 데이터가 없습니다.");
        return;
      }

      setFormData({
        groupType: data.groupType || "",
        groupCategory: data.groupCategory || "",
        groupDate: data.groupDate || "",
        meetingType: data.meetingType || "",
        groupAddress: data.groupAddress || "",
        groupTitle: data.groupTitle || "",
        groupContent: data.groupContent || "",
        groupSupplies: data.groupSupplies || "",
        groupQuestion: data.groupQuestion || "",
        groupImg: data.groupImage || "",
      });

      if (data.groupImage) {
        const imageUrl = `${MANGE_HOME_IMG_API}${data.groupImage}`;
        setPreviewUrl(imageUrl);
      } else {
        setPreviewUrl(groupImage);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      alert("데이터를 가져오는 데 실패했습니다. 나중에 다시 시도하세요.");
    }
  };

  const handleUpdateGroup = async () => {
    const putGroupRequestDto = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        putGroupRequestDto.append(key, value as string);
      }
    });

    if (groupImg) {
      putGroupRequestDto.append("groupImage", groupImg);
    }

    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        const response = await axios.put(url, putGroupRequestDto, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert("수정이 완료되었습니다.");

          const updatedGroupData = response.data.data;

          if (updatedGroupData.groupImage) {
            setPreviewUrl(updatedGroupData.groupImage);
          }
          setFormData({
            groupType: updatedGroupData.groupType || "",
            groupCategory: updatedGroupData.groupCategory || "",
            groupDate: updatedGroupData.groupDate || "",
            meetingType: updatedGroupData.meetingType || "",
            groupAddress: updatedGroupData.groupAddress || "",
            groupTitle: updatedGroupData.groupTitle || "",
            groupContent: updatedGroupData.groupContent || "",
            groupSupplies: updatedGroupData.groupSupplies || "",
            groupQuestion: updatedGroupData.groupQuestion || "",
            groupImg: updatedGroupData.groupImage || "",
          });

          if (updatedGroupData.groupImage) {
            setPreviewUrl(
              `${MANGE_HOME_IMG_API}${updatedGroupData.groupImage}`
            );
          } else {
            setPreviewUrl(null);
          }
        }
      } catch (error) {
        console.error(error);
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleDeleteGroup = async () => {
    const url = `${GROUP_UPDATE_API}${parseToNumGroupId}`;
    if (cookies.token) {
      try {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        });
        alert("모임 삭제가 되었습니다");
        navigate(`/main/manager/user-list/${parseToNumGroupId}`);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <strong>
        <h2 css={s.label}>모임 유형</h2>
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
      <div css={s.Container}>
        <h2 css={s.label}>모임 카테고리</h2>{" "}
        <div css={s.AllBox}>
          {[
            "취미",
            "문화_예술",
            "스포츠_운동",
            "푸드_맛집",
            "자기계발",
            "힐링",
            "연애",
            "여행",
          ].map((category) => (
            <button
              key={category}
              css={formData.groupCategory === category ? s.activeTab : s.Tab}
              onClick={() => handleInputChange("groupCategory", category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>모임 날짜</h2>
        </strong>
        <input
          type="date"
          css={s.DateBox}
          value={formData.groupDate || ""}
          onChange={(e) => handleInputChange("groupDate", e.target.value)}
        />
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>모임 장소</h2>
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
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>모임 주소</h2>
        </strong>
        <textarea
          css={s.TitleInput}
          placeholder="모임 주소"
          value={formData.groupAddress}
          onChange={(e) => handleInputChange("groupAddress", e.target.value)}
        />
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>제목</h2>
        </strong>
        <textarea
          placeholder="모임 제목 설정"
          css={s.TitleInput}
          value={formData.groupTitle}
          onChange={(e) => handleInputChange("groupTitle", e.target.value)}
        />
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>내용</h2>
        </strong>
        <textarea
          placeholder="모임 내용"
          css={s.ContentBox}
          value={formData.groupContent}
          onChange={(e) => handleInputChange("groupContent", e.target.value)}
        />
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>준비물</h2>
        </strong>
        <textarea
          placeholder="준비물"
          css={s.TitleInput}
          value={formData.groupSupplies}
          onChange={(e) => handleInputChange("groupSupplies", e.target.value)}
        />
      </div>
      <div css={s.Container}>
        <strong>
          <h2 css={s.label}>질문</h2>
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
          <h2 css={s.label}>모임사진</h2>
        </strong>
        <div css={s.Container}>
          <img
            src={previewUrl || groupImage}
            alt="미리보기"
            style={{ width: "400px", height: "200px" }}
          />
        </div>
        <div>
          <input type="file" id="groupImg" onChange={handleFileChange} />
        </div>
        <div css={s.Container}>
          <div css={s.buttonBox}>
            <button css={s.MoveButton} onClick={handleUpdateGroup}>
              수정
            </button>
            <button css={s.MoveButton} onClick={handleDeleteGroup}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupUpdate;

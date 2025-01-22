/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { CREATE_GROUP_API } from "../../../apis";
import groupImage from "../../../images/group.jpg";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "userId"]);
  const [groupImg, setGroupImg] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  const [page, setPage] = useState(0);
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: value ? "" : `${field} 값을 입력해주세요.`,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      setGroupImg(file);
    } else {
      setGroupImg(null);
    }
  };

  useEffect(() => {
    if (groupImg) {
      const objectUrl = URL.createObjectURL(groupImg);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(null);
  }, [groupImg]);

  const handleNextPage = () => {
    if (!formData.groupType) {
      alert("모임 유형을 선택해주세요.");
      return;
    }
    if (!formData.groupDate) {
      alert("모임 날짜를 입력해주세요.");
      return;
    }
    if (!formData.meetingType) {
      alert("모임 장소를 선택해주세요.");
      return;
    }
    if (!formData.groupAddress) {
      alert("모임 주소를 입력해주세요.");
      return;
    }

    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => setPage((prev) => prev - 1);

  const handlePostGroup = async () => {
    const postGroupRequestDto = new FormData();
    Object.keys(formData).forEach((key) => {
      postGroupRequestDto.append(key, formData[key as keyof typeof formData]);
    });

    if (groupImg) {
      postGroupRequestDto.append("groupImage", groupImg);
    }
    try {
      const response = await axios.post(CREATE_GROUP_API, postGroupRequestDto, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("모임이 성공적으로 등록되었습니다!");
        navigate("/main");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("모임 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {page === 0 && (
        <div css={s.CreatorBox}>
          <div>
            <h4>모임 유형</h4>
            <div css={s.AllBox}>
              <button
                css={formData.groupType === "단기모임" ? s.activeTab : s.Tab}
                onClick={() => handleInputChange("groupType", "단기모임")}
              >
                단기 모임
              </button>
              <button
                css={formData.groupType === "정기모임" ? s.activeTab : s.Tab}
                onClick={() => handleInputChange("groupType", "정기모임")}
              >
                정기 모임
              </button>
            </div>
          </div>

          <div css={s.Container}>
            <h4>모임 카테고리</h4>
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
                  css={
                    formData.groupCategory === category ? s.activeTab : s.Tab
                  }
                  onClick={() => handleInputChange("groupCategory", category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div css={s.Container}>
            <h4>모임 날짜</h4>
            <input
              type="date"
              css={s.DateBox}
              value={formData.groupDate}
              onChange={(e) => handleInputChange("groupDate", e.target.value)}
            />
          </div>

          <div css={s.Container}>
            <h4>모임 장소</h4>
            <div css={s.AllBox}>
              <button
                css={formData.meetingType === "온라인" ? s.activeTab : s.Tab}
                onClick={() => handleInputChange("meetingType", "온라인")}
              >
                온라인
              </button>
              <button
                css={formData.meetingType === "오프라인" ? s.activeTab : s.Tab}
                onClick={() => handleInputChange("meetingType", "오프라인")}
              >
                오프라인
              </button>
            </div>
          </div>

          <div css={s.Container}>
            <h4>모임 주소</h4>
            <input
              type="text"
              css={s.TitleInput}
              value={formData.groupAddress}
              onChange={(e) =>
                handleInputChange("groupAddress", e.target.value)
              }
            />
          </div>

          <div css={s.BottomButtonContainer}>
            <button css={s.MoveButton} onClick={handlePrevPage}>
              이전
            </button>
            <button css={s.MoveButton} onClick={handleNextPage}>
              다음
            </button>
          </div>
        </div>
      )}

      {page === 1 && (
        <div>
          <div>
            <h4>모임 게시물</h4>
            <input
              type="text"
              css={s.TitleInput}
              placeholder="모임 제목"
              value={formData.groupTitle}
              onChange={(e) => handleInputChange("groupTitle", e.target.value)}
            />
          </div>
          <div css={s.Container}>
            <h4>내용</h4>
            <textarea
              css={s.ContentBox}
              placeholder="모임에 대한 소개말"
              value={formData.groupContent}
              onChange={(e) =>
                handleInputChange("groupContent", e.target.value)
              }
            />
          </div>
          <div css={s.Container}>
            <h4>준비물</h4>
            <input
              type="text"
              css={s.TitleInput}
              placeholder="모임 필요한 준비물"
              value={formData.groupSupplies}
              onChange={(e) =>
                handleInputChange("groupSupplies", e.target.value)
              }
            />
          </div>
          <div css={s.Container}>
            <h4>질문</h4>
            <input
              type="text"
              css={s.TitleInput}
              placeholder="설정하고 싶은 모입 가입 질문"
              value={formData.groupQuestion}
              onChange={(e) =>
                handleInputChange("groupQuestion", e.target.value)
              }
            />
          </div>

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

          <div css={s.BottomButtonContainer}>
            <button css={s.MoveButton} onClick={handlePrevPage}>
              이전
            </button>
            <button css={s.MoveButton} onClick={handlePostGroup}>
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

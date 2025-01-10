/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PostGroupResonseDto } from "../../../types/dto/response.dto";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab } from "./style";
import { useCookies } from "react-cookie";
import axios from "axios";
import { imgFile } from "../../Report/style";
import { error } from "console";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupImg, setGroupImg] = useState<any>(null);
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
    groupImage: null,
    groupQuestion: "",
  });
  const [cookies] = useCookies(["token", "userId"]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 유효성 검사
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} 값을 입력해주세요.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  //다음페이지 이동
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

  //이전 페이지 이동
  const handlePrevPage = () => setPage((prev) => prev - 1);

  //이미지 파일
  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setGroupImg(e.target?.result);
    };
    if (!!formData.groupImage) {
      fileReader.readAsDataURL(formData.groupImage);
    }
  }, [formData.groupImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imgFile = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: imgFile,
      }));
    } else {
      console.error("파일이 선택되지 않았습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/main");
    alert("모임 생성이 취소 되었습니다.");
  };

  const handlePostGroup = async () => {
    const postGroupRequestDto = {
      groupTitle: formData.groupTitle,
      groupContent: formData.groupContent,
      groupImage: formData.groupImage,
      groupSupplies: formData.groupSupplies,
      groupQuestion: formData.groupQuestion,
      groupAddress: formData.groupAddress,
      groupDate: formData.groupDate,
      groupCategory: formData.groupCategory,
      groupType: formData.groupType,
      meetingType: formData.meetingType,
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
        const responseData = response.data.data;
        setFormData(responseData);
        console.log(responseData)
        if (response.status === 200) {
          alert("모임이 성공적으로 등록되었습니다!");
          navigate("/main");
        }
      
      } catch (error) {
        console.error(error);
        alert("모임 등록에 실패했습니다. 다시 시도해주세요 ");
      }
    }
  };

  return (
    <div>
      {page === 0 && (
        <>
          <div css={s.CreatorBox}>
            <div>
              <strong>
                <h4>모임 유형</h4>
              </strong>
              <div css={s.AllBox}>
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
            </div>

            <div>
              <strong>
                <h4>모임 카테고리</h4>
              </strong>
              <div css={s.AllBox}>
                <button
                  css={formData.groupCategory === "취미" ? s.activeTab : s.Tab}
                  value="취미"
                  onClick={() => handleInputChange("groupCategory", "취미")}
                >
                  취미
                </button>
                <button
                  css={
                    formData.groupCategory === "문화_예술" ? s.activeTab : s.Tab
                  }
                  value="문화_예술"
                  onClick={() => handleInputChange("groupCategory", "문화_예술")}
                >
                  문화_예술
                </button>
                <button
                  css={
                    formData.groupCategory === "스포츠_운동"
                      ? s.activeTab
                      : s.Tab
                  }
                  value="스포츠_운동"
                  onClick={() =>
                    handleInputChange("groupCategory", "스포츠_운동")
                  }
                >
                  스포츠_운동
                </button>
                <button
                  css={
                    formData.groupCategory === "푸드_맛집" ? s.activeTab : s.Tab
                  }
                  value="푸드_맛집"
                  onClick={() => handleInputChange("groupCategory", "푸드_맛집")}
                >
                  푸드_맛집
                </button>
                <button
                  css={
                    formData.groupCategory === "자기개발" ? s.activeTab : s.Tab
                  }
                  value="자기개발"
                  onClick={() => handleInputChange("groupCategory", "자기개발")}
                >
                  자기개발
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
                <h4>모임 날짜</h4>
              </strong>
              <input
                type="date"
                css={s.DateBox}
                value={formData.groupDate}
                onChange={(e) => handleInputChange("groupDate", e.target.value)}
              />
            </div>

            <div>
              <strong>
                <h4>모임 장소</h4>
              </strong>
              <div css={s.AllBox}>
                <button
                  css={formData.meetingType === "온라인" ? s.activeTab : s.Tab}
                  value="온라인"
                  onClick={() => handleInputChange("meetingType", "온라인")}
                >
                  온라인
                </button>
                <button
                  css={
                    formData.meetingType === "오프라인" ? s.activeTab : s.Tab
                  }
                  value="오프라인"
                  onClick={() => handleInputChange("meetingType", "오프라인")}
                >
                  오프라인
                </button>
              </div>
            </div>

            <div>
              <strong>
                <h4>모임 주소</h4>
              </strong>
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
              <button css={s.Tab} onClick={handleCancel}>
                취소
              </button>
              <button css={s.Tab} onClick={handleNextPage}>
                다음
              </button>
            </div>
          </div>
        </>
      )}
      {page === 1 && (
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
              value={formData.groupTitle}
              onChange={(e) => handleInputChange("groupTitle", e.target.value)}
            />
          </div>
          <div>
            <strong>
              <h2>내용</h2>
            </strong>
            <textarea
              css={s.ContentBox}
              placeholder="모임에 대한 소개말"
              value={formData.groupContent}
              onChange={(e) =>
                handleInputChange("groupContent", e.target.value)
              }
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
              value={formData.groupSupplies}
              onChange={(e) =>
                handleInputChange("groupSupplies", e.target.value)
              }
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
              value={formData.groupQuestion}
              onChange={(e) =>
                handleInputChange("groupQuestion", e.target.value)
              }
            />
          </div>
          <div>
            <strong>
              <h2>모임사진 등록</h2>
            </strong>
            <div>
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="groupImg"
                  style={{ width: "100px", height: "100px" }}
                />
              ) : (
                <p>이미지를 등록해주세요.</p>
              )}
            </div>
            <input
              type="file"
              id="groupImage"
              name="groupImage"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div css={s.bottomBox}>
            <button css={Tab} onClick={handlePrevPage}>
              이전
            </button>
            <button css={Tab} onClick={handlePostGroup}>
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import { IoArrowBackOutline } from 'react-icons/io5';
import userAuthStore from '../../../stores/auth.store';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Review } from '../../../types';
import img from "../../../images/moaLo.png";
import useGroupListStore from '../../../stores/group.list.store';
import axios from 'axios';

function CreateReview() {
  const { userId } = userAuthStore();
    const { groupList } = useGroupListStore();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [reviewImg, setReviewImg] = useState<any>(null);
  const [reviewData, setReviewData] = useState<Review>({
    reviewId: null,
    userId: userId,
    groupId: 0,
    groupName: "",
    reviewContent: "",
    reviewDate: new Date(),
    reviewImage: null
  });

  const backPage = () => {
    navigate(-1)
  }
  

  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupId = e.target.value;
    const selectedGroup = groupList.find(group => group.groupId === parseInt(selectedGroupId));
  
    if (selectedGroup) {
      setReviewData({
        ...reviewData,
        groupId: selectedGroup.groupId,     
        groupName: selectedGroup.groupTitle
      });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = e.target;

    setReviewData({
      ...reviewData,
      [element.name]: element.value,
    });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const imgFile: FileList = e.target.files;
      setReviewData((prev) => ({
        ...prev,
        [e.target.name]: imgFile[0],
      }));
    }
  };

  useEffect(() => {
    if (userId) {
      setReviewData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [userId]);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setReviewImg(e.target?.result);
    };

    if (!!reviewData.reviewImage) {
      fileReader.readAsDataURL(reviewData.reviewImage);
    }
  }, [reviewData.reviewImage]);

  const handleReset = () => {
    setReviewData({
      reviewId: null,
      userId: userId,
      groupId: 0,
      groupName: "",
      reviewContent: "",
      reviewDate: new Date(),
      reviewImage: null
    });
    setReviewImg(undefined);
  };

  const handlePostReviewData = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  const reviewDataForm = new FormData();
  
  Object.entries(reviewData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === "reviewImage" && value instanceof File) {
        reviewDataForm.append(key, value);
      } else {
        reviewDataForm.append(key, String(value));
      }
    }
  });
  

  console.log(reviewDataForm);

  try {
    console.log(reviewDataForm);
    const response = await axios.post(
      `http://localhost:8080/api/v1/reviews`,
      reviewDataForm,

      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data", 
        },
        withCredentials: true,
      }
    );
    if(response.data.result) {
      alert("후기 등록 완료 !");
      backPage();
    }
  } catch (error) {
    console.error(error);
    alert('후기 등록에 실패하였습니다.');
  }
};


  return (
    <div css={s.fullBox}>
      <div css={s.header}>
        <h1>
          <IoArrowBackOutline css={s.backPage} onClick={backPage}/>후기 작성
        </h1>
        <p>※ 작성한 후기는 수정이 불가하니 신중하게 작성해 주세요.</p>
      </div>
      <div css={s.mainBox}>
        <div css={s.mainHeader}>
            <select
              name="groupId"
              id="groupId"
              value={reviewData.groupId}
              onChange={handleSelectChange}
            >
              {groupList.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                {group.groupTitle}
              </option>
              ))}
            </select>
        </div>

        <div css={s.content}>
          <textarea
            name="reviewContent"
            id="reviewContent"
            placeholder="후기 내용"
            value={reviewData.reviewContent}
            onChange={handleContentChange}
          ></textarea>
        </div>

        <div css={s.imgFile}>
          <div>
            {!reviewImg ? (
              <img src={img} />
            ) : (
              <img src={reviewImg} alt="미리보기 사진" />
            )}
          </div>
          <div>
            <input
              type="file"
              id="reviewImage"
              name="reviewImage"
              onChange={handleFileChange}
            />
            <label htmlFor="reviewImage">파일 선택</label>
          </div>
        </div>
      </div>
      <div css={s.btnBox}>
        <button onClick={handleReset}>초기화</button>
        <button onClick={handlePostReviewData}>등록</button>
      </div>
    </div>
  )
}

export default CreateReview
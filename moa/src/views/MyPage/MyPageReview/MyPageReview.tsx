/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import { Review } from '../../../types';
import img from "../../../images/moaLogo.png";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { REVIEW_DELETE_API, REVIEW_GET_API, REVIEW_IMG_API } from '../../../apis';

export default function MyPageReview() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    try { 
      axios.get(REVIEW_GET_API, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setReviewData(response.data.data)
        console.log(reviewData);
      })
    } catch (error) {
      console.error(error);
      setReviewData([]);
    }
  },[])

  const handleDeleteReview = async(reviewId: number) => {
      try{
        await axios.delete(`${REVIEW_DELETE_API}${reviewId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        }).then((response) => {
          if(!!response.data.result) {
            setReviewData((prevData) => prevData.filter((review) => review.reviewId !== reviewId))
            setOpenModal(true)
            setModalMessage('삭제 정공')
          }
        })
      } catch (error) {
        console.error(error);
      }
  }

  
  return (
    <div css={s.fullBox}>
      <div css={s.headerBox}>
        <h1>
          내 후기 관리
        </h1>
      </div>
      <div css={s.mainBox}>
        {!!reviewData ? reviewData.map((review) => (
          <div css={s.reviewBox} key={review.reviewId}>
            <div css={s.reviewHeader}>
                <button onClick={() => handleDeleteReview(review.reviewId!)}>삭제</button>
            </div>

            <div css={s.reviewMain}>
              <div css={s.imgBox}>
                <div>
                  {review.reviewImage ? (
                      <img
                        src={`${REVIEW_IMG_API}${review.reviewImage}`}
                        alt="REVIEW IMAGE"
                      />
                    ) : (
                      <img src={img} alt="DEFAULT IMAGE" className="default" />
                    )}
                </div>
              </div>

              <div css={s.contentBox}> 
                <div>
                  <p>{review.groupName}</p>
                </div>

                <div>
                  <p>{review.reviewContent}</p>
                </div>
              </div>
            </div>
          </div>
        )): (
          <div>리뷰 데이터가 없음</div>
        )}
      </div>
      {openModal && (
        <div css={s.modalBox}>
          {modalMessage}
          <button onClick={() => setOpenModal(false)}>닫기</button>
        </div>
      )}
    </div>
  )
}

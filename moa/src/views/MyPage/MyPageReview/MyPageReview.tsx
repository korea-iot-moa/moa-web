/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from "./style";
import { Review } from '../../../types';
import img from "../../../images/moaLogo.png";
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function MyPageReview() {
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    try { 
      axios.get('http://localhost:8080/api/v1/reviews/myReview', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setReviewData(response.data.data)
      })
    } catch (error) {
      console.error(error);
    }
  },[])

  const handleDeleteReview = async(reviewId: number) => {
      try{
        await axios.delete(`http://localhost:8080/api/v1/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        }).then((response) => {
          if(!!response.data.result) {
            setReviewData((prevData) => prevData.filter((review) => review.reviewId !== reviewId))
            alert("삭제 성공")
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
                        src={`http://localhost:8080/image/${review.reviewImage}`}
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
    </div>
  )
}

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import img from "../../../images/moaLogo.png";
import { Review } from "../../../types";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReviewMain() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/reviews/auth").then((response) => {
      setReviewData(response.data.data);
    });
  }, []);

  const handlePostReviewPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/review/create");
  };

  return (
    <div css={s.fullBox}>
      <div css={s.header}>
        <div>
        <h1>후기 게시판</h1>
          <button onClick={handlePostReviewPage}>후기 작성</button>
        </div>
      </div>
  
      <div css={s.mainBox}>
        {reviewData.map((review) => (
        <div css={s.reviewBox} key={review.reviewId}>
          <div css={s.reviewHeader}>
            <p>{review.userId}</p>
            <p>{format(review.reviewDate, "yyyy-MM-dd")}</p>
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
        ))}
      </div>
    </div>
  );
  
}

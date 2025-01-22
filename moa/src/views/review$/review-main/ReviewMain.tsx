/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import * as s from "./style";
import img from "../../../images/moaLogo.png";
import { Review } from "../../../types";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREATE_REVIEW_GET_API, CREATE_REVIEW_IMG_API } from "../../../apis";

export default function ReviewMain() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const sentinelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await axios.get(CREATE_REVIEW_GET_API, {
          params: { page, size: 5 },
        });

        setReviewData((prev) => {
          const newData = [...prev, ...response.data.data];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.reviewId))
          ).map((id) => newData.find((item) => item.reviewId === id));
          return uniqueData;
        });

        if (response.data.data.length === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      // 타입 명시
      if (entries[0].isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    if (sentinelRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        threshold: 0.5,
      });
      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [loading]);

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
                      src={`${CREATE_REVIEW_IMG_API}${review.reviewImage}`}
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
        <div
          ref={sentinelRef}
          style={{ height: "10px", background: "transparent" }}
        ></div>
      </div>
    </div>
  );
}

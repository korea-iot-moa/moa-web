/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Recommendation } from "../../types";
import { colors } from "@mui/material";

interface RecommendationsClickProps {
  groupId: number;
  isLike: number[];
  toggleLike: (groupId: number) => void;
}

const RecommendationsClick: React.FC<RecommendationsClickProps> = ({
  groupId,
  isLike,
  toggleLike
}) => {
  const [cookies] = useCookies(["token"]);
  
  const handleFetchData = async () => {
    if (!cookies.token) {
      alert("로그인 후 사용가능합니다.");
      return;
    }
    if (cookies.token) {
      try {
        if (!isLike.includes(groupId)) {
          await axios.post<Recommendation>(
            `http://localhost:8081/api/v1/recommendation`,
            { groupId },
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );

        } else {
          await axios.delete(
            `http://localhost:8081/api/v1/recommendation/user-id`,
            {
              data: { groupId: groupId },
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );
        }
        toggleLike(groupId);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <button onClick={handleFetchData} css={s.click}>
        {isLike &&
        isLike.map((groupId) =>  isLike.includes(groupId) ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />)}
      </button>
    </div>
  );
};

export default RecommendationsClick;

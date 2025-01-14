/** @jsxImportSource @emotion/react */
import axios from "axios";
import * as s from "./style";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MeetingGroup } from "../../../types";
import { IoArrowBackOutline } from "react-icons/io5";
import img from "../../../images/moaLogo.png";
import NaverMapComponent from "../../../components/NaverMap";
import { useCookies } from "react-cookie";
import {
  GROUP_DETAIL_IMG_API,
  GROUP_DETAIL_MEETING_API,
  GROUP_DETAIL_USER_LIST_API,
} from "../../../apis";

export default function GroupDetailPage() {
  const [groupData, setGroupData] = useState<MeetingGroup>();
  const [activeTab, setActiveTab] = useState<string>("");

  const [cookies] = useCookies(["token"]);
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [duplicationUserAnswer, setDuplicationUserAnswer] =
    useState<boolean>(false);

  useEffect(() => {
    if (!!groupId) {
      try {
        axios.get(`${GROUP_DETAIL_MEETING_API}${groupId}`).then((response) => {
          setGroupData(response.data.data);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/main");
    }
  }, [groupId]);

  const backPage = () => {
    navigate(-1);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const suppliesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);

    const targetRef =
      tabName === "content"
        ? contentRef
        : tabName === "supplies"
        ? suppliesRef
        : tabName === "location"
        ? locationRef
        : joinRef;

    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 모임 신청 버튼 클릭
  const handleJoinBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookies.token) {
      navigate("/signIn");
      return;
    }

    try {
      // 가입 여부 확인 및 참여신청청 중복 여부 확인
      const [groupListResponse, duplicationResponse] = await Promise.all([
        axios.get(`${GROUP_DETAIL_USER_LIST_API}${groupData?.groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }),
        axios.get(
          `http://localhost:8081/api/v1/user-answers/duplication/${groupData?.groupId}`,
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
            withCredentials: true,
          }
        ),
      ]);

      // 그룹 가입 여부 확인
      const isUserInGroup = groupListResponse.data.data;
      if (isUserInGroup) {
        alert("이미 가입된 모임입니다.");
        return;
      }

      // 사용자 응답 중복 여부 확인
      const isAnswerDuplicated = duplicationResponse.data.data;
      if (isAnswerDuplicated) {
        alert("이미 신청 완료되었습니다.");
        setDuplicationUserAnswer(true);
        return;
      }

      // 위 조건에 해당하지 않으면 신청 페이지로 이동
      navigate(`/group-join/join-group/${groupId}`);
    } catch (error) {
      console.error("오류 발생:", error);
      alert("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.fullBox}>
      <div css={s.header}>
        <div>
          <IoArrowBackOutline css={s.backPage} onClick={backPage} />
        </div>
        <div>
          <h1>{groupData?.groupTitle}</h1>
        </div>
      </div>

      <div css={s.imageBox}>
        {groupData?.groupImage ? (
          <img
            src={GROUP_DETAIL_IMG_API + groupData.groupImage}
            alt="그룹 이미지"
          />
        ) : (
          <img src={img} alt="defaultImage" />
        )}
      </div>
      <div css={s.tapBox}>
        <button
          css={s.tabBtn(activeTab === "content")}
          onClick={() => handleTabClick("content")}
        >
          내용
        </button>
        <button
          css={s.tabBtn(activeTab === "supplies")}
          onClick={() => handleTabClick("supplies")}
        >
          준비물
        </button>
        <button
          css={s.tabBtn(activeTab === "location")}
          onClick={() => handleTabClick("location")}
        >
          장소
        </button>
        <button
          css={s.tabBtn(activeTab === "joinButton")}
          onClick={() => handleTabClick("joinButton")}
        >
          신청하기
        </button>
      </div>
      <div ref={contentRef} css={s.contentBox}>
        <div>
          <div css={s.categoryBox}>
            <span>{groupData?.groupType}</span>
            <span>{groupData?.meetingType}</span>
            <span>{groupData?.groupCategory}</span>
          </div>
          <div css={s.content}>
            <h2>모임 소개</h2>
            <p>{groupData?.groupContent}</p>
          </div>
        </div>
      </div>
      <div ref={suppliesRef} css={s.supplies}>
        <div>
          <h2>준비물</h2>
          <p>{groupData?.groupSupplies}</p>
        </div>
      </div>

      <div ref={locationRef} css={s.mapBox}>
        <div>
          {groupData?.groupAddress ? (
            <NaverMapComponent address={groupData?.groupAddress || ""} />
          ) : (
            <p>모임에서 장소를 제공하지 않습니다.</p>
          )}
        </div>
      </div>
      <div ref={joinRef} css={s.joinBox}>
        <button onClick={handleJoinBtn}>모임 참여 신청</button>
      </div>
    </div>
  );
}

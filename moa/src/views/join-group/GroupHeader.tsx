/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MeetingGroup } from "../../types";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  IoSettingsOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { LuVote, LuDoorOpen, LuCopy } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { PiUserList } from "react-icons/pi";
import VoteComponent from "../../components/vote-component/VoteComponent";
import GroupMainPage from "./join-main/GroupMainPage";
import UserListPage from "./user-list/UserListPage";
import {
  GROUP_HEADER_EXIST_GET_API,
  GROUP_HEADER_EXIST_VOTE_GET_API,
  GROUP_HEADER_GET_API,
  GROUP_HEADER_USER_LIST_DELETE_API,
} from "../../apis";

const baseUrl = "http://localhost:3000/meeting-group/";

export default function GroupHeader() {
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showVote, setShowVote] = useState<boolean>(false);
  const [voteState, setVoteState] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const [activePage, setActivePage] = useState<string>("home");

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <GroupMainPage groupInfo={groupInfo} isLoading={isLoading} />;
      case "userList":
        return <UserListPage groupInfo={groupInfo} />;
      case "chat":
        return <div>채팅 기능은 현재 준비 중입니다.</div>;
      default:
        return <GroupMainPage groupInfo={groupInfo} isLoading={isLoading} />;
    }
  };

  const { groupId } = useParams();
  const parseToNumGroupId = Number(groupId);

  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleManagerPageRender = (groupId: number) => {
    navigate(`/main/manager/user-list/${groupId}`);
  };

  useEffect(() => {
    try {
      axios
        .get(`${GROUP_HEADER_GET_API}${groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setGroupInfo(response.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [location.pathname, groupId]);

  useEffect(() => {
    try {
      axios
        .get(`${GROUP_HEADER_EXIST_VOTE_GET_API}${groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setVoteState(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [groupId]);

  useEffect(() => {
    try {
      axios
        .get(`${GROUP_HEADER_EXIST_GET_API}${groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setIsCreator(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [cookies.token, groupId]);

  const handleLeaveGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      axios
        .delete(`${GROUP_HEADER_USER_LIST_DELETE_API}${groupId}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        })
        .then(() => {
          navigate("/main");
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLinkCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("코드 복사 완료");
    } catch (e) {
      alert("코드 복사 실패");
    }
  };

  return (
    <>
      <div css={s.fullBox(showVote)}>
        <div css={s.topBox}>
          <div>
            <h1>{groupInfo?.groupTitle}</h1>
          </div>
          <div>
            {isCreator && (
              <IoSettingsOutline
                css={s.optionBtn}
                onClick={() => handleManagerPageRender(parseToNumGroupId)}
              />
            )}
          </div>
          <div>
            {voteState && (
              <button css={s.voteBtn} onClick={() => setShowVote(true)}>
                <LuVote css={s.iconSt} />
                투표
              </button>
            )}
            <button css={s.leaveBtn} onClick={handleLeaveGroup}>
              <LuDoorOpen css={s.iconSt} />
              모임 탈퇴
            </button>
          </div>
        </div>
        {showVote && (
          <div css={s.voteOverlay}>
            <VoteComponent
              groupId={Number(groupId)}
              groupTitle={groupInfo!.groupTitle}
              closeVote={() => setShowVote(false)}
            />
          </div>
        )}
        <div css={s.middleBox}>
          {/* 채팅, 회원목록, 복사링크 */}
          <div>
            <button css={s.btnSt} onClick={() => setActivePage("home")}>
              <AiOutlineHome />
              모임 홈
            </button>
            <button css={s.btnSt} onClick={() => setActivePage("chat")}>
              <IoChatbubbleEllipsesOutline />
              채팅
            </button>
            <button css={s.btnSt} onClick={() => setActivePage("userList")}>
              <PiUserList />
              회원 목록
            </button>
          </div>
          <div css={s.copyBox}>
            <h2>초대 링크</h2>
            <div>
              <input
                type="text"
                value={baseUrl + groupInfo?.groupId}
                readOnly
              />
              <LuCopy
                css={s.copyBtn}
                onClick={() => handleLinkCopy(baseUrl + groupId)}
              />
            </div>
          </div>
        </div>

        {renderActivePage()}
      </div>
    </>
  );
}

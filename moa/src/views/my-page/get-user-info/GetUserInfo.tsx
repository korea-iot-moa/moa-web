import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { User } from "../../../types";
import userImg from "../../../images/userImg.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  POST_USER_INFO_API,
  GET_USER_INFO_IMG_API,
  PUT_USER_INFO_API,
  GET_DUPLICATION_NICK_NAME_API,
} from "../../../apis";
import { IoCall } from "react-icons/io5";
import "./style.css";
import userAuthStore from "../../../stores/auth.store";

const GetUserInfo = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { result } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfileImg, setUserProfileImg] = useState<any>(null);

  const [isChanged, setIsChanged] = useState(false);

  const [initialNickName, setInitialNickName] = useState<string | null>(null);

  const [duplicatoinNickName, setDuplicationNickName] =
    useState<boolean>(false);
  const [duplicatoinNickNameMs, setDuplicationNickNameMs] =
    useState<string>("");

  useEffect(() => {
    fetchUserInfo();
  }, [navigate]);

  const fetchUserInfo = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/signIn");
      return;
    }
    setLoading(true);

    if (result !== "true") {
      navigate("/mypage/userInfo");
    }
    try {
      const response = await axios.get(POST_USER_INFO_API, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      const updateUser = response.data.data;
      setUserInfo(updateUser);
      setUserProfileImg(
        `${GET_USER_INFO_IMG_API}${response.data.data.profileImage}`
      );
      setInitialNickName(response.data.data.nickName);

      userAuthStore.getState().login({
        userId: updateUser.userId,
        nickName: updateUser.nickName,
        profileImage: updateUser.profileImage,
      });
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      navigate("/mypage/userInfo");
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isChanged) {
      alert("수정된 내용이 없습니다.");
    } else {
      const comfirmed = window.confirm("수정 하시겠습니까?");
      if (!comfirmed) return;
    }

    if (!userInfo) {
      alert("수정할 사용자 정보가 없습니다.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(userInfo).forEach(([key, value]) => {
        if (key === "profileImage" && !(value instanceof File)) {
          return;
        }
        formData.append(key, value || "");
      });

      const response = await axios.put(PUT_USER_INFO_API, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          withCredentials: true,
        },
      });
      if (!duplicatoinNickName && userInfo.nickName !== initialNickName) {
        alert("닉네임 중복 확인을 완료해주세요.");
        return;
      }
      setUserInfo(response.data.data);
      if (isChanged && userInfo) {
        alert("수정완료 되었습니다.");
      }
    } catch (error) {
      console.error("정보 수정 중 오류 발생:", error);
      alert("정보 수정 실패. 정보를를 확인해주세요.");
    }
  };

  const handleDulicationNickName = async () => {
    if (userInfo?.nickName === initialNickName) {
      setDuplicationNickName(true);
      setDuplicationNickNameMs("닉네임이 변경되지 않았습니다.");
      return;
    }

    try {
      const response = await axios.get(
        `${GET_DUPLICATION_NICK_NAME_API}${userInfo?.nickName}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const isDuplicate = response.data.data;
      if (isDuplicate) {
        setDuplicationNickName(false);
        setDuplicationNickNameMs("※ 닉네임이 중복되었습니다.");
      } else {
        setDuplicationNickName(true);
        setDuplicationNickNameMs("✅ 닉네임을 사용할 수 있습니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류 발생:", error);
      setDuplicationNickNameMs("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfo((prev) => (prev ? { ...prev, profileImage: file } : null));

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfileImg(e.target?.result || null);
      };
      reader.readAsDataURL(file);
      setIsChanged(true);
    }
  };

  const handleChangeInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({ ...prev!, [name]: value }));

    if (name === "nickName" && value !== initialNickName) {
      setDuplicationNickName(false);
      setDuplicationNickNameMs("중복 확인이 필요합니다.");
    }

    setIsChanged(true);
  };

  return (
    <div>
      <h4 className="mypageTitle">마이페이지</h4>
      <div className="userInfoBox">
        <div className="innerBox">
          {loading ? (
            <p>로딩 중...</p>
          ) : userInfo ? (
            <ul className="userInfoUl">
              <li className="imgBox">
                <span>프로필 이미지</span>
                <div className="imgDiv">
                  <div className="imgBackroundColor">
                    {!userProfileImg ? (
                      <img src={userImg} alt="userImage" className="userImg" />
                    ) : (
                      <img
                        src={userProfileImg}
                        alt="profileImage"
                        className="userImg"
                      />
                    )}
                  </div>
                  <label className="imgUpdateBtn" htmlFor="profileImage">
                    <span className="photoIconSpan">
                      <MdOutlineAddPhotoAlternate className="photoIcon" />
                    </span>
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    className="profileInput"
                    onChange={handleImgFileChange}
                  />
                </div>
              </li>
              <li className="userInfoUldetail">
                <div className="divInLI">
                  <span className="userTitleli">아이디</span>
                  <span className="userliSmall">{userInfo.userId}</span>
                </div>
                <div className="divInLI">
                  <span className="userTitleli">이름</span>
                  <input
                    className="userliSmall"
                    type="text"
                    name="userName"
                    value={userInfo.userName}
                    placeholder="한글 또는 영문 이름 입력"
                    onChange={handleChangeInfo}
                  />
                </div>
              </li>
              <li className="userInfoUldetail">
                <div className="divInLI">
                  <span className="userTitleli">성별</span>
                  <span className="userliSmall">{userInfo.userGender}</span>
                </div>
                <div className="divInLI">
                  <span className="userTitleli">주소</span>
                  <select
                    className="userliSmall addressSelectUI"
                    name="region"
                    value={userInfo.region || ""}
                    onChange={handleChangeInfo}
                  >
                    <option value="" disabled>
                      선택하세요
                    </option>
                    {[
                      "서울",
                      "인천",
                      "대전",
                      "광주",
                      "세종",
                      "울산",
                      "부산",
                      "대구",
                      "경기",
                      "충북",
                      "충남",
                      "강원",
                      "전북",
                      "전남",
                      "경북",
                      "경남",
                      "제주",
                    ].map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li className="duplicationMsgLi">
                <div className="nickNameDiv">
                  <span className="nickNameBox">닉네임</span>
                  <div className="nickNameInputBtn">
                    <input
                      className="userli nickNameInput"
                      type="text"
                      name="nickName"
                      value={userInfo.nickName}
                      placeholder="1~10자 한글, 숫자, 특수문자포함"
                      onChange={handleChangeInfo}
                    />
                    <button
                      className="duplicationNickNameBtn"
                      onClick={handleDulicationNickName}
                    >
                      중복확인
                    </button>
                  </div>
                </div>
                <span className="duplicationMsg">{duplicatoinNickNameMs}</span>
              </li>
              <li className="userInfoUldetail">
                <span className="userTitleli">
                  <IoCall />
                </span>
                <input
                  className="userli"
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  placeholder="'-'을 제외한 번호 입력"
                  onChange={handleChangeInfo}
                />
              </li>
              <li className="userInfoUldetail">
                <span className="userTitleli">E-mail</span>
                <input
                  className="userli"
                  type="text"
                  name="email"
                  value={userInfo.email}
                  placeholder="이메일 입력"
                  onChange={handleChangeInfo}
                />
              </li>
              <li className="userInfoButtons">
                <button className="updateBtn" onClick={updateUserInfo}>
                  수정
                </button>
                <button
                  className="updateCancel"
                  onClick={() => navigate("/mypage/userInfo")}
                >
                  취소
                </button>
              </li>
            </ul>
          ) : (
            <p>사용자 정보를 가져올 수 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetUserInfo;

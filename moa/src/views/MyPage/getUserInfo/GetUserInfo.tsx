import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../../../stores/userInfo.store";
import { useCookies } from "react-cookie";
import axios from "axios";
import { User } from "../../../types";
import userImg from "../../../images/userImg.png";


const GetUserInfo = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "password"]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfileImg, setUserProfileImg] = useState<string | null>(null);
  const setPasswordValue = useUserInfoStore((state) => state.setPasswordValue);

  // 닉네임 중복 상태
  const [duplicatoinNickName, setDuplicationNickName] = useState<boolean>(false);
  const [duplicatoinNickNameMs, setDuplicationNickNameMs] = useState<string>("");

  useEffect(() => {
    if (!cookies.password) {
      alert("비밀번호가 필요합니다.");
      navigate("/mypage");
      return;
    }
    setPasswordValue({ password: cookies.password });
    fetchUserInfo();
  }, [cookies.password, setPasswordValue, navigate]);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigate("/signIn");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/user-id",
        { password: cookies.password },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setUserInfo(response.data.data);
      setUserProfileImg(response.data.data.profileImage || null);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      alert("사용자 정보를 가져오는데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 업데이트
  const updateUserInfo = async () => {
    if (!userInfo) {
      alert("수정할 사용자 정보가 없습니다.");
      return;
    }
    if (!duplicatoinNickName) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userInfo", JSON.stringify(userInfo));
      if (userInfo.profileImage instanceof File) {
        formData.append("profileImage", userInfo.profileImage);
      }

      const response = await axios.put(
        "http://localhost:8080/api/v1/users/user-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserInfo(response.data.data);
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 중 오류 발생:", error);
      alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 닉네임 중복 확인
  const handleDulicationNickName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/duplication/${userInfo?.nickName}`,
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

  // 이미지 파일 변경 핸들러
  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfo((prev) => (prev ? { ...prev, profileImage: file } : null));

      const reader = new FileReader();
      reader.onload = () => {
        setUserProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 사용자 정보 수정 핸들러
  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!userInfo) return;
    const { name, value } = e.target;

    setUserInfo((prev) => (prev ? { ...prev, [name]: value } : null));

    if (name === "nickName") {
      setDuplicationNickName(false);
      setDuplicationNickNameMs("중복 확인이 필요합니다.");
    }
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
              <li className="userInfoUldetail">
                <span className="userTitleli">아이디</span>
                <span className="userli">{userInfo.userId}</span>
              </li>
              <li className="userInfoUldetail">
                <span className="userTitleli">이름</span>
                <input
                  className="userli"
                  type="text"
                  name="userName"
                  value={userInfo.userName}
                  placeholder={userInfo.userName}
                  onChange={handleChangeInfo}
                />
              </li>
              <li className="userInfoUldetail duplicationMsgLi">
                <span className="nickNameBox">닉네임</span>
                <div className="nickNameDiv">
                  <input
                    className="userli nickNameInput"
                    type="text"
                    name="nickName"
                    value={userInfo.nickName}
                    placeholder={userInfo.nickName}
                    onChange={handleChangeInfo}
                  />
                  <button
                    className="duplicationNickNameBtn"
                    onClick={handleDulicationNickName}
                  >
                    중복확인
                  </button>
                </div>
                <span className="duplicationMsg">{duplicatoinNickNameMs}</span>
              </li>
              <li className="userInfoUldetail">
                <span className="addressBox">주소</span>
                <select
                  className="userli"
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
              </li>
              <li className="userInfoUldetail">
                <span className="genderBox">성별</span>
                <span className="userli">{userInfo.userGender}</span>
              </li>
              <li className="imgBox">
                <span>프로필 이미지</span>
                <div className="imgDiv">
                {!userProfileImg ? (
                      <img src={userImg} alt="userImage"  className="userImg"/>
                    ) : (
                      <img
                        src={userProfileImg}
                        alt="profileImage"
                        className="userImg"
                      />
                    )}
                    <input
                    type="file"
                    name="profileImage"
                    className="profileInput"
                    onChange={handleImgFileChange}
                  />
                </div>
              </li>
              <li className="userInfoButtons">
                <button className="updateBtn" onClick={updateUserInfo}>
                  수정
                </button>
                <button className="updateCancel" onClick={() => navigate("/mypage")}>
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

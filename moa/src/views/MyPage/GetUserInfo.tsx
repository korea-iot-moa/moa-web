import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../../stores/userInfo.store";
import { useCookies } from "react-cookie";
import axios from "axios";
import { User } from "../../types";

const GetUserInfo = () => {
  const navigator = useNavigate();
  const [cookies] = useCookies(["token", "password"]);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const setPasswordValue = useUserInfoStore((state) => state.setPasswordValue);

  useEffect(() => {
    if (cookies.password) {
      setPasswordValue({ password: cookies.password });
    }
  }, [cookies.password, setPasswordValue]);

  if (!cookies.password) {
    navigator("/mypage");
  }

  const fetchData = async () => {
    if (!cookies.token) {
      alert("로그인이 필요합니다.");
      navigator("/signIn");
      return;
    }
    setLoading(true); // 쿠키가 있을 경우에만 로딩 시작

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/users/user-id`,
        {
          password: cookies.password,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          withCredentials: true,
        }
      );
      const userData = response.data.data;
      setUserInfo(userData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!userInfo) return;
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const { name, value } = e.target;
  //   setUserInfo((prev) => ({
  //     ...prev!,
  //     [name]: value,
  //   }));
  // };

  const updateFetchData = async () => {
    if (cookies.token) {
      try {
        const response = await axios.put(
          `http://localhost:8081/api/v1/users/user-info`,
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        setUserInfo(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies.token, navigator]);

  const handleNavigator = () => {
    alert("정보 수정을 취소하시겠습니까?");
    navigator("/mypage");
  };

  return (
    <div>
      <h4>마이페이지</h4>
      {loading ? (
        <p>로딩 중...</p>
      ) : userInfo ? (
        <ul>
          <li>아이디: {userInfo.userId}</li>
          <li>
            이름:
            <input
              type="text"
              name="userName"
              value={userInfo.userName}
              placeholder={userInfo.userName}
              onChange={handleChangeInfo}
            />
          </li>
          <li>
            닉네임:
            <input
              type="text"
              name="nickName"
              value={userInfo.nickName}
              placeholder={userInfo.nickName}
              onChange={handleChangeInfo}
            />
            <button>중복확인</button>
          </li>
          <li>
            주소:
            <select name="region" onChange={handleChangeInfo}>
              <option value={userInfo.region || ""}>
                {userInfo.region || "선택하세요"}
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
          <li>성별: {userInfo.userGender}</li>
          <li>
            프로필 이미지:
            <img src={userInfo.profileImage || ""} alt="프로필 이미지" />
            <input
              type="file"
              name="profileImage"
              value={userInfo.profileImage}
            />
          </li>
        </ul>
      ) : (
        <p>사용자 정보를 가져올 수 없습니다.</p>
      )}

      <button onClick={updateFetchData}>수정</button>
      <button onClick={handleNavigator}>취소</button>
    </div>
  );
};

export default GetUserInfo;

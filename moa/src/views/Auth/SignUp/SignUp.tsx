/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { Gender, Hobby, Region, User } from "../../../types";
import {
  Bs2Circle,
  BsChevronRight,
  Bs1CircleFill,
  Bs1Circle,
  Bs2CircleFill,
} from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import userImg from "../../../images/userImg.png";
import axios from "axios";

const regions = [
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "서울",
  "제주",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
];

export default function SignUp() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [userProfileImg, setUserProfileImg] = useState<any>(null);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => prev - 1);

  const [signUpData, setSignUpData] = useState<User>({
    userId: "",
    password: "",
    userName: "",
    nickName: "",
    userGender: "MALE",
    userBirthDate: new Date(),
    hobbies: [],
    profileImage: null,
    region: null,
  });

  useEffect(() => {
    axios.get("http://localhost:8081/api/profile/hobbies").then((response) => {
      setHobbies(response.data.data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setSignUpData({
      ...signUpData,
      [element.name]: element.value,
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !(signUpData.hobbies.length < 3) &&
      !signUpData.hobbies.includes(parseInt(e.target.value))
    ) {
      return;
    }

    setSignUpData((prev) => ({
      ...prev,
      [e.target.name]: prev.hobbies.includes(parseInt(e.target.value))
        ? prev.hobbies.filter((hobbyId) => hobbyId !== parseInt(e.target.value))
        : [...prev.hobbies, parseInt(e.target.value)],
    }));
    // const selectedHobby = e.target.value as Hobby;
    // if (!hobbies.includes(selectedHobby) && hobbies.length >= 3) {
    //   return;
    // }
    // const updatedHobbies = hobbies.includes(selectedHobby)
      // ? hobbies.filter((hobby) => hobby !== selectedHobby)
    //   : [...hobbies, selectedHobby];
    // setHobbies(updatedHobbies);
    // setSignUpData({ ...signUpData, hobbies: updatedHobbies });
  };

  const handleRegionChange = (e: SelectChangeEvent) => {
    const selectedRegion = e.target.value as Region;
    setRegion(selectedRegion);
    setSignUpData((prevState) => ({
      ...prevState,
      region: selectedRegion,
    }));
  };

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setUserProfileImg(e.target?.result);
    };
    if (!!signUpData?.profileImage) {
      fileReader.readAsDataURL(signUpData.profileImage);
    }
  }, [signUpData.profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const imgFile: FileList = e.target.files;
      setSignUpData((prev) => ({
        ...prev,
        [e.target.name]: imgFile[0],
      }));
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const signUpForm = new FormData();

    Object.entries(signUpData).forEach(([key, value]) => {
      if (!!value) {
        if (key === "hobbies" && value.length > 0) {
          value.forEach((hobby: string) => {
            signUpForm.append("hobbies", hobby);
          });
        } else {
          signUpForm.append(key, value);
        }
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:8081/api/profile",
        signUpForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.data);
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("Sign-up failed:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div css={s.fullBox}>
      <div css={s.signUpBox}>
        {page === 1 ? (
          <>
            <div>
              <h1>회원가입</h1>
            </div>
            <div css={s.pageStateBox}>
              <Bs1CircleFill style={{ fontSize: "50px" }} />
              <BsChevronRight
                style={{ fontSize: "20px", stroke: "black", strokeWidth: 2 }}
              />
              <Bs2Circle style={{ fontSize: "50px" }} />
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="userId" css={s.label}>
                아이디
              </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="userId"
                  id="userId"
                  onChange={handleInputChange}
                  placeholder="8~14자의 영문, 숫자 포함 입력"
                />
                <button css={s.validBtn}>중복 확인</button>
              </div>
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="password" css={s.label}>
                비밀번호
              </label>
              <input
                css={s.passwordTop}
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                placeholder="8~16자의 영문, 숫자, 특수문자 포함 입력"
              />
              <input
                css={s.passwordBottom}
                type="password"
                value={confirmPassword}
                id="confirmPassword"
                onChange={handleConfirmPasswordChange}
                placeholder="비밀번호 확인"
              />
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="userBirthDate" css={s.label}>
                생년월일
              </label>
              <input
                css={s.input}
                type="text"
                name="userBirthDate"
                id="userBirthDate"
                onChange={handleInputChange}
                placeholder="하이픈(-) 없이 8자 입력 "
              />
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="userName" css={s.label}>
                이름
              </label>
              <input
                css={s.input}
                type="text"
                name="userName"
                id="userName"
                onChange={handleInputChange}
                placeholder="한글, 영문의 사용자 이름 입력"
              />
            </div>
            <div css={s.fieldBox}>
              <label htmlFor="nickName" css={s.label}>
                닉네임
              </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="nickName"
                  id="nickName"
                  onChange={handleInputChange}
                  placeholder="1~10자의 한글, 영문, 숫자 입력 (특수문자 불가)"
                />
                <button css={s.validBtn}>중복 확인</button>
              </div>
            </div>

            <div css={s.fieldBox}>
              <h1 css={s.label}>성별</h1>
              <div css={s.genderBox}>
                <input
                  type="radio"
                  id="male"
                  value="MALE"
                  name="gender"
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      userGender: e.target.value as Gender,
                    })
                  }
                />
                <label htmlFor="male">남자</label>
                <input
                  type="radio"
                  id="female"
                  value="FEMALE"
                  name="gender"
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      userGender: e.target.value as Gender,
                    })
                  }
                />
                <label htmlFor="female">여자</label>
              </div>
            </div>

            <div css={s.fieldBox}>
              <div css={s.btnBox}>
                <button onClick={() => navigate("/")}>홈으로</button>
                <button onClick={handleNextPage}>다음</button>
              </div>
            </div>
          </>
        ) : page === 2 ? (
          <>
            <div>
              <h1>회원가입</h1>
            </div>
            <div css={s.pageStateBox}>
              <Bs1Circle style={{ fontSize: "50px" }} />
              <BsChevronRight
                style={{ fontSize: "20px", stroke: "black", strokeWidth: 2 }}
              />
              <Bs2CircleFill style={{ fontSize: "50px" }} />
            </div>

            <div css={s.fieldBox}>
              <h1 css={s.label}>프로필 이미지 [선택]</h1>
              <div css={s.profileImgBox}>
                <div css={s.userImgGroup}>
                  <div css={s.userImgBox}>
                    {!userProfileImg ? (
                      <img src={userImg} alt="userImage" css={s.userImg} />
                    ) : (
                      <img
                        src={userProfileImg}
                        alt="profileImage"
                        css={s.userImg}
                      />
                    )}
                  </div>

                  <label htmlFor="profileImg">
                    <LuImagePlus style={{ width: "30px", height: "30px" }} />
                  </label>
                </div>
                <input
                  type="file"
                  id="profileImg"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div css={s.fieldBox}>
              <h1 css={s.label}>취미 [선택]</h1>
              <div css={s.hobbyBox}>
                {!!hobbies &&
                  hobbies.map((hobby) => (
                    <>
                      <input
                        type="checkbox"
                        name="hobbies"
                        id={hobby?.id.toString()}
                        value={hobby?.id.toString()}
                        onChange={handleHobbyChange}
                        checked={signUpData.hobbies.includes(hobby?.id)}
                      />
                      <label htmlFor={hobby?.id.toString()}>
                        {hobby?.hobbyName.toString()}
                      </label>
                    </>
                  ))}
              </div>
            </div>

            <div css={s.fieldBox}>
              <h1 css={s.label}>지역 [선택]</h1>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  sx={{
                    color: "#4d4d4d", // 기본 라벨 색상
                    "&.Mui-focused": {
                      color: "#4d4d4d", // 포커스 상태일 때 색상
                    },
                    "&.Mui-disabled": {
                      color: "#a1a1a1", // 비활성화 상태일 때 색상
                    },
                  }}
                >
                  지역
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={region ?? ""}
                  onChange={handleRegionChange}
                  autoWidth
                  label="지역"
                  sx={{
                    "& .MuiSelect-root": {
                      borderColor: "#4d4d4d", // 기본 보더라인 색상
                    },
                    "&.Mui-focused .MuiSelect-root": {
                      borderColor: "#4d4d4d", // 포커스 상태일 때 보더라인 색상
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4d4d4d", // 기본 보더라인 색상
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4d4d4d", // 포커스 상태일 때 보더라인 색상
                    },
                  }}
                >
                  <MenuItem value={undefined}>
                    <em>선택 안함</em>
                  </MenuItem>
                  {regions.map((region, index) => (
                    <MenuItem
                      key={index}
                      value={region}
                      sx={{
                        fontSize: "14px",
                        padding: "8px 16px",
                        width: "300px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div css={s.fieldBox}>
              <div css={s.btnBox}>
                <button css={s.pageBtn} onClick={handlePreviousPage}>
                  이전
                </button>
                <button css={s.pageBtn} onClick={handleSignUp}>
                  완료
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

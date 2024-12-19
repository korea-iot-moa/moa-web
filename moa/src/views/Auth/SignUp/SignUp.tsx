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
import { format } from "date-fns";

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


// 정규식 할당
const idRegex = /^[a-zA-Z0-9]{8,14}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/
const birthDateRegex = /^\d{8}$/
const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/
const nameRegex = /^[a-zA-Z가-힣]+$/

export default function SignUp() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [userProfileImg, setUserProfileImg] = useState<any>(null);

  // 유효성 확인 상태 관리
  const [duplicateId, setDuplicateId] = useState<boolean>(false);
  const [duplicateNickName, setDuplicateNickName] = useState<boolean>(false);
  const [validId , setValidId] = useState<string>("");
  const [validPassword, setValidPassword] = useState<string>("");
  const [validBirthDay, setValidBirthDay] = useState<string>("");
  const [validName, setValidName] = useState<string>("");
  const [validNickName, setValidNickName] = useState<string>("");
  const [validGender, setValidGender] = useState<string>("");
  const [validHobby, setValidHobby] = useState<string>("");

  // 중복 확인 상태 관리
  const [duplicateIdMs, setDuplicateIdMs] = useState<string>("");
  const [duplicateNickNameMs, setDuplicateNickNameMs] = useState<string>("");


  //& 회원가입 데이터
  const [signUpData, setSignUpData] = useState<User>({
    userId: "",
    password: "",
    confirmPassword: "",
    userName: "",
    nickName: "",
    userGender: "MALE",
    userBirthDate: new Date(),
    hobbies: [],
    profileImage: null,
    region: null,
  });

  //& DB 취미 요청
  useEffect(() => {
    axios.get("http://localhost:8080/api/profile/hobbies").then((response) => {
      setHobbies(response.data.data);
    });
  }, []);

  //& 회원가입 데이터 할당
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setSignUpData({
      ...signUpData,
      [element.name]: element.value,
    });
  };

  //& 취미
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
  };

  //& 지역 
  const handleRegionChange = (e: SelectChangeEvent) => {
    const selectedRegion = e.target.value as Region;
    setRegion(selectedRegion);
    setSignUpData((prevState) => ({
      ...prevState,
      region: selectedRegion,
    }));
  };


  //& 이미지 파일
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
  

  //# 다음 페이지 핸들러  || 유효성 검사 
  const handleNextPage = () => {
    let valid = true

    // 아이디 정규식 확인
    if(!signUpData.userId || !idRegex.test(signUpData.userId)) {
      valid = false;
      setValidId("※ 아이디 8~14자의 영문, 숫자 포함 입력")
    }else if(validId !== ""){
      
    }else{
      setValidId("")
    }

    // 비밀번호 정규식
    if(!signUpData.password || !passwordRegex.test(signUpData.password)){
      valid = false;
      setValidPassword("※ 비밀번호 8~16자의 영문, 숫자, 특수문자 포함 입력")
    }else{
      setValidPassword("")
    }

    // 비밀번호 확인
    if(signUpData.password !== signUpData.confirmPassword) {
      valid = false;
      setValidPassword("※ 비밀번호가 일치하지 않습니다.")
    }else{
      setValidPassword("")
    }
    // 생년월일 정규식 확인
    if(!signUpData.userBirthDate || !birthDateRegex.test(signUpData.userBirthDate.toString())) {
      valid = false;
      setValidBirthDay("※ 생년월일 하이픈(-) 없이 8자 입력")
    }else{
      setValidBirthDay("")
    }

    // 이름 정규식 확인
    if(!signUpData.userName || !nameRegex.test(signUpData.userName)){
      valid = false;
      setValidName("※ 한글, 영문의 사용자 이름 입력")
    }else{
      setValidName("")
    }

    // 닉네임 확인
    if(!signUpData.nickName || !nicknameRegex.test(signUpData.nickName)) {
      valid = false;
      setValidNickName("※ 1~10자의 한글, 영문, 숫자 입력 (특수문자 불가)")
    }else{
      setValidNickName("")
    }

    // 성별 확인
    if(!signUpData.userGender) {
      valid = false;
      setValidGender("※ 성별을 선택해주세요")
    }else{
      setValidGender("")
    }

    if(valid && duplicateId && duplicateNickName) {
      setPage((prev) => prev + 1);
    }else{
      alert("정보입력 or 중복검사를 진행해주세요!!")
    }
  }

  //# 이전 페이지 이동
  const handlePreviousPage = () => setPage((prev) => prev - 1);

  //# 아이디 중복확인
  const handleDuplicateId = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      if(signUpData.userId && idRegex.test(signUpData.userId)) {
        setValidId("")
        const result = await axios.get(`http://localhost:8081/api/v1/auth/duplicateId/${signUpData.userId}`)
  
        if(result.data.data === true) {
          setDuplicateIdMs("※ 아이디가 중복되었습니다.")
          setDuplicateId(false);
        }else{
          setDuplicateIdMs("✅")
          setDuplicateId(true)
        }
      } else{
        setValidId("※ 아이디 8~14자의 영문, 숫자 포함 입력")
        setDuplicateIdMs("")
        setDuplicateId(false);
      }
    }catch(error) {
      console.log(error);
    }
  }

  //# 닉네임 중복확인
  const handleDuplicateNickName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      if(signUpData.nickName && nicknameRegex.test(signUpData.nickName)) {
        setValidNickName("")
        const result = await axios.get(`http://localhost:8081/api/v1/auth/duplicateNickName/${signUpData.nickName}`)
  
        if(result.data.data === true) {
          setDuplicateNickNameMs("※ 닉네임이 중복되었습니다.")
          setDuplicateNickName(false);
        }else{
          setDuplicateNickNameMs("✅")
          setDuplicateNickName(true)
        }
      } else{
        setValidNickName("※ 아이디 8~14자의 영문, 숫자 포함 입력")
        setDuplicateNickNameMs("")
        setDuplicateNickName(false);
      }
    }catch(error) {
      console.log(error);
    }
  }

  //# 회원가입 버튼
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let valid = true;

    // 취미 유효성 검사
    if(signUpData.hobbies.length !== 3 && signUpData.hobbies.length !== 0) {
      valid = false;
      setValidHobby("취미를 3가지 선택해주세요")
    }else{
      valid = true;
    }

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

    if(valid) {
      try {
      
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/signUp",
          signUpForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data.data);
        alert("회원가입이 완료되었습니다!")
        navigate('/');
      } catch (error) {
      console.error("Sign-up failed:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
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
              <label htmlFor="userId" css={s.labelBox}>
                <p css={s.label}>아이디*</p> {validId ? <p css={s.errorMessage}>{validId}</p> : <></>}
                {duplicateIdMs ? <p css={s.errorMessage}>{duplicateIdMs}</p>: <></>}
              </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="userId"
                  id="userId"
                  onChange={handleInputChange}
                  value={signUpData.userId}
                  placeholder="8~14자의 영문, 숫자 포함 입력"
                />
                <button css={s.validBtn} onClick={handleDuplicateId}>중복 확인</button>
              </div>
            </div>
            <div css={s.fieldBox}>
            <label htmlFor="password" css={s.labelBox}>
                <p css={s.label}>비밀번호*</p> {validPassword ? <p css={s.errorMessage}>{validPassword}</p> : <></>}
            </label>
              <input
                css={s.passwordTop}
                type="password"
                name="password"
                id="password"
                value={signUpData.password}
                onChange={handleInputChange}
                placeholder="8~16자의 영문, 숫자, 특수문자 포함 입력"
              />
              <input
                css={s.passwordBottom}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호 확인"
              />
              
            </div>
            <div css={s.fieldBox}>
            <label htmlFor="userBirthDate" css={s.labelBox}>
                <p css={s.label}>생년월일*</p> {validBirthDay ? <p css={s.errorMessage}>{validBirthDay}</p> : <></>}
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
            <label htmlFor="userName" css={s.labelBox}>
                <p css={s.label}>성명*</p> {validName ? <p css={s.errorMessage}>{validName}</p> : <></>}
            </label>
              <input
                css={s.input}
                type="text"
                name="userName"
                id="userName"
                value={signUpData.userName}
                onChange={handleInputChange}
                placeholder="한글, 영문의 사용자 이름 입력"
              />
            </div>
            <div css={s.fieldBox}>
            <label htmlFor="nickName" css={s.labelBox}>
                <p css={s.label}>닉네임*</p> {validNickName ? <p css={s.errorMessage}>{validNickName}</p> : <></>}
                {duplicateNickNameMs ? <p css={s.errorMessage}>{duplicateNickNameMs}</p>: <></>}
            </label>
              <div css={s.validBox}>
                <input
                  css={s.validInput}
                  type="text"
                  name="nickName"
                  id="nickName"
                  value={signUpData.nickName}
                  onChange={handleInputChange}
                  placeholder="1~10자의 한글, 영문, 숫자 입력 (특수문자 불가)"
                />
                <button css={s.validBtn} onClick={handleDuplicateNickName}>중복 확인</button>
              </div>
            </div>

            <div css={s.fieldBox}>
            <label htmlFor="gender" css={s.labelBox}>
              <h1 css={s.label}>성별*</h1> {validGender ? <p css={s.errorMessage}>{validGender}</p> : <></>}
            </label>
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
              <h1 css={s.label}>프로필 이미지</h1>
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
            <label htmlFor="gender" css={s.labelBox}>
              <h1 css={s.label}>취미[※ 3가지 선택] </h1> {validHobby ? <p css={s.errorMessage}>{validHobby}</p> : <></>}
            </label>
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
              <h1 css={s.label}>지역</h1>
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

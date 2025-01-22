export const REQUEST_URL = "http://localhost:8080";

//& 테이블 경로 상수 선언
export const WEB_MAIN = '/';
export const WEB_APP_MAIN = "/main/*";

// 회원 매핑핑
export const SIGN_IN_PAGE = "/signIn";
export const SIGN_UP_PAGE = "/signUp";
export const FIND_PASSWORD_PAGE = "/findPassword";
export const FIND__VERIFY_PASSWORD_PAGE = "/findPassword/verify";
export const FIND_USERID_PAGE = "/findUserId/*";
export const AUTH_PAGE = "/auth";
export const SNS_SUCCESS_PAGE = "/auth";

// 리뷰 매핑
export const REVIEW_MAIN = "/main";
export const CREATE_REVIEW_PAGE = "/create";
export const MY_PAGE_REVIEW = "/myPage";

// 신고 관련 매핑
export const REPORT_POST_PAGE = "/report/:groupId/:reportUserId";

// 그룹 관련 매핑
export const JOIN_GROUP_PAGE = "/join-group/:groupId";

// 검색 관련 매핑
export const SEARCH_PAGE = "/search/*";

// 공지사항
export const NOTICE_PAGE = "/notice";

// 모임참여 신청
export const GROUP_JOIN_PAGE = "/group-join/*";

// 내정보조회 마이페이지
export const MY_PAGE = "/mypage/userInfo/*";

// 그룹 상세 페이지
export const GROUP_DETAIL = "/meeting-group/:groupId";

// 모임 참여 신청 확인 페이지지
export const PARTICIPATION_STATUS_PAGE = "/mypage/participationStatus";

// 그룹 생성 페이지
export const CREATE_GROUP = "/main/create-group";

// 유저 리스트 페이지
export const USER_LIST_PAGE = "/main/manager/user-list/:groupId";

// 리뷰 페이지 
export const REVIEW_PAGE = "/review/*";

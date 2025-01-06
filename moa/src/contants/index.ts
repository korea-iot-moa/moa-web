//& 테이블 경로 상수 선언
export const WEB_MAIN = '/'
export const WEB_APP_MAIN = "/main/*"

// 회원 매핑핑
export const SIGN_IN_PAGE = "/signIn"
export const SIGN_UP_PAGE = "/signUp"
export const FIND_PASSWORD_PAGE = "/findPassword"
export const FIND__VERIFY_PASSWORD_PAGE = "/findPassword/verify"
export const FIND_USERID_PAGE = "/findUserId/*"
// 리뷰 매핑
export const REVIEW_MAIN = "/main";
export const CREATE_REVIEW_PAGE = "/create";
export const MY_PAGE_REVIEW = "/myPage";

// 신고 관련 매핑
export const REPORT_POST_PAGE = "/report/:groupId/:reportUserId"

// 그룹 관련 매핑
export const JOIN_GROUP_PAGE = "/join-group/:groupId"

// constants.ts
// export const USER_LIST_PAGE = `/manager/user-list/:groupId`;
// export const BLACK_LIST_PAGE = (groupId: string) => `/manager/black-list/${groupId}`;
// export const CHAR_PAGE = (groupId: number) => `/manager/chart/${groupId}`;
// export const REPORT_PAGE = (groupId: string) => `/manager/report/${groupId}`;
// export const APPROVED_PAGE = (groupId: string) => `/manager/approved/${groupId}`;
// export const VOTE_PAGE = (groupId: string) => `/manager/vote/${groupId}`;
// export const UPDATE_GROUP_PAGE = (groupId: string) => `/manager/update-group/${groupId}`;

// 공지사항
export const NOTICE_PAGE = "/notice";

// 모임참여 신청
export const GROUP_JOIN_PAGE = "/group-join/:groupId/*";

// 내정보조회 마이페이지
export const MY_PAGE = "/mypage/userInfo/*"



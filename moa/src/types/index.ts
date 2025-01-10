export interface BlackList {
  blackListId: number;
  userId: string;
  groupId: number;
}

export type GroupCategory =
  | "취미"
  | "문화_예술"
  | "스포츠_운동"
  | "푸드_맛집"
  | "자기계발"
  | "여행"
  | "연애"
  | "힐링";

export type GroupType = "단기모임" | "정기모임";

export type MeetingType = "온라인" | "오프라인";

export interface MeetingGroup {
  groupId: number;
  creatorId: string;
  groupTitle: string;
  groupContent: string;
  groupAddress: string;
  groupImage: string;
  groupSupplies: string;
  groupDate: string;
  groupQuestion: string;
  groupCategory: GroupCategory;
  groupType: GroupType;
  meetingType: MeetingType;
}

export interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeDate: Date;
}

// 추천 테이블 복합 키 id
export interface RecommendationsId {
  groupId: number;
  userId: string;
}

export interface Recommendation {
  id: RecommendationsId;
  user: User;
  meetingGroup: MeetingGroup;
}

export type ReportType = "욕설" | "사기" | "성추행" | "폭행" | "기타";

export type ReportResult = "처리중" | "추방" | "유지";

export interface Report {
  reportId: number;
  userId: string;
  groupId: number;
  reportDetail: string;
  reportType: ReportType;
  reportUser: string;
  reportImage: string;
  reportResult: ReportResult;
}

export interface Review {
  reviewId: number | null;
  userId: string;
  groupId: number;
  groupName: string;
  reviewContent: string;
  reviewDate: Date;
  reviewImage: any;
}

export type Gender = "MALE" | "FEMALE";
export type Hobby = {
  id: number;
  hobbyName: string;
};
export type Region =
  | "부산"
  | "대구"
  | "인천"
  | "광주"
  | "대전"
  | "울산"
  | "서울"
  | "제주"
  | "세종"
  | "경기"
  | "강원"
  | "충북"
  | "충남"
  | "전북"
  | "전남"
  | "경북"
  | "경남";

export interface User {
  userId: string;
  password: string;
  confirmPassword: string;
  userBirthDate: Date;
  userGender: Gender | null;
  userName: string;
  nickName: string;
  hobbies: Array<number>;
  profileImage: any;
  region: Region | null;
  snsId: string | null;
  joinPath: string;
  phoneNumber: string;
  email: string;
}

export interface UserAnswer {
  answerId: number;
  groupId: number;
  userId: string;
  userAnswer: string;
  answerDate: Date;
  isApproved: number;
}

export interface UserListId {
  groupId: number;
  userId: string;
}

type UserLevel = "관리자" | "우수회원" | "일반회원";

export interface UserList {
  id: UserListId;
  user: User;
  group: MeetingGroup;
  userLevel: UserLevel;
  joinDate: Date;
}

export type VoteAnswer = "O" | "X" | null;

export interface VoteResult {
  voteResultId: number | null;
  voteId: number;
  userId: string;
  voteAnswer: VoteAnswer;
  voteDate: Date;
}

export interface Vote {
  voteId: number;
  groupId: number;
  creatorId: string;
  voteContent: string;
  createDate: Date;
  closeDate: Date;
}

export interface SignInResponseDto {
  token: string;
  user: User;
  exprTime: number;
}

export type UserListDto = {
  userId: string;
  nickName: string;
  profileImage: any;
}

export type PostReportDto = {
  groupId: number;
  reportDetail: string;
  reportType: ReportType;
  reportUser: string;
  reportImage: any
}

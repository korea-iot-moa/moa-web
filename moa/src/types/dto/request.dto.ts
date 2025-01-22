import { GroupCategory, GroupType, MeetingGroup, MeetingType, ReportResult, UserList } from "..";


//블랙리스 등록 요청 
export interface PostReportRequestDto {
  reportUser : string; 
  reportResult :ReportResult;  
}

//신고 리스트 삭제 요청 
export interface DeleteReportResponseDto {
  userId: string;
  reportResult :ReportResult;  
}

//투표 등록
export interface PostVoteRequestDto{
  groupId: number;
  creatorId: string;
  voteContent: string;
  createDate: Date;
  closeDate: Date;
}

// 투표 수정
export interface PutVoteRequestDto{
  voteContent:  string ; 
  createDate : Date; 
  closeDate : Date;
}

//참여 요청 +  참여 거절 
export interface PostUserAnswerRequestDto {
 userId : string ; 
 isApproved : number;
}

//유저 레벨 수정 
export interface PostUserLevelRequestDto{
  userId: string; 
  userLevel: "일반회원"| "우수회원";
}

//모임 등록 요청
export interface PostGroupRequestDto {
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

//모임 수정 요청}
export interface PutGroupRequestDto {
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
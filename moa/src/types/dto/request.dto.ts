import { MeetingGroup, ReportResult, UserList } from "..";


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
//참여 요청 +  참여 거절 
export interface PostUserAnswerReqeustDto {
 userId : string ; 
 isApproved : number;
}

//유저 레벨 수정 
export interface PostUserLevelRequestDto{
  userId: string; 
  userLevel: "일반회원"| "우수회원";
}


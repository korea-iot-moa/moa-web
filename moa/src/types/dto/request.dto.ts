import { GroupCategory, GroupType, MeetingGroup, MeetingType, ReportResult, UserList } from "..";


export interface PostReportRequestDto {
  reportUser : string; 
  reportResult :ReportResult;  
}

export interface DeleteReportResponseDto {
  userId: string;
  reportResult :ReportResult;  
}

export interface PostVoteRequestDto{
  groupId: number;
  creatorId: string;
  voteContent: string;
  createDate: Date;
  closeDate: Date;
}

export interface PutVoteRequestDto{
  voteContent:  string ; 
  createDate : Date; 
  closeDate : Date;
}

export interface PostUserAnswerRequestDto {
  userId : string ; 
  isApproved : number;
}

export interface PostUserLevelRequestDto{
  userId: string; 
  userLevel: "일반회원"| "우수회원";
}

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

//! === 모임 관리자 페이지 응답 객체 정리 === //

import { Gender, GroupCategory, GroupType, MeetingGroup, MeetingType, ReportResult, ReportType, User, UserList } from "..";

export interface BlackListPageResponseDto {
  blackListId: number;
  profileImage: string 
  nickName: string;
  userLevel: string;
}

export interface GetUserListResponseDto {
  userId : string; 
  nickName: string;
  userLevel :UserList;
  profileImage :string; 
}

export interface GetGenderChartResponseDto{
  userGender : string ; 
  count : number; 
  ratio : number;
}

export interface GetQuarterCharResponseDto {
  quarter : number; 
  userCount : number; 
  ratio :  number;
}


export interface GetReportListResponseDto {
  reportId: number;
  userId: string;
  groupId: number;
  reportDetail: string;
  reportType: ReportType;
  reportUser: string;
  reportImage: string;
  reportResult: ReportResult;
}

export type GetVoteResponseDto = {
  voteId: number;
  groupId: number;
  creatorId: string;
  voteContent: string;
  createDate: Date;
  closeDate: Date;
}

export interface  GetReponseUserAnswer {
  answerId : number;
  MeetingGroup: any;
  grouptitle : MeetingGroup; 
  userId : string ; 
  isApproved : number;
}

export interface PostUserLevelResponse {
  groupId: number; 
  userLevel : UserList;
  nickName: string;

}

export interface PutUserLevelReponseDto {
  userId: string;
  nickName : string 
  UserLevel : UserList
}

// 모임 등록 응답 객체 정리
export interface PostGroupResonseDto{
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

// 모임 수정 응답 객체 정리
export interface PutGroupResponseDto {
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

export interface GetVoteAnswerChartResponseDto{
  
  voteAnswer : string ; 
  count : number; 
  ratio : number;
}

export type ParticipationStatusDataDto = {
  groupId: number;
  groupTitle: string;
  groupType: string;
  meetingType: string;
  groupCategory: string;
  groupImage: string;
  answerId: number;
  answerDate: Date;
  isApproved: number;
}
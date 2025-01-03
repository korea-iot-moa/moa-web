
//! === 모임 관리자 페이지 응답 객체 정리 === //

import { Gender, MeetingGroup, ReportResult, ReportType, User, UserList } from "..";

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
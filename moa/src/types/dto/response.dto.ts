
//! === 모임 관리자 페이지 응답 객체 정리 === //

import { Gender, ReportResult, ReportType } from "..";

export interface BlackListPageResponseDto {
  blackListId: number;
  profileImage: string 
  nickName: string;
  userLevel: string;
}

export interface GetUserListResponseDto {
  userId : string; 
  nickName: string;
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
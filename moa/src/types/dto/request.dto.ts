import { ReportResult } from "..";


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
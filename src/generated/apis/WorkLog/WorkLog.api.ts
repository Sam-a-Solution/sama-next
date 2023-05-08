import instance from '@apis/_axios/instance';

import { ContentType, HttpClient, RequestParams } from '../@http-client';
import {
  CursorPaginatedWorkLogListType,
  PaginatedWorkLogListType,
  WorkCheckType,
  WorkCheckValidationErrorType,
  WorkEmergencyReleaseType,
  WorkEmergencyReleaseValidationErrorType,
  WorkEmergencyType,
  WorkEmergencyValidationErrorType,
  WorkEndType,
  WorkEndValidationErrorType,
  WorkLogType,
  WorkLogValidationErrorType,
  WorkStatusCountType,
} from '../@types/data-contracts';
import { DeepOmitReadOnly } from '../@types/util-types';

export class WorkLogApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogList
   * @summary WorkLog 목록 조회
   * @request GET:/v1/work_log/
   * @secure
   */
  workLogList = (variables?: {
    query?: {
      /** Number of results to return per page. */
      limit?: number;
      /** The initial index from which to return the results. */
      offset?: number;
    };
    params?: RequestParams;
  }) =>
    this.request<PaginatedWorkLogListType, any>({
      path: `/v1/work_log/`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogCreate
   * @summary 작업 시작
   * @request POST:/v1/work_log/
   * @secure
   */
  workLogCreate = (variables: {
    data: DeepOmitReadOnly<WorkLogType>;
    params?: RequestParams;
  }) =>
    this.request<WorkLogType, WorkLogValidationErrorType>({
      path: `/v1/work_log/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogAllRetrieve
   * @summary WorkLog 목록 조회 (무한 스크롤)
   * @request GET:/v1/work_log/all/
   * @secure
   */
  workLogAllRetrieve = (variables?: {
    query?: {
      /** The pagination cursor value. */
      cursor?: string;
      /** Number of results to return per page. */
      page_size?: number;
    };
    params?: RequestParams;
  }) =>
    this.request<CursorPaginatedWorkLogListType, any>({
      path: `/v1/work_log/all/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogEmergencyRetrieve
   * @summary 작업 비상 상황 조회
   * @request GET:/v1/work_log/emergency/
   * @secure
   */
  workLogEmergencyRetrieve = (variables?: { params?: RequestParams }) =>
    this.request<WorkEmergencyType, any>({
      path: `/v1/work_log/emergency/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogStatusCountRetrieve
   * @summary 작업 통계 조회
   * @request GET:/v1/work_log/status_count/
   * @secure
   */
  workLogStatusCountRetrieve = (variables?: { params?: RequestParams }) =>
    this.request<WorkStatusCountType, any>({
      path: `/v1/work_log/status_count/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogRetrieve
   * @summary WorkLog 상세 조회
   * @request GET:/v1/work_log/{work_log_id}/
   * @secure
   */
  workLogRetrieve = (variables: {
    workLogId: number;
    params?: RequestParams;
  }) =>
    this.request<WorkLogType, any>({
      path: `/v1/work_log/${variables.workLogId}/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogUpdate
   * @summary WorkLog 수정
   * @request PUT:/v1/work_log/{work_log_id}/
   * @secure
   */
  workLogUpdate = (variables: {
    workLogId: number;
    data: DeepOmitReadOnly<WorkLogType>;
    params?: RequestParams;
  }) =>
    this.request<WorkLogType, WorkLogValidationErrorType>({
      path: `/v1/work_log/${variables.workLogId}/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogCheckUpdate
   * @summary 관리자 확인
   * @request PUT:/v1/work_log/{work_log_id}/check/
   * @secure
   */
  workLogCheckUpdate = (variables: {
    workLogId: number;
    data: DeepOmitReadOnly<WorkCheckType>;
    params?: RequestParams;
  }) =>
    this.request<WorkCheckType, WorkCheckValidationErrorType>({
      path: `/v1/work_log/${variables.workLogId}/check/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogEmergencyReleaseUpdate
   * @summary 비상 상황 해제
   * @request PUT:/v1/work_log/{work_log_id}/emergency_release/
   * @secure
   */
  workLogEmergencyReleaseUpdate = (variables: {
    workLogId: number;
    data: DeepOmitReadOnly<WorkEmergencyReleaseType>;
    params?: RequestParams;
  }) =>
    this.request<
      WorkEmergencyReleaseType,
      WorkEmergencyReleaseValidationErrorType
    >({
      path: `/v1/work_log/${variables.workLogId}/emergency_release/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogEmergencyStartUpdate
   * @summary 작업 비상 상황
   * @request PUT:/v1/work_log/{work_log_id}/emergency_start/
   * @secure
   */
  workLogEmergencyStartUpdate = (variables: {
    workLogId: number;
    data: DeepOmitReadOnly<WorkEmergencyType>;
    params?: RequestParams;
  }) =>
    this.request<WorkEmergencyType, WorkEmergencyValidationErrorType>({
      path: `/v1/work_log/${variables.workLogId}/emergency_start/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work_log
   * @name WorkLogEndUpdate
   * @summary 작업 종료
   * @request PUT:/v1/work_log/{work_log_id}/end/
   * @secure
   */
  workLogEndUpdate = (variables: {
    workLogId: number;
    data: DeepOmitReadOnly<WorkEndType>;
    params?: RequestParams;
  }) =>
    this.request<WorkEndType, WorkEndValidationErrorType>({
      path: `/v1/work_log/${variables.workLogId}/end/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
}

export const workLogApi = new WorkLogApi({ instance });

//

import instance from '@apis/_axios/instance';

import { ContentType, HttpClient, RequestParams } from '../@http-client';
import {
  PaginatedWorkListType,
  WorkType,
  WorkValidationErrorType,
} from '../@types/data-contracts';
import { DeepOmitReadOnly } from '../@types/util-types';

export class WorkApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags work
   * @name WorkList
   * @summary Work 목록 조회
   * @request GET:/v1/work/
   * @secure
   */
  workList = (variables?: {
    query?: {
      /** Number of results to return per page. */
      limit?: number;
      /** The initial index from which to return the results. */
      offset?: number;
    };
    params?: RequestParams;
  }) =>
    this.request<PaginatedWorkListType, any>({
      path: `/v1/work/`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work
   * @name WorkCreate
   * @summary Work 등록
   * @request POST:/v1/work/
   * @secure
   */
  workCreate = (variables: {
    data: DeepOmitReadOnly<WorkType>;
    params?: RequestParams;
  }) =>
    this.request<WorkType, WorkValidationErrorType>({
      path: `/v1/work/`,
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
   * @tags work
   * @name WorkCheckRetrieve
   * @summary 이전 작업 내용 조회
   * @request GET:/v1/work/check/
   * @secure
   */
  workCheckRetrieve = (variables?: { params?: RequestParams }) =>
    this.request<WorkType, any>({
      path: `/v1/work/check/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work
   * @name WorkChoiceRetrieve
   * @summary 선택 값들 목록 조회
   * @request GET:/v1/work/choice/
   * @secure
   */
  workChoiceRetrieve = (variables?: { params?: RequestParams }) =>
    this.request<WorkType, any>({
      path: `/v1/work/choice/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags work
   * @name WorkRetrieve
   * @summary Work 상세 조회
   * @request GET:/v1/work/{work_id}/
   * @secure
   */
  workRetrieve = (variables: { workId: number; params?: RequestParams }) =>
    this.request<WorkType, any>({
      path: `/v1/work/${variables.workId}/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags work
   * @name WorkUpdate
   * @summary Work 수정
   * @request PUT:/v1/work/{work_id}/
   * @secure
   */
  workUpdate = (variables: {
    workId: number;
    data: DeepOmitReadOnly<WorkType>;
    params?: RequestParams;
  }) =>
    this.request<WorkType, WorkValidationErrorType>({
      path: `/v1/work/${variables.workId}/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
}

export const workApi = new WorkApi({ instance });

//

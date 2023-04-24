import { AxiosError } from 'axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  WorkCheckValidationErrorType,
  WorkEmergencyReleaseValidationErrorType,
  WorkEmergencyValidationErrorType,
  WorkEndValidationErrorType,
  WorkLogValidationErrorType,
} from '../@types/data-contracts';
import {
  MutationHookParams,
  Parameter,
  QueryHookParams,
} from '../@types/react-query-type';
import { workLogApi } from './WorkLog.api';

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_WORK_LOG_API = {
  LIST: (variables?: Parameter<typeof workLogApi.workLogList>) =>
    ['WORK_LOG_LIST', variables].filter((key) => typeof key !== 'undefined'),
  CREATE: () => ['WORK_LOG_CREATE'].filter((key) => typeof key !== 'undefined'),
  EMERGENCY_RETRIEVE: (
    variables?: Parameter<typeof workLogApi.workLogEmergencyRetrieve>,
  ) =>
    ['WORK_LOG_EMERGENCY_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  RETRIEVE: (variables: Parameter<typeof workLogApi.workLogRetrieve>) =>
    ['WORK_LOG_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  UPDATE: () => ['WORK_LOG_UPDATE'].filter((key) => typeof key !== 'undefined'),
  CHECK_UPDATE: () =>
    ['WORK_LOG_CHECK_UPDATE'].filter((key) => typeof key !== 'undefined'),
  EMERGENCY_RELEASE_UPDATE: () =>
    ['WORK_LOG_EMERGENCY_RELEASE_UPDATE'].filter(
      (key) => typeof key !== 'undefined',
    ),
  EMERGENCY_START_UPDATE: () =>
    ['WORK_LOG_EMERGENCY_START_UPDATE'].filter(
      (key) => typeof key !== 'undefined',
    ),
  END_UPDATE: () =>
    ['WORK_LOG_END_UPDATE'].filter((key) => typeof key !== 'undefined'),
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogList
 * @summary WorkLog 목록 조회
 * @request GET:/v1/work_log/
 * @secure
 */
export const useWorkLogListQuery = (
  params?: QueryHookParams<typeof workLogApi.workLogList, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_LOG_API.LIST(params?.variables);
  const result = useQuery(
    queryKey,
    () => workLogApi.workLogList(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogCreate
 * @summary 작업 시작
 * @request POST:/v1/work_log/
 * @secure
 */
export const useWorkLogCreateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogCreate,
    AxiosError<WorkLogValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.CREATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogEmergencyRetrieve
 * @summary 작업 비상 상황 조회
 * @request GET:/v1/work_log/emergency/
 * @secure
 */
export const useWorkLogEmergencyRetrieveQuery = (
  params?: QueryHookParams<
    typeof workLogApi.workLogEmergencyRetrieve,
    AxiosError<any>
  >,
) => {
  const queryKey = QUERY_KEY_WORK_LOG_API.EMERGENCY_RETRIEVE(params?.variables);
  const result = useQuery(
    queryKey,
    () => workLogApi.workLogEmergencyRetrieve(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogRetrieve
 * @summary WorkLog 상세 조회
 * @request GET:/v1/work_log/{work_log_id}/
 * @secure
 */
export const useWorkLogRetrieveQuery = (
  params: QueryHookParams<typeof workLogApi.workLogRetrieve, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_LOG_API.RETRIEVE(params.variables);
  const result = useQuery(
    queryKey,
    () => workLogApi.workLogRetrieve(params.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogUpdate
 * @summary WorkLog 수정
 * @request PUT:/v1/work_log/{work_log_id}/
 * @secure
 */
export const useWorkLogUpdateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogUpdate,
    AxiosError<WorkLogValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.UPDATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogCheckUpdate
 * @summary 관리자 확인
 * @request PUT:/v1/work_log/{work_log_id}/check/
 * @secure
 */
export const useWorkLogCheckUpdateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogCheckUpdate,
    AxiosError<WorkCheckValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.CHECK_UPDATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogCheckUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogEmergencyReleaseUpdate
 * @summary 비상 상황 해제
 * @request PUT:/v1/work_log/{work_log_id}/emergency_release/
 * @secure
 */
export const useWorkLogEmergencyReleaseUpdateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogEmergencyReleaseUpdate,
    AxiosError<WorkEmergencyReleaseValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.EMERGENCY_RELEASE_UPDATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogEmergencyReleaseUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogEmergencyStartUpdate
 * @summary 작업 비상 상황
 * @request PUT:/v1/work_log/{work_log_id}/emergency_start/
 * @secure
 */
export const useWorkLogEmergencyStartUpdateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogEmergencyStartUpdate,
    AxiosError<WorkEmergencyValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.EMERGENCY_START_UPDATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogEmergencyStartUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work_log
 * @name WorkLogEndUpdate
 * @summary 작업 종료
 * @request PUT:/v1/work_log/{work_log_id}/end/
 * @secure
 */
export const useWorkLogEndUpdateMutation = (
  params: MutationHookParams<
    typeof workLogApi.workLogEndUpdate,
    AxiosError<WorkEndValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_LOG_API.END_UPDATE();
  const result = useMutation(
    mutationKey,
    workLogApi.workLogEndUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

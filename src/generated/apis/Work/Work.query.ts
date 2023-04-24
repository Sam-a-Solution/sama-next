import { AxiosError } from 'axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import { WorkValidationErrorType } from '../@types/data-contracts';
import {
  MutationHookParams,
  Parameter,
  QueryHookParams,
} from '../@types/react-query-type';
import { workApi } from './Work.api';

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_WORK_API = {
  LIST: (variables?: Parameter<typeof workApi.workList>) =>
    ['WORK_LIST', variables].filter((key) => typeof key !== 'undefined'),
  CREATE: () => ['WORK_CREATE'].filter((key) => typeof key !== 'undefined'),
  CHECK_RETRIEVE: (variables?: Parameter<typeof workApi.workCheckRetrieve>) =>
    ['WORK_CHECK_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  CHOICE_RETRIEVE: (variables?: Parameter<typeof workApi.workChoiceRetrieve>) =>
    ['WORK_CHOICE_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  STATUS_COUNT_RETRIEVE: (
    variables?: Parameter<typeof workApi.workStatusCountRetrieve>,
  ) =>
    ['WORK_STATUS_COUNT_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  RETRIEVE: (variables: Parameter<typeof workApi.workRetrieve>) =>
    ['WORK_RETRIEVE', variables].filter((key) => typeof key !== 'undefined'),
  UPDATE: () => ['WORK_UPDATE'].filter((key) => typeof key !== 'undefined'),
};

/**
 * No description
 *
 * @tags work
 * @name WorkList
 * @summary Work 목록 조회
 * @request GET:/v1/work/
 * @secure
 */
export const useWorkListQuery = (
  params?: QueryHookParams<typeof workApi.workList, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_API.LIST(params?.variables);
  const result = useQuery(
    queryKey,
    () => workApi.workList(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkCreate
 * @summary Work 등록
 * @request POST:/v1/work/
 * @secure
 */
export const useWorkCreateMutation = (
  params: MutationHookParams<
    typeof workApi.workCreate,
    AxiosError<WorkValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_API.CREATE();
  const result = useMutation(mutationKey, workApi.workCreate, params?.options);

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkCheckRetrieve
 * @summary 이전 작업 내용 조회
 * @request GET:/v1/work/check/
 * @secure
 */
export const useWorkCheckRetrieveQuery = (
  params?: QueryHookParams<typeof workApi.workCheckRetrieve, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_API.CHECK_RETRIEVE(params?.variables);
  const result = useQuery(
    queryKey,
    () => workApi.workCheckRetrieve(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkChoiceRetrieve
 * @summary 선택 값들 목록 조회
 * @request GET:/v1/work/choice/
 * @secure
 */
export const useWorkChoiceRetrieveQuery = (
  params?: QueryHookParams<typeof workApi.workChoiceRetrieve, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_API.CHOICE_RETRIEVE(params?.variables);
  const result = useQuery(
    queryKey,
    () => workApi.workChoiceRetrieve(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkStatusCountRetrieve
 * @summary 작업 통계 조회
 * @request GET:/v1/work/status_count/
 * @secure
 */
export const useWorkStatusCountRetrieveQuery = (
  params?: QueryHookParams<
    typeof workApi.workStatusCountRetrieve,
    AxiosError<any>
  >,
) => {
  const queryKey = QUERY_KEY_WORK_API.STATUS_COUNT_RETRIEVE(params?.variables);
  const result = useQuery(
    queryKey,
    () => workApi.workStatusCountRetrieve(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkRetrieve
 * @summary Work 상세 조회
 * @request GET:/v1/work/{work_id}/
 * @secure
 */
export const useWorkRetrieveQuery = (
  params: QueryHookParams<typeof workApi.workRetrieve, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_WORK_API.RETRIEVE(params.variables);
  const result = useQuery(
    queryKey,
    () => workApi.workRetrieve(params.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags work
 * @name WorkUpdate
 * @summary Work 수정
 * @request PUT:/v1/work/{work_id}/
 * @secure
 */
export const useWorkUpdateMutation = (
  params: MutationHookParams<
    typeof workApi.workUpdate,
    AxiosError<WorkValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_WORK_API.UPDATE();
  const result = useMutation(mutationKey, workApi.workUpdate, params?.options);

  return { ...result, mutationKey };
};

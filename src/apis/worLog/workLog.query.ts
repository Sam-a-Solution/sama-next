import { AxiosError } from 'axios';

import { useInfiniteQuery } from '@tanstack/react-query';

import { InfiniteQueryHookParams } from './../type.d';

import { workLogApi } from 'generated/apis/WorkLog/WorkLog.api';
import { QUERY_KEY_WORK_LOG_API } from 'generated/apis/WorkLog/WorkLog.query';

export const useWorkLogAllInfiniteQuery = (
  params?: InfiniteQueryHookParams<
    typeof workLogApi.workLogAllRetrieve,
    AxiosError<any>
  >,
) => {
  const queryKey = QUERY_KEY_WORK_LOG_API.ALL_RETRIEVE(params?.variables);

  const result = useInfiniteQuery(
    queryKey,
    ({ pageParam = '' }) => {
      const variables = params?.variables || {};
      const query = variables?.query || {};
      return workLogApi.workLogAllRetrieve({
        ...variables,
        query: { ...query, cursor: pageParam },
      });
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.cursor ? lastPage.cursor : undefined,
      ...params?.options,
    },
  );

  return { ...result, queryKey };
};

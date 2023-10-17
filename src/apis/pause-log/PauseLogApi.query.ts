import { QueryHookParams } from '@apis/type';

import { QUERY_KEY } from '@constants/query-keys';
import { useQuery } from '@tanstack/react-query';

import pauseLogApi from './PauseLogApi';
import { ListDTOType } from './PauseLogApi.type';

export const PAUSE_LOG_API_QUERY_KEY = {
  LIST: (params: ListDTOType) => [QUERY_KEY.PAUSE_LOG.LIST, params],
};

export function useGetPauseLogListQuery(
  params: QueryHookParams<typeof pauseLogApi.list>,
) {
  const queryKey = PAUSE_LOG_API_QUERY_KEY.LIST(params.variables);
  const query = useQuery(
    queryKey,
    () => pauseLogApi.list(params.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

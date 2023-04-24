import { AxiosError } from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Parameter, QueryHookParams } from '../@types/react-query-type';
import { notificationApi } from './Notification.api';

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_NOTIFICATION_API = {
  LIST: (variables?: Parameter<typeof notificationApi.notificationList>) =>
    ['NOTIFICATION_LIST', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
  RETRIEVE: (
    variables: Parameter<typeof notificationApi.notificationRetrieve>,
  ) =>
    ['NOTIFICATION_RETRIEVE', variables].filter(
      (key) => typeof key !== 'undefined',
    ),
};

/**
 * No description
 *
 * @tags notification
 * @name NotificationList
 * @summary Notification 목록 조회
 * @request GET:/v1/notification/
 * @secure
 */
export const useNotificationListQuery = (
  params?: QueryHookParams<
    typeof notificationApi.notificationList,
    AxiosError<any>
  >,
) => {
  const queryKey = QUERY_KEY_NOTIFICATION_API.LIST(params?.variables);
  const result = useQuery(
    queryKey,
    () => notificationApi.notificationList(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags notification
 * @name NotificationRetrieve
 * @summary Notification 상세 조회
 * @request GET:/v1/notification/{id}/
 * @secure
 */
export const useNotificationRetrieveQuery = (
  params: QueryHookParams<
    typeof notificationApi.notificationRetrieve,
    AxiosError<any>
  >,
) => {
  const queryKey = QUERY_KEY_NOTIFICATION_API.RETRIEVE(params.variables);
  const result = useQuery(
    queryKey,
    () => notificationApi.notificationRetrieve(params.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

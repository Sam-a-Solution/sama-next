import instance from '@apis/_axios/instance';

import { HttpClient, RequestParams } from '../@http-client';
import {
  NotificationType,
  PaginatedNotificationListType,
} from '../@types/data-contracts';

export class NotificationApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags notification
   * @name NotificationList
   * @summary Notification 목록 조회
   * @request GET:/v1/notification/
   * @secure
   */
  notificationList = (variables?: {
    query?: {
      /** Number of results to return per page. */
      limit?: number;
      /** The initial index from which to return the results. */
      offset?: number;
    };
    params?: RequestParams;
  }) =>
    this.request<PaginatedNotificationListType, any>({
      path: `/v1/notification/`,
      method: 'GET',
      query: variables?.query,
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags notification
   * @name NotificationRetrieve
   * @summary Notification 상세 조회
   * @request GET:/v1/notification/{id}/
   * @secure
   */
  notificationRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<NotificationType, any>({
      path: `/v1/notification/${variables.id}/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables.params,
    });
}

export const notificationApi = new NotificationApi({ instance });

//

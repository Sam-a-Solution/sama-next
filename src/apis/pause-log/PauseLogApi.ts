import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { ListDTOType, ListModelType } from './PauseLogApi.type';

export class PauseLogApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  list = async (params: ListDTOType): Promise<ListModelType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/pause_log/`,
      params,
    });
    return data;
  };
}

const pauseLogApi = new PauseLogApi();

export default pauseLogApi;

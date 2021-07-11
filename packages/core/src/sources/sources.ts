import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CreateSourceParams, RetrieveSourceParams, SourceResource } from './types';

export const createSource = async (
  data: CreateSourceParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.post<SourceResource>('/sources', data, config);

  return res.data.data;
};

export const retrieveSource = async (
  data: RetrieveSourceParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
) => {
  const res = await axiosInstance.get<SourceResource>(`sources/${data.id}`, config);

  return res.data.data;
};

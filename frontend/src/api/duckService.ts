import axios, { AxiosResponse } from 'axios';
import { Duck, CreateDuckDto, UpdateDuckDto } from '../types/duck.types';

const apiClient = axios.create({
  baseURL: '/api',
});

export const getDucks = (): Promise<AxiosResponse<Duck[]>> => {
  return apiClient.get('/warehouse');
};

export const addDuck = (duckData: CreateDuckDto): Promise<AxiosResponse<Duck>> => {
  return apiClient.post('/warehouse', duckData);
};

export const updateDuck = (id: number, duckData: UpdateDuckDto): Promise<AxiosResponse<Duck>> => {
  return apiClient.put(`/warehouse/${id}`, duckData);
};

export const deleteDuck = (id: number): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.delete(`/warehouse/${id}`);
};
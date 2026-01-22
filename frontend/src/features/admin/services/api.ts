import { api } from "../../../services/api";
import { AdminEndpoints } from "../../../utils/ApiEndpoints";
import type { Service } from "../../../types";

export const getAllServices = async (filters?: Record<string, any>) => {
  const res = await api.get(AdminEndpoints.SERVICES, { params: filters });
  return res.data;
};

export const getServiceById = async (serviceId: string) => {
  const res = await api.get(`${AdminEndpoints.SERVICE}/${serviceId}`);
  return res.data;
};

export const createService = async (data: Omit<Service, "id">) => {
  const res = await api.post(AdminEndpoints.SERVICE, data);
  return res.data;
};

export const updateService = async (serviceId: string, data: Partial<Omit<Service, "id">>) => {
  const res = await api.put(`${AdminEndpoints.SERVICE}/${serviceId}`, data);
  return res.data;
};

export const deleteService = async (serviceId: string) => {
  const res = await api.delete(`${AdminEndpoints.SERVICE}/${serviceId}`);
  return res.data;
};

export const getAllBookings = async (filters?: Record<string, any>) => {
  const res = await api.get(AdminEndpoints.BOOKINGS, { params: filters });
  return res.data;
};

export const getAllUsers = async (filters?: Record<string, any>) => {
  const res = await api.get(AdminEndpoints.USERS, { params: filters });
  return res.data;
};


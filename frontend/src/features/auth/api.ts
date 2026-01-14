import { api } from "../../services/api";
import type { LoginPayload, signupPayLoad } from "../../types";
import { AuthEndpoints } from "../../utils/ApiEndpoints";

export const loginApi = async (data: LoginPayload) => {
  const res = await api.post(AuthEndpoints.LOGIN, data);
  return res.data;
};
export const signup = async (data: signupPayLoad) => {
  const res = await api.post(AuthEndpoints.SIGNUP, data);
  return res.data;
};

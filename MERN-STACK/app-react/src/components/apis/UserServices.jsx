import ApiClient from "@/lib/apiClient";

export const LOGIN_USER = async (credentials) => {
  const response = await ApiClient.post("/api/users/login", credentials);
  return response.data;
};

export const REGISTER_USER = async (userData) => {
  const response = await ApiClient.post("/api/users/register", userData);
  return response.data;
};

export const GET_ALL_USER = async () => {
  const response = await ApiClient.get("/api/users");
  return response.data;
};

export const GET_USER_BY_ID = async (user_id) => {
  const response = await ApiClient.get(`/api/users/${user_id}`);
  return response.data;
};

export const CREATE_USER = async (payload) => {
  const response = await ApiClient.post("/api/users", payload);
  return response.data;
};

export const UPDATE_USER = async (user_id, payload) => {
  const response = await ApiClient.put(`/api/users/${user_id}`, payload);
  return response.data;
};

export const PATCH_USER = async (user_id, payload) => {
  const response = await ApiClient.patch(`/api/users/${user_id}`, payload);
  return response.data;
};

export const DELETE_USER = async (user_id) => {
  const response = await ApiClient.delete(`/api/users/${user_id}`);
  return response.data;
};
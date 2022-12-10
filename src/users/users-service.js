import axios from "axios";

const USER_API_URL = 'http://localhost:4000/users'
const BASE_API_URL = 'http://localhost:4000'

const api = axios.create({ withCredentials: true });

export const findUserById = async (uid) => {
  const response = await api.get(`${USER_API_URL}/${uid}`);
  const user = response.data;
  return user;
}

export const register = async (user) => {
  const response = await api.post(`${BASE_API_URL}/register`, user);
  const newUser = response.data;
  return newUser;
}

export const login = async (user) => {
  const response = await api.post(`${BASE_API_URL}/login`, user);
  return response.data;
}

export const logout = async () => {
  const response = await api.post(`${BASE_API_URL}/logout`);
  return response.data;
}
export const profile = async () => {
  const response = await api.post(`${BASE_API_URL}/profile`);
  return response.data;
}

export const toggleSongLike = async (songIds) => {
  const response = await api.put(`${BASE_API_URL}/likeSong`, {
    songIds
  });
  return response.data;
}

const deleteUser = async (uid) => { 
  const response = await api.delete(`${BASE_API_URL}/deleteUser/${uid}`);
  return response.data;
}

const updateUser = async (user) => {
  const response = await api.put(`${BASE_API_URL}/update/`, user);
}
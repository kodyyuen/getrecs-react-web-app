import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  findUserById, 
  login, 
  logout, 
  profile, 
  register,
  toggleSongLike
} from "./users-service";

export const logoutThunk = createAsyncThunk(
  'logout',
  async () => await logout()
)

export const profileThunk = createAsyncThunk(
  'profile',
  async () => await profile()
)

export const findUserByIdThunk = createAsyncThunk(
  'findUserById',
  async (uid) => await findUserById(uid)
)

export const loginThunk = createAsyncThunk(
  'login',
  async (user) => await login(user)
)

export const registerThunk = createAsyncThunk(
  'register',
  async (user) => await register(user)
)

export const toggleSongLikeThunk = createAsyncThunk(
  'likeSong',
  async ({uid, songIds}) => await toggleSongLike(uid, songIds)
)
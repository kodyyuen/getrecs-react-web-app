import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  findUserById, 
  login, 
  logout, 
  profile, 
  register,
  findWhoRecentlyLiked,
  updateUser,
  getRecommendationsByLikedSongs,
  getRecommendationsByGenresAndSave,
  deleteRecommendations,
  findAllUsers,
  deleteUser,
  deleteRecSet
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

export const findAllUsersThunk = createAsyncThunk(
  'findAllUsers',
  async () => await findAllUsers()
)

export const loginThunk = createAsyncThunk(
  'login',
  async (user) => await login(user)
)

export const registerThunk = createAsyncThunk(
  'register',
  async (user) => await register(user)
)

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (updates) => await updateUser(updates)
)

export const deleteUserThunk = createAsyncThunk(
  'deleteUser',
  async (uid) => await deleteUser(uid)
)

export const findWhoRecentlyLikedThunk = createAsyncThunk(
  "findRecentlyLikedBy",
  async (songID) => await findWhoRecentlyLiked(songID)
)

export const getRecommendationsByLikedSongsThunk = createAsyncThunk(
  "getRecommendationsByLikedSongs",
  async (songs) => await getRecommendationsByLikedSongs(songs)
)

// for users that are logged in
export const getRecommendationsByGenresAndSaveThunk = createAsyncThunk(
  "getRecommendationsByGenresAndSave",
  async (genres) => await getRecommendationsByGenresAndSave(genres)
)

export const deleteRecommendationsThunk = createAsyncThunk(
  'deleteRecommendations',
  async () => await deleteRecommendations()
)

export const deleteRecSetThunk = createAsyncThunk(
  'deleteRecSet',
  async (timestamp) => await deleteRecSet(timestamp)
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  findMultipleSongsBySongID,
  findSongBySearchTerm,
  findSongBySongID,
  getGenres,
  getRecommendationsByGenres,
  getTopTenSongs
} from "./songs-service";

export const findSongBySearchTermThunk = createAsyncThunk(
  "findSongBySearchTerm",
  async (term) => await findSongBySearchTerm(term)
)

export const findSongBySongIDThunk = createAsyncThunk(
  "findSongBySongID",
  async (songID) => await findSongBySongID(songID)
)

export const findMultipleSongsBySongIDThunk = createAsyncThunk(
  "findMultipleSongsBySongID",
  async (songList) => await findMultipleSongsBySongID(songList)
)

export const getGenresThunk = createAsyncThunk(
  "getGenres",
  async () => await getGenres()
)

// for users that aren't logged in
export const getRecommendationsByGenresThunk = createAsyncThunk(
  "getRecommendationsByGenres",
  async (genres) => await getRecommendationsByGenres(genres)
)

export const getTopTenSongsThunk = createAsyncThunk(
  "getTopTenSongs",
  async () => await getTopTenSongs()
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { findSongBySearchTerm, findSongBySongID } from "./songs-service";

export const findSongBySearchTermThunk = createAsyncThunk(
  "findSongBySearchTerm",
  async (term) => await findSongBySearchTerm(term)
)

export const findSongBySongIDThunk = createAsyncThunk(
  "findSongBySongID",
  async (songID) => await findSongBySongID(songID)
)
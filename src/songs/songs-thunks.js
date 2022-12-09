import { createAsyncThunk } from "@reduxjs/toolkit";
import {findSongBySearchTerm, findSongBySongID} from "./songs-service";


export const findSongBySearchTermThunk = createAsyncThunk(
    "findSongBySearchTerm",
    (term) => findSongBySearchTerm(term)
)

export const findSongBySongIDThunk = createAsyncThunk(
    "findSongBySongID",
    (songID) => findSongBySongID(songID)
)
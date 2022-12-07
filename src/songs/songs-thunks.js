import { createAsyncThunk } from "@reduxjs/toolkit";
import findSongBySearchTerm from "./songs-service";


export const findSongBySearchTermThunk = createAsyncThunk(
    "findSongBySearchTerm",
    (term) => findSongBySearchTerm(term)
)
import {createSlice} from "@reduxjs/toolkit";
import { findSongBySearchTermThunk, findSongBySongIDThunk } from "./songs-thunks";

const initialState = {
    songs: [],
    details: null
}

const songsReducer = createSlice({
    name: "songs",
    initialState,
    extraReducers: {
        [findSongBySearchTermThunk.fulfilled]: (state, action) => {
            state.songs = action.payload;
        },
        [findSongBySongIDThunk.fulfilled]: (state, action) => {
            state.details = action.payload;
        }
    }
})

export default songsReducer.reducer;
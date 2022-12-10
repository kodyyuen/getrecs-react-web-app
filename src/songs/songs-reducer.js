import {createSlice} from "@reduxjs/toolkit";
import { findMultipleSongsBySongIDThunk, findSongBySearchTermThunk, findSongBySongIDThunk } from "./songs-thunks";

const initialState = {
    songs: [],
    details: null,
    multipleDetails: null,
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
        },
        [findMultipleSongsBySongIDThunk.fulfilled]: (state, action) => {
            state.multipleDetails = action.payload;
        },
    }
})

export default songsReducer.reducer;
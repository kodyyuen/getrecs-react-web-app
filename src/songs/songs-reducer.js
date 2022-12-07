import {createSlice} from "@reduxjs/toolkit";
import { findSongBySearchTermThunk } from "./songs-thunks";

const initialState = {
    songs: [],
}

const songsReducer = createSlice({
    name: "songs",
    initialState,
    extraReducers: {
        [findSongBySearchTermThunk.fulfilled]: (state, action) => {
            state.songs = action.payload
        }
    }
})

export default songsReducer.reducer;
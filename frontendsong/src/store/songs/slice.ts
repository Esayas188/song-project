import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SONGS, SongsStateType, SongType } from "./types";

const songsInitialState: SongsStateType = {
  song: {
    data: null,
    isLoading: false,
    errors: '',
  }
}

export const songsSlice = createSlice({
  name: SONGS,
  initialState: songsInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    getSongAction: (state: SongsStateType, { payload: id }: PayloadAction<string | undefined>) => {
      state.song.isLoading = true;
      state.song.errors = '';
    },
    getSongSuccessAction: (state: SongsStateType, { payload: song }: PayloadAction<SongType>) => {
      state.song.isLoading = false;
      state.song.data = song;
    },
    getSongErrorAction: (state: SongsStateType, { payload: error }: PayloadAction<string>) => {
      state.song.isLoading = false;
      state.song.errors = error;
    },
  }
})

/* getSongSuccessAction and getSongErrorAction will be used inside the saga
  middleware. Only getSongAction will be used in a React component.
*/

export const { 
  getSongAction,
  getSongSuccessAction,
  getSongErrorAction

 } = songsSlice.actions;



export default songsSlice.reducer;
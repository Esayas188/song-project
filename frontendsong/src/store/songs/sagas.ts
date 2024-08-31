import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { SongType, GET_SONG_BY_ID } from "./types";
import { getSongErrorAction, getSongSuccessAction } from "./slice";

// Generator function
function* getSongSaga({ payload: id }: PayloadAction<string>) {
  try {
    
    // You can also export the axios call as a function.
    const response: AxiosResponse<SongType> = yield axios.get(`http://localhost:4000/song/${id}`);
    console.log("this is response: ",response.data)

    yield put(getSongSuccessAction(response.data));
  } catch (error) {
    yield put(getSongErrorAction(error as string));
  }
}

// Generator function
export function* watchGetSong() {
  yield takeLatest(GET_SONG_BY_ID, getSongSaga);
}
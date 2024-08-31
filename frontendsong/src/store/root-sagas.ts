import { all, fork } from "redux-saga/effects";
import { watchGetSong } from "./songs/sagas";

const rootSaga = function* () {
  yield all([
    fork(watchGetSong),
    // Other forks
  ]);
};

export default rootSaga;
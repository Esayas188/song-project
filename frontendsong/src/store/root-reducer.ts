
import { SongsStateType, ISongState } from "./songs/types";
import songsReducer from "./songs/slice";

export type StateType = {
  songs: ISongState;
};

const rootReducers = {
  songs: songsReducer,
};

export default rootReducers;
// Define the user type
export type SongType = {
    id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
 
  // This type will represent the sub-state for getting a single user by ID
  export type ISongState = {
    data: SongType | null;
    isLoading: boolean;
    errors: string;
  }
  
  // The users global state
  export type SongsStateType = {
    song: ISongState,
    // Later, we can add other sub-states like:
    // list,
    // create,
    // update,
    // remove
  }
  
  // (1)
  export const SONGS = "songs";
  export type SONGS = typeof SONGS; // Typescript line
  
  // (2)
  export const GET_SONG_BY_ID = `${SONGS}/getUserAction`;
  export type GET_SONG_BY_ID = typeof GET_SONG_BY_ID; // Typescript line
import { Dispatch, createContext } from "react";
import { IArtist } from "../components/Artists/Artist.types";

type Action = {
  type: string;
  payload: any;
};

type State = {
  savedList: IArtist[];
};

export type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const defaultSavedList: ContextType = {
  state: { savedList: [] },
  dispatch: () => {},
};

export const ArtistsContext = createContext(defaultSavedList);

export const artistsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        savedList: [...state.savedList, action.payload],
      };

    case "REMOVE_ITEM":
      return {
        savedList: [...state.savedList].filter((x) => x.id !== action.payload),
      };
  }

  return state;
};

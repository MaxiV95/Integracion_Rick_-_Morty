import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, TODOS } from "./action-types";

const initialState = {
  idUser: 0,
  myFavorites: [],
  allCharactersFav: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: payload,
        allCharactersFav: payload
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: payload,
        allCharactersFav: payload
      };

    case FILTER:
      return {
        ...state,
        myFavorites:
        payload === TODOS
        ? [...state.allCharactersFav] 
        : state.allCharactersFav.filter(fav => fav.gender === payload)
      };

    case ORDER:
      const myFavoritesCopy = [...state.myFavorites];
      return {
        ...state,
        myFavorites:
          payload === "D"
          ? myFavoritesCopy.sort((a, b) => b.id - a.id)
          : myFavoritesCopy.sort((a, b) => a.id - b.id),
      };

    default:
      return { ...state };
  }
};

export default reducer;
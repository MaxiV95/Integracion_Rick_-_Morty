import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, TODOS } from "./action-types";

const initialState = {
    myFavorites: [],
    allCharactersFav: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch( type ){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.allCharactersFav, payload],
                allCharactersFav: [...state.allCharactersFav, payload]
            }
        
        case REMOVE_FAV: 
            return {
                ...state,
                myFavorites: state.myFavorites.filter(fav => fav.id !== payload),
                allCharactersFav: state.allCharactersFav.filter(fav => fav.id !== payload)
            }
        
        case FILTER:
            if(payload === TODOS) return {...state, myFavorites: state.allCharactersFav}
            return {
                ...state,
                myFavorites: state.allCharactersFav.filter(fav => fav.gender === payload)
            }

        case ORDER:
            const allCharactersFavCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites: payload==='D'
                    ? allCharactersFavCopy.sort((a,b)=> b.id-a.id)
                    : allCharactersFavCopy.sort((a,b)=> a.id-b.id)
        }
        
        default: 
            return { ...state };
    }
}

export default reducer;
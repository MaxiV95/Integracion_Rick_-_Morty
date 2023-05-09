import { ADD_FAV, GET_FAVS, REMOVE_FAV, FILTER, ORDER, LOGIN } from "./action-types";
import axios from "axios";

export const addFav = (character, idUser) => {
  const endpoint = `http://localhost:3001/rickandmorty/fav?idUser=${idUser}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);

      if (!data.length) throw Error("No hay personajes favoritos");

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getFav = (idUser) => {
  const endpoint = `http://localhost:3001/rickandmorty/fav?idUser=${idUser}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      if (!data.length) throw Error("No hay personajes favoritos");

      return dispatch({
        type: GET_FAVS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFav = (id, idUser) => {
  const endpoint = `http://localhost:3001/rickandmorty/fav/${id}?idUser=${idUser}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);

      return dispatch({
        type: REMOVE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender };
};

export const orderCards = (orden) => {
  // A ascendente - D descendente
  return { type: ORDER, payload: orden };
};

export const login = (email, password) => {
  const endpoint = `http://localhost:3001/rickandmorty/login?email=${email}&password=${password}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: LOGIN,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

import Cards from "../cards/Cards";
import style from "./Favorites.module.css";
import { connect, useDispatch } from "react-redux";
import { FILTER, ORDER, TODOS } from "../../redux/action-types";
import { useEffect, useState } from "react";

const Favorites = ({ myFavorites }) => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const handle = (event) => {
    dispatch({ type: event.target.name, payload: event.target.value });
    setAux(!aux);
  };

  useEffect(() => {
    return () => {
      dispatch({ type: FILTER, payload: TODOS }); //Al desmontar el componente
    };
  }, [dispatch]);

  return (
    <div className={style.contentFav}>
      <div className={style.fav}>
        <select onChange={handle} name={FILTER}>
          <option value={TODOS}>Todos</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select>
        <select onChange={handle} name={ORDER}>
          <option value="">Aleatorio</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
        </select>
      </div>
      <Cards characters={myFavorites} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(
  mapStateToProps, //permite acceder al estado global
  null //permite despachar acciones
)(Favorites);

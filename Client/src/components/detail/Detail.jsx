import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from './Detail.module.css'

export default function Detail() {
  const { id } = useParams(); // Obtenemos el valor de la variable de la ruta :id
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setIsLoading(false); // Se indica que se ha terminado de cargar
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
    return setCharacter({}); //Al desmontar el componente
  }, [id]);

  return (
    <div className={style.detail}>
      {isLoading ? (
        <h1>Cargando personaje...</h1>
      ) : character ? (
        <div className={style.container}>
          <div className={style.card}>
            <h4>{character?.name}</h4>
            <h5>Nº: {character?.id}</h5>
            <h5>{character?.status}</h5>
            <h5>{character?.species}</h5>
            <h5>{character?.gender}</h5>
            <h5>{character?.origin?.name}</h5>
          </div>
          <img src={character?.image} alt={character?.name} />
        </div>
      ) : (
        <h1>Personaje no encontrado</h1>
      )}
    </div>
  );
}

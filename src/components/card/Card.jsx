import style from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const Card = ({id,name,species,gender,image,status,origin,onClose,addFav,removeFav,allCharactersFav}) => {
  
  const home = useLocation().pathname ==='/home'; // Chequea que estemos en el login

  const [isFav, setIsFav] = useState(false); // Favorito

  useEffect(() => {
    allCharactersFav.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [allCharactersFav, id]);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      removeFav(id);
    } else {
      setIsFav(true);
      addFav({id,name,species,gender,image,origin,onClose});
    }
  };

  return (
    <div className={style.content}>
      <button className={style.btnL} onClick={handleFavorite}>
        {isFav ? '❤️':'🤍'}
        </button>
        {home&&<button className={style.btnH} onClick={()=>onClose(id)}>
        X
        </button>}

      <div className={style.card} key={id}>
        <Link to={`/detail/${id}`}>
          <h4 className="card-name">{name}</h4>
          <h5>Nº: {id}</h5>
          <h5>{species}</h5>
          <img src={image} alt="" />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allCharactersFav: state.allCharactersFav,
    allCharacters: state.allCharacters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};

export default connect(
  mapStateToProps, //permite acceder al estado global
  mapDispatchToProps //permite despachar acciones
)(Card);

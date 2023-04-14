import Cards from '../cards/Cards'
import style from './Favorites.module.css'
import { connect } from 'react-redux';
import { FILTER, ORDER, TODOS } from '../../redux/action-types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react"

const Favorites = ({myFavorites, onClose}) =>{

    const [aux, setAux] = useState(false);

    const dispatch = useDispatch();

    const handle = (event) => {
        setAux(!aux);
        dispatch({type: event.target.name , payload: event.target.value})
    }

    // (() => { //componentMount 
    //     handle({event:{target:{name: FILTER,value:TODOS}}});
    //     // 
    // })() 
    
    useEffect(() => {
        return () => {
            dispatch({type: FILTER , payload: TODOS}); //Al desmontar el componente
        };
      }, [dispatch]);
      
    return(
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
            <Cards characters={myFavorites} onClose={onClose}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
       myFavorites: state.myFavorites
    }
 }
 
 export default connect(
    mapStateToProps, //permite acceder al estado global
    null //permite despachar acciones
 ) (Favorites);
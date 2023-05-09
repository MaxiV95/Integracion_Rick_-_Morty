// npm install
// npx create-react-app demo-nombre
// npm i redux@4.0.5 react-redux redux-thunk react-router-dom@6.3.0 axios
// npm install react-copy-to-clipboard

// npm i -D jest //para test

// npm i express morgan nodemon sequelize pg pg-hstore dotenv//BD

// npm install less less-watch-compiler
// npm run less
// npm init
// 826 react devtools - redux devtools
// npm audit fix --force //cuando la cosa no camina

// npm init -y
// npm install
// npm i nodemon

// //import * as actions from "./../../redux/actions/index"
import style from "./App.module.css";
import Nav from "./components/nav/Nav.jsx";
import Form from "./components/form/Form";
import About from "./components/about/About.jsx";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/detail/Detail.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import axios from "axios";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
const URL = "http://localhost:3001/rickandmorty/login/";

const App = () => {

  const home = useLocation().pathname !== "/"; // Chequea que no estemos en el login
  const navigate = useNavigate(); // Para navegar
  const [access, setAccess] = useState(false); // Acseso
  const [characters, setCharacters] = useState([]); //Targetas
  
    const login = async (userData) => {
      // Chequea usuario y contraseña de la base de datos
      try {
        const { email, password } = userData;
        const { data } = await axios(URL + `?email=${email}&password=${password}`)
        const { access } = data

        setAccess(access);
          access && navigate('/home');

      } catch (error) {
        alert('Wrong email or password');
      }
    };
    
    const logout = () => { 
      // Cierra sesión
      setAccess(false);
      navigate('/');
    };

  useEffect(() => {
    // Fuerza al login en caso de que access es falso
    !access && navigate('/');
  }, [access, navigate]);

  const onSearch = async (id) => {
    //Carga una targeta
    try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
     
      const characterFiltered = characters.filter(
        (character) => character.id.toString() === id
      );
      if (data.name && !characterFiltered.length) {
        return setCharacters((oldChars) => [...oldChars, data]);
      }
      alert("¡Ya hay un personaje con este ID!");
      
    } catch (error) {
      // alert("¡No hay personajes con este ID!");
      alert(error)
    }
  };

  const onClose = (id) => {
    // Filtra targetas que sean distintas a la seleccionada
    const charactersFiltered = characters.filter((character) => character.id !== id);
    setCharacters(charactersFiltered);
  };

  return (
    <>
      <div className={style.app}>
        {home && <Nav onSearch={onSearch} logout={logout} />}
        <Routes>
          <Route path="/" element={<Form login={login} />} />
          <Route path="/home" element={<Cards characters={characters} onClose={onClose} />}/>
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

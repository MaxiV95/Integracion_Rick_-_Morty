// npm install
// npx create-react-app demo-nombre
// npm i redux@4.0.5 react-redux redux-thunk react-router-dom@6.3.0 axios
// npm install --save react-copy-to-clipboard

// npm install less less-watch-compiler
// npm run less
// npm init
// 826 react devtools - redux devtools
// npm audit fix --force //cuando la cosa no camina

// //import * as actions from "./../../redux/actions/index"
import style from './App.module.css';
import Nav from './components/nav/Nav.jsx';
import Form from './components/form/Form';
import About from './components/about/About.jsx';
import Cards from './components/cards/Cards.jsx';
import Detail from './components/detail/Detail.jsx';
import Favorites from './components/favorites/Favorites.jsx';
import axios from 'axios';
import { URL_BASE, API_KEY } from './components/zAux/key';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

const App = () => {
   
   const navigate = useNavigate(); // Para navegar
   const home = useLocation().pathname !=='/'; // Chequea que no estemos en el login
   
   const [access, setAccess] = useState(false); // Acseso
   const EMAIL = 'maximilianovanmegroot@gmail.com';
   const PASSWORD = 'asdasd1';
   
   const [characters, setCharacters] = useState([]); //Targetas
   
   useEffect(() => { // Fuerza al login en caso de que access es falso
      !access && navigate('/');
   }, [access, navigate]);
   
   const login = (userData) => { // Chequea usuario y contraseña de la base de datos
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      } else alert('Datos incorrectos');
   }

   const logout = () => { // Cierra sesión
      setAccess(false);
      navigate('/');
   }

   const onSearch = (id) => { //Carga una targeta
      axios(`${URL_BASE}/${id}?key=${API_KEY}`)
      .then(response => response.data)
      .then((data) => {
         const characterFiltered = characters.filter(character =>
            character.id === id);

         if (data.name) {
            if(!characterFiltered.length){
               setCharacters((oldChars) => [...oldChars, data]);
            }else {
               alert('¡Ya hay un personaje con este ID!');
            }
            
         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => { // Filtra targetas que sean distintas a la seleccionada
      const charactersFiltered = characters.filter(character =>character.id !== id);
      setCharacters(charactersFiltered); 
   }

   return (
      <>
      <div className={style.app}>
         {home&&<Nav onSearch={onSearch} logout={logout}/>}
            <Routes>
               <Route path='/' element={<Form login={login}/>} />
               <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
               <Route path='/about' element={<About/>} />
               <Route path='/detail/:id' element={<Detail/>} />
               <Route path='/favorites' element={<Favorites onClose={onClose}/>} />
            </Routes>
      </div> 
      </>
   );
}

export default App;
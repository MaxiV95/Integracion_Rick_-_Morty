import { useState } from 'react';
import './SearchBar.module.css'

export default function SearchBar({onSearch}) {

   

   const [id, setId] = useState('');

   const handleChange = (event)=>{
      setId(event.target.value)
   }

   const getRandomNumber = () => {
      return Math.floor(Math.random() * 826) + 1;
    }
    

   return (
      <div>
         <input type='search' onChange={handleChange} value={id}/>
         <button onClick={()=>{onSearch(id);setId('')}}>Agregar</button>
         <button onClick={()=>{onSearch(getRandomNumber())}}>Aleatorio</button>
      </div>
   );
}

import { useState } from "react";
import validation from "../zAux/validation";
//import init from '.../images/init.jpg';
import style from "./Form.module.css";

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    //Estado de los campos
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); //Estado de los rrores

  const [showPassword, setShowPassword] = useState(false); //Estado de la visualización

  const handleOnChange = (event) => {
    setUserData({
      //Cambia stado de los campos
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        //Cambia stado de los errores
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    // envia formulario
    event.preventDefault();
    login(userData);
  };

  const handleShowPassword = () => {
    //Cambia estado de visualizacion password
    setShowPassword(!showPassword); //Lo contrario a lo que era
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      {/* <img src={init} alt="..." /> */}
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Ingrese su email"
          value={userData.email}
          onChange={handleOnChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Ingrese su password"
          value={userData.password}
          onChange={handleOnChange}
        />
        <button type="button" onClick={handleShowPassword}>
          👁️‍🗨️
        </button>
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={!Object.values(errors).every((value) => value === "")}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
// Object.values(errors) devuelve un array con los valores de las propiedades del objeto errors.
//every() se utiliza para comprobar si todos los elementos del array cumplen con una determinada condición.

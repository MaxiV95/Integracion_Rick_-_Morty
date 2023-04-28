const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validation = (userData) => {
    const tempErrors = {};

    if (userData.email.length>35) {
        tempErrors.email = "Utilice un email más corto.";
    } else if (!regexEmail.test(userData.email)) {
        tempErrors.email = "debe ingresar um email.";
    }

    if (userData.password.length < 6 || userData.password.length > 10) {
        tempErrors.password = "La contraseña debe tener entre 6 y 10 caracteres.";
    } else if (!/\d/.test(userData.password)) {
        tempErrors.password = "La contraseña debe contener al menos un número.";
    }

    return tempErrors; //Cambia stado de los errores al terminar todas las validaciones
}
export default validation
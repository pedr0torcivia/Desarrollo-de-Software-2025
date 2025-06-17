import axios from "axios"

const login = async (mail, password) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
        mail,
        password
    });
    return response.data;
}

const register = async (nombre, apellido, direccion,idBarrio, mail, password) => {
    const response = await axios.post("http://localhost:3000/api/auth/register", {
        nombre,
        apellido,
        direccion,
        idBarrio,
        mail,
        password
    });
    return response.data;
}

export default {
    login,
    register
}
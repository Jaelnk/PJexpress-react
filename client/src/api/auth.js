import axios from "axios";

const API = 'http://localhost:9000';


axios.defaults.withCredentials = true;


export const registerRequest = async (user) => axios.post(`${API}/register`, user);

/* export const registerRequest = async (user) => {
    try {
      const response = await axios.post(`${API}/register`, user, {
        withCredentials: true, // Asegúrate de agregar esta opción para enviar las cookies al servidor
      });
  
      const data = response.data;
      console.log("data: ", data); // Debería mostrar la cookie en el frontend

    } catch (error) {
      console.error("Error:", error);
    }
} */

//export const loginRequest = async (user) => axios.post(`${API}/login`, user);


export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/login`, user, {
      withCredentials: true, // Asegúrate de agregar esta opción para enviar las cookies al servidor
    });

    const data = response.data;
    console.log("data: ", data); // Debería mostrar la cookie en el frontend
    return data; // Devuelve los datos si es necesario en otro lugar del código

  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanza el error para manejarlo en otro lugar del código si es necesario
  }
}



//export const verifyTokenRequest = async () => axios.get(`${API}/verify`);



export const verifyTokenRequest = async () => {
  try {
    const response = await axios.get(`${API}/verify`, {
      withCredentials: true, // Asegúrate de agregar esta opción para enviar las cookies al servidor
    });

    const data = response.data;
    console.log("data: ", data); // Debería mostrar la cookie en el frontend
    return data; // Devuelve los datos si es necesario en otro lugar del código

  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanza el error para manejarlo en otro lugar del código si es necesario
  }
}



export const indexRequest = async () => axios.get(`${API}/index`);



export const RegistroRutasRequest = async () => axios.get(`${API}/registryRoutes`);




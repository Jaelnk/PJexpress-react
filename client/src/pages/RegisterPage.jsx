import { useForm } from "react-hook-form";
import { useState } from "react";
import {useAuth} from "../context/authContext"
/* import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; */



function RegisterPage() {

    const [userCreated, setUserCreated] = useState(false);
    const { register, handleSubmit } = useForm();
    const {signup, user } = useAuth();
    console.log(user);
    
    const onSubmit = async (values) => {
        try {
          await signup(values); // Espera a que la función signup termine
          setUserCreated(true); // Actualiza el estado de userCreated a true cuando el usuario es creado
        } catch (error) {
          // Manejo de errores, si es necesario
        }
      };

      const handleCloseMessage = () => {
        setUserCreated(false); // Cierra el mensaje al hacer clic en el botón "Cerrar"
      };
  

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="username"
            />

            <input
            type="text"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="email"
            />

            <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
            placeholder="password"
            />

            <button type="submit">Register</button>
        </form>
            {/* Mostrar el mensaje en un recuadro que se pueda cerrar */}
            {userCreated && (
                <div className="bg-green-300 p-2 mt-2 rounded-md">
                <p>Usuario creado</p>
                <button
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
                    onClick={handleCloseMessage}
                >
                    Cerrar
                </button>
                </div>
            )}
        </div>
    );
}

export default RegisterPage;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
//import { loginRequest } from "../api/auth";
import {useAuth} from "../context/authContext"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const {signin, user, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      console.log("Auth: ",isAuthenticated);
      console.log("user: ", user)
      if (isAuthenticated){
        navigate("/index");
      }
      
    }, [isAuthenticated, navigate, user]);

  const onSubmit = async (values) => {
      signin(values);
  };

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

//import { useEffect } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, indexRequest, RegistroRutasRequest} from "../api/auth";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [screems, setScreem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routesData, setRoutes] = useState (null);

  //const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      console.log("respuesta")
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response);
      //setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log("login: ",res)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };


  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      /* console.log(cookies)
      console.log("token 2", cookies.token)
      console.log("usuario 2:", user)
      console.log("auth 2:", isAuthenticated) */
      
/*       if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      } */
      try {
        //console.log("verifing");
        const res = await verifyTokenRequest(cookies.token);
        //console.log("verify: ", res, " -cookie: ",cookies.token);

        
/*         const res1 = await indexRequest(cookies.token);
        console.log("verified cookie: ", res1, " -cookie: ",cookies.token);
        if(res1.data=="false"){
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        //if (!res1.data) return setIsAuthenticated(false);
        setScreem(res1.data); */

        if(res.data=="false"){
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setLoading(false);

      } catch (error) {
        console.log("error verify: ",error)
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, [user,isAuthenticated]);

  const index = async () => {
    const cookies = Cookies.get();
    //console.log(cookies)
    //console.log("verifing cookie");
    try {
      const res1 = await indexRequest(cookies.token);
      //console.log("-verified cookie: ", res1, " -cookie: ",cookies.token);
      if(res1.data=="No token, authorization denied"){
        //console.log(res1.data);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      //if (!res1.data) return setIsAuthenticated(false);
      setScreem(res1.data);
      //console.log(res1.data);
    } catch (error) {
      console.log("error veryfing cookie: ", error);
    }
  };


  const rutas = async () => {
    const cookies = Cookies.get();
/*     console.log(cookies)
    console.log("verifing cookie"); */
    try {
      const res2 = await RegistroRutasRequest(cookies.token);
      //console.log("verified cookie: ", res2, " -cookie: ",cookies.token);
      if(res2.data=="No token, authorization denied"){
        console.log(res2.data);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      //if (!res1.data) return setIsAuthenticated(false);
      setRoutes(res2.data);
      //console.log(res2.data);
    } catch (error) {
      console.log("error veryfing cookie: ", error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
      signup,
      user,
      signin,
      isAuthenticated,
      index,
      screems,
      loading,
      setIsAuthenticated,
      rutas,
      routesData,
      logout
      }} >
      {children}
    </AuthContext.Provider>
  )
}
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthContext;
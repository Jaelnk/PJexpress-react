import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {indexRequest, RegistroRutasRequest} from "../api/auth";
import Cookies from "js-cookie";

const RequestsContext = createContext();

export const useRequests = ()=>{
    const context = useContext(RequestsContext);
    if (!context) throw new Error("useRequests must be used within a RequestProvider");
    return context;
}


export function RequestProvider({ children }) {
    const [screens, setScreen] = useState(null);
    const [routesData, setRoutes] = useState (null);



    const index = async () => {
        const cookies = Cookies.get();
        //console.log(cookies)
        //console.log("verifing cookie");
        try {
          const res1 = await indexRequest(cookies.token);
          //console.log("-verified cookie: ", res1, " -cookie: ",cookies.token);
          if(res1.data=="No token, authorization denied"){
            console.log(res1.data);
            return;
          }
          setScreen(res1.data);
          console.log(res1.data);
        } catch (error) {
          console.log("error veryfing cookie: ", error);
        }
      };
    
    
    const rutas = async () => {
        const cookies = Cookies.get();
        //console.log("verifing cookie")
        try {
          const res2 = await RegistroRutasRequest(cookies.token);
          //console.log("verified cookie: ", res2, " -cookie: ",cookies.token);
          if(res2.data=="No token, authorization denied"){
            console.log(res2.data);
            return;
          }
          //if (!res1.data) return setIsAuthenticated(false);
          setRoutes(res2.data);
          console.log(res2.data);
        } catch (error) {
          console.log("error veryfing cookie: ", error);
        }
    };

    return (
        <RequestsContext.Provider
          value={{
            screens,
            routesData,
            index,
            rutas
          }}
        >
          {children}
        </RequestsContext.Provider>
      );
}

RequestProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };


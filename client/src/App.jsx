import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import IndexPage from "./pages/IndexPage"
import RegistryPage from "./pages/RegistryPage"
import { AuthProvider } from "./context/authContext";

import {RequestProvider} from "./context/requestsContext"

function App() {

  /*
  back:
  zor: validaciones 
  
  
  react hook form - formulacion cambio de estado, validacion 
     axios - conexion con back 
     tailwind
  */
  return (
    <AuthProvider>
      <RequestProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold underline">Hello world!</h1> }/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/index"  element={<IndexPage/>}/>
          <Route path="/registry"  element={<RegistryPage/>}/>
        </Routes>
    </BrowserRouter>
      </RequestProvider>
      
    </AuthProvider>

  )
}

export default App
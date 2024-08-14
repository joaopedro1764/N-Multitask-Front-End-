import { SuporteTecnico } from "./pages/SuporteTécnico";
import { Login } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';
import { Grafic } from "./pages/grafic";

export const Rotas = () => {

  const userAuth = Cookies.get("userAuth");


  const RoutePrivate = ({ children }) => {
    return userAuth !== undefined ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={userAuth !== undefined ? <Navigate to="/suporteTecnico" /> : <Login />} />
      <Route path="/suporteTecnico" element={
        <RoutePrivate>
          <SuporteTecnico />
        </RoutePrivate>
      } />
      <Route path="/grafic" element={
        <Grafic />
      } />
    </Routes>
  );
}

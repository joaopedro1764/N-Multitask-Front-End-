import { Dashboard } from "./pages/DashBoard";
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
      <Route path="/" element={userAuth !== undefined ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={
        //<RoutePrivate>
          <Dashboard />
       // </RoutePrivate>
      } />
      <Route path="/grafic" element={
        <RoutePrivate>
          <Grafic />
        </RoutePrivate>
      } />
    </Routes>
  );
}

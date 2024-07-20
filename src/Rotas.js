import { Dashboard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';
import { Grafic } from "./pages/grafic";
export const Rotas = () => {


  console.log(Cookies.get("userAuth"))

  const RoutePrivate = ({ children }) => {
    const userAuth = Cookies.get("userAuth");

    if (userAuth !== undefined) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <RoutePrivate>
          <Dashboard />
        </RoutePrivate>
      } />
      <Route path="/grafic" element={
        <RoutePrivate>
          <Grafic />
        </RoutePrivate>
      } />


    </Routes>
  );
}

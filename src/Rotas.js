import { Dashboard } from "./pages/DashBoard";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
export const Rotas = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

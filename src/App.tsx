import { Route, Routes } from "react-router-dom";
import { Login } from "./modules/auth/Login/Login";
import { Register } from "./modules/auth/Register/Register";
import LayoutDashBoard from "./Layout/LayoutDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDashBoard />}>
        <Route index element={<div />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

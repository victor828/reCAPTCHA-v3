import { Route, Routes } from "react-router-dom";
import LayoutDashBoard from "./Layout/LayoutDashboard";
import { Login } from "./modules/auth/Login/Login";
import { Register } from "./modules/auth/Register/Register";
import Home from "./modules/dashboard/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDashBoard />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth">
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import LayoutDashBoard from "./Layout/LayoutDashboard";
import { Login } from "./modules/auth/Login/Login";
import { Register } from "./modules/auth/Register/Register";
import { loginAction } from "./modules/auth/Login";
import { registerAction } from "./modules/auth/Register";
import Home from "./modules/dashboard/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDashBoard />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth">
        <Route index path="login" element={<Login />} action={loginAction} />
        <Route path="register" element={<Register />} action={registerAction} />
      </Route>
    </Routes>
  );
}

export default App;

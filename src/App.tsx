import { Route, Routes } from "react-router-dom";
import { Login } from "./modules/auth/Login/Login";
import { Register } from "./modules/auth/Register/Register";
import LayoutDashBoard from "./Layout/LayoutDashboard";
import { loginFuncs } from "../src/modules/auth/Login/index.js";
import { registerFuncs } from "../src/modules/auth/Register/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDashBoard />}>
        <Route index element={<div />} />
      </Route>
      <Route
        path="auth/login"
        element={<Login />}
        action={loginFuncs.loginAction}
      />
      <Route
        path="auth/register"
        element={<Register />}
        action={registerFuncs.registerAction}
      />
    </Routes>
  );
}

export default App;

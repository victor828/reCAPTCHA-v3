import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./context/useContextUsers";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersProvider>
);

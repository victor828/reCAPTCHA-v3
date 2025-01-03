import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UsersProvider } from "./context/useContextUsers";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <Router>
      <App />
    </Router>
  </UsersProvider>
);

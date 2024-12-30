import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";

const LayoutDashBoard = () => {
  const [title, setTitle] = useState(null);
  return (
    <div className="layout flex flex-col min-h-screen">
      <NavBar className="header" title={title} />
      <div className="body flex-grow p-4">
        <Outlet context={{ setTitle }} />
      </div>
      <footer className="footer mt-auto">
        <div className="p-10 text-center bg-base-200 text-base-content w-full">
          © 2021 Tailwind CSS, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LayoutDashBoard;

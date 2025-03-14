import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/useContextUsers";

interface NavBarProps {
  className?: string;
  title?: string;
}

const NavBar = (props: NavBarProps) => {
  const context = useContext(UsersContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }
  const { user } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className={`navbar bg-base-100 ${props.className}`}>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          {props.title || user?.first_name}
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="#" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="#">Settings</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

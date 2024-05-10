import { NavLink, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
const Header = () => {
  const { cookies } = useAuth();

  const logout = () => {
    // console.log("logout");
    cookies.remove("roles");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    window.location.reload();
  };

  return (
    <>
      <header className="w-100">
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <div>
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                {cookies.get("roles") &&
                  cookies.get("roles").includes("Admin") && (
                    <div>
                      <li className="nav-item">
                        <Link className="nav-link" to="/users">
                          Users
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/products">
                          Products
                        </Link>
                      </li>
                    </div>
                  )}
              </div>
              {cookies.get("accessToken") ? (
                <li className="nav-item ">
                  <button className=" " onClick={logout}>
                    Logout
                  </button>
                </li>
              ) : (
                <div>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import style from "./style.module.scss";

export default function NavMenu() {
  const { cookies } = useAuth();

  const logout = () => {
    // console.log("logout");
    cookies.remove("roles");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    window.location.reload();
  };
  return (
    <nav className={style.nav}>
      <div className="container">
        <ul className={style.navbar}>
          <div className={style.navbar__items}>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? style.active : "")}
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? style.active : "")}
                to="/"
              >
                Наши специалисты
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(navData) => (navData.isActive ? style.active : "")}
                to="/"
              >
                Услуги
              </NavLink>
            </li>
            {cookies.get("roles") && cookies.get("roles").includes("Admin") && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/users"
                  >
                    Пользователи
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/products"
                  >
                    Редактирование услуг
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/doctors"
                  >
                    Редактирование докторов
                  </NavLink>
                </li>
              </>
            )}
            {cookies.get("roles") &&
              cookies.get("roles").includes("Doctor") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/doctorshift"
                    >
                      Мои смены
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/doctorclient"
                    >
                      Мои клиенты
                    </NavLink>
                  </li>
                </>
              )}
            {cookies.get("roles") &&
              cookies.get("roles").includes("Assistant") && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/assistantshift"
                    >
                      Мои смены
                    </NavLink>
                  </li>
                </>
              )}
            {cookies.get("roles") && cookies.get("roles").includes("User") && (
              <div>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/usershift"
                  >
                    Мои смены
                  </NavLink>
                </li>
              </div>
            )}
          </div>
          <div className={style.navbar__auth}>
            {cookies.get("accessToken") ? (
              <li className="nav-item ">
                <button className=" " onClick={logout}>
                  Выйти
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/login"
                  >
                    Вход
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive ? style.active : ""
                    }
                    to="/register"
                  >
                    Регистрация
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

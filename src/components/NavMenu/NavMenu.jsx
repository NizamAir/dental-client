import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

import style from "./style.module.scss";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function NavMenu() {
  const { cookies } = useAuth();

  const navigate = useNavigate();

  const [navData, setNavData] = useState(false);

  const logout = () => {
    // console.log("logout");
    cookies.remove("roles");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    navigate("/");
  };
  return (
    <nav className={style.nav}>
      <div className="container">
        <ul
          className={
            navData
              ? [style.navbar, style.mobile_btn__active].join(" ")
              : [style.navbar]
          }
        >
          <div className={style.navbar__items}>
            <div className={style.navbar__item}>
              <li onClick={() => setNavData(!navData)}>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
            </div>
            <div className={style.navbar__item}>
              <li onClick={() => setNavData(!navData)}>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/doctors"
                >
                  Наши специалисты
                </NavLink>
              </li>
            </div>
            <div className={style.navbar__item}>
              <li onClick={() => setNavData(!navData)}>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? style.active : ""
                  }
                  to="/products"
                >
                  Услуги
                </NavLink>
              </li>
            </div>
            {cookies.get("roles") && cookies.get("roles").includes("Admin") && (
              <>
                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/users"
                    >
                      Пользователи
                    </NavLink>
                  </li>
                </div>

                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/statistic"
                    >
                      Статистика
                    </NavLink>
                  </li>
                </div>
              </>
            )}
            {cookies.get("roles") &&
              cookies.get("roles").includes("Doctor") && (
                <>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/doctorshift"
                      >
                        Выбор смены
                      </NavLink>
                    </li>
                  </div>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/doctorclient"
                      >
                        Мои клиенты
                      </NavLink>
                    </li>
                  </div>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/alldoctorshifts"
                      >
                        Мои смены
                      </NavLink>
                    </li>
                  </div>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/reviews"
                      >
                        Отзывы клиентов
                      </NavLink>
                    </li>
                  </div>
                </>
              )}
            {cookies.get("roles") &&
              cookies.get("roles").includes("Assistant") && (
                <>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/assistantshift"
                      >
                        Выбор смены
                      </NavLink>
                    </li>
                  </div>
                  <div className={style.navbar__item}>
                    <li onClick={() => setNavData(!navData)}>
                      <NavLink
                        className={(navData) =>
                          navData.isActive ? style.active : ""
                        }
                        to="/allassisshifts"
                      >
                        Мои смены
                      </NavLink>
                    </li>
                  </div>
                </>
              )}
            {cookies.get("roles") && cookies.get("roles").includes("User") && (
              <>
                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/usershift"
                    >
                      Запись на приём
                    </NavLink>
                  </li>
                </div>
                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/allshifts"
                    >
                      История приемов
                    </NavLink>
                  </li>
                </div>
              </>
            )}
          </div>
          <div className={style.navbar__auth}>
            {cookies.get("accessToken") ? (
              <div>
                <li>
                  <button className={style.logout_btn} onClick={logout}>
                    Выйти
                  </button>
                </li>
              </div>
            ) : (
              <>
                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/login"
                    >
                      Вход
                    </NavLink>
                  </li>
                </div>
                <div className={style.navbar__item}>
                  <li onClick={() => setNavData(!navData)}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? style.active : ""
                      }
                      to="/register"
                    >
                      Регистрация
                    </NavLink>
                  </li>
                </div>
              </>
            )}
          </div>
        </ul>
        <div onClick={() => setNavData(!navData)} className={style.mobile_btn}>
          {navData ? (
            <AiOutlineClose size={25} color="black" />
          ) : (
            <AiOutlineMenu size={25} color="white" />
          )}
        </div>
      </div>
    </nav>
  );
}

import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../api/axios";

import style from "./style.module.scss";

const LOGIN_URL = "/authentication/login";
const Login = () => {
  const { cookies } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: userName, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      const tokenData = await JSON.parse(
        window.atob(accessToken.split(".")[1])
      );

      const roles =
        tokenData[
          ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        ];
      const id =
        tokenData[
          [
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
          ]
        ];
      cookies.set("accessToken", accessToken);
      cookies.set("refreshToken", refreshToken);
      cookies.set("roles", roles);
      console.log({ userName, password, roles, accessToken, refreshToken, id });

      setUserName("");
      setPassword("");
      // navigate(0);
      navigate(from, { replace: true });
      // window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Сервер не отвечает");
      } else if (err.response?.status === 400) {
        setErrMsg("Пропущено Имя пользователя или Пароль");
      } else if (err.response?.status === 401) {
        setErrMsg("Такого пользователя нет");
      } else {
        setErrMsg("Ошибка авторизации");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className={style.section}>
        <p
          ref={errRef}
          className={errMsg ? style.errmsg : style.form__item__offscreen}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className={style.title}>Вход в систему</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.form__item}>
            <label htmlFor="userName">Имя пользователя:</label>
            <input
              type="text"
              id="userName"
              ref={userRef}
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={style.form__item}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className={style.form__btn}>Войти</button>
        </form>
        <div className={style.link}>
          <p>Нет аккаунта?</p>
          <div>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";

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
      // setAuth({ userName, password, roles, accessToken, refreshToken, id });
      // localStorage.setItem(
      //   "auth",
      //   JSON.stringify({ userName, password, roles, accessToken, id })
      // );

      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    window.location.reload();
  };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, [persist]);

  return (
    <div className="row vh-100 d-flex align-items-center justify-content-center">
      <div>
        <section className="mx-auto text-start d-flex flex-column justify-content-start p-3 text-white fs-5 rounded-3">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-evenly flex-grow-1 pb-3"
          >
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="userName"
              ref={userRef}
              autoComplete="off"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="btn btn-light mt-4">Sign In</button>
          </form>
          <div className=" d-flex justify-content-evenly ">
            <p>Нет аккаунта?</p>
            <div className="line">
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;

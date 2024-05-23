import "./Register.css";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FIRST_LAST_NAME_REGEX = /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?$/;
const USERNAME_REGEX = /^[A-z][A-z0-9]{3,23}$/;
const PASSWORD_REGEX = /^[A-z][A-z0-9]{9,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

const REGISTER_URL = "/authentication";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(USERNAME_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidFirstName(FIRST_LAST_NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(FIRST_LAST_NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USERNAME_REGEX.test(userName);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid username or password");
      return;
    }

    console.log({
      firstName,
      lastName,
      userName,
      password,
      phoneNumber,
      email,
    });

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          username: userName,
          password: password,
          email: email,
          phonenumber: phoneNumber,
          roles: ["User"],
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.parse(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
      setMatchPassword("");
      setEmail("");
      setPhoneNumber("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <>
        {success ? (
          <section>
            <h2>Success!</h2>
            <p>
              <Link to="/login">Sign In</Link>
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h2>Регистрация</h2>

            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column justify-content-evenly flex-grow-1 pb-3"
            >
              <label htmlFor="firstName">
                Имя:
                <span className={validFirstName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>{" "}
                <span
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="firstName"
                ref={userRef}
                autoComplete="no"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> Должно начинаться с
                заглавной буквы <br /> Можно использовать только буквы{" "}
              </p>

              <label htmlFor="lastName">
                Фамилия:
                <span className={validLastName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>{" "}
                <span
                  className={validLastName || !lastName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="lastName"
                ref={userRef}
                autoComplete="no"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> Должна начинаться с
                заглавной буквы <br /> Можно использовать только буквы{" "}
              </p>

              <label htmlFor="userName">
                UserName:
                <span className={validUserName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>{" "}
                <span
                  className={validUserName || !userName ? "hide" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="userName"
                ref={userRef}
                autoComplete="off"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                aria-invalid={validUserName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userNameFocus && userName && !validUserName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> С 4 до 24 букв <br />
                Должен начинаться с буквы <br />
                Можно использовать только буквы и цифры
              </p>

              <label htmlFor="email">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="new-password"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> Введите почту в формате:
                example@example.com
              </p>

              <label htmlFor="phoneNumber">
                Телефон:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPhoneNumber ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validPhoneNumber || !phoneNumber ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="text"
                id="phoneNumber"
                ref={userRef}
                autoComplete="new-password"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                aria-invalid={validPhoneNumber ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  phoneNumberFocus && phoneNumber && !validPhoneNumber
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> Введите номер в формате:
                8(912)345-67-89
              </p>

              <label htmlFor="password">
                Пароль:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="password"
                autoComplete="no"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> с 8 до 24 букв.
                <br />
                Должен начинаться с заглавной буквы
                <br />
                Можно использовать только латинские буквы и цифры
              </p>

              <label htmlFor="confirm_pwd">
                Повторите пароль :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    validMatchPassword && matchPassword ? "valid" : "hide"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatchPassword || !matchPassword ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                autoComplete="new-password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatchPassword ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchPasswordFocus && !validMatchPassword
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} /> Должен совпадать с
                первым полем ввода пароля.
              </p>
              <button
                className="btn btn-light mt-4"
                disabled={
                  !validFirstName ||
                  !validLastName ||
                  !validUserName ||
                  !validEmail ||
                  !validPhoneNumber ||
                  !validPassword ||
                  !validMatchPassword
                    ? true
                    : false
                }
              >
                Sign Up
              </button>
            </form>
            <div className=" d-flex justify-content-evenly ">
              <p>Есть аккаунт?</p>
              <div className="line">
                <Link to="/login">Sign In</Link>
              </div>
            </div>
          </section>
        )}
      </>
    </>
  );
};

export default Register;

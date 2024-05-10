import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
// const NAME_REGEX = /^[A-z]{3,30}$/;

const REGISTER_URL = "/authentication";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setValidName(USER_REGEX.test(userName));
  // }, [userName]);

  // useEffect(() => {
  //   setValidEmail(EMAIL_REGEX.test(email));
  // }, [email]);

  // useEffect(() => {
  //   setValidfirstName(NAME_REGEX.test(firstName));
  // }, [firstName]);

  // useEffect(() => {
  //   setValidlastName(NAME_REGEX.test(lastName));
  // }, [lastName]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(password));
  //   setValidMatch(password === matchPwd);
  // }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    let regobj = {
      firstName,
      lastName,
      userName,
      password,
      email,
      phoneNumber,
      roles: ["user"],
    };
    console.log(regobj);
    toast.success("Registered successfully");
    navigate("/login");

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
          roles: ["Assistant"],
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Registered successfully");
      navigate("/login");
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUserName("");
      setPassword("");
      setEmail("");
      setPhoneNumber("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("Username Taken");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <section className="offset-lg-3 col-lg-6">
      <form action="" className="container" onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <h1>Register page</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    First Name <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Last Name <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    PhoneNumber <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    UserName <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <a className="btn btn-danger">Back</a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;

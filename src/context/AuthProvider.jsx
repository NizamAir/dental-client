import { createContext } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  // console.log(children);
  // const [auth, setAuth] = useState(
  //   JSON.parse(localStorage.getItem("auth")) || useState({})
  // );
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem("persist")) || false
  // );

  return (
    <AuthContext.Provider value={{ cookies }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

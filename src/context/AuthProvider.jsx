import { createContext } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();

  return (
    <AuthContext.Provider value={{ cookies }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

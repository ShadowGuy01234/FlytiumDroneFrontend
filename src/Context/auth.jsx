import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [authLoading, setAuthLoading] = useState(true);

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const { user, token } = JSON.parse(authData);
        setAuth({ user, token });
      } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("auth");
      }
    }
    setAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };

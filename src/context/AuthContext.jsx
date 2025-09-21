import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  //do not use this anymore will be phased out-----------------
  const [contextLoggedIn, setContextLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const contextLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("portfolioId");
    setContextLoggedIn(false);
    toast.success("Logged Out!");
  };
  const contextLogin = () => {
    setContextLoggedIn(true);
  };

  //new login functionality--------------use this moving forward
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  //auto login attempt if token is present when loading into FindVirtual.me
  useEffect(() => {
    if (!token) return;
    if (token) {
      axios
        .get(`${backendUrl}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      console.log("logged In");
      toast.success("Logged In!");
    } catch (err) {
      toast.error("Login failed");
      console.log("Login failed", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    console.log("Logged Out");
    toast.success("Logged Out!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        //use above values moving forward
        contextLoggedIn,
        contextLogin,
        contextLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

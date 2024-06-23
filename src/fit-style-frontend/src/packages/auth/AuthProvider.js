import AuthContext from "./authContext";
import React, { useEffect, useState } from "react";
import { auth } from "../api";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import { TOP_RIGHT } from "../../config/consts/ToastPosition";
import { token } from "../storage";
import { getFirebaseToken } from "../../config/firebase/Firebase";
import { removeItem, setItem } from "../storage/storage";

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (token.getToken()) {
      auth
        .getUserData()
        .then((response) => {
          console.log(response)
          setUser(response.data);
          setRoles(response.data.roles);
          setIsAuth(true);
        })
        .catch((error) => {
          console.log(error.response);
          removeItem("userId")
        });
    }
  }, []);

  const login = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((response) => {
        console.log(response)
        const userData = response.data;
        setUser(userData);
        setRoles(userData.roles);
        token.setToken(userData.token);
        setIsAuth(true);
        setItem("userId",userData.id)
        ToastMessages.success("환영합니다!", TOP_RIGHT);
        getFirebaseToken();
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Bad credentials") {
          ToastMessages.error("Неверные данные");
        } else {
          ToastMessages.defaultError();
        }
      });
  };

  const handleOAuthLogin = (userData, accessToken) => {
    setUser(userData);
    setRoles(userData.roles);
    token.setToken(accessToken);
    setIsAuth(true);
    localStorage.setItem("userId", userData.id);
    ToastMessages.success("환영합니다!", "top-right");
    getFirebaseToken();
};

  const logout = () => {
    auth
      .logout()
      .then(
        () => {
          ToastMessages.success("또 봐요!", TOP_RIGHT);
        },
        (error) => {
          console.error(error);
          ToastMessages.defaultError();
        }
      )
      .finally(() => {
        token.removeToken();
        setIsAuth(false);
        removeItem("userId")
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        roles,
        login,
        handleOAuthLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

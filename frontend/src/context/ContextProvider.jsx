/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [_user, _setUserState] = useState(() => {
        if (localStorage.getItem("USER")) {
            try {
                return JSON.parse(localStorage.getItem("USER"));
            } catch (e) {
                console.error("Failed to parse USER from localStorage:", e);
                localStorage.removeItem("USER"); // Clear corrupted item
                return null;
            }
        }
        return null;
    });

    const [_token, _setTokenState] = useState(() => localStorage.getItem("ACCESS_TOKEN"));


    const customSetUser = (userData) => {
        if (userData) {
            localStorage.setItem("USER", JSON.stringify(userData));
        } else {
            localStorage.removeItem("USER");
        }
        _setUserState(userData);
    };

    const customSetToken = (tokenData) => {
        if (tokenData) {
            localStorage.setItem("ACCESS_TOKEN", tokenData);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
        _setTokenState(tokenData);
    };  

  return (
    <StateContext.Provider value={{ user: _user, token: _token, setUser: customSetUser, setToken: customSetToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

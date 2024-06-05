import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserSession = (userData) => {
    setUser(userData);
  };

  const clearUserSession = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUserSession, clearUserSession }}>
      {children}
    </UserContext.Provider>
  );
};

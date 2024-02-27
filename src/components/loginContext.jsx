"use client";

import React, { createContext, useContext, useState } from "react";

const UseLogin = createContext();

export default function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  return (
    <UseLogin.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setIsProfileCreated,
        isProfileCreated,
      }}
    >
      {children}
    </UseLogin.Provider>
  );
}

export const useLogin = () => useContext(UseLogin);

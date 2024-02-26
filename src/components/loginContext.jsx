"use client";

import React, { createContext, useContext, useState } from 'react'

const UseLogin = createContext();

export default function LoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UseLogin.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </UseLogin.Provider>
  )
}

export const useLogin = () => useContext(UseLogin);

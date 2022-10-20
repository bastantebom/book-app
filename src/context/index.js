import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [newBook, setNewBook] = useState(false);

  return (
    <Context.Provider
      value={{
        newBook,
        setNewBook,
      }}
    >
      {children}
    </Context.Provider>
  );
};

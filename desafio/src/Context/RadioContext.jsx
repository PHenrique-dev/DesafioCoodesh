import React, { createContext, useState, useEffect } from "react";

export const RadioContext = createContext();

export const RadioProvider = ({ children }) => {
  const [radios, setRadios] = useState(() => {
    return JSON.parse(localStorage.getItem("radios")) || [];
  });

  useEffect(() => {
    localStorage.setItem("radios", JSON.stringify(radios));
  }, [radios]);

  const addRadio = (radio) => setRadios([...radios, radio]);

  const editRadio = (id, updatedRadio) => {
    setRadios(radios.map((r) => (r.id === id ? updatedRadio : r)));
  };

  const removeRadio = (id) => setRadios(radios.filter((r) => r.id !== id));

  return (
    <RadioContext.Provider value={{ radios, addRadio, editRadio, removeRadio }}>
      {children}
    </RadioContext.Provider>
  );
};

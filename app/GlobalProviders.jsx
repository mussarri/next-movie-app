"use client";
import React from "react";
import { LangProvider } from "./context/LangContext.jsx";

export const GlobalProvider = ({ children }) => {
  return (
    <>
      <LangProvider>{children}</LangProvider>
    </>
  );
};

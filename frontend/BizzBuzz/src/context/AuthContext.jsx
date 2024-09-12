import React, { createContext, useState, useContext, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // Initialize auth state from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true"; // Convert the stored string back to a boolean
  });

  // Function to set authentication state
  const setAuth = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Function to remove authentication state
  const removeAuth = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  // Function to get authentication state
  const getAuth = () => {
    return isAuthenticated;
  };

  // Provide state and functions to children
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuth, removeAuth, getAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

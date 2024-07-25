import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to store the token in localStorage and state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

  // Function to log out the user
  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  // Function to authenticate the user with the provided token
  const userAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        setUser(null);
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch data on component mount or token change
  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  // Return the AuthContext.Provider with the necessary values
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, isLoading ,token}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};

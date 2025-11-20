
import { createContext, useContext  } from 'react';

// Context
export const AuthContext = createContext({
  isLoggedIn: false,  
  token: null,
  userId: null,
  login: () => {},
  logout: () => {}
});

// Custom Hook for accessing the context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

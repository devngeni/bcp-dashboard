import { createContext, useContext, useState } from "react";

// Define the interface for authentication data
interface AuthData {
  user: any; // Replace 'any' with your user object type
  isAuthenticated: boolean;
  login?: () => void;
  signUp?: () => void;
  logout?: () => void;
}

// Create authentication context
const AuthContext = createContext({} as AuthData);

// Hook to access authentication context
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

// AuthProvider component to wrap the application with Authentication context, check in authLayout.tsx
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null); // Replace 'null' with your user object type
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace 'false' with your authentication state type

  // Replace with your login function
  async function login() {
    try {
    } catch (error) {}
  }

  // Replace with your sign up function
  async function signUp() {
    try {
    } catch (error) {}
  }

  // Replace with your logout function
  async function logout() {
    try {
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

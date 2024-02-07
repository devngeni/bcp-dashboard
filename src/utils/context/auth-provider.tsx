import { Icredentials } from "@/pages";
import { createContext, useContext, useState } from "react";

// Define the interface for authentication data
interface AuthData {
  user: any; // Replace 'any' with your user object type
  isAuthenticated: boolean;
  login: (credentials: Icredentials) => void;
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
  async function login(credentials: Icredentials) {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
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

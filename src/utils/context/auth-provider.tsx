import { Icredentials } from "@/pages";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  email: string;
  id: string;
  token: string;
}

// Define the interface for authentication data
interface AuthData {
  user: User | null;
  isAuthenticated?: boolean;
  login: (credentials: Icredentials) => void;
  signUp?: () => void;
  logout?: () => void;
}

// Create authentication context
const AuthContext = createContext({} as AuthData);

// Hook to access authentication context
export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

// AuthProvider component to wrap the application with Authentication context, check in authLayout.tsx
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user data is present in local storage
    const storedUser = localStorage.getItem("bcp-token");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Handle error, e.g., clear invalid data from local storage
        localStorage.removeItem("bcp-token");
      }
    }
  }, []);

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
        localStorage.setItem("bcp-token", JSON.stringify(user)); // stringify user object before storing
        setUser(user);
        setIsAuthenticated(true);
        return { user };
      } else {
        const error = "Authentication failed";

        return error;
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
    }
  }

  // Replace with your sign up function
  async function signUp() {
    try {
    } catch (error) {}
  }

  // Replace with your logout function
  async function logout() {
    localStorage.removeItem("bcp-token");
    return router.push("/");
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

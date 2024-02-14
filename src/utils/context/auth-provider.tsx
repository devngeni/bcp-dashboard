import { Icredentials } from "@/pages/sign-in";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  email: string;
  id: string;
  token: string;
  name: string;
  photo: string;
  phone: string;
  role: string;
}

// Define the interface for authentication data
interface AuthData {
  user: User | null;
  isAuthenticated?: boolean;
  login: (credentials: Icredentials) => void;
  signUp?: () => void;
  logout?: () => void;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  handlePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordReset: () => Promise<boolean | any>;
  updateProfile: (data: any) => Promise<any>;
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
  // password change
  const [newPasswordData, setNewPasswordData] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = newPasswordData;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });

  // Check if user data is present in local storage
  useEffect(() => {
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

  //login function by email and password
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

  async function passwordReset() {
    try {
      // catch all values if they are not empty here
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        body: JSON.stringify({
          email: user?.email,
          oldPassword,
          newPassword,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error("Password reset failed:", error);
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
    setUser(null);
    toast.success("Logged out successfully");
  }

  async function updateProfile(data: any) {
    try {
      const response = await axios.put(`api/user/profile/${user?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("bcp-token", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Profile Updated");
        return response;
      } else {
        toast.error("Profile Update Failed!");
        return { error: "Profile Update Failed" };
      }
    } catch (error) {
      toast.error("Error Occurred Updating Profile!, Please try again later.");
      console.log("Error Occurred", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signUp,
        logout,
        oldPassword,
        newPassword,
        confirmPassword,
        handlePasswordChange,
        passwordReset,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

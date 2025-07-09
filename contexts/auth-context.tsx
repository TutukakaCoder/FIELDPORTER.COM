"use client";

import { AuthService, UserProfile } from "@/lib/firebase-auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange(async (authUser) => {
      try {
        setUser(authUser);

        if (authUser) {
          // Fetch user profile when authenticated
          const profile = await AuthService.getUserProfile(authUser.uid);
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      await AuthService.signIn(email, password);
      // User state will be updated by the auth state listener
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await AuthService.signUp(email, password, displayName);
      // User state will be updated by the auth state listener
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
      setUser(null);
      setUserProfile(null);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    return AuthService.resetPassword(email);
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      try {
        const profile = await AuthService.getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error("Failed to refresh profile:", error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected route wrapper
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen in useEffect
  }

  return <>{children}</>;
}

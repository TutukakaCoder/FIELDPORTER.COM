import {
  AuthError,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: "user" | "admin";
  createdAt: Date;
  lastLogin: Date;
}

// Security: Block banned names and domains
const BANNED_NAMES = ["grayson"];
const BANNED_DOMAINS = ["greenstonesoftware.com", "greenstonesoftware"];

export class AuthService {
  static validateUser(
    email: string,
    name: string,
  ): { valid: boolean; message?: string } {
    // Check banned names (case insensitive)
    const nameLower = name.toLowerCase().trim();
    if (BANNED_NAMES.some((banned) => nameLower.includes(banned))) {
      return {
        valid: false,
        message:
          "This name is not permitted. Please contact support if you believe this is an error.",
      };
    }

    // Check banned domains
    const emailLower = email.toLowerCase().trim();
    const domain = emailLower.split("@")[1];
    if (BANNED_DOMAINS.some((banned) => domain?.includes(banned))) {
      return {
        valid: false,
        message:
          "Email domain not permitted. Please use a different email address.",
      };
    }

    return { valid: true };
  }

  static async signUp(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    // Validate user before creating account
    const validation = this.validateUser(email, displayName);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update profile
      await updateProfile(user, { displayName });

      // Create user document in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        role: "user",
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userProfile);

      return user;
    } catch (error) {
      console.error("Sign up error:", error);
      throw this.formatAuthError(error as AuthError);
    }
  }

  static async signIn(email: string, password: string): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Update last login
      await setDoc(
        doc(db, "users", user.uid),
        { lastLogin: new Date() },
        { merge: true },
      );

      return user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw this.formatAuthError(error as AuthError);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data["createdAt"]?.toDate() || new Date(),
          lastLogin: data["lastLogin"]?.toDate() || new Date(),
        } as UserProfile;
      }

      return null;
    } catch (error) {
      console.error("Get user profile error:", error);
      return null;
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  private static formatAuthError(error: AuthError): Error {
    switch (error.code) {
      case "auth/email-already-in-use":
        return new Error("An account with this email already exists.");
      case "auth/invalid-email":
        return new Error("Please enter a valid email address.");
      case "auth/operation-not-allowed":
        return new Error("Account creation is currently disabled.");
      case "auth/weak-password":
        return new Error("Password should be at least 6 characters.");
      case "auth/user-disabled":
        return new Error("This account has been disabled.");
      case "auth/user-not-found":
        return new Error("No account found with this email.");
      case "auth/wrong-password":
        return new Error("Incorrect password.");
      case "auth/too-many-requests":
        return new Error("Too many failed attempts. Please try again later.");
      default:
        return new Error("Authentication failed. Please try again.");
    }
  }
}

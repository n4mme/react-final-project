import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import "./Login.css";
import googleLogo from "../assets/googlelogo.png";

// ✅ Firebase imports
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Login with Email/Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const role = userData.role;

        showPopup(`Welcome back, ${userData.fullName}! Logged in as ${role}.`, "success");

        setTimeout(() => {
          if (role === "host") onNavigate("host");
          else if (role === "guest") onNavigate("guest");
          else if (role === "admin") onNavigate("admin");
          else onNavigate("home");
        }, 1500);
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Popup helper
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Login / Sign Up with Google
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // If new user, save them in Firestore
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName,
          email: user.email,
          role: "guest", // Default role for Google sign-ins
          createdAt: new Date(),
        });
      }

      showPopup(`Welcome, ${user.displayName || "User"}! Signed in with Google.`, "success");

      // Navigate after short delay
      setTimeout(() => onNavigate("guest"), 1500);
    } catch (error) {
      console.error(error);
      setError("❌ Google sign-in failed. Try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ✅ Popup message */}
        {popup.show && (
          <div
            className={`popup-message ${
              popup.type === "success" ? "popup-success" : "popup-error"
            }`}
          >
            {popup.type === "success" ? (
              <CheckCircle size={18} className="popup-icon" />
            ) : (
              <XCircle size={18} className="popup-icon" />
            )}
            <span>{popup.message}</span>
          </div>
        )}

        {/* Logo */}
        <div className="login-logo">
          <h1 className="login-title">
            <span className="text-indigo">Biya</span>
            <span className="text-blue">Hele</span>
          </h1>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-signin" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <div></div>
          <span>Or continue with</span>
          <div></div>
        </div>

        {/* ✅ Google Sign In */}
        <button className="btn-google" onClick={handleGoogleSignIn}>
          <img src={googleLogo} alt="Google logo" className="google-icon" />
          <span>Continue with Google</span>
        </button>

        {/* Sign Up link */}
        <p className="signup-text">
          Don’t have an account?{" "}
          <a
            href="#"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("register");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

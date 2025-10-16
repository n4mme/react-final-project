import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import "./Register.css";
import googleLogo from "../assets/googlelogo.png";

// ✅ Firebase Auth & Firestore
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "guest",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Register user and store info in Firestore
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.fullName });

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
      });

      // ✅ Show popup success instead of alert
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        onNavigate("login"); // redirect after popup
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Logo */}
        <div className="register-logo">
          <h1 className="register-title">
            <span className="text-indigo">Biya</span>
            <span className="text-blue">Hele</span>
          </h1>
        </div>

        {/* Form */}
        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="input-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
              required
            >
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
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

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-create" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <div></div>
          <span>Or continue with</span>
          <div></div>
        </div>

        <button className="btn-google">
          <img src={googleLogo} alt="Google" className="google-icon" />
          <span>Continue with Google</span>
        </button>

        <p className="signin-text">
          Already have an account?{" "}
          <a
            href="#"
            className="signin-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("login");
            }}
          >
            Sign In
          </a>
        </p>
      </div>

      {/* ✅ Popup modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <CheckCircle className="popup-icon" size={48} />
            <h3>Account Created!</h3>
            <p>Your account has been successfully registered.</p>
          </div>
        </div>
      )}
    </div>
  );
}

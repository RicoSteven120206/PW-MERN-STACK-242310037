"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/components/auth/auth.css";
import { TextInput, TextInputPassword } from "@/components/ui/forms";
import { REGISTER_USER } from "@/components/apis/UserServices"; // Sesuaikan API service kamu

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("Semua bidang wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const result = await REGISTER_USER(formData);

      if (result.success) {
        setSuccessMsg("Pendaftaran berhasil! Mengalihkan ke halaman login...");
        
        // JANGAN LANGSUNG LOGIN! Berikan delay sebentar lalu redirect ke /sign-in
        setTimeout(() => {
          router.push("/sign-in");
        }, 1500);
      } else {
        setError(result.message || "Pendaftaran gagal");
      }
    } catch (err) {
      console.error("Error during register:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Sign up to get started</p>

        {error && <div className="error-message">{error}</div>}
        {successMsg && (
          <div className="error-message" style={{ backgroundColor: "#d1e7dd", borderColor: "#badbcc", color: "#0f5132" }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <TextInput
            title="Username"
            required={true}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />

          <TextInput
            title="Email"
            required={true}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <TextInputPassword
            required={true}
            title="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
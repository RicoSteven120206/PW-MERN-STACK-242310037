"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import "@/components/auth/auth.css";
import { TextInput, TextInputPassword } from "@/components/ui/forms";
import { withAuthRedirect } from "@/components/auth/withAuthRedirect";
import { LOGIN_USER } from "@/components/apis/UserServices";

function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const result = await LOGIN_USER({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        // Simpan data user, accessToken, dan expiresIn ke AuthContext & LocalStorage
        await login(result.data, result.accessToken, result.expiresIn);

        const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          sessionStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl);
        } else {
          router.push("/cms/books");
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">Sign in to your account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signin-form">
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

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Do not have an account?{" "}
            <Link href="/sign-up" className="signup-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(SignInPage);
"use client";

import { useState } from "react";
import { signIn } from "../../lib/supabase";
import "../admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) setError("Invalid credentials");
    else window.location.href = "/admin/login/rooms";
  }

  return (
    <div className="admin-center">
      <form className="admin-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        <button>Login</button>
      </form>
    </div>
  );
}

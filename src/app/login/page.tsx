"use client";

import { setCookies } from "@/lib/setCookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log({ email: email, password: password });
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include"
    });

    const data = await res.json();
    if(!res.ok) {
      setMsg(data.msg);
      setLoading(false);
      return;
    }

    setMsg("");
    await setCookies("token", data.token);
    router.push("/");

  };

  return (
    <div
      id="signUpForm-container"
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card">
        <div className="card-body">
          <form className="px-4 py-4">
            <h1 className="text-center">Login</h1>
            <div className="form-group mb-3">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required={true}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
              />
            </div>
            <small>
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </small>
            <br />
            <button
              type="submit"
              className="btn btn-primary my-3"
              onClick={submitHandler}
              disabled={loading}
            >
              Submit
            </button>
            <br />
            <small className="text-danger">{msg}</small>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { setCookies } from "@/lib/setCookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(0);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (name == "" || email == "" || password == "" || !balance) {
      alert("Enter all fields");
      setLoading(false);
      return;
    }
    const user = { name: name, email: email, password: password, bal: balance };
    const res = await fetch("api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setLoading(false);
      return;
    }
    setMsg("");
    await setCookies("token", data.token);
    router.push("/");
  };

  useEffect(() => {
    const user = { name, email, password, balance };
    console.log(user);
  }, [name, email, password, balance]);

  return (
    <div
      id="signUpForm-container"
      className="d-flex justify-content-center align-items-center "
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card">
        <div className="card-body">
          <form className="px-4">
            <h1 className="text-center">Sign Up</h1>
            <div className="form-group mb-3 ">
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We will never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="balanceInput">Balance</label>
              <input
                type="number"
                className="form-control"
                id="balanceInput"
                placeholder="Enter balance"
                value={balance ? balance : ""}
                onChange={(e) => {
                  const newBalance = parseInt(e.target.value);
                  if (newBalance < 0) {
                    setMsg("Balance can't be negative");
                    setBalance(0);
                    return;
                  }
                  setBalance(newBalance);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <small>
              Already have an account? <Link href="/login">Login</Link>
            </small>{" "}
            <br />
            <button
              type="submit"
              className="btn btn-primary my-3"
              onClick={handleSubmit}
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

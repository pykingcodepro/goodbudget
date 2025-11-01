"use client";
import categoryData from "@/typeDefiniton/categoryData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddTransaction() {
  const [uId, setUId] = useState<string | null>(null);
  const [catList, setCatList] = useState<categoryData[] | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [party, setParty] = useState<string>("");
  const [amt, setAmt] = useState<number>(0);
  const [cId, setCId] = useState<string>("");
  const [mode, setMode] = useState<string>("cash");
  const [desc, setDesc] = useState<string>("");
  const router = useRouter();

  const submitHandler = async() => {
    const res = await fetch(`../api/transactions/${uId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ t_party: party, t_amt: amt, c_id: cId, t_mode: mode, t_desc: desc })
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setIsLoading(false);
      return;
    }

    setMsg("");
    router.push("/");

  };

  useEffect(() => {
    fetch("api/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUId(data.u_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (uId != null) {
      fetch(`api/categories/${uId}`)
        .then((res) => res.json())
        .then((data) => {
          setCatList(data.categories);
        });
    }
  }, [uId]);

  return (
    <div
      id="addTransFormContainer"
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card my-5">
        <div className="card-body">
          <form className="px-4 py-4">
            <h1 className="text-center">Add Transaction</h1>
            <div className="form-group mb-3">
              <label htmlFor="partyName">Party</label>
              <input
                type="text"
                className="form-control"
                id="partyName"
                placeholder="Party"
                value={party}
                onChange={e => setParty(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="amountInput">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amountInput"
                placeholder="Amount"
                value={amt}
                onChange={e => setAmt(parseInt(e.target.value))}
                required={true}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="categoryInput">Category</label>
              <select
                name="categoryInput"
                id=""
                className="form-select"
                value={cId}
                onChange={e => setCId(e.target.value)}
                required={true}
              >
                {catList?.map((cat: categoryData, key) => {
                  return (
                    <option key={key} value={cat._id}>
                      {cat.c_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="modeInput">Mode</label>
              <select
                name="modeInput"
                className="form-select"
                id=""
                value={mode}
                onChange={e => setMode(e.target.value)}
                required={true}
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
                <option value="card">Card</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="descInput">Description</label>
              <textarea
                name="descInput"
                id=""
                className="form-control"
                required={true}
                value={desc}
                onChange={e => setDesc(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary my-3"
              onClick={submitHandler}
              disabled={isLoading}
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

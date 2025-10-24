"use client";
import categoryData from "@/typeDefiniton/categoryData";
import React, { useEffect, useState } from "react";

export default function AddTransaction() {
  const [uId, setUId] = useState<string | null>(null);
  const [catList, setCatList] = useState<categoryData[]|null>(null);

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
      <div className="card">
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
                required={true}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="categoryInput">Category</label>
              <select name="categoryInput" id="" className="form-select">
                {catList?.map((cat:categoryData, key) => {
                    return (
                        <option key={key} value={cat._id}>{cat.c_name}</option>
                    )
                })}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary my-3"
              //   onClick={submitHandler}
              //   disabled={loading}
            >
              Submit
            </button>
            <br />
            {/* <small className="text-danger">{msg}</small> */}
          </form>
        </div>
      </div>
    </div>
  );
}

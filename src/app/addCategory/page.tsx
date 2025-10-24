"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddCategory() {
  const router = useRouter();
  const [cName, setCName] = useState<string>("");
  const [cType, setCType] = useState<string>("expense");
  const [uId, setUId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log({ u_id: uId, c_name: cName, c_type: cType });
    const res = await fetch(`../api/categories/${uId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ c_name: cName, c_type: cType }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data.msg);
      setIsLoading(false);
      return;
    }

    setMsg("");
    router.push("/categories");
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

  return (
    <div
      id="add-category-form"
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="card">
        <div className="card-body">
          <form className="p-5" method="POST">
            <h1 className="text-center">Add Category</h1>
            <div className="form-group my-3">
              <label htmlFor="catNameInput">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="catNameInput"
                placeholder="Enter Category Name"
                value={cName}
                onChange={(e) => setCName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="typeInput">Category Type</label>
              <select
                className="form-select"
                name="typeInput"
                id="typeInput"
                value={cType}
                onChange={(e) => setCType(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button
              type="submit"
              className={"btn btn-primary " + (isLoading ? "disabled" : "")}
              onClick={handleClick}
            >
              Add
            </button>
            <br />
            <small className="text-danger">{msg}</small>
          </form>
        </div>
      </div>
    </div>
  );
}

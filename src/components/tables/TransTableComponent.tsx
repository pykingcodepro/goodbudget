"use client";

import categoryData from "@/typeDefiniton/categoryData";
import transactionsData from "@/typeDefiniton/transactionsData";
import { useState } from "react";

export default function TransTableComponent({
  transactionsList,
  catList
}: {
  transactionsList: transactionsData[] | null,
  catList: categoryData[]|null
}) {
  const [editTransId, setEditTransId] = useState<string | null>(null);
  const [tParty, setTParty] = useState<string>("");
  const [tDesc, setTDesc] = useState<string>("");
  const [tMode, setTMode] = useState<string>("");
  const [tCat, setTCat] = useState<string>("");

  const handleEdit = async (id: string) => {
    setEditTransId(id);
  };

  const transListElement = transactionsList?.map(
    (trans: transactionsData, key: number) => {
      if (editTransId !== trans._id) {
        return (
          <tr key={key}>
            <td>{trans.party}</td>
            <td
              style={{
                color: trans.c_type == "income" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {trans.amount}
            </td>
            <td
              style={{ cursor: "pointer" }}
              onClick={(e) => (location.href += "/categories")}
            >
              {trans.c_name}
            </td>
            <td>{trans.date}</td>
            <td>{trans.mode}</td>
            <td>{trans.desc}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  handleEdit(trans._id);
                  setTParty(trans.party);
                  setTMode(trans.mode);
                  setTCat(trans.c_id);
                  setTDesc(trans.desc);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={key}>
            <td><input type="text" value={tParty} onChange={(e) => setTParty(e.target.value)} /></td>
            <td
              style={{
                color: trans.c_type == "income" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {trans.amount}
            </td>
            <td>
              <select
                name="categoryInput"
                id=""
                className="form-select"
                value={tCat}
                onChange={e => setTCat(e.target.value)}
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
            </td>
            <td>{trans.date}</td>
            <td>
              <select
                onChange={e => setTMode(e.target.value)}
                value={tMode}
              >
                <option value="cash">CASH</option>
                <option value="online">ONLINE</option>
                <option value="card">CARD</option>
              </select>
            </td>
            <td>
              <textarea onChange={e => setTDesc(e.target.value)} value={tDesc}></textarea>
            </td>
            <td>
              <button className="btn btn-primary">Update</button>
            </td>
          </tr>
        );
      }
    }
  );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Party</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        {transactionsList && transactionsList.length > 0 ? (
          <tbody>{transListElement}</tbody>
        ) : null}
      </table>
      {transactionsList && transactionsList.length > 0 ? null : (
        <b className="text-danger">No Data</b>
      )}
    </>
  );
}

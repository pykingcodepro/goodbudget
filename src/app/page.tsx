"use client";

import NavBarComponent from "@/components/NavBar";
import TransTableComponent from "@/components/tables/TransTableComponent";
import transactionsData from "@/typeDefiniton/transactionsData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [transList, setTransList] = useState<transactionsData[] | null>(null);
  const [uId, setUId] = useState<string | null>(null);
  const router = useRouter();

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
    // console.log(uId);
    if (uId != null) {
      fetch(`api/transactions/${uId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.transactions)
          setTransList(data.transactions.map((trans) => {
            return {
              _id: trans._id,
              party: trans.t_party,
              amount: trans.t_amt,
              c_name: trans.t_cat.c_name,
              c_type: trans.t_cat.c_type,
              date: trans.createdAt,
              mode: trans.t_mode,
              desc: trans.t_desc,
              newBal: trans.t_new_bal
            }
          }));
        });
    }
  }, [uId]);

  useEffect(() => {
    console.log(transList)
  }, [transList]);

  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card">
                <div className="card-header">Last Transactions</div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <TransTableComponent transactionsList={transList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="addBtnContainer"
          style={{
            position: "absolute",
            right: "10vw",
            bottom: "10vh",
          }}
        >
          <button
            style={{
              fontSize: "2rem",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "50%",
              lineHeight: "-5",
              paddingBottom: "0.3rem",
            }}
            onClick={() => router.push("/addTransaction")}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

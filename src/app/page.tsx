"use client";

import connectDB from "@/client";
import NavBarComponent from "@/components/NavBar";
import TransTableComponent from "@/components/tables/TransTableComponent";
import { getCookies } from "@/lib/getCookies";
import transactionsData from "@/typeDefiniton/transactionsData";
import { useEffect, useState } from "react";

export default function Home() {
  const [transList, setTransList] = useState<transactionsData[]|null>(null);
  const [uId, setUId] = useState<string|null>(null);

  useEffect(() => {

    fetch("api/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setUId(data.u_id);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    // console.log(uId);
    if(uId != null) {
      fetch(`api/transactions/${uId}`)
      .then(res => res.json())
      .then(data => {
        setTransList(data.transactions)
      })
    }
  }, [uId]);

  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card">
                <div className="card-header">
                  Last Transactions
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <TransTableComponent transactionsList={transList} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

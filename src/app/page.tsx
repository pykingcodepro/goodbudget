"use client";

import NavBarComponent from "@/components/NavBar";
import TransTableComponent from "@/components/tables/TransTableComponent";
import transactionsData from "@/typeDefiniton/transactionsData";
import { useEffect, useState } from "react";

export default function Home() {

  const [transList, setTransList] = useState<transactionsData[]|null>(null);

  useEffect(() => {
    setTransList([
      {
        _id: 1,
        party: "XYZ",
        amount: 100,
        c_name: "College Fees",
        c_type: "expense",
        date: "2025-10-09",
        mode: "Cash",
        desc: "Desc 1",
        newBal: 200
      },
      {
        _id: 1,
        party: "ABC",
        amount: 200,
        c_name: "Salary",
        c_type: "income",
        date: "2025-10-08",
        mode: "Cash",
        desc: "Desc 2",
        newBal: 300
      }
    ]);
  }, []);

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

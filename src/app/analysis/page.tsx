"use client";

import LastDaysCharts from "@/components/charts/LastDaysCharts";
import NavBarComponent from "@/components/NavBar";
import { useState } from "react";

export default function Page() {
  const [noOfDays, setNoOfDays] = useState<number>(7);

  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <span>Last Transactions</span>
                  <select
                    name=""
                    id=""
                    value={noOfDays}
                    onChange={(e) => {
                      setNoOfDays(parseInt(e.target.value));
                    }}
                  >
                    <option value={7}>Last 7 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={365}>Last 365 Days</option>
                  </select>
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <LastDaysCharts noOfDays={noOfDays} />
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

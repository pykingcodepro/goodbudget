"use client";

import LastDaysCharts from "@/components/charts/LastDaysCharts";
import NavBarComponent from "@/components/NavBar";
import { useEffect, useState } from "react";
import { LastDaysChartData } from "@/typeDefiniton/LastDaysChartData";

export default function Page() {
  const [uId, setUId] = useState<string | null>(null);
  const [noOfDays, setNoOfDays] = useState<number>(7);
  const [dataList, setDataList] = useState<LastDaysChartData[] | null>(null);

  useEffect(() => {
    fetch("api/me/", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUId(data.u_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (uId != null) {
      fetch(`api/transactions/${uId}?noOfDays=${7}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
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
                    <LastDaysCharts noOfDays={noOfDays} dataList={dataList} />
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

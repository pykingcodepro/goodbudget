"use client";

import NavBarComponent from "@/components/NavBar";
import { useEffect, useState } from "react";
import { LastDaysChartData } from "@/typeDefiniton/LastDaysChartData";
import LastDaysCharts from "@/components/charts/LastDaysCharts";
import CategoryPieCharts from "@/components/charts/CategoryPieCharts";

export default function Page() {
  const [uId, setUId] = useState<string | null>(null);
  const [noOfDays1, setNoOfDays1] = useState<number>(7);
  const [noOfDays2, setNoOfDays2] = useState<number>(7);
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
      fetch(`api/transactions/${uId}?noOfDays=${noOfDays1}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Transform the transactions data into the LastDaysChartData format
          interface Transaction {
            createdAt: string;
            t_amt: number;
          }
          const chartData: LastDaysChartData[] = data.transactions.map((t: Transaction) => ({
            date: t.createdAt.split('T')[0],
            t_amt: t.t_amt
          }));
          setDataList(chartData);
        })
        .catch(error => {
          console.error("Error fetching transactions:", error);
          setDataList([]); // Set empty array instead of null on error
        });
    }
  }, [uId, noOfDays1]);

  // API Call for category data
  useEffect(() => {
    if (uId != null) {
      fetch(`api/categories/${uId}/?noOfDays=${noOfDays2}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log("Error: ");
        console.log(err);
      })
    }
  }, [uId, noOfDays2]);

  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <span>Last Transactions</span>
                  <select
                    name=""
                    id=""
                    value={noOfDays1}
                    onChange={(e) => {
                      setNoOfDays1(parseInt(e.target.value));
                    }}
                  >
                    <option value={7}>Last 7 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={365}>Last 365 Days</option>
                  </select>
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <LastDaysCharts noOfDays1={noOfDays1} dataList={dataList} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <span>Last Transactions</span>
                  <select
                    name=""
                    id=""
                    value={noOfDays2}
                    onChange={(e) => {
                      setNoOfDays2(parseInt(e.target.value));
                    }}
                  >
                    <option value={7}>Last 7 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={365}>Last 365 Days</option>
                  </select>
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <CategoryPieCharts />
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

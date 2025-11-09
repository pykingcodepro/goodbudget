"use client";

import NavBarComponent from "@/components/NavBar";
import TransTableComponent from "@/components/tables/TransTableComponent";
import { splitTimeStamp } from "@/lib/spiltTimeStamp";
import categoryData from "@/typeDefiniton/categoryData";
import transactionsData from "@/typeDefiniton/transactionsData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type userData = {
  u_name: string;
  u_email: string;
  u_bal: number;
};

type transDataFromServer = {
  _id: string;
  t_party: string;
  t_amt: number;
  t_cat: { c_name: string; c_type: string; _id: string };
  createdAt: string;
  t_mode: string;
  t_desc?: string;
  t_new_bal: number;
};

export default function Home() {
  const [transList, setTransList] = useState<transactionsData[] | null>(null);
  const [catList, setCatList] = useState<categoryData[] | null>(null);
  const [uId, setUId] = useState<string | null>(null);
  const [userData, setUserData] = useState<userData | null>(null);
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
      fetch(`api/userData/${uId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            u_name: data.u_name,
            u_email: data.u_email,
            u_bal: data.u_bal,
          });
        });

      fetch(`api/transactions/${uId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.transactions);
          setTransList(
            data.transactions.map((trans: transDataFromServer) => {
              const createdTimeStamp = splitTimeStamp(trans.createdAt);
              const createdDate =
                createdTimeStamp.date +
                "/" +
                createdTimeStamp.month +
                "/" +
                createdTimeStamp.year;
              return {
                _id: trans._id,
                party: trans.t_party,
                amount: trans.t_amt,
                c_id: trans.t_cat._id,
                c_name: trans.t_cat.c_name,
                c_type: trans.t_cat.c_type,
                date: createdDate,
                mode: trans.t_mode.toUpperCase(),
                desc: trans.t_desc,
                newBal: trans.t_new_bal,
              };
            })
          );
        });

      fetch(`api/categories/${uId}`)
        .then((res) => res.json())
        .then((data) => {
          setCatList(data.categories);
        });
    }
  }, [uId]);

  const handleEdit = async (
    editTransId: string,
    tParty: string,
    tMode: string,
    tCat: string,
    tDesc: string
  ) => {
    try {
      console.log(editTransId, tParty, tMode, tCat, tDesc);
      const res = await fetch(`api/transactions/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          t_id: editTransId,
          t_party: tParty,
          t_mode: tMode,
          c_id: tCat,
          t_desc: tDesc,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to update transaction:", data?.message || data);
        return;
      }

      // Assuming `data` contains the updated transaction object
      if (transList) {
        setTransList(transList.map((trans) => {
          if (trans._id === editTransId) {
            // Replace with updated values
            return {
              ...trans,
              party: tParty,
              mode: tMode,
              c_id: tCat,
              desc: tDesc,
            };
          }
          return trans;
        }));
      }
    } catch (err) {
      console.error("Error while editing transaction:", err);
    }
  };

  useEffect(() => {
    console.log(transList);
  }, [transList]);


  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <h2 className="mb-5">
                Balance: Rs.{userData ? userData.u_bal : "-"}
              </h2>
              <div className="card overflow-x-scroll">
                <div className="card-header">Last Transactions</div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <TransTableComponent
                      transactionsList={transList}
                      catList={catList}
                      handleEdit={handleEdit}
                    />
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

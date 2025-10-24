"use client";

import NavBarComponent from "@/components/NavBar";
import CategoryTableComponent from "@/components/tables/CategoryTableComponent";
import TransTableComponent from "@/components/tables/TransTableComponent";
import categoryData from "@/typeDefiniton/categoryData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [categoryList, setCategoryList] = useState<categoryData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCategoryList([
      {
        _id: 1,
        c_name: "College Fees",
        c_type: "expense",
        c_date: "2025-07-21",
      },
      {
        _id: 2,
        c_name: "Salary",
        c_type: "income",
        c_date: "2025-08-01",
      },
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
                <div className="card-header">Categories</div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <CategoryTableComponent categoryList={categoryList} />
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
            onClick={() => router.push("/addCategory")}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

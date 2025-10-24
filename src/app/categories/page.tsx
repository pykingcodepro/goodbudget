"use client";

import NavBarComponent from "@/components/NavBar";
import CategoryTableComponent from "@/components/tables/CategoryTableComponent";
import categoryData from "@/typeDefiniton/categoryData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [categoryList, setCategoryList] = useState<categoryData[] | null>(null);
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
    if (uId) {
      fetch(`api/categories/${uId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setCategoryList(data.categories);
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

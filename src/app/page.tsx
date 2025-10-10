import NavBarComponent from "@/components/NavBar";
import TransTableComponent from "@/components/TransTableComponent";

export default function Home() {
  return (
    <>
      <NavBarComponent />
      <div className="main-container d-flex m-5 justify-content-center">
        <div className="card" style={{ width: "80%" }}>
          <div className="card-header">
            Last Transactions
          </div>
          <div className="card-body">
            <TransTableComponent transactionsList={null} />
          </div>
        </div>
      </div>
    </>
  );
}

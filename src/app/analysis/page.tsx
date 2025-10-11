import LastDaysCharts from "@/components/charts/LastDaysCharts";
import NavBarComponent from "@/components/NavBar";

export default function Page() {
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
                                        <LastDaysCharts />
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
import Link from "next/link";

export default function NavBarComponent() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-primary">
            <div className="container-fluid">
                <Link className="navbar-brand me-5" href="#">GoodBudget</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <Link className="nav-link active" aria-current="page" href="/">Dashboard</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link" href="/analysis">Analysis</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link" href="/categories">Categories</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link" href="/settings">Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
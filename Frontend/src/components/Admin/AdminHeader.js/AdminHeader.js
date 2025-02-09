import { Link } from "react-router-dom";
import './AdminHeader.css';

function AdminHeader() {
    return (
        <>
            <header className="bg-light">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand text-dark" to="/">HaritBazaar🌱</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/admin/manage-category">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/admin/manage-products">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/admin/manage-orders">Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/admin/manage-users">Users</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default AdminHeader;
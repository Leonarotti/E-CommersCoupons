
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EnterpriseManagement from './components/enterpriseManagement/EnterpriseManagement';
import EnterpriseDetails from './components/enterpriseDetails/EnterpriseDetails';
import CouponManagement from './components/couponManagement/CouponManagement';
import CategoryManagement from './components/categoryManagement/CategoryManagement';
import Modal from 'react-modal';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

Modal.setAppElement('#root');

function App() {
    return (
        <Router>
            <header className="bg-primary text-white py-3">
                <nav className="container">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/" activeClassName="active">Enterprises</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/categories" activeClassName="active">Categories</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<EnterpriseManagement />} />
                    <Route path="/categories" element={<CategoryManagement />} />
                    <Route path="/enterprises/:id" element={<EnterpriseDetails />} />
                    <Route path="/enterprises/:enterpriseId/coupons" element={<CouponManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

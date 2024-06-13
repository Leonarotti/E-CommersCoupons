import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EnterpriseManagement from './components/enterpriseManagement/EnterpriseManagement';
import EnterpriseAndCoupons from './components/enterpriseAndCoupons/EnterpriseAndCoupons';
// import CouponDetails from './components/couponDetails/CouponDetails';
import CouponAndPromotions from './components/couponAndPromotions/CouponAndPromotions';
// import CategoryManagement from './components/categoryManagement/CategoryManagement';
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
                            <NavLink
                                className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}
                                to="/"
                            >
                                Enterprises
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link text-white${isActive ? ' active' : ''}`}
                                to="/categories"
                            >
                                Categories
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </header>
            <div className="container my-4">
                <Routes>
                    <Route path="/" element={<EnterpriseManagement />} />
                    {/* <Route path="/categories" element={<CategoryManagement />} /> */}
                    <Route path="/enterprises/:enterpriseId/coupons/" element={<EnterpriseAndCoupons />} />
                    <Route path="/enterprises/:enterpriseId/coupons/:couponId/promotions" element={<CouponAndPromotions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

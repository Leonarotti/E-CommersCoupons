import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EnterpriseManagement from './components/enterpriseManagement/EnterpriseManagement';
import EnterpriseAndCoupons from './components/enterpriseAndCoupons/EnterpriseAndCoupons';
// import CouponDetails from './components/couponDetails/CouponDetails';
import CouponAndPromotions from './components/couponAndPromotions/CouponAndPromotions';
import CategoryManagement from './components/categoryManagement/CategoryManagement';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Enterprises</NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories">Categories</NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<EnterpriseManagement />} />
                    <Route path="/categories" element={<CategoryManagement />} />
                    <Route path="/enterprises/:enterpriseId/coupons/" element={<EnterpriseAndCoupons />} />
                    <Route path="/enterprises/:enterpriseId/coupons/:couponId/promotions" element={<CouponAndPromotions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

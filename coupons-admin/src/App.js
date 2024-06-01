import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EnterpriseManagement from './components/enterpriseManagement/EnterpriseManagement';
import EnterpriseDetails from './components/enterpriseDetails/EnterpriseDetails';
import CouponManagement from './components/couponManagement/CouponManagement';
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
                    <Route path="/enterprises/:id" element={<EnterpriseDetails />} />
                    <Route path="/enterprises/:enterpriseId/coupons" element={<CouponManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

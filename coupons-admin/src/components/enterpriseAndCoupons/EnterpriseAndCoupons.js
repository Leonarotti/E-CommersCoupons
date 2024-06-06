import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import enterpriseService from '../../services/EnterpriseService';
import couponService from '../../services/CouponService';
import categoryService from '../../services/CategoryService';
import CouponModal from '../couponModal/CouponModal';
import './EnterpriseAndCoupons.css';

const EnterpriseAndCoupons = () => {
    const { enterpriseId } = useParams();
    const navigate = useNavigate();
    const [enterprise, setEnterprise] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        id_enterprise: enterpriseId,
        id_category: '',
        name: '',
        img: '',
        location: '',
        regular_price: '',
        percentage: '',
        start_date: '',
        end_date: '',
        is_enabled: true
    });
    const [backendErrors, setBackendErrors] = useState({});

    useEffect(() => {
        enterpriseService.getEnterpriseById(enterpriseId)
            .then(response => {
                const isEnabled = Number(response.data.is_enabled) === 1;
                setEnterprise({ ...response.data, is_enabled: isEnabled });
            })
            .catch(error => {
                console.error("Error fetching enterprise:", error);
            });
    }, [enterpriseId]);

    const loadCoupons = useCallback(() => {
        couponService.getCouponsByEnterpriseId(enterpriseId)
            .then(response => {
                const couponsWithBooleans = response.data.map(coupon => {
                    const isEnabled = Number(coupon.is_enabled) === 1;
                    return {
                        ...coupon,
                        is_enabled: isEnabled
                    };
                });
                setCoupons(couponsWithBooleans);
            })
            .catch(error => {
                console.error("Error fetching coupons:", error);
            });
    }, [enterpriseId]);

    const loadCategories = useCallback(() => {
        categoryService.getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    useEffect(() => {
        loadCoupons();
        loadCategories();
    }, [loadCoupons, loadCategories]);

    const handleEnterpriseChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEnterprise({ ...enterprise, [name]: type === 'checkbox' ? checked : value });
    };

    const handleCouponChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCoupon({ ...newCoupon, [name]: type === 'checkbox' ? checked : value });
    };

    const handleUpdateEnterprise = (e) => {
        e.preventDefault();
        enterpriseService.updateEnterprise(enterprise)
            .then(response => {
                console.log("Enterprise updated successfully:", response.data);
                setEditMode(false);
            })
            .catch(error => {
                console.error("Error updating enterprise:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleOpenModal = () => {
        setEditMode(false);
        setNewCoupon({
            id_enterprise: enterpriseId,
            id_category: '',
            name: '',
            img: '',
            location: '',
            regular_price: '',
            percentage: '',
            start_date: '',
            end_date: '',
            is_enabled: true
        });
        setBackendErrors({});
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setEditMode(false);
    };

    const handleCreateCoupon = (e) => {
        e.preventDefault();
        couponService.createCoupon(newCoupon)
            .then(response => {
                console.log("Coupon created successfully:", response.data);
                loadCoupons();
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error creating coupon:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleEditCoupon = (coupon) => {
        setEditMode(true);
        setNewCoupon(coupon);
        setBackendErrors({});
        setModalIsOpen(true);
    };

    const handleUpdateCoupon = (e) => {
        e.preventDefault();
        couponService.updateCoupon(newCoupon)
            .then(response => {
                console.log("Coupon updated successfully:", response.data);
                loadCoupons();
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error updating coupon:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleManageCoupon = (couponId) => {
        navigate(`/enterprises/${enterpriseId}/coupons/${couponId}/promotions`);
    };

    const handleEnableToggle = (id, isEnabled) => {
        couponService.setCouponEnabled(id, isEnabled)
            .then(() => {
                loadCoupons();
            })
            .catch(error => {
                console.error("Error toggling coupon enable status:", error);
            });
    };

    const goBack = () => {
        navigate('/');
    };

    if (!enterprise) return <div>Loading...</div>;

    return (
        <div className="enterprise-and-coupons">
            <button onClick={goBack}>Back to Enterprises</button>
            <h1>{editMode ? 'Edit Enterprise' : 'Enterprise Details'}</h1>
            <form onSubmit={handleUpdateEnterprise}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={enterprise.name}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={enterprise.address}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.address && <span className="error">{backendErrors.address}</span>}

                <label>License:</label>
                <input
                    type="text"
                    name="license"
                    value={enterprise.license}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.license && <span className="error">{backendErrors.license}</span>}

                <label>Date created:</label>
                <input
                    type="date"
                    name="date_created"
                    value={enterprise.date_created}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.date_created && <span className="error">{backendErrors.date_created}</span>}

                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={enterprise.phone}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.phone && <span className="error">{backendErrors.phone}</span>}

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={enterprise.email}
                    onChange={handleEnterpriseChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.email && <span className="error">{backendErrors.email}</span>}

                <label>
                    <input
                        type="checkbox"
                        name="is_enabled"
                        checked={enterprise.is_enabled}
                        onChange={(e) => handleEnterpriseChange({ target: { name: 'is_enabled', value: e.target.checked } })}
                        disabled={!editMode}
                    />
                    Enabled
                </label>

                {editMode && <button type="submit">Update</button>}
                {!editMode && <button type="button" onClick={() => setEditMode(true)}>Edit</button>}
            </form>

            <h2>Coupons</h2>
            <button onClick={handleOpenModal}>Create Coupon</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Regular Price</th>
                        <th>Discount (%)</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id_coupon}>
                            <td>{coupon.name}</td>
                            <td>{categories.find(category => category.id_category === coupon.id_category)?.name || 'Unknown'}</td>
                            <td>{coupon.location}</td>
                            <td>{coupon.regular_price}</td>
                            <td>{coupon.percentage}%</td>
                            <td>{coupon.start_date}</td>
                            <td>{coupon.end_date}</td>
                           
                            <td>
                                <button className="btn btn-secondary btn-sm" onClick={() => handleEnableToggle(coupon.id_coupon, !coupon.is_enabled)}>
                                    {coupon.is_enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button className="btn btn-warning btn-sm edit"  onClick={() => handleEditCoupon(coupon)} >Edit</button>
                                <button className="btn btn-primary btn-sm manage" onClick={() => handleManageCoupon(coupon.id_coupon)}>Manage Coupon</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CouponModal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                coupon={newCoupon}
                handleCouponChange={handleCouponChange}
                handleSubmit={editMode ? handleUpdateCoupon : handleCreateCoupon}
                editMode={editMode}
                backendErrors={backendErrors}
                categories={categories}
            />
        </div>
    );
};

export default EnterpriseAndCoupons;

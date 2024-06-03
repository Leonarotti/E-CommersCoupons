import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponService from '../../services/CouponService';
import categoryService from '../../services/CategoryService'; // Importar el servicio de categorías
import CouponModal from '../couponModal/CouponModal';
import './CouponManagement.css';

const CouponManagement = () => {
    const { enterpriseId } = useParams();
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
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

    const loadCoupons = useCallback(() => {
        couponService.getCouponsByEnterpriseId(enterpriseId).then(response => {
            setCoupons(response.data);
        }).catch(error => {
            console.error("Error fetching coupons:", error);
        });
    }, [enterpriseId]);

    const loadCategories = useCallback(() => {
        categoryService.getCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        });
    }, []);

    useEffect(() => {
        loadCoupons();
        loadCategories();
    }, [loadCoupons, loadCategories]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCoupon({ ...newCoupon, [name]: type === 'checkbox' ? checked : value });
    };

    const handleCreateOrUpdate = (e) => {
        e.preventDefault();
        setBackendErrors({});
        if (editMode) {
            couponService.updateCoupon(newCoupon).then(response => {
                if (response.status === 200) {
                    loadCoupons();
                    closeModal();
                } else {
                    setBackendErrors(response);
                }
            }).catch(error => {
                console.error("Error updating coupon:", error);
                setBackendErrors(error.response.data); // Maneja el error y lo muestra en el componente
            });
        } else {
            couponService.createCoupon(newCoupon).then(response => {
                if (response.status === 201) {
                    loadCoupons();
                    closeModal();
                } else {
                    setBackendErrors(response);
                    console.error("Error creating coupon:", response);
                }
            }).catch(error => {
                console.error("Error creating coupon:", error);
                setBackendErrors(error.response.data); // Maneja el error y lo muestra en el componente
            });
        }
    };

    const handleEdit = (coupon) => {
        setNewCoupon(coupon);
        setEditMode(true);
        openModal();
    };

    const handleDelete = (id) => {
        couponService.deleteCoupon(id).then(() => {
            loadCoupons();
        }).catch(error => {
            console.error("Error deleting coupon:", error);
        });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
        setEditMode(false);
        setBackendErrors({});
    };

    const goBack = () => {
        navigate(`/enterprises/${enterpriseId}`);
    };

    return (
        <div className="coupon-management">
            <button onClick={goBack}>Back to Enterprise</button>
            <h1>Coupon Management</h1>
            <button onClick={openModal}>Create Coupon</button>

            <h2>List of Coupons</h2>
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
                        <th>Enabled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id_coupon}>
                            <td>{coupon.name}</td>
                            <td>{coupon.id_category}</td>
                            <td>{coupon.location}</td>
                            <td>{coupon.regular_price}</td>
                            <td>{coupon.percentage}</td>
                            <td>{coupon.start_date}</td>
                            <td>{coupon.end_date}</td>
                            <td>{coupon.is_enabled ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(coupon)}>Edit</button>
                                <button onClick={() => handleDelete(coupon.id_coupon)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CouponModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                coupon={newCoupon}
                handleChange={handleChange}
                handleSubmit={handleCreateOrUpdate}
                editMode={editMode}
                backendErrors={backendErrors} // Pasar los errores del backend al modal
                categories={categories} // Pasar las categorías al modal
            />
        </div>
    );
};

export default CouponManagement;

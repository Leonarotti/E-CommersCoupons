import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponService from '../../services/CouponService';
import CouponModal from '../couponModal/CouponModal';
import './CouponManagement.css';

const CouponManagement = () => {
    const { enterpriseId } = useParams();
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        title: '',
        description: '',
        discount: '',
        expiration_date: '',
        enterprise_id: enterpriseId
    });
    const [backendErrors, setBackendErrors] = useState({});

    const loadCoupons = useCallback(() => {
        couponService.getCouponsByEnterpriseId(enterpriseId).then(response => {
            setCoupons(response.data);
        }).catch(error => {
            console.error("Error fetching coupons:", error);
        });
    }, [enterpriseId]);

    useEffect(() => {
        loadCoupons();
    }, [loadCoupons]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon({ ...newCoupon, [name]: value });
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
                setBackendErrors(error); // Maneja el error y lo muestra en el componente
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
                setBackendErrors(error); // Maneja el error y lo muestra en el componente
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
            title: '',
            description: '',
            discount: '',
            expiration_date: '',
            enterprise_id: enterpriseId
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Discount</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(coupon => (
                        <tr key={coupon.id_coupon}>
                            <td>{coupon.title}</td>
                            <td>{coupon.description}</td>
                            <td>{coupon.discount}</td>
                            <td>{coupon.expiration_date}</td>
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
            />
        </div>
    );
};

export default CouponManagement;

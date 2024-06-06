import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponService from '../../services/CouponService';
import promotionService from '../../services/PromotionService';
import PromotionModal from '../promotionModal/PromotionModal';
import './CouponAndPromotions.css';

const CouponAndPromotions = () => {
    const { enterpriseId, couponId } = useParams();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newPromotion, setNewPromotion] = useState({
        id_coupon: couponId,
        percentage: '',
        start_date: '',
        end_date: '',
        is_enabled: true
    });
    const [backendErrors, setBackendErrors] = useState({});

    useEffect(() => {
        couponService.getCouponById(couponId).then(response => {
            const couponData = response.data;
            couponData.is_enabled = Boolean(Number(couponData.is_enabled)); // Convertir a booleano
            setCoupon(couponData);
        }).catch(error => {
            console.error("Error fetching coupon:", error);
        });
    }, [couponId]);

    const loadPromotions = useCallback(() => {
        promotionService.getPromotionsByCouponId(couponId).then(response => {
            const promotionsWithBooleans = response.data.map(promotion => ({
                ...promotion,
                is_enabled: Boolean(Number(promotion.is_enabled)) // Convertir a booleano
            }));
            setPromotions(promotionsWithBooleans);
        }).catch(error => {
            console.error("Error fetching promotions:", error);
        });
    }, [couponId]);

    useEffect(() => {
        loadPromotions();
    }, [loadPromotions]);

    const handleCouponChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCoupon({ ...coupon, [name]: type === 'checkbox' ? checked : value });
    };

    const handlePromotionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPromotion({ ...newPromotion, [name]: type === 'checkbox' ? checked : value });
    };

    const handleUpdateCoupon = (e) => {
        e.preventDefault();
        couponService.updateCoupon(coupon)
            .then(response => {
                console.log("Coupon updated successfully:", response.data);
                setEditMode(false);
            })
            .catch(error => {
                console.error("Error updating coupon:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleOpenModal = () => {
        setEditMode(false);
        setNewPromotion({
            id_coupon: couponId,
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

    const handleCreatePromotion = (e) => {
        e.preventDefault();
        promotionService.createPromotion(newPromotion)
            .then(response => {
                console.log("Promotion created successfully:", response.data);
                loadPromotions();
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error creating promotion:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleEditPromotion = (promotion) => {
        setEditMode(true);
        setNewPromotion({ ...promotion });
        setBackendErrors({});
        setModalIsOpen(true);
    };

    const handleUpdatePromotion = (e) => {
        e.preventDefault();
        promotionService.updatePromotion(newPromotion)
            .then(response => {
                console.log("Promotion updated successfully:", response.data);
                loadPromotions();
                handleCloseModal();
            })
            .catch(error => {
                console.error("Error updating promotion:", error);
                setBackendErrors(error.response.data || {});
            });
    };

    const handleEnableToggle = (id, isEnabled) => {
        promotionService.setPromotionEnabled(id, isEnabled).then(() => {
            loadPromotions();
        }).catch(error => {
            console.error("Error toggling promotion enable status:", error);
        });
    };

    const goBack = () => {
        navigate(`/enterprises/${enterpriseId}/coupons/`);
    };

    if (!coupon) return <div>Loading...</div>;

    return (
        <div className="coupon-and-promotions">
            <button onClick={goBack}>Back to Coupons</button>
            <h1>{editMode ? 'Edit Coupon' : 'Coupon Details'}</h1>
            <form onSubmit={handleUpdateCoupon}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={coupon.name}
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={coupon.location}
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.location && <span className="error">{backendErrors.location}</span>}

                <label>Regular price:</label>
                <input
                    type="text"
                    name="regular_price"
                    value={coupon.regular_price}
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}

                <label>Percentage:</label>
                <input
                    type="text"
                    name="percentage"
                    value={coupon.percentage}
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}

                <label>Start date:</label>
                <input 
                    type="date" 
                    name="start_date" 
                    value={coupon.start_date} 
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}

                <label>End date:</label>
                <input 
                    type="date" 
                    name="end_date" 
                    value={coupon.end_date} 
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}

                <label>
                    <input
                        type="checkbox"
                        name="is_enabled"
                        checked={coupon.is_enabled}
                        onChange={(e) => handleCouponChange({ target: { name: 'is_enabled', value: e.target.checked } })}
                        disabled={!editMode}
                    />
                    Enabled
                </label>

                {editMode && <button type="submit">Update</button>}
                {!editMode && <button type="button" onClick={() => setEditMode(true)}>Edit</button>}
            </form>

            <h2>Promotions</h2>
            <button onClick={handleOpenModal}>Create Promotion</button>

            <table>
                <thead>
                    <tr>
                        <th>Percentage</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map(promotion => (
                        <tr key={promotion.id_promotion}>
                            <td>{promotion.percentage}%</td>
                            <td>{promotion.start_date}</td>
                            <td>{promotion.end_date}</td>
                            <td>
                                <button onClick={() => handleEnableToggle(promotion.id_promotion, !promotion.is_enabled)}>
                                    {promotion.is_enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button onClick={() => handleEditPromotion(promotion)} className='edit'>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PromotionModal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                promotion={newPromotion}
                handlePromotionChange={handlePromotionChange}
                handleSubmit={editMode ? handleUpdatePromotion : handleCreatePromotion}
                editMode={editMode}
                backendErrors={backendErrors}
            />
        </div>
    );
};

export default CouponAndPromotions;

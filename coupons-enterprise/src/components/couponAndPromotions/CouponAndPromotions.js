import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponService from '../../services/CouponService';
import categoryService from '../../services/CategoryService';
import promotionService from '../../services/PromotionService';
import PromotionModal from '../promotionModal/PromotionModal';
import './CouponAndPromotions.css';

const CouponAndPromotions = () => {
    const { enterpriseId, couponId } = useParams();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState(null);
    const [categories, setCategories] = useState([]);
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
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        couponService.getCouponById(couponId).then(response => {
            const couponData = response.data;
            couponData.is_enabled = Boolean(Number(couponData.is_enabled)); // Convertir a booleano
            setCoupon(couponData);
            setImagePreview(couponData.img || '');
        }).catch(error => {
            console.error("Error fetching coupon:", error);
        });
    }, [couponId]);

    const loadCategories = useCallback(() => {
        categoryService.getEnabledCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

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
        loadCategories();
    }, [loadPromotions, loadCategories]);

    const handleCouponChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCoupon({ ...coupon, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'PresetCoupons');

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/dog4dmw2v/image/upload`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                const imageUrl = data.secure_url; // Obtener la URL de Cloudinary
                setImagePreview(imageUrl); // Guardar la URL en el estado
                setCoupon({ ...coupon, img: imageUrl }); // Actualizar el estado del cupón con la URL
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handlePromotionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPromotion({ ...newPromotion, [name]: type === 'checkbox' ? checked : value });
    };

    const isPromotionWithinCouponDates = (promotion) => {
        const couponStartDate = new Date(coupon.start_date);
        const couponEndDate = new Date(coupon.end_date);
        const promotionStartDate = new Date(promotion.start_date);
        const promotionEndDate = new Date(promotion.end_date);

        return (
            promotionStartDate >= couponStartDate &&
            promotionEndDate <= couponEndDate
        );
    };

    const existsActivePromotion = () => {
        return promotions.some(promotion => promotion.is_enabled);
    };

    const validatePromotion = (promotion) => {
        return isPromotionWithinCouponDates(promotion) && (!existsActivePromotion() || (editMode && promotion.is_enabled));
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
        if (existsActivePromotion()) {
            setBackendErrors({
                ...backendErrors,
                general: 'There is already an active promotion. Please disable it before creating a new one.'
            });
            return;
        }

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
        if (!validatePromotion(newPromotion)) {
            setBackendErrors({
                ...backendErrors,
                general: 'Promotion dates must be within the coupon dates and no other active promotion should exist.'
            });
            return;
        }

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
        if (!validatePromotion(newPromotion)) {
            setBackendErrors({
                ...backendErrors,
                general: 'Promotion dates must be within the coupon dates and no other active promotion should exist.'
            });
            return;
        }

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
        if (isEnabled && existsActivePromotion()) {
            setBackendErrors({
                ...backendErrors,
                general: 'There is already an active promotion. Please disable it before enabling another one.'
            });
            return;
        }

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
            <button className='back-btn' onClick={goBack}>Back to Coupons</button>
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

                <label>Category:</label>
                <select name="id_category" value={coupon.id_category} onChange={handleCouponChange} disabled={!editMode} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id_category} value={category.id_category}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {backendErrors.id_category && <span className="error">{backendErrors.id_category}</span>}

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
                    type="number"
                    name="regular_price"
                    value={coupon.regular_price}
                    onChange={handleCouponChange}
                    disabled={!editMode}
                    required
                />
                {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}

                <label>Percentage:</label>
                <input
                    type="number"
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

                {/* <label>
                    <input
                        type="checkbox"
                        name="is_enabled"
                        checked={coupon.is_enabled}
                        onChange={(e) => handleCouponChange({ target: { name: 'is_enabled', value: e.target.checked } })}
                        disabled={!editMode}
                    />
                    Enabled
                </label> */}

                <label>Image Upload:</label>
                <input type="file" name="img" accept="image/*" onChange={handleImageUpload} disabled={!editMode} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                {backendErrors.img && <span className="error">{backendErrors.img}</span>}

                {editMode && <button type="submit">Update</button>}
                {!editMode && <button type="button" onClick={() => setEditMode(true)}>Edit</button>}
            </form>

            <h2>Promotions</h2>
            <button onClick={handleOpenModal}>Create Promotion</button>
            {backendErrors.general && <div className="error">{backendErrors.general}</div>}
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
                            <td className='table-actions'>
                                {coupon.is_enabled && (
                                    <button onClick={() => handleEnableToggle(promotion.id_promotion, !promotion.is_enabled)}>
                                        {promotion.is_enabled ? 'Disable' : 'Enable'}
                                    </button>
                                )}
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
                promotions={promotions}
            />
        </div>
    );
};

export default CouponAndPromotions;

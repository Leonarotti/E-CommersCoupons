import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const CouponModal = ({ isOpen, onRequestClose, coupon, handleCouponChange, handleSubmit, editMode, backendErrors, categories }) => {
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(coupon.img || '');

    useEffect(() => {
        setImagePreview(coupon.img || '');
    }, [coupon.img]);

    const validateForm = () => {
        const errors = {};

        if (!coupon.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!coupon.id_category || !coupon.id_category.toString().trim()) {
            errors.id_category = 'Category is required';
        }

        if (!coupon.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!/^(\d+)(\.\d{1,2})?$/.test(coupon.regular_price.toString().trim())) {
            errors.regular_price = 'Invalid regular price format. Should be a number with up to two decimal places.';
        }

        if (!/^\d{1,2}$/.test(coupon.percentage.toString().trim()) || coupon.percentage < 0 || coupon.percentage > 100) {
            errors.percentage = 'Invalid percentage format. Should be a number between 0 and 100.';
        }

        if (!coupon.start_date.trim()) {
            errors.start_date = 'Start date is required';
        }

        if (!coupon.end_date.trim()) {
            errors.end_date = 'End date is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            handleCouponChange({ target: { name: 'img', value: reader.result } });
        };
        reader.readAsDataURL(file);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Coupon Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{editMode ? 'Edit Coupon' : 'Create Coupon'}</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="Name" value={coupon.name} onChange={handleCouponChange} required />
                {errors.name && <span className="error">{errors.name}</span>}
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                <select name="id_category" value={coupon.id_category} onChange={handleCouponChange} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id_category} value={category.id_category}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.id_category && <span className="error">{errors.id_category}</span>}
                {backendErrors.id_category && <span className="error">{backendErrors.id_category}</span>}

                <input type="text" name="location" placeholder="Location" value={coupon.location} onChange={handleCouponChange} required />
                {errors.location && <span className="error">{errors.location}</span>}
                {backendErrors.location && <span className="error">{backendErrors.location}</span>}

                <input type="text" name="regular_price" placeholder="Regular Price" value={coupon.regular_price} onChange={handleCouponChange} required />
                {errors.regular_price && <span className="error">{errors.regular_price}</span>}
                {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}

                <input type="text" name="percentage" placeholder="Discount Percentage" value={coupon.percentage} onChange={handleCouponChange} required />
                {errors.percentage && <span className="error">{errors.percentage}</span>}
                {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}

                <input type="date" name="start_date" placeholder="Start Date" value={coupon.start_date} onChange={handleCouponChange} required />
                {errors.start_date && <span className="error">{errors.start_date}</span>}
                {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}

                <input type="date" name="end_date" placeholder="End Date" value={coupon.end_date} onChange={handleCouponChange} required />
                {errors.end_date && <span className="error">{errors.end_date}</span>}
                {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}

                <input type="file" name="img" accept="image/*" onChange={handleImageUpload} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                {backendErrors.img && <span className="error">{backendErrors.img}</span>}

                <label>
                    <input
                        type="checkbox"
                        name="is_enabled"
                        checked={coupon.is_enabled}
                        onChange={handleCouponChange}
                    />
                    Enabled
                </label>
                {backendErrors.is_enabled && <span className="error">{backendErrors.is_enabled}</span>}

                <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default CouponModal;

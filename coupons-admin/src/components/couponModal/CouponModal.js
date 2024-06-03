import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const CouponModal = ({ isOpen, onRequestClose, coupon, handleChange, handleSubmit, editMode, backendErrors, categories }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!coupon.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!coupon.id_category.trim()) {
            errors.id_category = 'Category is required';
        }

        if (!coupon.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!/^(\d+)(\.\d{1,2})?$/.test(coupon.regular_price.trim())) {
            errors.regular_price = 'Invalid regular price format. Should be a number with up to two decimal places.';
        }

        if (!/^\d{1,2}$/.test(coupon.percentage) || coupon.percentage < 0 || coupon.percentage > 100) {
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

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Coupon Modal" className="modal" overlayClassName="overlay">
            <h2>{editMode ? 'Edit Coupon' : 'Create Coupon'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                    handleSubmit(e);
                }
            }}>
                <input type="text" name="name" placeholder="Name" value={coupon.name} onChange={handleChange} required />
                {errors.name && <span className="error">{errors.name}</span>}
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                <select name="id_category" value={coupon.id_category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id_category} value={category.id_category}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.id_category && <span className="error">{errors.id_category}</span>}
                {backendErrors.id_category && <span className="error">{backendErrors.id_category}</span>}

                <input type="text" name="location" placeholder="Location" value={coupon.location} onChange={handleChange} required />
                {errors.location && <span className="error">{errors.location}</span>}
                {backendErrors.location && <span className="error">{backendErrors.location}</span>}

                <input type="text" name="regular_price" placeholder="Regular Price" value={coupon.regular_price} onChange={handleChange} required />
                {errors.regular_price && <span className="error">{errors.regular_price}</span>}
                {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}

                <input type="text" name="percentage" placeholder="Discount Percentage" value={coupon.percentage} onChange={handleChange} required />
                {errors.percentage && <span className="error">{errors.percentage}</span>}
                {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}

                <input type="date" name="start_date" value={coupon.start_date} onChange={handleChange} required />
                {errors.start_date && <span className="error">{errors.start_date}</span>}
                {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}

                <input type="date" name="end_date" value={coupon.end_date} onChange={handleChange} required />
                {errors.end_date && <span className="error">{errors.end_date}</span>}
                {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}

                <label>
                    <input type="checkbox" name="is_enabled" checked={coupon.is_enabled} onChange={handleChange} />
                    Is Enabled
                </label>

                <div className="modal-buttons">
                    <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default CouponModal;

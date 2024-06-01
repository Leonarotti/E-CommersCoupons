import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const CouponModal = ({ isOpen, onRequestClose, coupon, handleChange, handleSubmit, editMode, backendErrors }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!coupon.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!coupon.description.trim()) {
            errors.description = 'Description is required';
        }

        if (!/^(\d+)(\.\d{1,2})?$/.test(coupon.discount.trim())) {
            errors.discount = 'Invalid discount format. Should be a number with up to two decimal places.';
        }

        if (!coupon.expiration_date.trim()) {
            errors.expiration_date = 'Expiration date is required';
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
                <input type="text" name="title" placeholder="Title" value={coupon.title} onChange={handleChange} required />
                {errors.title && <span className="error">{errors.title}</span>}
                {backendErrors.title && <span className="error">{backendErrors.title}</span>}

                <input type="text" name="description" placeholder="Description" value={coupon.description} onChange={handleChange} required />
                {errors.description && <span className="error">{errors.description}</span>}
                {backendErrors.description && <span className="error">{backendErrors.description}</span>}

                <input type="text" name="discount" placeholder="Discount" value={coupon.discount} onChange={handleChange} required />
                {errors.discount && <span className="error">{errors.discount}</span>}
                {backendErrors.discount && <span className="error">{backendErrors.discount}</span>}

                <input type="date" name="expiration_date" placeholder="Expiration Date" value={coupon.expiration_date} onChange={handleChange} required />
                {errors.expiration_date && <span className="error">{errors.expiration_date}</span>}
                {backendErrors.expiration_date && <span className="error">{backendErrors.expiration_date}</span>}

                <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default CouponModal;

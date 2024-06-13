import React, { useState } from 'react';
import Modal from 'react-modal';
import './PromotionModal.css';

const PromotionModal = ({ isOpen, onRequestClose, promotion, handlePromotionChange, handleSubmit, editMode, backendErrors, promotions }) => {
    const [errors, setErrors] = useState({});

    const existsActivePromotion = () => {
        return promotions.some(promotion => promotion.is_enabled);
    };

    const validateForm = () => {
        const errors = {};

        if (!/^(\d{1,2}|100)$/.test(promotion.percentage.toString().trim()) || promotion.percentage < 0 || promotion.percentage > 100) {
            errors.percentage = 'Invalid percentage format. Should be a number between 0 and 100.';
        }

        if (!promotion.start_date.trim()) {
            errors.start_date = 'Start date is required';
        }

        if (!promotion.end_date.trim()) {
            errors.end_date = 'End date is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (promotion.is_enabled && existsActivePromotion() && !editMode) {
            setErrors({ ...errors, general: 'There is already an active promotion. Please disable it before creating or enabling a new one.' });
            return;
        }
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Promotion Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{editMode ? 'Edit Promotion' : 'Create Promotion'}</h2>
            <form onSubmit={handleFormSubmit}>
                {backendErrors.general && <div className="error">{backendErrors.general}</div>}
                {errors.general && <div className="error">{errors.general}</div>}
                <div className="form-group">
                    <label htmlFor="percentage">Percentage:</label>
                    <input
                        type="number"
                        id="percentage"
                        name="percentage"
                        value={promotion.percentage}
                        onChange={handlePromotionChange}
                        required
                    />
                    {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}
                    {errors.percentage && <span className="error">{errors.percentage}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="start_date">Start Date:</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={promotion.start_date}
                        onChange={handlePromotionChange}
                        required
                    />
                    {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}
                    {errors.start_date && <span className="error">{errors.start_date}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="end_date">End Date:</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={promotion.end_date}
                        onChange={handlePromotionChange}
                        required
                    />
                    {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}
                    {errors.end_date && <span className="error">{errors.end_date}</span>}
                </div>

                {/* <div className="form-group">
                    <label htmlFor="is_enabled">Enabled:</label>
                    <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        checked={promotion.is_enabled}
                        onChange={(e) => handlePromotionChange({ target: { name: 'is_enabled', value: e.target.checked } })}
                    />
                </div> */}

                <button type="submit">{editMode ? 'Update Promotion' : 'Create Promotion'}</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default PromotionModal;

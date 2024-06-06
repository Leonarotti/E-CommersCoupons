import React, { useState } from 'react';
import Modal from 'react-modal';
import './CategoryModal.css';

const CategoryModal = ({ isOpen, onRequestClose, category, handleChange, handleSubmit, editMode, backendErrors }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!category.name.trim()) {
            errors.name = 'Name is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose} 
        contentLabel="Category Modal" 
        className="modalCategory" 
        overlayClassName="overlay"
        >
            <h2>{editMode ? 'Edit Category' : 'Create Category'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                    handleSubmit(e);
                }
            }}>
                <label>Name</label>
                <input type="text" 
                name="name" 
                placeholder="Name" 
                value={category.name} 
                onChange={handleChange} 
                required
                 />
                {errors.name && <span className="error">{errors.name}</span>}
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                {/* <label>
                    <input type="checkbox" name="is_enabled" checked={category.is_enabled} onChange={(e) => handleChange({ target: { name: 'is_enabled', value: e.target.checked } })} />
                    Enabled
                </label> */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">{editMode ? 'Update' : 'Create'}</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};
export default CategoryModal;

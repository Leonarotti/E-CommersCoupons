import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CouponModal.css';

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

        // if (coupon.start_date && coupon.end_date && new Date(coupon.start_date) > new Date(coupon.end_date)) {
        //     errors.end_date = 'End date must be after the start date';
        // }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setImagePreview(reader.result);
    //         handleCouponChange({ target: { name: 'img', value: reader.result } });
    //     };
    //     reader.readAsDataURL(file);
    // };

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
                handleCouponChange({ target: { name: 'img', value: imageUrl } }); // Actualizar el estado del cupón con la URL
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Coupon Modal"
            className="modalCoupon"
            overlayClassName="overlay"
        >
            <h2>{editMode ? 'Edit Coupon' : 'Create Coupon'}</h2>
            <form onSubmit={handleFormSubmit}>
            <label>Name:</label>
                <input type="text" name="name" placeholder="Name" value={coupon.name} onChange={handleCouponChange} required />
                {errors.name && <span className="error">{errors.name}</span>}
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}

                <label>Category:</label>
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

                <label>Location:</label>
                <input type="text" name="location" placeholder="Location" value={coupon.location} onChange={handleCouponChange} required />
                {errors.location && <span className="error">{errors.location}</span>}
                {backendErrors.location && <span className="error">{backendErrors.location}</span>}

                <label>Regular Price:</label>
                <input type="text" name="regular_price" placeholder="Regular Price" value={coupon.regular_price} onChange={handleCouponChange} required />
                {errors.regular_price && <span className="error">{errors.regular_price}</span>}
                {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}
               
                <label>Discount Percentage:</label>
                <input type="text" name="percentage" placeholder="Discount Percentage" value={coupon.percentage} onChange={handleCouponChange} required />
                {errors.percentage && <span className="error">{errors.percentage}</span>}
                {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}

                <label>Start Date:</label>
                <input type="date" name="start_date" placeholder="Start Date" value={coupon.start_date} onChange={handleCouponChange} required />
                {errors.start_date && <span className="error">{errors.start_date}</span>}
                {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}
               
                <label>End Date:</label>
                <input type="date" name="end_date" placeholder="End Date" value={coupon.end_date} onChange={handleCouponChange}  min={coupon.start_date} required/>
                {errors.end_date && <span className="error">{errors.end_date}</span>}
                {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}
                
                <strong>
                    <input
                        type="checkbox"
                        name="is_enabled"
                        checked={coupon.is_enabled}
                        onChange={handleCouponChange}
                    />
                    Enabled
                </strong>
                {backendErrors.is_enabled && <span className="error">{backendErrors.is_enabled}</span>}

                <label>Image Upload:</label>
                <input type="file" name="img" accept="image/*" onChange={handleImageUpload} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                {backendErrors.img && <span className="error">{backendErrors.img}</span>}

                <div className="button-group">
                    <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={onRequestClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default CouponModal;

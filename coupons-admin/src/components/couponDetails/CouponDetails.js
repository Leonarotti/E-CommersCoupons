import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponService from '../../services/CouponService';
import categoryService from '../../services/CategoryService';
import './CouponDetails.css';

const CouponDetails = () => {
    const { couponId } = useParams();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        couponService.getCouponById(couponId).then(response => {
            setCoupon(response.data);
            setImagePreview(response.data.img);
        }).catch(error => {
            console.error("Error fetching coupon details:", error);
        });

        categoryService.getCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        });
    }, [couponId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCoupon({ ...coupon, [name]: type === 'checkbox' ? checked : value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setBackendErrors({});
        couponService.updateCoupon(coupon).then(response => {
            if (response.status === 200) {
                setEditMode(false);
            } else {
                setBackendErrors(response);
            }
        }).catch(error => {
            console.error("Error updating coupon:", error);
            setBackendErrors(error.response.data);
        });
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
                setImagePreview(data.secure_url);
                handleChange({ target: { name: 'img', value: data.secure_url } });
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    if (!coupon) return <div>Loading...</div>;

    return (
        <div className="coupon-details">
            <button onClick={goBack}>Back</button>
            <h1>{editMode ? 'Edit Coupon' : 'Coupon Details'}</h1>
            <form onSubmit={handleUpdate}>
                <div className="coupon-info">
                    <label>
                        <strong>Name:</strong>
                        <input
                            type="text"
                            name="name"
                            value={coupon.name}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.name && <span className="error">{backendErrors.name}</span>}
                    
                    <label>
                        <strong>Category:</strong>
                        <select
                            name="id_category"
                            value={coupon.id_category}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id_category} value={category.id_category}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {backendErrors.id_category && <span className="error">{backendErrors.id_category}</span>}
                    
                    <label>
                        <strong>Location:</strong>
                        <input
                            type="text"
                            name="location"
                            value={coupon.location}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.location && <span className="error">{backendErrors.location}</span>}
                    
                    <label>
                        <strong>Regular Price:</strong>
                        <input
                            type="text"
                            name="regular_price"
                            value={coupon.regular_price}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.regular_price && <span className="error">{backendErrors.regular_price}</span>}
                    
                    <label>
                        <strong>Discount Percentage:</strong>
                        <input
                            type="text"
                            name="percentage"
                            value={coupon.percentage}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.percentage && <span className="error">{backendErrors.percentage}</span>}
                    
                    <label>
                        <strong>Start Date:</strong>
                        <input
                            type="date"
                            name="start_date"
                            value={coupon.start_date}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.start_date && <span className="error">{backendErrors.start_date}</span>}
                    
                    <label>
                        <strong>End Date:</strong>
                        <input
                            type="date"
                            name="end_date"
                            value={coupon.end_date}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </label>
                    {backendErrors.end_date && <span className="error">{backendErrors.end_date}</span>}
                    
                    <label>
                        <strong>Enabled:</strong>
                        <input
                            type="checkbox"
                            name="is_enabled"
                            checked={coupon.is_enabled}
                            onChange={(e) => handleChange({ target: { name: 'is_enabled', value: e.target.checked } })}
                            disabled={!editMode}
                        />
                    </label>

                    <div>
                        <label htmlFor="imgUpload">Upload Image</label>
                        <input type="file" id="imgUpload" onChange={handleImageUpload} disabled={!editMode} />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                    </div>
             

                </div>
                
                {editMode && <button type="submit">Update</button>}
                {!editMode && <button type="button" onClick={() => setEditMode(true)}>Edit</button>}
            </form>
        </div>
    );
};

export default CouponDetails;

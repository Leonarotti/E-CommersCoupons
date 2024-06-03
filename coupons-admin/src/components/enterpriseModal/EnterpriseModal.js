import React, { useState } from 'react';
import Modal from 'react-modal';
import './EnterpriseModal.css';

const EnterpriseModal = ({ isOpen, onRequestClose, enterprise, handleChange, handleSubmit, editMode, backendErrors }) => {
    const [errors, setErrors] = useState({});

    const formatLicense = (value) => {
        value = value.replace(/-/g, '');
        return value.replace(/^(\d{2})(\d{4}|\d{3})(\d{4}|\d{6})$/, '$1-$2-$3');
    };

    const formatPhone = (value) => {
        return value.replace(/-/g, '').replace(/(\d{4})(\d{4})/, '$1-$2');
    };

    const handleChangeWithFormat = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'license') {
            formattedValue = formatLicense(value);
        } else if (name === 'phone') {
            formattedValue = formatPhone(value);
        }

        handleChange({ target: { name, value: formattedValue } });
    };

    const validateForm = () => {
        const errors = {};

        if (!enterprise.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!enterprise.address.trim()) {
            errors.address = 'Address is required';
        }

        if (!/^(\d{2}-\d{4}-\d{4}|\d{2}-\d{3}-\d{6})$/.test(enterprise.license.trim())) {
            errors.license = 'Formato de número de licencia inválido. Debe ser "00-0000-0000" para cédulas físicas o "00-000-000000" para cédulas jurídicas';
        }

        if (!/^\d{4}-\d{4}$/.test(enterprise.phone.trim())) {
            errors.phone = 'Formato de número de teléfono inválido. Debe ser "0000-0000".';
        }

        if (!enterprise.email.trim() || !/\S+@\S+\.\S+/.test(enterprise.email.trim())) {
            errors.email = 'Correo electrónico inválido';
        }

        if (!editMode && !enterprise.password.trim()) {
            errors.password = 'Password is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Enterprise Modal" className="modal" overlayClassName="overlay">
            <h2>{editMode ? 'Edit Enterprise' : 'Create Enterprise'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                    handleSubmit(e);
                }
            }}>
                {/* Input para el nombre */}
                <input type="text" name="name" placeholder="Name" value={enterprise.name} onChange={handleChange} required />
                {errors.name && <span className="error">{errors.name}</span>}
                {backendErrors.name && <span className="error">{backendErrors.name}</span>}
                {/* Input para la dirección */}
                <input type="text" name="address" placeholder="Address" value={enterprise.address} onChange={handleChange} required />
                {errors.address && <span className="error">{errors.address}</span>}
                {backendErrors.address && <span className="error">{backendErrors.address}</span>}
                {/* Input para la licencia */}
                <input type="text" name="license" placeholder="License" value={enterprise.license} onChange={handleChangeWithFormat} required />
                {errors.license && <span className="error">{errors.license}</span>}
                {backendErrors.license && <span className="error">{backendErrors.license}</span>}
                {/* Mostrar errores del backend para la licencia */}
                {Object.keys(backendErrors).map((key, index) => (
                    <span className="error" key={index}>{backendErrors[key]}</span>
                ))}
                {/* Input para la fecha de creación */}
                <input type="date" name="date_created" placeholder="Date Created" value={enterprise.date_created} onChange={handleChange} required />
                {errors.date_created && <span className="error">{errors.date_created}</span>}
                {backendErrors.date_created && <span className="error">{backendErrors.date_created}</span>}
                {/* Input para el teléfono */}
                <input type="text" name="phone" placeholder="Phone" value={enterprise.phone} onChange={handleChangeWithFormat} required />
                {errors.phone && <span className="error">{errors.phone}</span>}
                {backendErrors.phone && <span className="error">{backendErrors.phone}</span>}
                {/* Input para el email */}
                <input type="email" name="email" placeholder="Email" value={enterprise.email} onChange={handleChange} required />
                {errors.email && <span className="error">{errors.email}</span>}
                {backendErrors.email && <span className="error">{backendErrors.email}</span>}
                {/* Input para la contraseña */}
                {!editMode && <input type="password" name="password" placeholder="Password" value={enterprise.password} onChange={handleChange} required />}
                {errors.password && <span className="error">{errors.password}</span>}
                {backendErrors.password && <span className="error">{backendErrors.password}</span>}

                <label>
                    <input type="checkbox" name="is_enabled" checked={enterprise.is_enabled} onChange={(e) => handleChange({ target: { name: 'is_enabled', value: e.target.checked } })} />
                    Enabled
                </label>

                <button type="submit">{editMode ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default EnterpriseModal;

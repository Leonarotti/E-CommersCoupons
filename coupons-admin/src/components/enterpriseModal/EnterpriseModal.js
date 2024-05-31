import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

const EnterpriseModal = ({ isOpen, onRequestClose, enterprise, handleChange, handleSubmit, editMode }) => {
    const [errors, setErrors] = useState({});

    const formatLicense = (value) => {
        // Eliminar guiones existentes
        value = value.replace(/-/g, '');
    
        // Agregar guiones después del segundo y del quinto dígito
        return value.replace(/^(\d{2})(\d{4}|\d{3})(\d{4}|\d{6})$/, '$1-$2-$3');
    };
    

    const formatPhone = (value) => {
        // Agregar guión después del cuarto dígito
        return value.replace(/-/g, '').replace(/(\d{4})(\d{4})/, '$1-$2');
    };

    const handleChangeWithFormat = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Aplicar formato según el nombre del campo
        if (name === 'license') {
            formattedValue = formatLicense(value);
        } else if (name === 'phone') {
            formattedValue = formatPhone(value);
        }

        // Actualizar el valor con formato
        handleChange({ target: { name, value: formattedValue } });
    };

    const validateForm = () => {
        const errors = {};

        // Validación del nombre
        if (!enterprise.name.trim()) {
            errors.name = 'Name is required';
        }

        // Validación de la dirección
        if (!enterprise.address.trim()) {
            errors.address = 'Address is required';
        }

        // Validación de la licencia
        if (!/^(\d{2}-\d{4}-\d{4}|\d{2}-\d{3}-\d{6})$/.test(enterprise.license.trim())) {
            errors.license = 'Invalid license format';
        }

        // Validación del teléfono
        if (!/^\d{4}-\d{4}$/.test(enterprise.phone.trim())) {
            errors.phone = 'Invalid phone number format';
        }

        // Validación del correo electrónico
        if (!enterprise.email.trim() || !/\S+@\S+\.\S+/.test(enterprise.email.trim())) {
            errors.email = 'Invalid email address';
        }

        // Validación de la contraseña (solo si es un nuevo registro)
        if (!editMode && !enterprise.password.trim()) {
            errors.password = 'Password is required';
        }

        setErrors(errors);

        // Devuelve verdadero si no hay errores
        return Object.keys(errors).length === 0;
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Enterprise Modal" className="modal" overlayClassName="overlay">
            <h2>{editMode ? 'Edit Enterprise' : 'Create Enterprise'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                    handleSubmit();
                }
            }}>
                <input type="text" name="name" placeholder="Name" value={enterprise.name} onChange={handleChange} required />
                {errors.name && <span className="error">{errors.name}</span>}
                <input type="text" name="address" placeholder="Address" value={enterprise.address} onChange={handleChange} required />
                {errors.address && <span className="error">{errors.address}</span>}
                <input type="text" name="license" placeholder="License" value={enterprise.license} onChange={handleChangeWithFormat} required />
                {errors.license && <span className="error">{errors.license}</span>}
                <input type="date" name="date_created" placeholder="Date Created" value={enterprise.date_created} onChange={handleChange} required />
                {errors.date_created && <span className="error">{errors.date_created}</span>}
                <input type="text" name="phone" placeholder="Phone" value={enterprise.phone} onChange={handleChangeWithFormat} required />
                {errors.phone && <span className="error">{errors.phone}</span>}
                <input type="email" name="email" placeholder="Email" value={enterprise.email} onChange={handleChange} required />
                {errors.email && <span className="error">{errors.email}</span>}
                {!editMode && <input type="password" name="password" placeholder="Password" value={enterprise.password} onChange={handleChange} required />}
                {errors.password && <span className="error">{errors.password}</span>}
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

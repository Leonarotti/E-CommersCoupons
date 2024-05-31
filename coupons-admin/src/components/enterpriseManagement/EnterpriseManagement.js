import React, { useState, useEffect } from 'react';
import enterpriseService from '../../services/EnterpriseService';
import EnterpriseModal from '../enterpriseModal/EnterpriseModal';
import './EnterpriseManagement.css';

const EnterpriseManagement = () => {
    const [enterprises, setEnterprises] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newEnterprise, setNewEnterprise] = useState({
        name: '',
        address: '',
        license: '',
        date_created: '',
        phone: '',
        email: '',
        password: '',
        is_enabled: true
    });

    useEffect(() => {
        loadEnterprises();
    }, []);

    const loadEnterprises = () => {
        enterpriseService.getEnterprises().then(response => {
            setEnterprises(response.data);
        }).catch(error => {
            console.error("Error fetching enterprises:", error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEnterprise({ ...newEnterprise, [name]: value });
    };

    const handleCreateOrUpdate = (e) => {
        e.preventDefault();
        if (editMode) {
            enterpriseService.updateEnterprise(newEnterprise).then(() => {
                loadEnterprises();
                closeModal();
            }).catch(error => {
                console.error("Error updating enterprise:", error);
            });
        } else {
            enterpriseService.createEnterprise(newEnterprise).then(() => {
                loadEnterprises();
                closeModal();
            }).catch(error => {
                console.error("Error creating enterprise:", error);
            });
        }
    };

    const handleEdit = (enterprise) => {
        setNewEnterprise(enterprise);
        setEditMode(true);
        openModal();
    };

    const handleEnableToggle = (id, isEnabled) => {
        enterpriseService.setEnterpriseEnabled(id, isEnabled).then(() => {
            loadEnterprises();
        }).catch(error => {
            console.error("Error toggling enterprise enable status:", error);
        });
    };

    const handleDelete = (id) => {
        enterpriseService.deleteEnterprise(id).then(() => {
            loadEnterprises();
        }).catch(error => {
            console.error("Error deleting enterprise:", error);
        });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewEnterprise({
            name: '',
            address: '',
            license: '',
            date_created: '',
            phone: '',
            email: '',
            password: '',
            is_enabled: true
        });
        setEditMode(false);
    };

    return (
        <div className="enterprise-management">
            <h1>Enterprise Management</h1>
            <button onClick={openModal}>Create Enterprise</button>

            <h2>List of Enterprises</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>License</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enterprises.map(enterprise => (
                        <tr key={enterprise.id_enterprise}>
                            <td>{enterprise.name}</td>
                            <td>{enterprise.license}</td>
                            <td>{enterprise.phone}</td>
                            <td>{enterprise.email}</td>
                            <td>
                                <button onClick={() => handleEnableToggle(enterprise.id_enterprise, !enterprise.is_enabled)}>
                                    {enterprise.is_enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button onClick={() => handleEdit(enterprise)}>Edit</button>
                                <button onClick={() => handleDelete(enterprise.id_enterprise)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EnterpriseModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                enterprise={newEnterprise}
                handleChange={handleChange}
                handleSubmit={handleCreateOrUpdate}
                editMode={editMode}
            />
        </div>
    );
};

export default EnterpriseManagement;

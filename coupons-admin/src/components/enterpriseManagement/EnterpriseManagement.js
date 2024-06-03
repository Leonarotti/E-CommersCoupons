
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [backendErrors, setBackendErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        loadEnterprises();
    }, []);

    const loadEnterprises = () => {
        enterpriseService.getEnterprises()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setEnterprises(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setEnterprises([]);
                }
            })
            .catch(error => {
                console.error("Error fetching enterprises:", error);
                setEnterprises([]);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEnterprise({ ...newEnterprise, [name]: value });
    };

    const handleCreateOrUpdate = (e) => {
        e.preventDefault();
        setBackendErrors({});
        if (editMode) {
            enterpriseService.updateEnterprise(newEnterprise).then(response => {
                if (response.status === 200) {
                    loadEnterprises();
                    closeModal();
                } else {
                    setBackendErrors(response);
                }
            }).catch(error => {
                console.error("Error updating enterprise:", error);
                setBackendErrors(error); // Maneja el error y lo muestra en el componente
            });
        } else {
            enterpriseService.createEnterprise(newEnterprise).then(response => {
                if (response.status === 201) {
                    loadEnterprises();
                    closeModal();
                } else {
                    setBackendErrors(response);
                    console.error("Error creating enterprise:", response);
                }
            }).catch(error => {
                console.error("Error creating enterprise:", error);
                setBackendErrors(error); // Maneja el error y lo muestra en el componente
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

    const handleManageEnterprise = (id) => {
        navigate(`/enterprises/${id}`);
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
        setBackendErrors({});
    };

    return (
        <div className="enterprise-management bg-white p-4 rounded shadow-sm">
            <h1 className="text-center mb-5">Enterprise Management</h1>
            <div className="d-flex mb-3">
                <button className= "btn btn-primary" onClick={openModal}>Create Enterprise</button>
            </div>

            {Array.isArray(enterprises) && enterprises.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-light">
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
                                    <td className="table-actions">
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleEnableToggle(enterprise.id_enterprise, !enterprise.is_enabled)}>
                                            {enterprise.is_enabled ? 'Disable' : 'Enable'}
                                        </button>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(enterprise)}>Edit</button>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleManageEnterprise(enterprise.id_enterprise)}>Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No enterprises found.</p>
            )}

            <EnterpriseModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                enterprise={newEnterprise}
                handleChange={handleChange}
                handleSubmit={handleCreateOrUpdate}
                editMode={editMode}
                backendErrors={backendErrors}
            />
        </div>
    );
};

export default EnterpriseManagement;
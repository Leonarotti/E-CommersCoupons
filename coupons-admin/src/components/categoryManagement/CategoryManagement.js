import React, { useState, useEffect } from 'react';
import categoryService from '../../services/CategoryService';
import CategoryModal from '../categoryModal/CategoryModal';
import './CategoryManagement.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        is_enabled: true
    });
    const [backendErrors, setBackendErrors] = useState({});

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        categoryService.getCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.error("Error fetching categories:", error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleCreateOrUpdate = (e) => {
        e.preventDefault();
        setBackendErrors({});
        if (editMode) {
            categoryService.updateCategory(newCategory).then(response => {
                if (response.status === 200) {
                    loadCategories();
                    closeModal();
                } else {
                    setBackendErrors(response);
                }
            }).catch(error => {
                console.error("Error updating category:", error);
                setBackendErrors(error);
            });
        } else {
            categoryService.createCategory(newCategory).then(response => {
                if (response.status === 201) {
                    loadCategories();
                    closeModal();
                } else {
                    setBackendErrors(response);
                    console.error("Error creating category:", response);
                }
            }).catch(error => {
                console.error("Error creating category:", error);
                setBackendErrors(error);
            });
        }
    };

    const handleEdit = (category) => {
        setNewCategory(category);
        setEditMode(true);
        openModal();
    };

    const handleEnableToggle = (id, isEnabled) => {
        categoryService.setCategoryEnabled(id, isEnabled).then(() => {
            loadCategories();
        }).catch(error => {
            console.error("Error toggling category enable status:", error);
        });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewCategory({
            name: '',
            description: '',
            is_enabled: true
        });
        setEditMode(false);
        setBackendErrors({});
    };

    return (
        <div className="category-management">
            <h1>Category Management</h1>
            <button onClick={openModal}>Create Category</button>

            <h2>List of Categories</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id_category}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => handleEnableToggle(category.id_category, !category.is_enabled)}>
                                    {category.is_enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button className='btn btn-warning btn-sm' onClick={() => handleEdit(category)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CategoryModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                category={newCategory}
                handleChange={handleChange}
                handleSubmit={handleCreateOrUpdate}
                editMode={editMode}
                backendErrors={backendErrors}
            />
        </div>
    );
};

export default CategoryManagement;

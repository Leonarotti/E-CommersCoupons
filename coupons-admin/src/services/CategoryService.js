import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/CategoryController.php';

const getCategories = () => {
    return axios.get(API_URL);
};

const getCategoryById = (id) => {
    return axios.get(`${API_URL}?id=${id}`);
};

const createCategory = (category) => {
    return axios.post(API_URL, category)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data)); // Devuelve el error completo
};

const updateCategory = (category) => {
    return axios.put(API_URL, category)
        .then(response => response)
        .catch(error => error.response);
};

const deleteCategory = (id) => {
    return axios.delete(API_URL, {
        data: { id_category: id }
    })
    .then(response => response)
    .catch(error => Promise.reject(error.response.data));
};

const categoryService = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryService;

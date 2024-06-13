import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/category/';

const getCategories = () => {
    return axios.get(API_URL+"getCategories.php");
};

const getCategoryById = (id) => {
    return axios.get(`${API_URL+"getCategoryById.php"}?id=${id}`);
};

const createCategory = (category) => {
    return axios.post(API_URL+"createCategory.php", category)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data));
};

const updateCategory = (category) => {
    return axios.put(API_URL+"updateCategory.php", category)
        .then(response => response)
        .catch(error => error.response);
};

const deleteCategory = (id) => {
    return axios.delete(API_URL+"deleteCategory.php", {
        data: { id_category: id }
    })
    .then(response => response)
    .catch(error => Promise.reject(error.response.data));
};

const setCategoryEnabled = (id, isEnabled) => {
    return axios.put(API_URL+"setCategoryEnabled.php", { id_category: id, is_enabled: isEnabled });
};

const getEnabledCategories = () => {
    return axios.get(API_URL+"getEnabledCategories.php");
}

const categoryService = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    setCategoryEnabled,
    getEnabledCategories
};

export default categoryService;

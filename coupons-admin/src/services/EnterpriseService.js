import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php';

const getEnterprises = () => {
    return axios.get(API_URL);
};

const getEnterpriseById = (id) => {
    return axios.get(`${API_URL}?id=${id}`);
};

const createEnterprise = (enterprise) => {
    return axios.post(API_URL, enterprise)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data)); // Devuelve el error completo
};

const updateEnterprise = (enterprise) => {
    return axios.put(API_URL, enterprise)
        .then(response => response)
        .catch(error => error.response);
};

const setEnterpriseEnabled = (id, isEnabled) => {
    return axios.put(API_URL, { id_enterprise: id, is_enabled: isEnabled }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const enterpriseService = {
    getEnterprises,
    getEnterpriseById,
    createEnterprise,
    updateEnterprise,
    setEnterpriseEnabled
};

export default enterpriseService;

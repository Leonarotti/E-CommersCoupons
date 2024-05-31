import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php';

const getEnterprises = () => {
    return axios.get(API_URL);
};

const getEnterpriseById = (id) => {
    return axios.get(`${API_URL}?id=${id}`);
};

const createEnterprise = (enterprise) => {
    return axios.post(API_URL, enterprise);
};

const updateEnterprise = (enterprise) => {
    return axios.put(API_URL, enterprise);
};

const deleteEnterprise = (id) => {
    return axios.delete(API_URL, {
        data: { id_enterprise: id }
    });
};

const setEnterpriseEnabled = (id, isEnabled) => {
    return axios.put(API_URL, { id_enterprise: id, is_enabled: isEnabled });
};

const enterpriseService = {
    getEnterprises,
    getEnterpriseById,
    createEnterprise,
    updateEnterprise,
    deleteEnterprise,
    setEnterpriseEnabled
};

export default enterpriseService;

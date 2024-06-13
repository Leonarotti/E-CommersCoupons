import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/promotion/';

const getPromotionsByCouponId = (CouponId) => {
    return axios.get(`${API_URL+"getPromotionsByCouponId.php"}?id_coupon=${CouponId}`);
};

const createPromotion = (promotion) => {
    return axios.post(API_URL+"createPromotion.php", promotion)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data));
};

const updatePromotion = (promotion) => {
    return axios.put(`${API_URL+"updatePromotion.php"}/${promotion.id_promotion}`, promotion)
        .then(response => response)
        .catch(error => error.response);
};

const deletePromotion = (id) => {
    return axios.delete(API_URL, {
        data: { id_promotion: id }
    });
};

const getPromotionById = (id) => {
    return axios.get(`${API_URL+"getPromotionById.php"}?id=${id}`);
};

const setPromotionEnabled = (id, isEnabled) => {
    return axios.put(API_URL+"setPromotionEnabled.php", { id_promotion: id, is_enabled: isEnabled });
};

const promotionService = {
    getPromotionsByCouponId,
    createPromotion,
    updatePromotion,
    deletePromotion,
    getPromotionById,
    setPromotionEnabled
};

export default promotionService;

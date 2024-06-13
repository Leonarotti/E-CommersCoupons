import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/coupon/';

const getCouponsByEnterpriseId = (enterpriseId) => {
    return axios.get(`${API_URL+"getCouponsByEnterpriseId.php"}?id_enterprise=${enterpriseId}`);
};

const createCoupon = (coupon) => {
    return axios.post(API_URL+"createCoupon.php", coupon)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data));
};

const updateCoupon = (coupon) => {
    return axios.put(`${API_URL+"updateCoupon.php"}/${coupon.id_coupon}`, coupon)
        .then(response => response)
        .catch(error => error.response);
};

const deleteCoupon = (id) => {
    return axios.delete(API_URL, {
        data: { id_coupon: id }
    });
};

const getCouponById = (id) => {
    return axios.get(`${API_URL+"getCouponById.php"}?id=${id}`);
};

const setCouponEnabled = (id, isEnabled) => {
    return axios.put(API_URL+"setCouponEnabled.php", { id_coupon: id, is_enabled: isEnabled });
};

const couponService = {
    getCouponsByEnterpriseId,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponById,
    setCouponEnabled
};

export default couponService;

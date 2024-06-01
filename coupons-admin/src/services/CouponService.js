import axios from 'axios';

const API_URL = 'http://localhost/coupons-backend-php/api/controllers/CouponController.php';

const getCouponsByEnterpriseId = (enterpriseId) => {
    return axios.get(`${API_URL}?enterprise_id=${enterpriseId}`);
};

const createCoupon = (coupon) => {
    return axios.post(API_URL, coupon)
        .then(response => response)
        .catch(error => Promise.reject(error.response.data));
};

const updateCoupon = (coupon) => {
    return axios.put(`${API_URL}/${coupon.id_coupon}`, coupon)
        .then(response => response)
        .catch(error => error.response);
};

const deleteCoupon = (id) => {
    return axios.delete(API_URL, {
        data: { id_coupon: id }
    });
};

const couponService = {
    getCouponsByEnterpriseId,
    createCoupon,
    updateCoupon,
    deleteCoupon
};

export default couponService;

<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getCouponById($id) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $coupon = $couponBusiness->getCouponById($id);
    if ($coupon) {
        echo json_encode($coupon);
    } else {
        sendResponse(404, 'Cupón no encontrado.');
    }
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if ($id !== null) {
    getCouponById($id);
} else {
    sendResponse(400, 'ID de cupón no proporcionado.');
}
?>
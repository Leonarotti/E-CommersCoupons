<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getCouponsWithDetails() {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $coupons = $couponBusiness->getCouponsWithDetails();
    echo json_encode($coupons);
}

getCouponsWithDetails();
?>

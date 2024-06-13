<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/PromotionBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getPromotionsByCouponId($id_coupon) {
    $database = new Database();
    $db = $database->getConnection();
    $promotionBusiness = new PromotionBusiness($db);

    $promotions = $promotionBusiness->getPromotionsByCouponId($id_coupon);
    echo json_encode($promotions);
}

$id_coupon = isset($_GET['id_coupon']) ? intval($_GET['id_coupon']) : null;
if ($id_coupon !== null) {
    getPromotionsByCouponId($id_coupon);
} else {
    sendResponse(400, 'ID de cupón no proporcionado.');
}
?>

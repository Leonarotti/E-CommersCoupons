<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getCouponsByEnterpriseId($id_enterprise) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $coupons = $couponBusiness->getCouponsByEnterpriseId($id_enterprise);
    echo json_encode($coupons);
}

$id_enterprise = isset($_GET['id_enterprise']) ? intval($_GET['id_enterprise']) : null;
if ($id_enterprise !== null) {
    getCouponsByEnterpriseId($id_enterprise);
} else {
    sendResponse(400, 'ID de empresa no proporcionado.');
}
?>

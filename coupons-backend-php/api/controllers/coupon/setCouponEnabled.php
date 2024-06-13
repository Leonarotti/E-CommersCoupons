<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function setCouponEnabled($id_coupon, $is_enabled) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $result = $couponBusiness->setCouponEnabled($id_coupon, $is_enabled);
    if ($result === true) {
        sendResponse(200, 'Estado de cupón actualizado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_coupon) && isset($data->is_enabled)) {
    setCouponEnabled($data->id_coupon, $data->is_enabled);
} else {
    sendResponse(400, 'Datos insuficientes.');
}
?>

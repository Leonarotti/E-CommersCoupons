<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function updateCoupon($data) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $result = $couponBusiness->updateCoupon($data);
    if ($result === true) {
        sendResponse(200, 'Cupón actualizado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    updateCoupon($data);
} else {
    sendResponse(400, 'Datos no proporcionados.');
}
?>

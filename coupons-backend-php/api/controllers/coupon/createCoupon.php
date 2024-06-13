<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function createCoupon($data) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $result = $couponBusiness->createCoupon($data);
    if ($result === true) {
        sendResponse(201, 'Cupón creado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    createCoupon($data);
} else {
    sendResponse(400, 'Datos no proporcionados.');
}
?>

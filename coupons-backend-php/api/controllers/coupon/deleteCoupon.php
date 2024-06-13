<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CouponBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function deleteCoupon($id_coupon) {
    $database = new Database();
    $db = $database->getConnection();
    $couponBusiness = new CouponBusiness($db);

    $result = $couponBusiness->deleteCoupon($id_coupon);
    if ($result === true) {
        sendResponse(200, 'Cupón eliminado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_coupon)) {
    deleteCoupon($data->id_coupon);
} else {
    sendResponse(400, 'ID de cupón no proporcionado.');
}
?>
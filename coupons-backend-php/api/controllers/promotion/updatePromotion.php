<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/PromotionBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function updatePromotion($data) {
    $database = new Database();
    $db = $database->getConnection();
    $promotionBusiness = new PromotionBusiness($db);

    $result = $promotionBusiness->updatePromotion($data);
    if ($result === true) {
        sendResponse(200, 'Promoción actualizada.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    updatePromotion($data);
} else {
    sendResponse(400, 'Datos no proporcionados.');
}
?>

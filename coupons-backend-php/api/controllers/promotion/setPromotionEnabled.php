<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/PromotionBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function setPromotionEnabled($id_promotion, $is_enabled) {
    $database = new Database();
    $db = $database->getConnection();
    $promotionBusiness = new PromotionBusiness($db);

    $result = $promotionBusiness->setPromotionEnabled($id_promotion, $is_enabled);
    if ($result === true) {
        sendResponse(200, 'Estado de promoción actualizado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_promotion) && isset($data->is_enabled)) {
    setPromotionEnabled($data->id_promotion, $data->is_enabled);
} else {
    sendResponse(400, 'Datos insuficientes.');
}
?>

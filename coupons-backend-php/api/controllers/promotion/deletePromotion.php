<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/PromotionBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function deletePromotion($id_promotion) {
    $database = new Database();
    $db = $database->getConnection();
    $promotionBusiness = new PromotionBusiness($db);

    $result = $promotionBusiness->deletePromotion($id_promotion);
    if ($result === true) {
        sendResponse(200, 'Promoción eliminada.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_promotion)) {
    deletePromotion($data->id_promotion);
} else {
    sendResponse(400, 'ID de promoción no proporcionado.');
}
?>

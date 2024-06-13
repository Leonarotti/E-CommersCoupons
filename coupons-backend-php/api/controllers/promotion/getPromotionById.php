<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/PromotionBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getPromotionById($id) {
    $database = new Database();
    $db = $database->getConnection();
    $promotionBusiness = new PromotionBusiness($db);

    $promotion = $promotionBusiness->getPromotionById($id);
    if ($promotion) {
        echo json_encode($promotion);
    } else {
        sendResponse(404, 'Promoción no encontrada.');
    }
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if ($id !== null) {
    getPromotionById($id);
} else {
    sendResponse(400, 'ID de promoción no proporcionado.');
}
?>

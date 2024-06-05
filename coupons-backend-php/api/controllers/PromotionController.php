<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include_once '../config/Database.php';
include_once '../business/PromotionBusiness.php';

$database = new Database();
$db = $database->getConnection();

$promotionBusiness = new PromotionBusiness($db);

$request_method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$id_coupon = isset($_GET['id_coupon']) ? intval($_GET['id_coupon']) : null;

function sendResponse($status_code, $message) {
    http_response_code($status_code);
    echo json_encode(array('message' => $message));
}

try {
    switch ($request_method) {
        case 'GET':
            if ($id !== null) {
                $promotion = $promotionBusiness->getPromotionById($id);
                if ($promotion) {
                    echo json_encode($promotion);
                } else {
                    sendResponse(404, 'Promoción no encontrada.');
                }
            } elseif ($id_coupon !== null) {
                $promotions = $promotionBusiness->getPromotionsByCouponId($id_coupon);
                echo json_encode($promotions);
            } else {
                $promotions = $promotionBusiness->getPromotions();
                echo json_encode($promotions);
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $result = $promotionBusiness->createPromotion($data);
            if ($result === true) {
                sendResponse(201, 'Promoción creada.');
            } else {
                sendResponse(400, $result);
            }
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            if (!isset($data->percentage)) {
                // Enable or disable promotion
                $result = $promotionBusiness->setPromotionEnabled($data->id_promotion, $data->is_enabled);
                if ($result === true) {
                    sendResponse(200, 'Estado de promoción actualizado.');
                } else {
                    sendResponse(400, $result);
                }
            } else {
                // Update promotion
                $result = $promotionBusiness->updatePromotion($data);
                if ($result === true) {
                    sendResponse(200, 'Promoción actualizada.');
                } else {
                    sendResponse(400, $result);
                }
            }
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $promotionBusiness->deletePromotion($data->id_promotion);
            if ($result === true) {
                sendResponse(200, 'Promoción eliminada.');
            } else {
                sendResponse(400, $result);
            }
            break;
        default:
            sendResponse(405, 'Método no soportado.');
            break;
    }
} catch (Exception $e) {
    sendResponse(500, 'Error del servidor: ' . $e->getMessage());
}
?>

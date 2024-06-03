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
include_once '../business/CouponBusiness.php';

$database = new Database();
$db = $database->getConnection();

$couponBusiness = new CouponBusiness($db);

$request_method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

function sendResponse($status_code, $message) {
    http_response_code($status_code);
    echo json_encode(array('message' => $message));
}

try {
    switch ($request_method) {
        case 'GET':
            if ($id !== null) {
                $coupon = $couponBusiness->getCouponById($id);
                if ($coupon) {
                    echo json_encode($coupon);
                } else {
                    sendResponse(404, 'Cupón no encontrado.');
                }
            } else {
                $coupons = $couponBusiness->getCoupons();
                echo json_encode($coupons);
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $result = $couponBusiness->createCoupon($data);
            if ($result === true) {
                sendResponse(201, 'Cupón creado.');
            } else {
                sendResponse(400, $result);
            }
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            if (!isset($data->name)) {
                // Enable or disable coupon
                $result = $couponBusiness->setCouponEnabled($data->id_coupon, $data->is_enabled);
                if ($result === true) {
                    sendResponse(200, 'Estado de cupón actualizado.');
                } else {
                    sendResponse(400, $result);
                }
            } else {
                // Update coupon
                $result = $couponBusiness->updateCoupon($data);
                if ($result === true) {
                    sendResponse(200, 'Cupón actualizado.');
                } else {
                    sendResponse(400, $result);
                }
            }
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $couponBusiness->deleteCoupon($data->id_coupon);
            if ($result === true) {
                sendResponse(200, 'Cupón eliminado.');
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

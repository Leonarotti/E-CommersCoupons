<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include_once '../config/Database.php';
include_once '../business/EnterpriseBusiness.php';

$database = new Database();
$db = $database->getConnection();

$enterpriseBusiness = new EnterpriseBusiness($db);

$request_method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

function sendResponse($status_code, $data) {
    http_response_code($status_code);
    echo json_encode($data);
}

try {
    switch ($request_method) {
        case 'GET':
            if ($id !== null) {
                $enterprise = $enterpriseBusiness->getEnterpriseById($id);
                if ($enterprise) {
                    sendResponse(200, $enterprise);
                } else {
                    sendResponse(404, array('message' => 'Empresa no encontrada.'));
                }
            } else {
                $enterprises = $enterpriseBusiness->getEnterprises();
                sendResponse(200, $enterprises);
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $result = $enterpriseBusiness->createEnterprise($data);
            if ($result === true) {
                sendResponse(201, array('message' => 'Empresa creada.'));
            } else {
                sendResponse(400, array('message' => $result));
            }
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            if (!isset($data->license)) {
                // Enable or disable enterprise
                $result = $enterpriseBusiness->setEnterpriseEnabled($data->id_enterprise, $data->is_enabled);
                if ($result === true) {
                    sendResponse(200, array('message' => 'Estado de empresa actualizado.'));
                } else {
                    sendResponse(400, array('message' => $result));
                }
            } else {
                // Update enterprise
                $result = $enterpriseBusiness->updateEnterprise($data);
                if ($result === true) {
                    sendResponse(200, array('message' => 'Empresa actualizada.'));
                } else {
                    sendResponse(400, array('message' => $result));
                }
            }
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $enterpriseBusiness->deleteEnterprise($data->id_enterprise);
            if ($result === true) {
                sendResponse(200, array('message' => 'Empresa eliminada.'));
            } else {
                sendResponse(400, array('message' => $result));
            }
            break;
        default:
            sendResponse(405, array('message' => 'Método no soportado.'));
            break;
    }
} catch (Exception $e) {
    sendResponse(500, array('message' => 'Error del servidor: ' . $e->getMessage()));
}
?>

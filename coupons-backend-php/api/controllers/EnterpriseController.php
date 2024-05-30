<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/Database.php';
include_once '../business/EnterpriseBusiness.php';

$database = new Database();
$db = $database->getConnection();

$enterpriseBusiness = new EnterpriseBusiness($db);

$request_method = $_SERVER['REQUEST_METHOD'];

function sendResponse($status_code, $message) {
    http_response_code($status_code);
    echo json_encode(array('message' => $message));
}

try {
    switch ($request_method) {
        case 'GET':
            $enterprises = $enterpriseBusiness->getEnterprises();
            echo json_encode($enterprises);
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $result = $enterpriseBusiness->createEnterprise($data);
            if ($result === true) {
                sendResponse(201, 'Empresa creada.');
            } else {
                sendResponse(400, $result);
            }
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            if (isset($data->is_enabled)) {
                // Enable or disable enterprise
                $result = $enterpriseBusiness->setEnterpriseEnabled($data->id_enterprise, $data->is_enabled);
                if ($result === true) {
                    sendResponse(200, 'Estado de empresa actualizado.');
                } else {
                    sendResponse(400, $result);
                }
            } else {
                // Update enterprise
                $result = $enterpriseBusiness->updateEnterprise($data);
                if ($result === true) {
                    sendResponse(200, 'Empresa actualizada.');
                } else {
                    sendResponse(400, $result);
                }
            }
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $enterpriseBusiness->deleteEnterprise($data->id_enterprise);
            if ($result === true) {
                sendResponse(200, 'Empresa eliminada.');
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

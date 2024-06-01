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
include_once '../business/CategoryBusiness.php';

$database = new Database();
$db = $database->getConnection();

$categoryBusiness = new CategoryBusiness($db);

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
                $category = $categoryBusiness->getCategoryById($id);
                if ($category) {
                    echo json_encode($category);
                } else {
                    sendResponse(404, 'Categoría no encontrada.');
                }
            } else {
                $categories = $categoryBusiness->getCategories();
                echo json_encode($categories);
            }
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $result = $categoryBusiness->create($data);
            if ($result === true) {
                sendResponse(201, 'Categoría creada.');
            } else {
                sendResponse(400, $result);
            }
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $result = $categoryBusiness->update($data);
            if ($result === true) {
                sendResponse(200, 'Categoría actualizada.');
            } else {
                sendResponse(400, $result);
            }
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $categoryBusiness->delete($data->id_category);
            if ($result === true) {
                sendResponse(200, 'Categoría eliminada.');
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

<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CategoryBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function deleteCategory($id_category) {
    $database = new Database();
    $db = $database->getConnection();
    $categoryBusiness = new CategoryBusiness($db);

    $result = $categoryBusiness->delete($id_category);
    if ($result === true) {
        sendResponse(200, 'Categoría eliminada.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_category)) {
    deleteCategory($data->id_category);
} else {
    sendResponse(400, 'ID de categoría no proporcionado.');
}
?>

<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CategoryBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function setCategoryEnabled($id_category, $is_enabled) {
    $database = new Database();
    $db = $database->getConnection();
    $categoryBusiness = new CategoryBusiness($db);

    $result = $categoryBusiness->setCategoryEnabled($id_category, $is_enabled);
    if ($result === true) {
        sendResponse(200, 'Estado de categoría actualizado.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_category) && isset($data->is_enabled)) {
    setCategoryEnabled($data->id_category, $data->is_enabled);
} else {
    sendResponse(400, 'Datos insuficientes.');
}
?>

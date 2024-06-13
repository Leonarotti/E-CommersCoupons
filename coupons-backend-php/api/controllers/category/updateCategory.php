<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CategoryBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function updateCategory($data) {
    $database = new Database();
    $db = $database->getConnection();
    $categoryBusiness = new CategoryBusiness($db);

    $result = $categoryBusiness->update($data);
    if ($result === true) {
        sendResponse(200, 'Categoría actualizada.');
    } else {
        sendResponse(400, $result);
    }
}

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    updateCategory($data);
} else {
    sendResponse(400, 'Datos no proporcionados.');
}
?>

<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CategoryBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getCategoryById($id) {
    $database = new Database();
    $db = $database->getConnection();
    $categoryBusiness = new CategoryBusiness($db);

    $category = $categoryBusiness->getCategoryById($id);
    if ($category) {
        echo json_encode($category);
    } else {
        sendResponse(404, 'Categoría no encontrada.');
    }
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if ($id !== null) {
    getCategoryById($id);
} else {
    sendResponse(400, 'ID de categoría no proporcionado.');
}
?>

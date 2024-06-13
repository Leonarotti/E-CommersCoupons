<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/CategoryBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getEnabledCategories() {
    $database = new Database();
    $db = $database->getConnection();
    $categoryBusiness = new CategoryBusiness($db);

    $categories = $categoryBusiness->getEnabledCategories();
    echo json_encode($categories);
}

getEnabledCategories();
?>

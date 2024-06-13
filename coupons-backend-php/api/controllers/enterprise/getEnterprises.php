<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/EnterpriseBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getEnterprises() {
    $database = new Database();
    $db = $database->getConnection();
    $enterpriseBusiness = new EnterpriseBusiness($db);

    $enterprises = $enterpriseBusiness->getEnterprises();
    sendResponse(200, $enterprises);
}

getEnterprises();
?>

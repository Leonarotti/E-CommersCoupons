<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/EnterpriseBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function getEnterpriseById($id) {
    $database = new Database();
    $db = $database->getConnection();
    $enterpriseBusiness = new EnterpriseBusiness($db);

    $enterprise = $enterpriseBusiness->getEnterpriseById($id);
    if ($enterprise) {
        sendResponse(200, $enterprise);
    } else {
        sendResponse(404, array('message' => 'Empresa no encontrada.'));
    }
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if ($id !== null) {
    getEnterpriseById($id);
} else {
    sendResponse(400, array('message' => 'ID de empresa no proporcionado.'));
}
?>

<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/EnterpriseBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function updateEnterprise($data) {
    $database = new Database();
    $db = $database->getConnection();
    $enterpriseBusiness = new EnterpriseBusiness($db);

    $result = $enterpriseBusiness->updateEnterprise($data);
    if ($result === true) {
        sendResponse(200, array('message' => 'Empresa actualizada.'));
    } else {
        sendResponse(400, array('message' => $result));
    }
}

$data = json_decode(file_get_contents("php://input"));
if ($data) {
    updateEnterprise($data);
} else {
    sendResponse(400, array('message' => 'Datos no proporcionados.'));
}
?>

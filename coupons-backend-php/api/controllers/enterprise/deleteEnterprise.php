<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/EnterpriseBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function deleteEnterprise($id_enterprise) {
    $database = new Database();
    $db = $database->getConnection();
    $enterpriseBusiness = new EnterpriseBusiness($db);

    $result = $enterpriseBusiness->deleteEnterprise($id_enterprise);
    if ($result === true) {
        sendResponse(200, array('message' => 'Empresa eliminada.'));
    } else {
        sendResponse(400, array('message' => $result));
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_enterprise)) {
    deleteEnterprise($data->id_enterprise);
} else {
    sendResponse(400, array('message' => 'ID de empresa no proporcionado.'));
}
?>

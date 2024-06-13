<?php
include_once '../../config/config.php';
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/business/EnterpriseBusiness.php';
include_once '../headers.php';
include_once '../sendResponse.php';

function setEnterpriseEnabled($id_enterprise, $is_enabled) {
    $database = new Database();
    $db = $database->getConnection();
    $enterpriseBusiness = new EnterpriseBusiness($db);

    $result = $enterpriseBusiness->setEnterpriseEnabled($id_enterprise, $is_enabled);
    if ($result === true) {
        sendResponse(200, array('message' => 'Estado de empresa actualizado.'));
    } else {
        sendResponse(400, array('message' => $result));
    }
}

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id_enterprise) && isset($data->is_enabled)) {
    setEnterpriseEnabled($data->id_enterprise, $data->is_enabled);
} else {
    sendResponse(400, array('message' => 'Datos insuficientes.'));
}
?>

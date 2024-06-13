<?php
include_once BASE_PATH . '/api/dataModels/EnterpriseData.php';

class EnterpriseBusiness {
    private $enterpriseData;

    public function __construct($db) {
        $this->enterpriseData = new EnterpriseData($db);
    }

    public function getEnterprises() {
        $stmt = $this->enterpriseData->getEnterprises();
        $enterprises_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $enterprise_item = new Enterprise($id_enterprise, $name, $address, $license, $date_created, $phone, $email, $password, $is_enabled);
            array_push($enterprises_arr, $enterprise_item);
        }
        return $enterprises_arr;
    }

    public function getEnterpriseById($id) {
        if (!$this->isValidId($id)) {
            return ['error' => 'Invalid enterprise ID'];
        }

        $data = $this->enterpriseData->getEnterpriseById($id);
        if ($data) {
            return new Enterprise($data['id_enterprise'], $data['name'], $data['address'], $data['license'], $data['date_created'], $data['phone'], $data['email'], $data['password'], $data['is_enabled']);
        } else {
            return null;
        }
    }

    public function createEnterprise($data) {
        $validationResult = $this->validateEnterpriseData($data);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        // Check if the license already exists
        $existingEnterprise = $this->enterpriseData->getEnterpriseByLicense($data->license);
        if ($existingEnterprise) {
            return 'Ya existe una empresa con la cédula ' . $data->license;
        }

        $enterprise = new Enterprise(0, $data->name, $data->address, $data->license, $data->date_created, $data->phone, $data->email, $data->password, $data->is_enabled);
        return $this->enterpriseData->create($enterprise) ? true : 'Error al crear empresa.';
    }

    public function updateEnterprise($data) {
        $validationResult = $this->validateEnterpriseData($data, true);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        $enterprise = new Enterprise($data->id_enterprise, $data->name, $data->address, $data->license, $data->date_created, $data->phone, $data->email, $data->password, $data->is_enabled);
        return $this->enterpriseData->update($enterprise) ? true : 'Error al actualizar empresa.';
    }

    public function deleteEnterprise($id) {
        if (!$this->isValidId($id)) {
            return 'ID de empresa requerido para eliminar.';
        }
        return $this->enterpriseData->delete($id) ? true : 'Error al eliminar empresa.';
    }

    public function setEnterpriseEnabled($id, $is_enabled) {
        if (!$this->isValidId($id)) {
            return 'ID de empresa requerido para cambiar estado.';
        }
        if(!$is_enabled){
            $this->enterpriseData->disableCouponsAndPromotionsByEnterpriseId($id) ? true : 'Error al cambiar estado de empresa.';
        }
        return $this->enterpriseData->setEnabled($id, $is_enabled) ? true : 'Error al cambiar estado de empresa.';
    }

    private function validateEnterpriseData($data, $isUpdate = false) {
        if ($isUpdate && empty($data->id_enterprise)) {
            return 'ID de empresa requerido para actualizar.';
        }
        if (empty($data->name) || empty($data->address) || empty($data->license) || empty($data->date_created) || empty($data->phone) || empty($data->email) || (!$isUpdate && empty($data->password))) {
            return 'Datos incompletos para la empresa.';
        }
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            return 'Correo electrónico inválido.';
        }
        if (!preg_match('/^\d{2}-(?:\d{3}-\d{6}|\d{4}-\d{4})$/', $data->license)) {
            return 'Formato de número de licencia inválido. Debe ser "00-0000-0000" para cédulas físicas o "00-000-000000" para cédulas jurídicas.';
        }
        if (!preg_match('/^\d{4}-\d{4}$/', $data->phone)) {
            return 'Formato de número de teléfono inválido. Debe ser "0000-0000".';
        }
        return true;
    }

    private function isValidId($id) {
        return !empty($id) && is_numeric($id);
    }
}
?>

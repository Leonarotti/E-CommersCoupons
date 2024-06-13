<?php
include_once BASE_PATH . '/api/dataModels/PromotionData.php';

class PromotionBusiness {
    private $promotionData;

    public function __construct($db) {
        $this->promotionData = new PromotionData($db);
    }

    public function getPromotions() {
        $stmt = $this->promotionData->getPromotions();
        $promotions_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $promotion_item = new Promotion($id_promotion, $id_coupon, $percentage, $start_date, $end_date, $is_enabled);
            array_push($promotions_arr, $promotion_item);
        }
        return $promotions_arr;
    }

    public function getPromotionsByCouponId($id_coupon) {
        $stmt = $this->promotionData->getPromotionsByCouponId($id_coupon);
        $promotions_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $promotion_item = new Promotion($id_promotion, $id_coupon, $percentage, $start_date, $end_date, $is_enabled);
            array_push($promotions_arr, $promotion_item);
        }
        return $promotions_arr;
    }

    public function getPromotionById($id) {
        if (!$this->isValidId($id)) {
            return ['error' => 'Invalid promotion ID'];
        }

        $data = $this->promotionData->getPromotionById($id);
        if ($data) {
            return new Promotion($data['id_promotion'], $data['id_coupon'], $data['percentage'], $data['start_date'], $data['end_date'], $data['is_enabled']);
        } else {
            return null;
        }
    }

    public function createPromotion($data) {
        $validationResult = $this->validatePromotionData($data);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        $promotion = new Promotion(0, $data->id_coupon, $data->percentage, $data->start_date, $data->end_date, $data->is_enabled);
        return $this->promotionData->create($promotion) ? true : 'Error al crear promoción.';
    }

    public function updatePromotion($data) {
        $validationResult = $this->validatePromotionData($data, true);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        $promotion = new Promotion($data->id_promotion, $data->id_coupon, $data->percentage, $data->start_date, $data->end_date, $data->is_enabled);
        return $this->promotionData->update($promotion) ? true : 'Error al actualizar promoción.';
    }

    public function deletePromotion($id) {
        if (!$this->isValidId($id)) {
            return 'ID de promoción requerido para eliminar.';
        }
        return $this->promotionData->delete($id) ? true : 'Error al eliminar promoción.';
    }

    public function setPromotionEnabled($id, $is_enabled) {
        if (!$this->isValidId($id)) {
            return 'ID de promoción requerido para cambiar estado.';
        }
        return $this->promotionData->setEnabled($id, $is_enabled) ? true : 'Error al cambiar estado de promoción.';
    }

    private function validatePromotionData($data, $isUpdate = false) {
        if ($isUpdate && empty($data->id_promotion)) {
            return 'ID de promoción requerido para actualizar.';
        }
        if (empty($data->id_coupon) || empty($data->percentage) || empty($data->start_date) || empty($data->end_date)) {
            return 'Datos incompletos para la promoción.';
        }
        if (!preg_match('/^\d{1,2}$/', $data->percentage) || $data->percentage < 0 || $data->percentage > 100) {
            return 'Formato de porcentaje inválido. Debe estar entre 0 y 100.';
        }
        return true;
    }

    private function isValidId($id) {
        return !empty($id) && is_numeric($id);
    }
}
?>

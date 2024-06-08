<?php
include_once '../dataModels/CouponData.php';

class CouponBusiness {
    private $couponData;

    public function __construct($db) {
        $this->couponData = new CouponData($db);
    }

    public function getCoupons() {
        $stmt = $this->couponData->getCoupons();
        $coupons_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $coupon_item = new Coupon($id_coupon, $id_enterprise, $id_category, $name, $img, $location, $regular_price, $percentage, $start_date, $end_date, $is_enabled);
            array_push($coupons_arr, $coupon_item);
        }
        return $coupons_arr;
    }

    public function getCouponsByEnterpriseId($id_enterprise) {
        $stmt = $this->couponData->getCouponsByEnterpriseId($id_enterprise);
        $coupons_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $coupon_item = new Coupon($id_coupon, $id_enterprise, $id_category, $name, $img, $location, $regular_price, $percentage, $start_date, $end_date, $is_enabled);
            array_push($coupons_arr, $coupon_item);
        }
        return $coupons_arr;
    }

    public function getCouponById($id) {
        if (!$this->isValidId($id)) {
            return ['error' => 'Invalid coupon ID'];
        }

        $data = $this->couponData->getCouponById($id);
        if ($data) {
            return new Coupon($data['id_coupon'], $data['id_enterprise'], $data['id_category'], $data['name'], $data['img'], $data['location'], $data['regular_price'], $data['percentage'], $data['start_date'], $data['end_date'], $data['is_enabled']);
        } else {
            return null;
        }
    }

    public function createCoupon($data) {
        $validationResult = $this->validateCouponData($data);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        $coupon = new Coupon(0, $data->id_enterprise, $data->id_category, $data->name, $data->img, $data->location, $data->regular_price, $data->percentage, $data->start_date, $data->end_date, $data->is_enabled);
        return $this->couponData->create($coupon) ? true : 'Error al crear cupón.';
    }

    public function updateCoupon($data) {
        $validationResult = $this->validateCouponData($data, true);
        if ($validationResult !== true) {
            return $validationResult; // Return the validation error message
        }

        $coupon = new Coupon($data->id_coupon, $data->id_enterprise, $data->id_category, $data->name, $data->img, $data->location, $data->regular_price, $data->percentage, $data->start_date, $data->end_date, $data->is_enabled);
        return $this->couponData->update($coupon) ? true : 'Error al actualizar cupón.';
    }

    public function deleteCoupon($id) {
        if (!$this->isValidId($id)) {
            return 'ID de cupón requerido para eliminar.';
        }
        return $this->couponData->delete($id) ? true : 'Error al eliminar cupón.';
    }

    public function setCouponEnabled($id, $is_enabled) {
        if (!$this->isValidId($id)) {
            return 'ID de cupón requerido para cambiar estado.';
        }
        return $this->couponData->setEnabled($id, $is_enabled) ? true : 'Error al cambiar estado de cupón.';
    }

    public function getCouponsWithDetails() {
        $stmt = $this->couponData->getCouponsWithDetails();
        $coupons_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $coupon_item = new CouponWithDetails(
                $row['id_coupon'],
                $row['id_enterprise'],
                $row['id_category'],
                $row['name'],
                $row['img'],
                $row['location'],
                $row['regular_price'],
                $row['percentage'],
                $row['start_date'],
                $row['end_date'],
                $row['is_enabled'],
                $row['category'],
                $row['enterprise']
            );
            
            array_push($coupons_arr, $coupon_item);
        }
        return $coupons_arr;
    }

    private function validateCouponData($data, $isUpdate = false) {
        if ($isUpdate && empty($data->id_coupon)) {
            return 'ID de cupón requerido para actualizar.';
        }
        if (empty($data->id_enterprise) || empty($data->id_category) || empty($data->name) || empty($data->img) || empty($data->location) || empty($data->regular_price) || empty($data->percentage) || empty($data->start_date) || empty($data->end_date)) {
            return 'Datos incompletos para el cupón.';
        }
        if (!preg_match('/^[0-9]+(\.[0-9]{1,2})?$/', $data->regular_price)) {
            return 'Formato de precio regular inválido.';
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

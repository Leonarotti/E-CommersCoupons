<?php
include_once BASE_PATH . '/api/config/Database.php';
include_once BASE_PATH . '/api/domain/Coupon.php';
include_once BASE_PATH . '/api/domain/CouponWithDetails.php';

class CouponData {
    private $conn;
    private $table_name = 'coupon';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getCoupons() {
        $query = 'SELECT * FROM ' . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getCouponsByEnterpriseId($id_enterprise) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id_enterprise = :id_enterprise';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_enterprise', $id_enterprise);
        $stmt->execute();
        return $stmt;
    }

    public function getCouponById($id) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id_coupon = :id_coupon';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($coupon) {
        $query = 'INSERT INTO ' . $this->table_name . ' SET id_enterprise=:id_enterprise, id_category=:id_category, name=:name, img=:img, location=:location, regular_price=:regular_price, percentage=:percentage, start_date=:start_date, end_date=:end_date, is_enabled=:is_enabled';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_enterprise', $coupon->id_enterprise);
        $stmt->bindParam(':id_category', $coupon->id_category);
        $stmt->bindParam(':name', $coupon->name);
        $stmt->bindParam(':img', $coupon->img);
        $stmt->bindParam(':location', $coupon->location);
        $stmt->bindParam(':regular_price', $coupon->regular_price);
        $stmt->bindParam(':percentage', $coupon->percentage);
        $stmt->bindParam(':start_date', $coupon->start_date);
        $stmt->bindParam(':end_date', $coupon->end_date);
        $stmt->bindParam(':is_enabled', $coupon->is_enabled);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update($coupon) {
        $query = 'UPDATE ' . $this->table_name . ' SET id_enterprise = :id_enterprise, id_category = :id_category, name = :name, img = :img, location = :location, regular_price = :regular_price, percentage = :percentage, start_date = :start_date, end_date = :end_date, is_enabled = :is_enabled WHERE id_coupon = :id_coupon';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_enterprise', $coupon->id_enterprise);
        $stmt->bindParam(':id_category', $coupon->id_category);
        $stmt->bindParam(':name', $coupon->name);
        $stmt->bindParam(':img', $coupon->img);
        $stmt->bindParam(':location', $coupon->location);
        $stmt->bindParam(':regular_price', $coupon->regular_price);
        $stmt->bindParam(':percentage', $coupon->percentage);
        $stmt->bindParam(':start_date', $coupon->start_date);
        $stmt->bindParam(':end_date', $coupon->end_date);
        $stmt->bindParam(':is_enabled', $coupon->is_enabled);
        $stmt->bindParam(':id_coupon', $coupon->id_coupon);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = 'DELETE FROM ' . $this->table_name . ' WHERE id_coupon = :id_coupon';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function setEnabled($id, $is_enabled) {
        $query = 'UPDATE ' . $this->table_name . ' SET is_enabled = :is_enabled WHERE id_coupon = :id_coupon';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':is_enabled', $is_enabled, PDO::PARAM_BOOL);
        $stmt->bindParam(':id_coupon', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function disablePromotionsByCouponId($id_coupon) {
        $query = 'CALL spDisablePromotionsByCouponId(:id_coupon)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $id_coupon, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getCouponsWithDetails() {
        $query = 'CALL spGetCouponsWithDetails()';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getCouponWithDetailsById($id) {
        $query = 'CALL spGetCouponWithDetailsById(:id_coupon)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>

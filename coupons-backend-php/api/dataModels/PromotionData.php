<?php
include_once '../config/Database.php';
include_once '../domain/Promotion.php';

class PromotionData {
    private $conn;
    private $table_name = 'promotion';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getPromotions() {
        $query = 'SELECT * FROM ' . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getPromotionsByCouponId($id_coupon) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id_coupon = :id_coupon';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $id_coupon);
        $stmt->execute();
        return $stmt;
    }

    public function getPromotionById($id) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id_promotion = :id_promotion';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_promotion', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($promotion) {
        $query = 'INSERT INTO ' . $this->table_name . ' SET id_coupon=:id_coupon, percentage=:percentage, start_date=:start_date, end_date=:end_date, is_enabled=:is_enabled';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $promotion->id_coupon);
        $stmt->bindParam(':percentage', $promotion->percentage);
        $stmt->bindParam(':start_date', $promotion->start_date);
        $stmt->bindParam(':end_date', $promotion->end_date);
        $stmt->bindParam(':is_enabled', $promotion->is_enabled);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update($promotion) {
        $query = 'UPDATE ' . $this->table_name . ' SET id_coupon = :id_coupon, percentage = :percentage, start_date = :start_date, end_date = :end_date, is_enabled = :is_enabled WHERE id_promotion = :id_promotion';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_coupon', $promotion->id_coupon);
        $stmt->bindParam(':percentage', $promotion->percentage);
        $stmt->bindParam(':start_date', $promotion->start_date);
        $stmt->bindParam(':end_date', $promotion->end_date);
        $stmt->bindParam(':is_enabled', $promotion->is_enabled);
        $stmt->bindParam(':id_promotion', $promotion->id_promotion);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = 'DELETE FROM ' . $this->table_name . ' WHERE id_promotion = :id_promotion';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_promotion', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function setEnabled($id, $is_enabled) {
        $query = 'UPDATE ' . $this->table_name . ' SET is_enabled = :is_enabled WHERE id_promotion = :id_promotion';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':is_enabled', $is_enabled, PDO::PARAM_BOOL);
        $stmt->bindParam(':id_promotion', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

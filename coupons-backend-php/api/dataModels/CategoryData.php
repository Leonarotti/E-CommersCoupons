<?php
include_once '../config/Database.php';
include_once '../domain/Category.php';

class CategoryData {
    private $conn;
    private $table_name = 'category';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getCategories() {
        $query = 'SELECT * FROM ' . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getCategoryById($id) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id_category = :id_category';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_category', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getCategoryByName($name) {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE name = :name';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($category) {
        $query = 'INSERT INTO ' . $this->table_name . ' SET name = :name, is_enabled = :is_enabled';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $category->name);
        $stmt->bindParam(':is_enabled', $category->is_enabled);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update($category) {
        $query = 'UPDATE ' . $this->table_name . ' SET name = :name, is_enabled = :is_enabled WHERE id_category = :id_category';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $category->name);
        $stmt->bindParam(':is_enabled', $category->is_enabled);
        $stmt->bindParam(':id_category', $category->id_category);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = 'DELETE FROM ' . $this->table_name . ' WHERE id_category = :id_category';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_category', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function setEnabled($id, $is_enabled) {
        $query = 'UPDATE ' . $this->table_name . ' SET is_enabled = :is_enabled WHERE id_category = :id_category';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':is_enabled', $is_enabled, PDO::PARAM_BOOL);
        $stmt->bindParam(':id_category', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getEnabledCategories() {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE is_enabled = 1';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>

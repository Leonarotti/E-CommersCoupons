<?php
include_once '../config/Database.php';
include_once '../domain/Enterprise.php';

class EnterpriseData {
    private $conn;
    private $table_name = 'enterprise';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create($enterprise) {
        $query = 'INSERT INTO ' . $this->table_name . ' SET name=:name, address=:address, license=:license, date_created=:date_created, phone=:phone, email=:email, password=:password, is_enabled=:is_enabled';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $enterprise->name);
        $stmt->bindParam(':address', $enterprise->address);
        $stmt->bindParam(':license', $enterprise->license);
        $stmt->bindParam(':date_created', $enterprise->date_created);
        $stmt->bindParam(':phone', $enterprise->phone);
        $stmt->bindParam(':email', $enterprise->email);
        $stmt->bindParam(':password', $enterprise->password);
        $stmt->bindParam(':is_enabled', $enterprise->is_enabled);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update($enterprise) {
        $query = 'UPDATE ' . $this->table_name . ' SET name = :name, address = :address, license = :license, date_created = :date_created, phone = :phone, email = :email, password = :password, is_enabled = :is_enabled WHERE id_enterprise = :id_enterprise';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $enterprise->name);
        $stmt->bindParam(':address', $enterprise->address);
        $stmt->bindParam(':license', $enterprise->license);
        $stmt->bindParam(':date_created', $enterprise->date_created);
        $stmt->bindParam(':phone', $enterprise->phone);
        $stmt->bindParam(':email', $enterprise->email);
        $stmt->bindParam(':password', $enterprise->password);
        $stmt->bindParam(':is_enabled', $enterprise->is_enabled);
        $stmt->bindParam(':id_enterprise', $enterprise->id_enterprise);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = 'DELETE FROM ' . $this->table_name . ' WHERE id_enterprise = :id_enterprise';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_enterprise', $id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function setEnabled($id, $is_enabled) {
        $query = 'UPDATE ' . $this->table_name . ' SET is_enabled = :is_enabled WHERE id_enterprise = :id_enterprise';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':is_enabled', $is_enabled, PDO::PARAM_BOOL);
        $stmt->bindParam(':id_enterprise', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

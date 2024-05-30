<?php
class Enterprise {
    public $id_enterprise;
    public $name;
    public $address;
    public $license;
    public $date_created;
    public $phone;
    public $email;
    public $password;
    public $is_enabled;

    public function __construct($id_enterprise, $name, $address, $license, $date_created, $phone, $email, $password, $is_enabled) {
        $this->id_enterprise = $id_enterprise;
        $this->name = $name;
        $this->address = $address;
        $this->license = $license;
        $this->date_created = $date_created;
        $this->phone = $phone;
        $this->email = $email;
        $this->password = $password;
        $this->is_enabled = $is_enabled;
    }
}
?>

<?php
class Enterprise {
    public int $id_enterprise;
    public string $name;
    public string $address;
    public string $license;
    public string $date_created; // 'Y-m-d' formato de fecha
    public string $phone;
    public string $email;
    public string $password;
    public bool $is_enabled;

    public function __construct(
        int $id_enterprise, 
        string $name, 
        string $address, 
        string $license, 
        string $date_created, 
        string $phone, 
        string $email, 
        string $password, 
        bool $is_enabled
    ) {
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
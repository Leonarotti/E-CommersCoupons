<?php
class Coupon {
    public int $id_coupon;
    public int $id_enterprise;
    public int $id_category;
    public string $name;
    public string $img;
    public string $location;
    public float $regular_price;
    public int $percentage;
    public string $start_date; // 'Y-m-d' formato de fecha
    public string $end_date; // 'Y-m-d' formato de fecha
    public bool $is_enabled;

    public function __construct(
        int $id_coupon, 
        int $id_enterprise, 
        int $id_category, 
        string $name, 
        string $img, 
        string $location, 
        float $regular_price, 
        int $percentage, 
        string $start_date, 
        string $end_date, 
        bool $is_enabled
    ) {
        $this->id_coupon = $id_coupon;
        $this->id_enterprise = $id_enterprise;
        $this->id_category = $id_category;
        $this->name = $name;
        $this->img = $img;
        $this->location = $location;
        $this->regular_price = $regular_price;
        $this->percentage = $percentage;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->is_enabled = $is_enabled;
    }
}
?>
<?php
class Coupon {
    public $id_coupon;
    public $id_enterprise;
    public $id_category;
    public $code;
    public $name;
    public $img;
    public $location;
    public $regular_price;
    public $percentage;
    public $start_date;
    public $end_date;
    public $is_enabled;

    public function __construct($id_coupon, $id_enterprise, $id_category, $code, $name, $img, $location, $regular_price, $percentage, $start_date, $end_date, $is_enabled) {
        $this->id_coupon = $id_coupon;
        $this->id_enterprise = $id_enterprise;
        $this->id_category = $id_category;
        $this->code = $code;
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

<?php
class Promotion {
    public $id_promotion;
    public $id_coupon;
    public $percentage;
    public $start_date;
    public $end_date;
    public $is_enabled;

    public function __construct($id_promotion, $id_coupon, $percentage, $start_date, $end_date, $is_enabled) {
        $this->id_promotion = $id_promotion;
        $this->id_coupon = $id_coupon;
        $this->percentage = $percentage;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->is_enabled = $is_enabled;
    }
}
?>

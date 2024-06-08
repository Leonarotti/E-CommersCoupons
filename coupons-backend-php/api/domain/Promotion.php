<?php
class Promotion {
    public int $id_promotion;
    public int $id_coupon;
    public int $percentage;
    public string $start_date; // 'Y-m-d' formato de fecha
    public string $end_date; // 'Y-m-d' formato de fecha
    public bool $is_enabled;

    public function __construct(
        int $id_promotion, 
        int $id_coupon, 
        int $percentage, 
        string $start_date, 
        string $end_date, 
        bool $is_enabled
    ) {
        $this->id_promotion = $id_promotion;
        $this->id_coupon = $id_coupon;
        $this->percentage = $percentage;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->is_enabled = $is_enabled;
    }
}
?>
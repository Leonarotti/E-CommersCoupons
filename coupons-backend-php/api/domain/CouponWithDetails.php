<?php
class CouponWithDetails extends Coupon {
    public string $category;
    public string $enterprise;

    public function __construct($id_coupon, $id_enterprise, $id_category, $name, $img, $location, $regular_price, $percentage, $start_date, $end_date, $is_enabled, string $category, string $enterprise) {
        parent::__construct($id_coupon, $id_enterprise, $id_category, $name, $img, $location, $regular_price, $percentage, $start_date, $end_date, $is_enabled);
        $this->category = $category;
        $this->enterprise = $enterprise;
    }
}
?>
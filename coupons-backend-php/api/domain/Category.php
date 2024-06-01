<?php
class Category {
    public $id_category;
    public $name;

    public function __construct($id_category, $name) {
        $this->id_category = $id_category;
        $this->name = $name;
    }
}
?>
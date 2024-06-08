<?php
class Category {
    public int $id_category;
    public string $name;
    public bool $is_enabled;

    public function __construct(int $id_category, string $name, bool $is_enabled) {
        $this->id_category = $id_category;
        $this->name = $name;
        $this->is_enabled = $is_enabled;
    }
}
?>
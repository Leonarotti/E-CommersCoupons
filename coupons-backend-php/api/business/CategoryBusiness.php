<?php
include_once '../dataModels/CategoryData.php';

class CategoryBusiness {
    private $categoryData;

    public function __construct($db) {
        $this->categoryData = new CategoryData($db);
    }

    public function getCategories() {
        $stmt = $this->categoryData->getCategories();
        $categories_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $category_item = new Category($id_category, $name);
            array_push($categories_arr, $category_item);
        }
        return $categories_arr;
    }
    public function getCategoryById($id) {
        if ($this->isValidId($id)) {
            return $this->categoryData->getCategoryById($id);
        } else {
            return ['error' => 'Invalid category ID'];
        }
    }

    public function create($category) {
        if ($this->isValidCategory($category)) {

            if ($this->categoryData->getCategoryByName($category->name)) {
                return ['error' => 'Ya existe una categoría con el nombre ' . $category->name . '.'];
            }

            return $this->categoryData->create($category);
        } else {
            return ['error' => 'Invalid category data'];
        }
    }

    public function update($category) {
        if ($this->isValidId($category->id_category) && $this->isValidCategory($category)) {
            return $this->categoryData->update($category);
        } else {
            return ['error' => 'Invalid category data or ID'];
        }
    }

    public function delete($id) {
        if ($this->isValidId($id)) {
            return $this->categoryData->delete($id);
        } else {
            return ['error' => 'Invalid category ID'];
        }
    }

    private function isValidCategory($category) {
        return !empty($category->name) && is_string($category->name);
    }

    private function isValidId($id) {
        return !empty($id) && is_numeric($id);
    }
}

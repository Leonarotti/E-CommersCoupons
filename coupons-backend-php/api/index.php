<?php

function callAPI($method, $url, $data) {
    $curl = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
            if ($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "DELETE":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
            if ($data) curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        default:
            if ($data) $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
    curl_close($curl);

    return $result;
}

// Example GET request
$response = callAPI("GET", "http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php", false);
echo "GET Response:\n";
echo $response . "\n";

// // Example POST request
// $data = json_encode(array(
//     "name" => "Empresa Ejemplo",
//     "address" => "123 Calle Falsa",
//     "license" => "12-4568-1234",
//     "date_created" => "2023-05-29",
//     "phone" => "123456789",
//     "email" => "empresa@ejemplo.com",
//     "password" => "123456",
//     "is_enabled" => true
// ));
// $response = callAPI("POST", "http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php", $data);
// echo "POST Response:\n";
// echo $response . "\n";

// // Example PUT request
// $data = json_encode(array(
//     "id_enterprise" => 1,
//     "name" => "Empresa Actualizada",
//     "address" => "456 Calle Nueva",
//     "license" => "XYZ0987654321",
//     "date_created" => "2023-06-01",
//     "phone" => "987654321",
//     "email" => "empresa@actualizada.com",
//     "password" => "654321",
//     "is_enabled" => false
// ));
// $response = callAPI("PUT", "http://tu_dominio/api/controllers/EnterpriseController.php", $data);
// echo "PUT Response:\n";
// echo $response . "\n";

// // Example PUT request
// $data = json_encode(array(
//     "id_enterprise" => 1,
//     "is_enabled" => false
// ));
// $response = callAPI("PUT", "http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php", $data);
// echo "PUT Response:\n";
// echo $response . "\n";

// // Example DELETE request
// $data = json_encode(array("id_enterprise" => 1));
// $response = callAPI("DELETE", "http://localhost/coupons-backend-php/api/controllers/EnterpriseController.php", $data);
// echo "DELETE Response:\n";
// echo $response . "\n";

?>

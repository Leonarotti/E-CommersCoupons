<?php
function sendResponse($status_code, $message) {
    http_response_code($status_code);
    echo json_encode($message);
}
?>
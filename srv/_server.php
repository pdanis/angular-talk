<?php

if (isset($_GET['sleep'])) {
    sleep((int) $_GET['sleep']);
}

header('Content-Type: application/json');

echo json_encode($_SERVER);

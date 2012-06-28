<?php

header('Content-Type: application/json');

$emails = array('info@info.cz', 'test@test.cz');

sleep(1);

echo json_encode(isset($_GET['email']) ? !in_array($_GET['email'], $emails) : TRUE);

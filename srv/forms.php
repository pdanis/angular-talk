<?php

header('Content-Type: application/json');

echo json_encode(array(
    'name' => 'Pavol Daniš',
    'email' => 'palto@palto.sk',
    'www' => 'http://www.palto.sk',
    'gender' => 'male',
    'skills' => array('angularjs', 'php', 'sql'),
    'active' => true,
    'addresses' => array(
        array(
            'street' => 'Nábrežná',
            'number' => 37,
            'city' => 'Nové Zámky',
            'country' => 'sk'
        )
    )
));

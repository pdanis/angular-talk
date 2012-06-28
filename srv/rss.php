<?php

$xml = simplexml_load_file('http://novinky.cz/rss');
$data = array();

foreach($xml->channel->item as $item) {
    $data[] = array(
        'title' => (string) $item->title,
        'url' => (string) $item->link,
        'desc' => (string) $item->description,
        'date' => (string) $item->pubDate
    );
}

header('Content-Type: application/json');
echo json_encode($data);

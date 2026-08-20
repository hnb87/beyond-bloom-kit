<?php
// Optional Hostinger helper: writes the admin panel payload to /data/siteData.json
header('Content-Type: application/json');
$raw = file_get_contents('php://input');
$json = json_decode($raw, true);
if (!$json) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }
$target = dirname(__DIR__) . '/data/siteData.json';
if (!is_dir(dirname($target))) { mkdir(dirname($target), 0775, true); }
file_put_contents($target, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo json_encode(['ok' => true]);

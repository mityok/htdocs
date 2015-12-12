<?php
$jsondata = file_get_contents("php://input");
$path='../data';
if (!is_dir($path)) {
	mkdir($path);
}
file_put_contents($path.'/persistence.json', $jsondata);
?>
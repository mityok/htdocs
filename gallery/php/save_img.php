<?php
if (!isset($_GET['url']) || !isset($_GET['folder']) || !isset($_GET['name'])) {
	die ("Not set!");
}
$url=$_GET['url'];
$folder=$_GET['folder'];
$name=$_GET['name'];

$path='../'.$folder;
$full_path=$path.'/'.$name.'.jpg';
function curl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    $data = curl_exec($ch);
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if($httpCode == 404 || $httpCode == 304) {
		$data='error';
	}
    curl_close($ch);
    return $data;
}

if(is_file($full_path)){
	header("loading: from file");
}else{
	if (!is_dir($path)) {
		mkdir($path);
	}
	$content = curl($url);
	if($content != 'error'){
		header("loading: from server");
		file_put_contents($full_path, $content);
	}else{
		header("HTTP/1.0 404 Not Found");
		die ("Can't create Image!");
	}
}
header("Content-Type: image/jpeg");
readfile($full_path);
exit;
?>
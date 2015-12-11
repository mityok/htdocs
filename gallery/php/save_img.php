<?php

$content = file_get_contents('http://www.gstatic.com/webp/gallery/1.jpg');
$path='img2';
if (!is_dir($path)) {
mkdir($path);
}
file_put_contents($path.'/flower.jpg', $content);
?>
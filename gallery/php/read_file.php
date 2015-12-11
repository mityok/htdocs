<?php
$myfile = fopen("../data/galleries.txt", "r") or die("Unable to open file!");
header('Content-type: application/json');

echo fread($myfile,filesize("../data/galleries.txt"));
fclose($myfile);
?>
<?php

require_once('simple_html_dom.php');

$arr = array();

$html = file_get_html($_GET["url"]);

foreach($html->find('img') as $element) {
       $src=$element->src;
       $rest = substr($src, 0, -5);
       $pos = strrpos($src, "1.jpg");
	if ($pos !== false) { 
		array_push($arr,$rest);
	}
}

header('Content-type: application/json');


echo json_encode($arr);
?>
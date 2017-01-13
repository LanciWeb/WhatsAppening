<?php
$url = $_GET['url'];
header('Content-type: txt/xml');
seep(2);
if($fp = fopen($url, 'r')){
	while ($line = fread($fp, 1024)){
		echo $line;
	}
}
else{
	echo 'error';
}
?>
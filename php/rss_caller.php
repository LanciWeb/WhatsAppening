<?php
$feed = $_GET['feed'];
header('Content-Type: text/xml');
$readFeed = file_get_contents($feed);
echo $readFeed;
?>
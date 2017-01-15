<?php
$feed = $_GET['feed'];
$feed = 'http://xml.corriereobjects.it/rss/homepage.xml';
header('Content-Type: text/xml');
$readFeed = file_get_contents($feed);
echo $readFeed;
?>
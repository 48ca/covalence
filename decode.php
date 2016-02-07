<?php
$filename = "music/metadata.json";
$file = fopen($filename,"r") or die("Unable to open file");
$json = json_decode(fread($file,filesize($filename)),true);
foreach($json['files'] as $audio) {
	echo "<audio controls><source src='" . $audio . "'></audio>";
}
fclose($file);
?>

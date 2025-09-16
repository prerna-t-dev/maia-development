<?php
//* Permanently redirect page
header("Location: https://www.maiaestates.in/index.php?goto=contact",TRUE,301);
header("HTTP/1.1 301 Moved Permanently"); 
header("Location: https://www.maiaestates.in/index.php?goto=contact"); 
exit();
?>
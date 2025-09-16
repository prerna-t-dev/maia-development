<?php
    global $text, $maxchar, $end;
    function substrwords($text, $maxchar, $end='...') {
        /*if (strlen($text) > $maxchar || $text == '') {
            $words = preg_split('/div>', $text);      
            $output = '';
            $i      = 0;
            while (1) {
                $length = strlen($output)+strlen($words[$i]);
                if ($length > $maxchar) {
                    break;
                } else {
                    $output .= " " . $words[$i];
                    ++$i;
                }
            }
            $output .= $end;
        } else {
            $output = $text;
        }*/
        $words = preg_split("/[<\/div>][<a][</a>]/", $text,-1);
        $words[0] .= '</div>';
        $words[1] = preg_split("/<a/",$words[1],-1);
        echo $words[1][1];
        return $words;
    }
    $rss = new DOMDocument();
    $rss->load('http://maiapelicangrove.com/maianew/Maia/blog/feed/'); // <-- Change feed to your site
    $feed = array();
    foreach ($rss->getElementsByTagName('item') as $node) {
        $item = array ( 
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
            'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
            'date' => $node->getElementsByTagName('pubDate')->item(0)->nodeValue,
        );
        array_push($feed, $item);
    }

    $limit = 3; // <-- Change the number of posts shown
    for ($x=0; $x<$limit; $x++) {
        $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
        $link = $feed[$x]['link'];
        $description = $feed[$x]['desc'];
        $image = substrwords($description, 100);
        
        $date = date('l F d, Y', strtotime($feed[$x]['date']));
        echo '<div class=\"article-image\">'.$image[0].'</div>';
        echo '<p class=\"article-title\"><strong><a href="'.$link.'" title="'.$title.'">'.$title.'</a></strong><br />';
        echo '<small><em>Posted on '.$date.'</em></small></p>';
        echo '<div class="article-description">'.$image[1].'</div>';
    }
?>
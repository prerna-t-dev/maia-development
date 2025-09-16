<?php
// Simple admin page to view contact form submissions
$log_file = 'contact_submissions.log';

if (file_exists($log_file)) {
    $content = file_get_contents($log_file);
    echo "<h2>Contact Form Submissions</h2>";
    echo "<pre>" . htmlspecialchars($content) . "</pre>";
} else {
    echo "<h2>No submissions yet</h2>";
    echo "<p>No contact form submissions have been received yet.</p>";
}
?>

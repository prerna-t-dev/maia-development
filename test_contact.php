<?php
// Simple test script to check form data
header('Content-Type: application/json');

echo "POST Data received:\n";
print_r($_POST);

echo "\n\nServer Info:\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Mail function available: " . (function_exists('mail') ? 'Yes' : 'No') . "\n";

// Test basic mail function
$test_email = "prernatripathy.dev@gmail.com";
$test_subject = "Test Email from Maia Contact Form";
$test_message = "This is a test email to verify the contact form is working.\n\nTimestamp: " . date('Y-m-d H:i:s');

$headers = "From: test@maiaestates.com\r\n";
$headers .= "Reply-To: test@maiaestates.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mail_result = mail($test_email, $test_subject, $test_message, $headers);

echo "\nMail function test result: " . ($mail_result ? 'SUCCESS' : 'FAILED') . "\n";

if (!$mail_result) {
    echo "Last error: " . error_get_last()['message'] . "\n";
}
?>

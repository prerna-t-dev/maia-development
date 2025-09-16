<?php
// Test the contact form processing without email
header('Content-Type: application/json');

// Simulate form data
$_POST['contact-fullname'] = 'Test User';
$_POST['contact-email'] = 'test@example.com';
$_POST['contact-phone'] = '1234567890';
$_POST['contact-message'] = 'This is a test message';

// Include the contact mail script
include('contactmail.php');
?>

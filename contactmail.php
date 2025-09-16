<?php
header('Content-Type: application/json');

include("class.phpmailer.php");
include("class.smtp.php");

// Get form data
$name = $_POST['contact-fullname'];
$email = $_POST['contact-email'];
$phone = $_POST['contact-phone'];
$message = $_POST['contact-message'];

// Validate required fields
if(empty($name) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit();
}

// Validate email format
if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit();
}

// Create email message (same format as original forms)
$email_message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nPhone: ". $phone ."\r\nMessage: ". $message ."\r\n";
$subject = "Maia Website - Contact Form Submission";

// Send email using PHPMailer (same as original forms)
$mail = new PHPMailer(); // create a new object
$mail->SetFrom("contact@maiaestates.in", "Maia Website", false);
$mail->Subject = $subject;
$mail->Body = $email_message;
$mail->AddAddress("prernatripathy.dev@gmail.com");
$mail->AddCC("tripathyprernamayee95@gmail.com");

if(!$mail->Send()) {
    echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
} else {
    echo json_encode(['success' => true, 'message' => 'Thank you for your message! We will get back to you shortly.']);
}
?>

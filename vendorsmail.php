<?php
include("class.phpmailer.php");
include("class.smtp.php");

    $name = $_POST['fullname4'];
    $email = $_POST['email4'];
    $number = $_POST['number4'];
    $comments = $_POST['comments4'];
    $phcode = $_POST['phcode'];
    $message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nNumber: ". $number ."\r\nCountry Code: ". $phcode ."\r\nComments: ". $comments ."\r\n";
    $subject = "Maia Website - Vendors Enquiry";
    $headers = "";
    if(empty($_POST['fullname4']) || empty($_POST['email4']))
    {
    echo "<script>alert(\"All fields required\");</script>";
    
    }
    else{
/*$sendto = "getintouch@maiarealestate.in"; //getintouch@maiarealestate.in
$result = mail($sendto,$subject,$message, $headers);
if(!$result) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }*/
// $mail->AddCC("nitinj@maiaestates.in");

// =====================================================================

$mail = new PHPMailer(); // create a new object
$mail->SetFrom("collaboration@maiaestates.in");
$mail->Subject = $subject;
$mail->Body = $message;
$mail->AddAddress("vendor@maiaestates.in");
// $mail->AddCC("getintouch@maiaestates.in");
// $mail->AddCC("27Summitcrm@maiaestates.in");
$mail->AddCC("kishorb@maiapelicangrove.com");
$mail->AddCC("sachinp@maiaestates.in");
$mail->AddCC("chaitrak@maiapelicangrove.com");
if(!$mail->Send()) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }
    }
    
?>
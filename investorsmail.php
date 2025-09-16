<?php
include("class.phpmailer.php");
include("class.smtp.php");

    $name = $_POST['fullname3'];
    $email = $_POST['email3'];
    $number = $_POST['number3'];
    $comments = $_POST['comments3'];
    $phcode = $_POST['phcode'];
    $message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nNumber: ". $number ."\r\nCountry Code: ". $phcode ."\r\nComments: ". $comments ."\r\n";
    $subject = "Maia Website - Investors Enquiry";
    $headers = "";
    if(empty($_POST['fullname3']) || empty($_POST['email3']))
    {
    echo "<script>alert(\"All fields required\");</script>";
    
    }
    else{
        /*$sendto = "adityac@maiaestates.in"; //rahulr@maiaestates.in
$result = mail($sendto,$subject,$message, $headers);
if(!$result) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }*/
//  $mail->AddCC("nitinj@maiaestates.in");

// ======================================================

$mail = new PHPMailer(); // create a new object
$mail->SetFrom("investor@maiaestates.in");
$mail->Subject = $subject;
$mail->Body = $message;
$mail->AddAddress("businessdev@maiaestates.in");
$mail->AddCC("getintouch@maiaestates.in");
$mail->AddCC("27Summitcrm@maiaestates.in");
$mail->AddCC("adityac@maiaestates.in");
$mail->AddCC("pranavk@maiaestates.in");

if(!$mail->Send()) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }

    }
    
?>
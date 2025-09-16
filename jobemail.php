<?php
include("class.phpmailer.php");
include("class.smtp.php");

    $name = $_POST['fullname'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $comments = $_POST['comments'];
    $phcode = $_POST['phcode'];
    $role = $_POST['role'];
    $file_tmp = $_FILES['ufile']['tmp_name'];
    $file_name = $_FILES['ufile']['name'];

    $message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nNumber: ". $number ."\r\nComments: ". $comments ."\r\nRole: ". $role ."\r\n";
    $subject = "Maia Website - ". $role ." Job Enquiry";
    $headers = "";
    if(empty($_POST['fullname1']) || empty($_POST['email1']))
    {
    echo "<script>alert(\"All fields required\");</script>";
    
    }
    //$result = mail($sendto,$subject,$message, $headers);
$mail = new PHPMailer(); // create a new object
$mail->SetFrom("candidate@maiaestates.in");
$mail->Subject = $subject;
$mail->AddAttachment($file_tmp,$file_name);
$mail->Body = $message;
$mail->AddAddress("recruitment@maiaestates.in");//hr@maiaestates.in
$mail->AddCC("tarar@maiaestates.in");
$mail->AddCC("rinikas@maiaestates.in");
$mail->AddCC("nishac@maiaestates.in");
$mail->AddCC("nitinj@maiaestates.in");
if(!$mail->Send()) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }

?>
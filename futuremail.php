<?php
include("class.phpmailer.php");
include("class.smtp.php");

    $name = $_POST['fullname1'];
    $email = $_POST['email1'];
    $number = $_POST['number1'];
    $comments = $_POST['comments1'];
    $phcode = $_POST['phcode'];
    //$role = $_POST['role1'];
    $file_tmp = $_FILES['ufile']['tmp_name'];
    $file_name = $_FILES['ufile']['name'];

    $message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nNumber: ". $number ."\r\nCountry Code: ". $phcode ."\r\nComments: ". $comments ."\r\n";
    $subject = "Maia Website - Future Teammates Enquiry";
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
// $mail->AddCC("nitinj@maiaestates.in");
if(!$mail->Send()) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }

?>
<?php
include("class.phpmailer.php");
include("class.smtp.php");

    $name = $_POST['fullname2'];
    $email = $_POST['email2'];
    $number = $_POST['number2'];
    $comments = $_POST['comments2'];
    $phcode = $_POST['phcode'];
    $message = "Name :" . $name . "\r\nEmail: ". $email ."\r\nNumber: ". $number ."\r\nCountry Code: ". $phcode ."\r\nComments: ". $comments ."\r\n";
    $subject = "Maia Website - Client Enquiry";
    $headers = "";
    if(empty($_POST['fullname2']) || empty($_POST['email2']))
    {
    echo "<script>alert(\"All fields required\");</script>";
    
    }
    else{
/*$sendto = "";
$result = mail($sendto,$subject,$message, $headers);
if(!$result) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }*/
 
//  $mail->AddCC("nitinj@maiaestates.in");
// $mail->AddCC("Macebethc@maiaestates.in");

// =====================================================
 $mail = new PHPMailer(); // create a new object
$mail->SetFrom("leads@maiaestates.in","Maia Website", false);
$mail->Subject = $subject;
$mail->Body = $message;
$mail->AddAddress("getintouch@maiaestates.in");
$mail->AddAddress("27Summitcrm@maiaestates.in");
$mail->AddCC("vipuls@maiapelicangrove.com");
$mail->AddCC("tanyab@maiaestates.in");
if(!$mail->Send()) {
    echo "<script>alert(\"Mailer Error: " . $mail->ErrorInfo ."\");</script>";
 } else {
    echo "<script>alert(\"Thank you, Our team will get in touch with you shortly.\")</script>";
 }
 /*$vars = array("userName" => $name,
           "userEmail" =>  $email ,
           "userPhone" => $number ,
           "comment" => $comments
           );
 echo "'".json_encode($vars)."'";
*/
echo $phcode;
$i = 0;
$countcode = '';
echo strlen($phcode);
for($i;$i<strlen($phcode);$i++){
    echo $phcode[$i]." ";
    if(is_numeric($phcode[$i])){
        $countcode .= $phcode[$i];
    }
    
}
echo $countcode;
$vars = "{\"userName\":\"".$name."\",\"userEmail\":\"".$email."\",\"userPhone\":\"".$number."\",\"comment\":\"".$comments."\",\"userPhoneCode\":\"".$countcode."\"}";
echo $vars;
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.reroot.in/api/external/quick-registration',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $vars,
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'x-access-token: 9c07c255-1bcf-46ea-9651-55a4a44db98e'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

    }
    
?>
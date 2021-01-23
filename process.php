<?php
  if (isset($_POST['email']))  {
  
    //Email information
    $admin_email = "englishlanden@gmail.com";
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    
    //send email
    mail($admin_email, "Potential Client", $phone, "From:" . $email);
    
    header('Location: http://landenenglish.com/success.html');
  }
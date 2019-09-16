<?php
// mb_internal_encoding("UTF-8");
// ini_set('error_reporting', E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;

    require_once($_SERVER['DOCUMENT_ROOT'] . '/smartlid/php/config.php');
    
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (isset($_POST['name']) ) {
        if($nameIsRequired && empty($_POST['name'])) {
            echo 'attantion';
            die;
        } else {
            if (!empty($_POST['name'])) {
                $name = "<b>Имя: </b>" . strip_tags($_POST['name']) . "<br>";
            }
            
        }
    }

    if (isset($_POST['tel']) ) {
        if($telIsRequired && empty($_POST['tel'])) {
            echo 'attantion';
            die;
        } else {
            if (!empty($_POST['tel'])) {
                $tel = "<b>Телефон: </b> " . strip_tags($_POST['tel']) . "<br>";
            }
        }
    }

    if (isset($_POST['email']) ) {
        if($emailIsRequired && empty($_POST['email'])) {
            echo 'attantion';
            die;
        } else {
            if (!empty($_POST['email'])) {
                $email = "<b>Почта: </b> " . strip_tags($_POST['email']) . "<br>";
            }
        } 
    }
    
    if (isset($_POST['agreement'])) {
        $agreement = "<br><b>Даю согласие на обработку персональных данных</b>";
    }  
        
    
    
    if (isset($_POST['text'])) {
        if (!empty($_POST['text'])) {
            $text = "<b>Сообщение: </b> " . strip_tags($_POST['text']) . "<br>";
        }
    }

    if (isset($_POST['ref'])) {
      $ref = "<b>Искточник перехода на сайт: </b> " . strip_tags($_POST['ref']) . "<br>";
    }

    if (defined('HOST')) {
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = HOST; 
        $mail->SMTPAuth = true; 
        $mail->Username = LOGIN;
        $mail->Password = PASS;
        $mail->SMTPSecure = 'ssl'; 
        $mail->Port = PORT;
    } else {
        $mail = new PHPMailer;
    }
    
    $mail->setFrom(SENDER);
    $mail->addAddress(CATCHER);
    if(defined(CATCHER2)){
        $mail->addAddress(CATCHER2);
    }
    $mail->CharSet = CHARSET;
    $mail->isHTML(true); 
    $mail->Subject = SUBJECT; // Заголовок письма
    
    // Прикрепление файлов
    for ($ct = 0; $ct < count($_FILES['files']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['files']['name'][$ct]));
        $filename = $_FILES['files']['name'][$ct];
            if (move_uploaded_file($_FILES['files']['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
            } else {
                $msg .= 'failfile';
            }
    } 
    

    $mail->Body = "
            $name
            $email
            $tel
            $text
            $ref
            $agreement

    "; // Текст письма
        // Результат
        if(!$mail->send()) {
            echo 'attantion';
        } else {
            // echo '<p class="smartlid__respond-success">' . SUCCESSMSGS . '</p>';
            echo 'successmsgs';
        }

    
} else{
    header ("Location: /"); // главная страница вашего лендинга
}
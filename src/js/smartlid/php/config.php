<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/smartlid/php/phpmailer/phpmailer.php');

    // Основные настройки для отправки письма

    // *********** Если используете SMTP

    // ** Пример для SMTP-YANDEX.
    // const HOST = 'ssl://smtp.yandex.ru';
    // const LOGIN = 'sender';
    // const PASS = 'XXXXXXXXXX';
    // const PORT = 465;


    /// ** Пример для SMTP-MAIL.RU
    // const HOST = 'ssl://smtp.mail.ru';
    // const LOGIN = 'sender@mail.ru';
    // const PASS = 'XXXXXXXXXXX';
    // const PORT = 465;




    // ** Раскомментируйте (уберите слеши) и заполните данные, как в примере выше, а также не забудьте раскоментировать строку с require_once...

    // const HOST = '';
    // const LOGIN = '';
    // const PASS = '';
    // const PORT = '';
    // require_once($_SERVER['DOCUMENT_ROOT'] . '/smartlid/php/phpmailer/smtp.php');

    const SENDER = 'mail@xn----itbqaddhieby3a1eue.xn--p1ai';
    const CATCHER = 'evgeniy.yablochkin@gmail.com';
    // const CATCHER2 = 'catcher2@list.ru';
    const SUBJECT = 'Заявка с сайта';
    const CHARSET = 'UTF-8';

    $nameIsRequired = false;
    $telIsRequired = true;
    $emailIsRequired = true;
    // $textIsRequired = false;

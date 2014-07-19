<?php
  // Скрипт посвещается Роману, который уехал в Турцию.
  $json = $_POST[data];
  $arr = (array)(json_decode($json));
  if($arr["secret"] == "2f7d9f0d0acf89a8f6a57d79f0f7d475")
  {
    $email = "gufic@mail.ru";
    $subject = "Сообщение с сайта ВладЧудо";
    $header = "Content-type: text/html; charset=utf-8; \r\n";

    $message = "Новое сообщение с сайта ВладЧудо<br>" .
    "<b>Имя: </b>" . $arr["name"] . "<br>" .
    "<b>Телефон: </b>" . $arr["phone"] . "<br>" .
    "<b>E-mail: </b>" . $arr["mail"];

    $send = mail($email, $subject, $message, $header);
    echo ( $send ? "All ok" : "Error" );
  }
?>

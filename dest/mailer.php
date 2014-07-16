<?php
if (is_ajax()) {
  if (isset($_POST["secret"])) {
  // if (isset($_POST["secret"]) && $_POST["secret"] == "2f7d9f0d0acf89a8f6a57d79f0f7d475") {

    echo '{"success":"true","message":"Message sent successfully to ' . $_POST["secret"] . '."}';


    // $action = $_POST["action"];
    // switch($action) {
    //   case "test": test_function(); break;
    // }
  }
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function test_function(){
  $return = $_POST;

  //Do what you need to do with the info. The following are some examples.
  //if ($return["favorite_beverage"] == ""){
  //  $return["favorite_beverage"] = "Coke";
  //}
  //$return["favorite_restaurant"] = "McDonald's";

  $return["json"] = json_encode($return);
  echo json_encode($return);
}
?>

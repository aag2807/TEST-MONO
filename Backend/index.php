<?php
require __DIR__ . "/inc/bootstrap.php";
require __DIR__ . "/controller/contactController.php";
require "./util/cors.php";

cors();

$uri = $_SERVER['REQUEST_URI'];

$objFeedController = new ContactController();

if ($uri == "/contacts/all" ) {
    return $objFeedController->listContacts();

}else if ($uri == "/contacts/add") {
    $entityBody = json_decode(file_get_contents('php://input'), true);
    
    $id =$entityBody["id"];
    $name =$entityBody["firstName"];
    $lastName =$entityBody["lastName"];
    $email =$entityBody["email"];
    $phone = $entityBody["phone"];

    return $objFeedController->addContact($id, $name, $lastName, $email, $phone);
    
}else if (strpos($uri, '/contacts/get-by-id') !== false) 
{
    $id = $_GET["id"];
    return $objFeedController->getContactByID($id);

}else if (strpos($uri, '/contacts/delete-by-id') !== false)
{

    $id = $_GET["id"];
    return $objFeedController->deleteContact($id);
    
}else {
    header("HTTP/1.1 404 Not Found");
    echo "404 Not Found";
    exit();
}

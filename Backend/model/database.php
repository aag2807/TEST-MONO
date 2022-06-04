<?php
    require_once './inc/config.php';

    class MyDB extends SQLite3 {
      function __construct() {
        $this->open(Config::DB_SQLITE_NAME);
      }
   }

   $db = new MyDB();

   if(!$db) {
      echo $db->lastErrorMsg();
   } 

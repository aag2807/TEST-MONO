<?php
    require './model/database.php';

class ContactModel extends MyDB
{

    public function getContacts()
    {
        $arrToReturn = [];

        $results =  $this->query("SELECT * FROM contacts");
        
        while ($row = $results->fetchArray()) {
            $phone_query = sprintf('SELECT * FROM phone WHERE contact_id = "%s"', $row['id']);
            $phoneResults = $this->query($phone_query);
            $phone = [];

            while ($phoneRow = $phoneResults->fetchArray()) {
                $phone[] = $phoneRow["content"];
            }

            $data = [
              "firstName" => $row['firstName'],  
              "lastName" => $row['lastName'],  
              "id" => $row['id'],  
              "email" => $row['email'],
              "phone" => $phone
            ];

            array_push($arrToReturn, $data);
        }

        return $arrToReturn;
    }

    public function getContactByID($id)
    {
        $local_query = sprintf('SELECT * FROM contacts WHERE id = "%s"', $id);
        $query_results = $this->query($local_query)->fetchArray();
        $phone_query = sprintf('SELECT * FROM phone WHERE contact_id = "%s"', $id);
        $phoneResults = $this->query($phone_query);
        $phone = [];

        while ($phoneRow = $phoneResults->fetchArray()) {
            $phone[] = $phoneRow["content"];
        }

        $data = [
          "firstName" => $query_results['firstName'],  
          "lastName" => $query_results['lastName'],  
          "id" => $query_results['id'],  
          "email" => $query_results['email'],
          "phone" => $phone
        ];
        return $data;
    }

    public function addContact($id,$name, $lastname,  $email, $phonenumbers)
    {
        $contact_query = sprintf("INSERT INTO contacts (id, firstName, lastName, email) VALUES ('%s', '%s', '%s', '%s')", $id, $name, $lastname, $email);
        
        $this->exec($contact_query);

        foreach($phonenumbers as $phone)
        {
            $phone_query = sprintf('INSERT INTO phone (content, contact_id) VALUES ("%s", "%s")', $phone, $id);
            $this->exec($phone_query);
        }
        
        return [
            "message" => sprintf("created contact with id: %s", $id)
        ];
    } 

    public function deleteContact($id)
    {
  
        $phone_query = sprintf('DELETE FROM phone WHERE contact_id = "%s"', $id);
        $phone_result = $this->exec($phone_query);
        $local_query = sprintf('DELETE FROM contacts WHERE id = "%s"', $id);
        $this->exec($local_query);

        return json_encode([
            "message" => sprintf("deleted entry with id: %s", $id)
        ]);
    }
}

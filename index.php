<?php 
    /*include "includes/dbconnect.php";
    echo 'Welcome to local town area ...<br><br>';
    
    if (custom_my_sql_errno()) {
        echo "Failed to connect to MySQL: " . custom_my_sql_error();
    } else {
        $resCheck = custom_my_sql_query($mysqliObj, "SELECT * FROM user_account WHERE 1");
        
        while($rowdataOld = custom_my_sql_fetch_assoc($resCheck)) {
            var_dump('<br>', $rowdataOld);
        }
    }
    custom_my_sql_close($mysqliObj);
    
    echo '<br><br>';*/
    ini_set("display_errors", 1);
    error_reporting(E_ERROR);
    $process = curl_init('http://api.gassgadget.com/public/testSaud?user_id=2');
    //$process = curl_init('http://api-localhost.saudrashid.com/testSaud');
    
    curl_setopt($process, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
    curl_setopt($process, CURLOPT_HEADER, 0);
    curl_setopt($process, CURLOPT_USERPWD, 'saud' . ":" . 'Hello@123');
    curl_setopt($process, CURLOPT_TIMEOUT, 30);
    curl_setopt($process, CURLOPT_POST, 0);
    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
    $return = curl_exec($process);
    curl_close($process);
    
    var_dump($return);
?>
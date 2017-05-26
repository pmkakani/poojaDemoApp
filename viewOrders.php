<?php
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
?>

<?php 
session_start();
include_once('connection.php') ; ?>
<?php include('config.php')?>

<?php
	
$sql = mysql_query("select a.*,
                    GROUP_CONCAT(
                     DISTINCT CONCAT(b.product_id,'-',b.quantity) 
                     ORDER BY b.order_id 
                     SEPARATOR ';'
	               ) as product_details
                   from order_table a, order_details b 
                   where a.order_id=b.order_id
                   group by a.order_id")
                   or die(mysql_error());

$data = array();

while($row = mysql_fetch_array($sql)){
$data[] = array("order_id" => $row['order_id'],
				"email" => $row['email'],
                "address" => $row['address'],
				"mobile_number" => $row['mobile_number'],	
                "product_details" => $row['product_details']
		     	);
}

$data = array("orderDetails" => $data);

echo json_encode($data);


?>


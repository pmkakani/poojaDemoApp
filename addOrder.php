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
$data = json_decode(file_get_contents("php://input"));
$email = mysql_real_escape_string($data->email);
$address = mysql_real_escape_string($data->address);
$mobile_number = mysql_real_escape_string($data->mobile_number);
$order_date = mysql_real_escape_string($data->order_date);
$products_details = mysql_real_escape_string($data->products_details);

$product_details_array = explode( ';', $products_details);

$product_count = count($product_details_array);

$order_date = date('Y-m-d', strtotime(str_replace('-', '/', $order_date)));

if (empty($mobile_number)) {
	$arr= array('msg' => "", 'error' => 'Please fill in your mobile number');
	$jsn = json_encode($arr);
	print_r($jsn);
} 
else {

	$qry_em = 'select count(*) as cnt from order_table where $mobile_number ="' . mobile_number . '" and order_date ="' . $order_date . '"';
		$qry_res = mysql_query($qry_em);
		$res = mysql_fetch_assoc($qry_res);
		 
		if ($res['cnt'] == 0) {
			$qry = 'INSERT INTO order_table (email,address,mobile_number,order_date_time) values ("' . $email . '","' . $address . '","' . $mobile_number . '","' . $order_date . '")';
			$qry_res = mysql_query($qry);
			if ($qry_res) {
                $last_inserted_id = mysql_insert_id();
                $query='INSERT INTO order_details (order_id,product_id,quantity) values ';             
                for ($x = 1; $x <= $product_count; $x++) {
                     $product_id_count = explode( '-', $product_details_array[$x-1]);
                     $product_id = $product_id_count[0];
                     $product_quantity = $product_id_count[1];     
                     if ($x != $product_count){
                        $query.='("' . $last_inserted_id . '","' . $product_id . '","' . $product_quantity . '"),';
                     } else {
                         $query.='("' . $last_inserted_id . '","' . $product_id . '","' . $product_quantity . '")';
                     }
                }  
                
                $query_res=mysql_query($query);
                
                if ($query_res) {                
                        $arr = array('msg' => "Order Placed Successfully. We will contact you shortly!!!", 'error' => '');
                        $jsn = json_encode($arr);
                        print_r($jsn);
                } 
                else {
                        $arr = array('msg' => "", 'error' => 'We have saved your details. There was error processing order. Will contact shortly '.mysql_error());
                        $jsn = json_encode($arr);
                        print_r($jsn);
			     }
			} else {
				$arr = array('msg' => "", 'error' => 'Error processing the order. Please try again later'.mysql_error());
				$jsn = json_encode($arr);
				print_r($jsn);
			}
		} else {
			$arr = array('msg' => "", 'error' => 'Order already exists');
			$jsn = json_encode($arr);
			print_r($jsn);
		}
}
?>



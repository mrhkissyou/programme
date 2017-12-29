<?php 
	$con = mysqli_connect('127.0.0.1','root','123456','itcast');
    if(!$con){
      echo '数据库连接失败';
    }
    $sql_sel = "select * from test;";

    $query = mysqli_query($con,$sql_sel);

    if(!$query){
      echo '查询失败,语法有问题';
    }
    while($result = mysqli_fetch_assoc($query)){
    	$arr[] = $result;
    }
    var_dump($arr);

 ?>
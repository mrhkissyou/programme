<?php 

	if($_SERVER['REQUEST_METHOD'] === 'POST'){ 
		test_params();
	}

	function test_params(){
		if( !isset($_POST['username']) || trim($_POST['username']) === ''){
			echo json_encode(array("flag" => 2));
			return;
		}

		$username = $_POST['username'];

		if( !isset($_POST['password']) || trim($_POST['password']) === ''){
			echo json_encode(array("flag" => 2));
			return;
		}

		$password = $_POST['password'];

		$connect = mysqli_connect('127.0.0.1','root','root','baixiu');

		if(!$connect){
			die('连接失败');
		}

		$query = mysqli_query($connect,"select * from user where username = '{username}'");

		if(!$query){
			die('查询失败');
		}

		$result = mysqli_fetch_assoc($query);
		if(!$result){
			echo json_encode(array("flag" => 2));
			return;
		}

		if( $result['password'] !== $password){
			echo json_encode(array("flag" => 2));
			return;
		}

		echo json_encode(array("flag" => 1));
	}
		


 ?>

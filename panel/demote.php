<?php
session_start();
if(!isset($_SESSION['username'], $_SESSION['password'])) {
	header("Location: index.php");
} else {
	$username = $_POST['uname'];
	try {
		
	$check = $db->prepare("SELECT * from `penguins` WHERE Username = :Username AND badgeLevel >= 3");
	$check->bindParam(':Username', $username);
	$check->execute();
	if($check->rowCount() == 0) {
		header("Location: staff.php?r=0");
	} else {
		$demote = $db->prepare("UPDATE `penguins` SET badgeLevel = 1, Moderator = 0 WHERE Username = :Username");
		$demote->bindParam(':Username', $username);
		$demote->execute();
		header("Location: staff.php?r=1");
	}
	
	} catch (Exception $e) {
		die("Database error");
	}
}
?>
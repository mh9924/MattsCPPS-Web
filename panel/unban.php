<?php
session_start();
if(!isset($_SESSION['username'], $_SESSION['password'])) {
	header("Location: index.php");
} else {
	$username = $_POST['uname'];
	try {
	$unban = $db->prepare("UPDATE `penguins` SET Banned = 0 WHERE Username = :Username");
	$unban->bindParam(':Username', $username);
	$unban->execute();
	header("Location: bans.php?v=a");
	} catch (Exception $e) {
		die("Database error");
	}
}
?>
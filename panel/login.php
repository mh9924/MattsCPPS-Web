<?php
require_once "recaptchalib.php";
$secret = "Secret Captcha Here";
	$response = null;
	$reCaptcha = new reCaptcha($secret);
	if ($_POST["g-recaptcha-response"]) {
		$response = $reCaptcha->verifyResponse(
			$_SERVER["REMOTE_ADDR"],
			$_POST["g-recaptcha-response"]
    );
}

if(isset($_POST['username'], $_POST['password'])) {
	$username = $_POST['username'];
	$hashedPassword = strtoupper(md5($_POST['password']));
	try {
		$login = $db->prepare("SELECT * from `penguins` WHERE username = :username AND password = :hashedPassword AND badgeLevel >= 5");
		$login->bindParam(':username', $username);
		$login->bindParam(':hashedPassword', $hashedPassword);
		$login->execute();
	} catch (Exception $e) {
		die("Database error");
	}
	if($login->rowCount() == 1) {
		if ($response != null && $response->success) {
			session_start();
			$_SESSION['username'] = $_POST['username'];
			$_SESSION['password'] = $_POST['password'];
			header("Location: home.php");
		} else {
			header("Location: index.php?li=c");
		}
	} else {
		header("Location: index.php?li=p");
	}
} else {
	header("Location: index.php");
}
?>
<?php
session_start();
if(isset($_SESSION['username'], $_SESSION['password'])) {
	header("Location: home.php");
}
else {
?>
<html>
<head>
<title>Matt's CPPS | Admin Panel</title>
<script src='https://www.google.com/recaptcha/api.js'></script>
<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
<link type="text/css" rel="stylesheet" href="../../fonts.css" media="all">
<style>
h1 {
	color: white;
	font-family: waltograph;
}
mark {
	color: white;
	background-color: red;
	font-family: burbank;
}
</style>
</head>
<body style="text-align: center;margin-top:100px;font-family: Arial;background-color: #222222;">
<img src="../../play/start/style/matts-cpps-logo.png">
<h1>Login To Panel</h1>
<?php if($_GET['li'] == "p") { ?>
<mark>Invalid Username/Password</mark>
<br />
<br />
<?php } ?>
<?php if($_GET['li'] == "c") { ?>
<mark>Invalid Captcha</mark>
<br />
<br />
<?php } ?>
<form action="login.php" method="post" class="pure-form">
<input type="text" name="username" id="username" maxlength="12" placeholder="Username">
<br />
<input type="password" name="password" id="password" maxlength="32" placeholder="Password">
<br />
<br />
<center><div class="g-recaptcha" data-theme="dark" data-sitekey="6LdSqBMTAAAAAMW9QBYwdKkvtAamyUUjA-TOFtWX"></div></center>
<br />
<button type="submit" class="pure-button pure-button-primary">Login</button>
</body>
</html>
<?php } ?>
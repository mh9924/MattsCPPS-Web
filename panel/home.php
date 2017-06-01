<?php
session_start();
if(!isset($_SESSION['username'], $_SESSION['password'])) {
	header("Location: index.php");
} else {
?>
<html lang="en"><head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Matt's CPPS | Admin Panel</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="css/plugins/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">
        <!-- Navigation -->
        <nav class="navbar navbar-dark bg-inverse navbar-fixed-top">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button class="navbar-toggler hidden-sm-up pull-sm-right" type="button" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    ☰
                </button> <img src="http://mattscpps.us/play/start/style/matts-cpps-logo.png" width="166" height="44">
            <!-- Top Menu Items -->
            <ul class="nav navbar-nav top-nav navbar-right pull-xs-right">
                <li class="dropdown nav-item">
                    <a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <?php echo $_SESSION['username']; ?> <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">
                            <a href="logout.php"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>
			</div>
            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-toggleable-sm navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav list-group">
					<br />
                    <li class="list-group-item">
                        <a href="home.php"><i class="fa fa-fw fa-dashboard"></i> Home</a>
                    </li>
                    <li class="list-group-item">
                        <a href="chat.php"><i class="fa fa-fw fa-wrench"></i> Chat Logs</a>
                    </li>
                    <li class="list-group-item">
                        <a href="bans.php"><i class="fa fa-fw fa-wrench"></i> Manage Bans</a>
                    </li>
					<li class="list-group-item">
                        <a href="staff.php"><i class="fa fa-fw fa-wrench"></i> Demote Staff</a>
                    </li>
					<li class="list-group-item">
                        <a href="http://mattscpps.us/blog/posts/admin-writenew-post/" target="_blank"><i class="fa fa-fw fa-edit"></i> New Blog Post</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">

            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Admin Panel
                        </h1>
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-dashboard"></i> Home
                            </li>
                        </ol>
                    </div>
                </div>
				<b>Welcome to the Matt's CPPS Admin Panel.</b> Here you can make special administrative changes on the CPPS. This panel is for staff leaders only.
				<br />
				<center>
				<img src="http://mattscpps.us/avatar/?swid=
				<?php
				$username = $_SESSION['username'];
				try {
				$avatar = $db->prepare("SELECT * FROM `penguins` WHERE Username = :Username");
				$avatar->bindParam(':Username', $username);
				$avatar->execute();
				$row = $avatar->fetch(PDO::FETCH_ASSOC);
				echo $row['SWID'];
				} catch (Exception $e) {
					die("Couldn't get SWID");
				}
				?>
				&size=300">
				</center>
				<h2>Matt's CPPS Rules</h2>
				<br />
				<ol>
				<li>Respect others and do not use excessive swearing or harsh language. No spamming. Harassment of any kind will be dealt with. <b>(Warning/Kick/Ban)</b></li>
				<br />
				<li>Do not constantly ask for staff. If you wish to apply, please see the staff page. We do not provide a template for applications. <b>(Warning/Kick)</b></li>
				<br />
				<li>Staff members and VIP users should not abuse their powers (obviously). Please note that constantly using the SWF/bot commands can become annoying. <b>(Warning/Demote)</b></li>
				<br />
				<li>If you need help, private-chat a staff member on Xat. Do not use the main chat or we probably won't see it. <b>(Kick)</b></li>
				<br />
				<li>Do not attempt to cheat, exploit, or circumvent the security of the CPPS or chat. Do not DISCUSS or encourage cheating, DDoSing, doxing, or anything hacking-related in nature regarding CPPSes. <b>(Temporary/Forever/IP Ban)</b></li>
				<br />
				</ol>
				<h2>Email Information</h2>
				<ul>
				<li>The official email for Matt's CPPS is postmaster@mattscpps.us</li>
				<li>The login email is officialmattscpps@gmail.com</li>
				<li>Contact Matt for password</li>
				</ul>
            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="js/plugins/morris/raphael.min.js"></script>
    <script src="js/plugins/morris/morris.min.js"></script>
    <script src="js/plugins/morris/morris-data.js"></script>




</body></html>
<?php } ?>
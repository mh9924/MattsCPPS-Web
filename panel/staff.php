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
                                <i class="fa fa-wrench"></i> Demote Staff
                            </li>
                        </ol>
                    </div>
                </div>
				<?php if ($_GET['r'] == '1') { echo '
				<div class="alert alert-success">
                    <strong>Demoted:</strong> Staff member was successfully demoted
                </div>
				';
				}
				if ($_GET['r'] == '0') { echo '
				<div class="alert alert-danger">
                    <strong>Error:</strong> Staff member not found
                </div>
				';
				}
				?>
				This page is for demoting inactive staff.
				<br />
				Changing one's rank otherwise must be done in-game while they are online.
				<br />
				<br />
				<form action="demote.php" method="post"><input class="form-control" style="width:180px;display: inline;" type="text" placeholder="Username" maxlength="12" name="uname" id="uname"> <input class="btn btn-primary" type="submit" value="Make Member"></form>
				<br />
				<h2>Staff List</h2>
				<strong>Rank 6 - Creators:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 6");
				$leaders->execute();
				while ($row = $leaders->fetch(PDO::FETCH_ASSOC)) {
					echo $row['Username'] . "<br />";
				}
				} catch (Exception $e) {
					die("Could not list staff leaders/bloggers");
				}
				?>
				<br />
				<strong>Rank 5 - Staff Leaders/Bloggers:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 5");
				$leaders->execute();
				while ($row = $leaders->fetch(PDO::FETCH_ASSOC)) {
					echo $row['Username'] . "<br />";
				}
				} catch (Exception $e) {
					die("Could not list staff leaders/bloggers");
				}
				?>
				<br />
				<strong>Rank 4 - Owners:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 4");
				$leaders->execute();
				while ($row = $leaders->fetch(PDO::FETCH_ASSOC)) {
					echo $row['Username'] . "<br />";
				}
				} catch (Exception $e) {
					die("Could not list owners");
				}
				?>
				<br />
				<strong>Rank 3 - Moderators:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 3");
				$leaders->execute();
				while ($row = $leaders->fetch(PDO::FETCH_ASSOC)) {
					echo $row['Username'] . "<br />";
				}
				} catch (Exception $e) {
					die("Could not list moderators");
				}
				?>
				<br />
				<strong>Rank 2 - VIPs:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 2");
				$leaders->execute();
				echo $leaders->rowCount();
				} catch (Exception $e) {
					die("Could not count VIPs");
				}
				?> users
				<br />
				<br />
				<strong>Rank 1 - Members:</strong>
				<br />
				<?php
				try {
				$leaders = $db->prepare("SELECT * from `penguins` WHERE badgeLevel = 1");
				$leaders->execute();
				echo $leaders->rowCount();
				} catch (Exception $e) {
					die("Could not count members");
				}
				?> users
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
</body>
</html>
<?php } ?>
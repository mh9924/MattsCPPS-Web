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
                                <i class="fa fa-wrench"></i> Manage Bans
                            </li>
                        </ol>
                    </div>
                </div>
<b>Viewing:</b> <select class="form-control" style="width: 140px;display: inline;" onChange="window.location.href=this.value"><option value="bans.php">Ban History</option><option value="bans.php?v=a"<?php if ($_GET['v'] == 'a') { echo " selected"; } ?>>Active Bans</option></select>
<br />
<br />
Forever bans can only be confirmed/reversed by Matt.
<br />
<div class="table-responsive">
<table border class="table table-bordered table-hover">
<tbody>
<?php if($_GET['v'] !== 'a') { ?>
<tr>
<td><b>ID</b></td><td><b>Moderator</b></td><td><b>Player</b></td><td><b>Comment</b></td><td><b>Time</b></td><td><b>Banned On</b></td>
</tr>
<?php
try {
$query = $db->prepare("SELECT * FROM `bans` ORDER BY ID DESC");
$query->execute();
while ($row = $query->fetch(PDO::FETCH_ASSOC))
{
	$id = $row['ID'];
	$moderator = $row['Moderator'];
	$playerid = $row['Player'];
	$getName = $db->prepare("SELECT * FROM `penguins` WHERE ID = :Player");
	$getName->bindParam(':Player', $playerid);
	$getName->execute();
	$column = $getName->fetch(PDO::FETCH_ASSOC);
	$player = $column['Username'];
	$comment = htmlentities($row['Comment']);
	$expiration = $row['Expiration'] . " hours";
	if($expiration == "0 hours") {
		if($column['Password'] == "") {
			$expiration = "Forever"; 
		} else {
			$expiration = "Requested forever ban";
		}
	}
	$time = date('Y-m-d H:i:s', $row['Time']);
	echo "
	<tr>
	<td width=50>{$id}</td><td width=20>{$moderator}</td><td>{$player}</td><td>{$comment}</td><td width=200>{$expiration}</td><td width=200>{$time}</td>
	</tr>";
}
} catch (Exception $e) {
	die("Database error");
}
?>
</table>
<br />
<?php } else {
	?>
<tr>
<td><b>Username</b></td><td><b>Banned Until</b></td><td><b>Actions</b></td>
</tr>
<?php
try {
$query = $db->prepare("SELECT * FROM `penguins` WHERE Banned > :Now");
$query->bindParam(':Now', time());
$query->execute();
while ($row = $query->fetch(PDO::FETCH_ASSOC))
{
	$username = $row['Username'];
	$time = date('Y-m-d H:i:s', $row['Banned']);
	echo "
	<tr>
	<td width=20>{$username}</td><td>{$time}</td><td><form action='unban.php' method='post'><input type='hidden' name='uname' id='uname' value='{$username}'><input type='submit' value='Unban' class='form-control'></form></td>
	</tr>";
}
} catch (Exception $e) {
	die("Database error");
}
?>
</tbody>
</table>
<?php } ?>
</center>
</div>
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
</body>
</html>
<?php } ?>
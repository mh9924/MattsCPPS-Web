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
                                <i class="fa fa-wrench"></i> Chat Logs
                            </li>
                        </ol>
                    </div>
                </div>
<a href="chat.php">&larr; Back</a>
<br />
<h2><?php
if(ctype_alnum(str_replace(" ","",$_GET['u']))) {
echo $_GET['u'];
	try {
	$ipquery = $db->prepare("SELECT * FROM `penguins` WHERE Username = :Username");
	$ipquery->bindValue(":Username", $_GET['u']);
	$ipquery->execute();
	$ip = $ipquery->fetch(PDO::FETCH_ASSOC)['IP'];
	if(!empty($ip)) {
		$dupequery = $db->prepare("SELECT * from `penguins` WHERE IP = :IP AND Username != :Username");
		$dupequery->bindValue(":Username", $_GET['u']);
		$dupequery->bindValue(':IP',$ip);
		$dupequery->execute();
	}
	} catch (Exception $e) {
		die("Couldn't query IP address");
	}
} else {
echo "User";
}
?>'s	messages</h2>
<br />
<b>Users with same IP address:</b>
<br />
<?php
if(isset($dupequery)) {
	while ($dupe = $dupequery->fetch(PDO::FETCH_ASSOC)['Username']) {
		echo $dupe . "<br />";
	}
}
?>
<br />
Displaying all messages for this user
<br />
<div class="table-responsive">
<table border class="table table-bordered table-hover">
<tbody>
<tr>
<td><b>ID</b></td><td><b>Username</b></td><td><b>Message</b></td><td><b>Room</b></td><td><b>Time</b></td>
</tr>
<?php
try {
if(isset($_GET['u']) && !empty($_GET['u'])) {
	$u = $_GET['u'];
	$query = $db->prepare("SELECT * FROM `messages` WHERE Username = :U ORDER BY ID DESC");
	$query->bindValue(":U", $u);
}
$query->execute();
while ($row = $query->fetch(PDO::FETCH_ASSOC))
{
	$id = '<a href="http://mattscpps.us/admin/panel/chat.php?start=' . $row['ID'] . '">' . $row['ID'] . '</a>';
	$username = $row['Username'];
	$message = htmlentities($row['Message']);
	$emotecode = array("(laugh-emote)", "(smile-emote)", "(straightface-emote)", "(frown-emote)", "(shocked-emote)", "(tongue-emote)", "(wink-emote)", "(sick-emote)", "(mad-emote)", "(upset-emote)", "(meh-emote)", "(idea-emote)", "(coffee-emote)", "(question-emote)", "(exclamation-emote)", "(flower-emote)", "(clover-emote)", "(joystick-emote)", "(toot-emote)", "(pizza-emote)", "(icecream-emote)", "(cake-emote)", "(popcorn-emote)", "(heart-emote)");
	$emoteimg = array("<img src='http://mattscpps.us/admin/panel/img/emotes/laugh.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/smile.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/straightface.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/frown.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/shocked.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/tongue.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/wink.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/sick.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/mad.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/upset.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/meh.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/idea.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/coffee.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/question.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/exclamation.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/flower.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/clover.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/joystick.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/toot.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/pizza.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/icecream.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/cake.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/popcorn.png'>", "<img src='http://mattscpps.us/admin/panel/img/emotes/heart.png'>"); 
	$message = str_replace($emotecode, $emoteimg, $message);
	$room = $row['Room'];
	if($room < 1000) {
		$roomname = 'Unknown';
		if($room == '100')
		{
			$roomname = "Town";
		}
		if($room == '110')
		{
			$roomname = "Coffee Shop";
		}
		if($room == '111')
		{
			$roomname = "Book Room";
		}
		if($room == '120')
		{
			$roomname = "Dance Club";
		}
		if($room == '121')
		{
			$roomname = "Lounge";
		}
		if($room == '122')
		{
			$roomname = "School";
		}
		if($room == '130')
		{
			$roomname = "Clothes Shop";
		}
		if($room == '200')
		{
			$roomname = "Ski Village";
		}
		if($room == '212')
		{
			$roomname = "Phoning Facility";
		}
		if($room == '220')
		{
			$roomname = "Ski Lodge";
		}
		if($room == '221')
		{
			$roomname = "Lodge Attic";
		}
		if($room == '230')
		{
			$roomname = "Ski Hill";
		}
		if($room == '300')
		{
			$roomname = "Plaza";
		}
		if($room == '310')
		{
			$roomname = "Pet Shop";
		}
		if($room == '320')
		{
			$roomname = "Dojo";
		}
		if($room == '321')
		{
			$roomname = "Dojo Courtyard";
		}
		if($room == '322')
		{
			$roomname = "Ninja Hideout";
		}
		if($room == '323')
		{
			$roomname = "EPF Command Room";
		}
		if($room == '330')
		{
			$roomname = "Pizza Parlor";
		}
		if($room == '340')
		{
			$roomname = "Mall";
		}
		if($room == '400')
		{
			$roomname = "Beach";
		}
		if($room == '410')
		{
			$roomname = "Lighthouse";
		}
		if($room == '411')
		{
			$roomname = "Beacon";
		}
		if($room == '420')
		{
			$roomname = "Rockhopper's Ship";
		}
		if($room == '421')
		{
			$roomname = "Ship Hold";
		}
		if($room == '422')
		{
			$roomname = "Captain's Quarters";
		}
		if($room == '423')
		{
			$roomname = "Crow's Nest";
		}
		if($room == '430')
		{
			$roomname = "Hotel Lobby";
		}
		if($room == '431')
		{
			$roomname = "Hotel Gym";
		}
		if($room == '432')
		{
			$roomname = "Hotel Roof";
		}
		if($room == '433')
		{
			$roomname = "Cloud Forest";
		}
		if($room == '434')
		{
			$roomname = "Puffle Park";
		}
		if($room == '435')
		{
			$roomname = "Skatepark";
		}
		if($room == '800')
		{
			$roomname = "Dock";
		}
		if($room == '801')
		{
			$roomname = "Snow Forts";
		}
		if($room == '802')
		{
			$roomname = "Stadium";
		}
		if($room == '803')
		{
			$roomname = "HQ";
		}
		if($room == '804')
		{
			$roomname = "Boiler Room";
		}
		if($room == '805')
		{
			$roomname = "Iceberg";
		}
		if($room == '806')
		{
			$roomname = "Cave";
		}
		if($room == '807')
		{
			$roomname = "Mine Shack";
		}
		if($room == '808')
		{
			$roomname = "Mine";
		}
		if($room == '809')
		{
			$roomname = "Forest";
		}
		if($room == '810')
		{
			$roomname = "Cove";
		}
		if($room == '811')
		{
			$roomname = "Box Dimension";
		}
		if($room == '812')
		{
			$roomname = "Fire Dojo";
		}
		if($room == '813')
		{
			$roomname = "Cave Mine";
		}
		if($room == '814')
		{
			$roomname = "Hidden Lake";
		}
		if($room == '815')
		{
			$roomname = "Underwater Room";
		}
		if($room == '816')
		{
			$roomname = "Water Dojo";
		}
		$room = $room . "<br /><font size=1>{$roomname}</font>";
	}
	if($room > 1000) {
		$getName = $db->prepare("SELECT * FROM `penguins` WHERE ID = :Room - 1000");
		$getName->bindParam(':Room', $room);
		$getName->execute();
		$column = $getName->fetch(PDO::FETCH_ASSOC);
		$player = $column['Username'];
		$room = $room . "<br /><font size=1>{$player}'s Igloo</font>";
	}
	$time = date('Y-m-d H:i:s', $row['Time']);
	echo "
	<tr>
	<td width=50>{$id}</td><td width=20>{$username}</td><td width=900>{$message}</td><td width=200><center>{$room}</center></td><td width=140>{$time}</td>
	</tr>";
}
} catch (Exception $e) {
	die("Database error");
}
?>
</tbody>
</table>
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




</body></html>
<?php } ?>
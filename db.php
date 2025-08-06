<?php
use \PDO as PDO;

// Database connection details
$servername = "localhost"; // Replace with your MySQL server hostname
$username = "root"; // Replace with your MySQL username
$password = "root"; // Replace with your MySQL password
$dbname = "iwf"; // Replace with your database name

class Database extends PDO
{
    public function __construct( $servername, $username, $password, $dbname )
	{
		//MySQL Connection
		parent::__construct( "mysql:host=" . $servername . ";port=3306;dbname=" . $dbname . "", $username, $password );
		PDO::setAttribute( PDO::ATTR_EMULATE_PREPARES, true );
		PDO::setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	}
}

$db = new Database($servername, $username, $password, $dbname);
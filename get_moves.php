<?php
// get_moves.php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection details
$servername = "localhost"; // Replace with your MySQL server hostname
$username = "root"; // Replace with your MySQL username
$password = "root"; // Replace with your MySQL password
$dbname = "iwf"; // Replace with your database name

try {
    // Create connection
    $conn = new PDO( "mysql:host=" . $servername . ";port=3306;dbname=" . $dbname . "", $username, $password );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch all move data, including damage, stamina cost, and description
    $sql = "SELECT
                move_id,
                move_name,
                type,
                min_damage,
                max_damage,
                stamina_cost,
                move_description
            FROM
                moves";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Fetch all results as an associative array
    // This is the key change to ensure 'name', 'type', 'damage_min', etc., are direct keys
    $moves = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Encode the moves array as JSON and output it
    echo json_encode($moves);

} catch (PDOException $e) {
    // Return a JSON error response
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
<?php
// get_all_wrestlers.php
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

    // SQL query to fetch wrestler data, including the 'moves' JSON column directly
    // Using wrestler_id as the primary key as per the schema
    $sql = "SELECT
                wrestler_id,
                name,
                image,
                baseHp,
                strength,
                technicalAbility,
                brawlingAbility,
                stamina,
                aerialAbility,
                toughness,
                reversalAbility,
                submissionDefense,
                staminaRecoveryRate,
                moves -- Fetch the JSON string directly from the roster table
            FROM
                roster";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $wrestlers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // No need for complex grouping here, as 'moves' is already a JSON string per wrestler
    echo json_encode($wrestlers);

} catch (PDOException $e) {
    // Return a JSON error response
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
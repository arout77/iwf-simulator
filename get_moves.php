<?php
// get_moves.php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin. For production, restrict this to your React app's domain.
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php'; // Include the database connection file

try {
    // SQL query to fetch all move data, including damage, stamina cost, and description
    $sql = "SELECT
                *
            FROM
                all_moves";

    $stmt = $db->prepare($sql);
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
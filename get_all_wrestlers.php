<?php
// get_all_wrestlers.php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin. For production, restrict this to your React app's domain.
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php'; // Include the database connection file

try {
    // SQL query to fetch wrestler data, including the 'moves' JSON column directly
    // Using wrestler_id as the primary key as per the schema
    $sql = "SELECT
                *
            FROM
                roster";

    $stmt = $db->prepare($sql);
    $stmt->execute();
    $wrestlers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // No need for complex grouping here, as 'moves' is already a JSON string per wrestler
    echo json_encode($wrestlers);

} catch (PDOException $e) {
    // Return a JSON error response
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
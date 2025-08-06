<?php
// get_team_records.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php'; // Include the database connection file

try {
    $teamId = isset($_GET['team_id']) ? $_GET['team_id'] : null;

    if ($teamId) {
        $stmt = $db->prepare("SELECT team_id, wrestler1_id, wrestler2_id, wins, losses, draws FROM team_records WHERE team_id = ?");
        $stmt->execute([$teamId]);
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($record ? $record : ['error' => 'Team record not found']);
    } else {
        $stmt = $db->query("SELECT team_id, wrestler1_id, wrestler2_id, wins, losses, draws FROM team_records ORDER BY wins DESC, losses ASC");
        $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($records);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
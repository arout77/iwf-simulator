<?php
// get_wrestler_records.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php'; // Include the database connection file

try {
    $wrestlerId = isset($_GET['wrestler_id']) ? $_GET['wrestler_id'] : null;

    if ($wrestlerId) {
        $stmt = $db->prepare("SELECT wrestler_id, wins, losses, draws FROM wrestler_records WHERE wrestler_id = ?");
        $stmt->execute([$wrestlerId]);
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($record ? $record : ['error' => 'Wrestler record not found']);
    } else {
        $stmt = $db->query("SELECT wrestler_id, wins, losses, draws FROM wrestler_records ORDER BY wins DESC, losses ASC");
        $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($records);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
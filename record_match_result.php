<?php
// record_match_result.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db.php'; // Include the database connection file

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

if (!isset($data->match_type)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing match_type']);
    exit();
}

try {
    $db->beginTransaction();

    $matchType = $data->match_type;
    $isDraw = isset($data->is_draw) ? (bool)$data->is_draw : false;

    if ($matchType === 'single') {
        if (!isset($data->player1_id) || !isset($data->player2_id) || (!isset($data->winner_id) && !$isDraw)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing data for single match']);
            exit();
        }

        $player1Id = $data->player1_id;
        $player2Id = $data->player2_id;
        $winnerId = $isDraw ? null : $data->winner_id;
        $loserId = null;
        if (!$isDraw) {
            $loserId = ($winnerId === $player1Id) ? $player2Id : $player1Id;
        }

        // Insert into matches table
        $stmt = $db->prepare("INSERT INTO matches (match_type, player1_id, player2_id, single_winner_id, single_loser_id, is_draw) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$matchType, $player1Id, $player2Id, $winnerId, $loserId, $isDraw]);

        // Update wrestler records
        $participants = [$player1Id, $player2Id];
        foreach ($participants as $wrestlerId) {
            $stmt = $db->prepare("INSERT INTO wrestler_records (wrestler_id, wins, losses, draws) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE wins = wins + ?, losses = losses + ?, draws = draws + ?");
            $wins = 0;
            $losses = 0;
            $draws = 0;

            if ($isDraw) {
                $draws = 1;
            } elseif ($wrestlerId === $winnerId) {
                $wins = 1;
            } else {
                $losses = 1;
            }
            $stmt->execute([$wrestlerId, $wins, $losses, $draws, $wins, $losses, $draws]);
        }

    } elseif ($matchType === 'tag_team') {
        if (!isset($data->team1_player1_id) || !isset($data->team1_player2_id) ||
            !isset($data->team2_player1_id) || !isset($data->team2_player2_id) ||
            (!isset($data->winning_team_ids) && !$isDraw)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing data for tag team match']);
            exit();
        }

        $team1P1 = $data->team1_player1_id;
        $team1P2 = $data->team1_player2_id;
        $team2P1 = $data->team2_player1_id;
        $team2P2 = $data->team2_player2_id;

        // Create canonical team IDs
        $team1Ids = [$team1P1, $team1P2];
        sort($team1Ids);
        $canonicalTeam1Id = implode('_', $team1Ids);

        $team2Ids = [$team2P1, $team2P2];
        sort($team2Ids);
        $canonicalTeam2Id = implode('_', $team2Ids);

        $winningTeamId = $isDraw ? null : $data->winning_team_ids; // This should be the canonical ID of the winning team
        $losingTeamId = null;
        if (!$isDraw) {
            $losingTeamId = ($winningTeamId === $canonicalTeam1Id) ? $canonicalTeam2Id : $canonicalTeam1Id;
        }

        // Insert into matches table
        $stmt = $db->prepare("INSERT INTO matches (match_type, team1_player1_id, team1_player2_id, team2_player1_id, team2_player2_id, team_winner_id, team_loser_id, is_draw) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$matchType, $team1P1, $team1P2, $team2P1, $team2P2, $winningTeamId, $losingTeamId, $isDraw]);

        // Update individual wrestler records
        $allParticipants = [$team1P1, $team1P2, $team2P1, $team2P2];
        foreach ($allParticipants as $wrestlerId) {
            $stmt = $db->prepare("INSERT INTO wrestler_records (wrestler_id, wins, losses, draws) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE wins = wins + ?, losses = losses + ?, draws = draws + ?");
            $wins = 0;
            $losses = 0;
            $draws = 0;

            if ($isDraw) {
                $draws = 1;
            } elseif (in_array($wrestlerId, ($winningTeamId === $canonicalTeam1Id ? [$team1P1, $team1P2] : [$team2P1, $team2P2]))) {
                $wins = 1;
            } else {
                $losses = 1;
            }
            $stmt->execute([$wrestlerId, $wins, $losses, $draws, $wins, $losses, $draws]);
        }

        // Update team records
        $teamsToUpdate = [];
        if ($isDraw) {
            $teamsToUpdate[$canonicalTeam1Id] = ['wrestlers' => [$team1P1, $team1P2], 'result' => 'draw'];
            $teamsToUpdate[$canonicalTeam2Id] = ['wrestlers' => [$team2P1, $team2P2], 'result' => 'draw'];
        } else {
            $teamsToUpdate[$winningTeamId] = ['wrestlers' => ($winningTeamId === $canonicalTeam1Id ? [$team1P1, $team1P2] : [$team2P1, $team2P2]), 'result' => 'win'];
            $teamsToUpdate[$losingTeamId] = ['wrestlers' => ($losingTeamId === $canonicalTeam1Id ? [$team1P1, $team1P2] : [$team2P1, $team2P2]), 'result' => 'loss'];
        }

        foreach ($teamsToUpdate as $teamId => $teamData) {
            $w1 = $teamData['wrestlers'][0];
            $w2 = $teamData['wrestlers'][1];

            $stmt = $db->prepare("INSERT INTO team_records (team_id, wrestler1_id, wrestler2_id, wins, losses, draws) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE wins = wins + ?, losses = losses + ?, draws = draws + ?");
            $wins = 0;
            $losses = 0;
            $draws = 0;

            if ($teamData['result'] === 'win') {
                $wins = 1;
            } elseif ($teamData['result'] === 'loss') {
                $losses = 1;
            } else { // draw
                $draws = 1;
            }
            $stmt->execute([$teamId, $w1, $w2, $wins, $losses, $draws, $wins, $losses, $draws]);
        }

    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid match_type']);
        exit();
    }

    $db->commit();
    http_response_code(200);
    echo json_encode(['message' => 'Match result recorded successfully']);

} catch (PDOException $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
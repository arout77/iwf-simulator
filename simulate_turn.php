<?php
// simulate_turn.php
// This endpoint receives match state, simulates a turn, and returns the updated state.

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin. Restrict for production.
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- PHP Equivalents of JS Utility Functions (from data.js, utils.js, combat.js) ---

/**
 * Function to get a random integer within a range.
 * @param int $min
 * @param int $max
 * @return int
 */
function getRandomInt($min, $max) {
    return rand($min, $max);
}

/**
 * Parses height string (e.g., "6'2\"") into total inches.
 * @param string $heightStr - The height string to parse.
 * @return int The height in inches, or 0 if parsing fails.
 */
function parseHeightToInches($heightStr) {
    if (!is_string($heightStr)) return 0;
    preg_match('/(\d+)\'(\d+)"?/', $heightStr, $matches);
    if (count($matches) === 3) {
        $feet = (int)$matches[1];
        $inches = (int)$matches[2];
        return ($feet * 12) + $inches;
    }
    return 0;
}

/**
 * Calculates the greatest common divisor (GCD) of two numbers.
 * @param int $a
 * @param int $b
 * @return int GCD
 */
function gcd($a, $b) {
    return $b === 0 ? $a : gcd($b, $a % $b);
}

/**
 * Determines the winner of the match based on current HP.
 * @param array $matchStateObj - The current match state array.
 * @param array $selectedWrestlersMap - Map of currently selected wrestlers.
 * @param string $matchType - The type of match ('single' or 'tagTeam').
 * @return array|string|null The winning wrestler array, a team string ('Team 1', 'Team 2'), 'draw', or null if no winner yet.
 */
function determineWinner(&$matchStateObj, $selectedWrestlersMap, $matchType) {
    if ($matchType === 'single') {
        $player1Id = $selectedWrestlersMap['player1']['id'];
        $player2Id = $selectedWrestlersMap['player2']['id'];
        $player1Hp = $matchStateObj['currentHp'][$player1Id] ?? 0;
        $player2Hp = $matchStateObj['currentHp'][$player2Id] ?? 0;

        if ($player1Hp <= 0 && $player2Hp <= 0) {
            return 'draw'; // Double KO
        } else if ($player1Hp <= 0) {
            return $selectedWrestlersMap['player2'];
        } else if ($player2Hp <= 0) {
            return $selectedWrestlersMap['player1'];
        }
    } else if ($matchType === 'tagTeam') {
        $team1P1Id = $selectedWrestlersMap['team1Player1']['id'];
        $team1P2Id = $selectedWrestlersMap['team1Player2']['id'];
        $team2P1Id = $selectedWrestlersMap['team2Player1']['id'];
        $team2P2Id = $selectedWrestlersMap['team2Player2']['id'];

        $team1KnockedOut = (($matchStateObj['currentHp'][$team1P1Id] ?? 0) <= 0 && ($matchStateObj['currentHp'][$team1P2Id] ?? 0) <= 0);
        $team2KnockedOut = (($matchStateObj['currentHp'][$team2P1Id] ?? 0) <= 0 && ($matchStateObj['currentHp'][$team2P2Id] ?? 0) <= 0);

        if ($team1KnockedOut && $team2KnockedOut) {
            return 'draw'; // Both teams are knocked out
        } else if ($team1KnockedOut) {
            return 'Team 2'; // Team 1 is knocked out, Team 2 wins
        } else if ($team2KnockedOut) {
            return 'Team 1'; // Team 2 is knocked out, Team 1 wins
        }
    }
    return null; // No winner yet
}

// --- PHP Combat Logic (from combat.js) ---

$crowdReactions = [
    'bigDamage' => ["The crowd ROARS!", "WHAT A SHOT! The arena is buzzing!", "Fans are on their feet after that one!", "A collective gasp from the audience!", "The crowd is going wild!", "UNBELIEVABLE! The fans can't believe it!"],
    'comeback' => ["The crowd is rallying behind them!", "A surge of energy from the audience!", "The fans sense a comeback!", "The momentum is shifting, and the crowd loves it!", "The arena is electric as they fight back!"],
    'finisherAttempt' => ["The crowd is on the edge of their seats!", "FINISHER ALERT! The tension is palpable!", "The arena holds its breath!", "The crowd knows what's coming next!", "Anticipation fills the air!"],
    'finisherHit' => ["BOOM! The crowd EXPLODES!", "THE FINISHER CONNECTS! The roof just blew off!", "UNBELIEVABLE! The crowd is in a frenzy!", "A thunderous ovation for that finisher!", "The arena ERUPTS!"],
    'staminaLow' => ["The crowd is urging them on!", "You can hear the crowd's concern for their stamina.", "The audience is trying to motivate them!", "A weary sigh from the crowd."],
    'momentumSwingPositive' => ["The crowd is feeling the momentum shift!", "A wave of energy sweeps through the arena!", "The fans are sensing a change in the tide!"],
    'momentumSwingNegative' => ["The crowd groans as momentum slips away.", "A hush falls over the arena as things turn sour.", "The fans are worried about this momentum loss."]
];

/**
 * Triggers a random crowd reaction message (for logging on server).
 * @param array $matchLogEntries - Reference to the match log array.
 * @param string $type - The type of crowd reaction.
 */
function triggerCrowdReaction(&$matchLogEntries, $type) {
    global $crowdReactions;
    if (!isset($crowdReactions[$type]) || empty($crowdReactions[$type])) {
        return;
    }
    $messages = $crowdReactions[$type];
    $randomIndex = getRandomInt(0, count($messages) - 1);
    $matchLogEntries[] = ['type' => 'crowd', 'message' => '<em>' . $messages[$randomIndex] . '</em>'];
}

/**
 * Updates a wrestler's momentum.
 * @param array $matchStateObj - Reference to the match state array.
 * @param string $wrestlerId - The ID of the wrestler.
 * @param int $change - The amount to change momentum by.
 * @param callable $wrestlerLookupFn - Function to find wrestler by ID.
 * @param array $matchLogEntries - Reference to the match log array.
 */
function updateMomentum(&$matchStateObj, $wrestlerId, $change, $wrestlerLookupFn, &$matchLogEntries) {
    $oldMomentum = $matchStateObj['currentMomentum'][$wrestlerId] ?? 50; // Default to 50 if not set
    $newMomentum = $oldMomentum + $change;
    $newMomentum = max(0, min(100, $newMomentum));
    $matchStateObj['currentMomentum'][$wrestlerId] = $newMomentum;

    $wrestler = $wrestlerLookupFn($wrestlerId);
    $wrestlerName = $wrestler['name'] ?? 'Unknown Wrestler';

    // Only log if not a bulk simulation (controlled by the client-side flag in advanceTurn)
    // For server-side, we always log, but client can choose to display or not.
    $matchLogEntries[] = ['type' => 'info', 'message' => "{$wrestlerName} momentum: " . round($newMomentum)];

    if ($change > 0 && $newMomentum > $oldMomentum && $newMomentum >= 75 && $oldMomentum < 75) {
        triggerCrowdReaction($matchLogEntries, 'momentumSwingPositive');
    } else if ($change < 0 && $newMomentum < $oldMomentum && $newMomentum <= 25 && $oldMomentum > 25) {
        triggerCrowdReaction($matchLogEntries, 'momentumSwingNegative');
    }
}

/**
 * Selects a random valid move for a wrestler.
 * @param array $wrestler - The wrestler array.
 * @param array $matchStateObj - Reference to the match state array.
 * @param callable $wrestlerLookupFn - Function to find wrestler by ID.
 * @param array $selectedWrestlersMap - Map of currently selected wrestlers.
 * @param string $currentMatchType - The current match type.
 * @param array $matchLogEntries - Reference to the match log array.
 * @return array|null A valid move array, or null.
 */
function selectRandomMove($wrestler, &$matchStateObj, $wrestlerLookupFn, $selectedWrestlersMap, $currentMatchType, &$matchLogEntries) {
    $availableMoves = [];
    $finisherMove = null;

    if (isset($wrestler['finisherMoveName'])) {
        foreach ($wrestler['moves'] as $moveType => $moves) {
            foreach ($moves as $move) {
                if (($move['name'] ?? null) === $wrestler['finisherMoveName']) {
                    $finisherMove = $move;
                    break 2;
                }
            }
        }
    }

    foreach ($wrestler['moves'] as $moveType => $moves) {
        foreach ($moves as $move) {
            $staminaCost = floatval($move['staminaCost'] ?? 0);
            $minDamage = floatval($move['damage']['min'] ?? 0);
            $maxDamage = floatval($move['damage']['max'] ?? 0);

            if (($matchStateObj['currentStamina'][$wrestler['id']] ?? 0) >= $staminaCost && ($minDamage > 0 || $maxDamage > 0) && ($finisherMove === null || ($move['name'] ?? null) !== $finisherMove['name'])) {
                $availableMoves[] = $move;
            }
        }
    }

    // Finisher Logic
    if ($finisherMove && !($matchStateObj['finisherUsed'][$wrestler['id']] ?? false)) {
        $defenderId = null;
        if ($currentMatchType === 'single') {
            $defenderId = ($wrestler['id'] === $selectedWrestlersMap['player1']['id'] ? $selectedWrestlersMap['player2']['id'] : $selectedWrestlersMap['player1']['id']);
        } else if ($currentMatchType === 'tagTeam') {
            $team1Wrestlers = [$selectedWrestlersMap['team1Player1'], $selectedWrestlersMap['team1Player2']];
            $team2Wrestlers = [$selectedWrestlersMap['team2Player1'], $selectedWrestlersMap['team2Player2']];

            $isAttackerTeam1 = false;
            foreach ($team1Wrestlers as $t1w) {
                if ($t1w && ($t1w['id'] ?? null) === $wrestler['id']) {
                    $isAttackerTeam1 = true;
                    break;
                }
            }

            $potentialDefenders = [];
            if ($isAttackerTeam1) {
                foreach ($team2Wrestlers as $t2w) {
                    if ($t2w && ($matchStateObj['currentHp'][$t2w['id']] ?? 0) > 0) {
                        $potentialDefenders[] = $t2w;
                    }
                }
            } else {
                foreach ($team1Wrestlers as $t1w) {
                    if ($t1w && ($matchStateObj['currentHp'][$t1w['id']] ?? 0) > 0) {
                        $potentialDefenders[] = $t1w;
                    }
                }
            }

            if (!empty($potentialDefenders)) {
                $defenderId = $potentialDefenders[getRandomInt(0, count($potentialDefenders) - 1)]['id'];
            }
        }

        if ($defenderId) {
            $defenderCurrentHp = $matchStateObj['currentHp'][$defenderId] ?? 0;
            $defenderInitialHp = $matchStateObj['initialHp'][$defenderId] ?? 0;

            $FINISHER_HP_THRESHOLD_PERCENT = 0.30;
            $FINISHER_ATTEMPT_CHANCE = 0.75;

            if ($defenderInitialHp > 0 && ($defenderCurrentHp / $defenderInitialHp) <= $FINISHER_HP_THRESHOLD_PERCENT &&
                ($matchStateObj['currentStamina'][$wrestler['id']] ?? 0) >= (floatval($finisherMove['staminaCost'] ?? 0)) &&
                mt_rand() / mt_getrandmax() < $FINISHER_ATTEMPT_CHANCE) {

                $matchLogEntries[] = ['type' => 'action', 'message' => "{$wrestler['name']} is looking for the {$finisherMove['name']}!"];
                triggerCrowdReaction($matchLogEntries, 'finisherAttempt');
                updateMomentum($matchStateObj, $wrestler['id'], 20, $wrestlerLookupFn, $matchLogEntries);
                $matchStateObj['finisherUsed'][$wrestler['id']] = true;
                return $finisherMove;
            }
        }
    }

    if (empty($availableMoves)) {
        $matchLogEntries[] = ['type' => 'info', 'message' => "{$wrestler['name']} couldn't find a valid move to perform!"];
        updateMomentum($matchStateObj, $wrestler['id'], -5, $wrestlerLookupFn, $matchLogEntries); // Lose momentum if no valid move
        return null;
    }

    $randomIndex = getRandomInt(0, count($availableMoves) - 1);
    return $availableMoves[$randomIndex];
}

/**
 * Calculates damage based on move and attacker's stats, considering height and weight.
 * @param array $attacker - The attacking wrestler array.
 * @param array $defender - The defending wrestler array.
 * @param array $move - The move array.
 * @param array $matchStateObj - Reference to the match state array.
 * @param callable $wrestlerLookupFn - Function to find wrestler by ID.
 * @param array $matchLogEntries - Reference to the match log array.
 * @return int The calculated damage.
 */
function calculateDamage($attacker, $defender, $move, &$matchStateObj, $wrestlerLookupFn, &$matchLogEntries) {
    $minDamage = floatval($move['damage']['min'] ?? 0);
    $maxDamage = floatval($move['damage']['max'] ?? 0);
    $baseHitChance = floatval($move['baseHitChance'] ?? 0.80);

    if ($minDamage === 0 && $maxDamage === 0) {
        return 0;
    }

    $attackerMomentum = $matchStateObj['currentMomentum'][$attacker['id']] ?? 50;
    $MOMENTUM_HIT_BONUS = 0.02;
    $MOMENTUM_HIT_PENALTY = 0.02;

    if ($attackerMomentum >= 75) {
        $baseHitChance += $MOMENTUM_HIT_BONUS;
    } else if ($attackerMomentum <= 25) {
        $baseHitChance -= $MOMENTUM_HIT_PENALTY;
    }

    $hitChance = $baseHitChance;
    $offenseBonus = ($attacker['stats']['offense'] ?? 0) * 0.005;
    $defensePenalty = ($defender['stats']['defense'] ?? 0) * 0.0002;
    $evasionPenalty = ($defender['stats']['evasion'] ?? 0) * 0.0002;

    $hitChance += $offenseBonus;
    $hitChance -= ($defensePenalty + $evasionPenalty);

    $attackerCurrentStamina = $matchStateObj['currentStamina'][$attacker['id']] ?? 0;
    $attackerInitialStamina = $matchStateObj['initialStamina'][$attacker['id']] ?? 0;
    if ($attackerInitialStamina > 0) {
        $staminaPercentage = $attackerCurrentStamina / $attackerInitialStamina;
        if ($staminaPercentage < 0.25) {
            $hitChance *= 0.8;
            $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} is exhausted and struggles to connect!"];
            triggerCrowdReaction($matchLogEntries, 'staminaLow');
        } else if ($staminaPercentage < 0.5) {
            $hitChance *= 0.95;
            $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} is tiring, affecting their accuracy!"];
        }
    }

    $hitChance = max(0.4, min(0.95, $hitChance));

    if (mt_rand() / mt_getrandmax() > $hitChance) {
        $matchLogEntries[] = ['type' => 'info', 'message' => "{$defender['name']} evades {$attacker['name']}'s attack!"];
        updateMomentum($matchStateObj, $attacker['id'], -5, $wrestlerLookupFn, $matchLogEntries);
        updateMomentum($matchStateObj, $defender['id'], 5, $wrestlerLookupFn, $matchLogEntries);
        return 0;
    }

    $damage = getRandomInt($minDamage, $maxDamage);

    $damage += round(($attacker['stats']['strength'] ?? 0) * 0.25);
    if (($move['type'] ?? '') === 'strike') {
        $damage += round(($attacker['stats']['offense'] ?? 0) * 0.1);
    } else if (($move['type'] ?? '') === 'grapple') {
        $damage += round(($attacker['stats']['technicalAbility'] ?? 0) * 0.1);
    } else if (($move['type'] ?? '') === 'highFlying') {
        $damage += round(($attacker['stats']['aerialAbility'] ?? 0) * 0.2);
    }

    $damage += round(($attacker['overall'] ?? 0) * 0.04);

    $MOMENTUM_DAMAGE_BONUS = 0.05;
    $MOMENTUM_DAMAGE_PENALTY = 0.05;

    if ($attackerMomentum >= 75) {
        $damage *= (1 + $MOMENTUM_DAMAGE_BONUS);
    } else if ($attackerMomentum <= 25) {
        $damage *= (1 - $MOMENTUM_DAMAGE_PENALTY);
    }

    $attackerHeightInches = parseHeightToInches($attacker['height'] ?? '');
    $attackerWeightLbs = intval($attacker['weight'] ?? 0);
    $defenderHeightInches = parseHeightToInches($defender['height'] ?? '');
    $defenderWeightLbs = intval($defender['weight'] ?? 0);

    $weightDifference = $attackerWeightLbs - $defenderWeightLbs;
    $HEIGHT_DIFFERENCE = $attackerHeightInches - $defenderHeightInches;

    $WEIGHT_ADVANTAGE_THRESHOLD = 75;
    $WEIGHT_DAMAGE_MODIFIER = 0.10;
    $HEIGHT_ADVANTAGE_THRESHOLD = 6; // inches
    $HEIGHT_DAMAGE_MODIFIER = 0.05; // 5% bonus/penalty

    if ($weightDifference > $WEIGHT_ADVANTAGE_THRESHOLD) {
        $damage *= (1 + $WEIGHT_DAMAGE_MODIFIER);
        $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} gains advantage due to weight difference!"];
    } else if ($weightDifference < -$WEIGHT_ADVANTAGE_THRESHOLD) {
        $damage *= (1 - $WEIGHT_DAMAGE_MODIFIER);
        $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} is at a disadvantage due to weight difference!"];
    }

    if (($move['type'] ?? '') === 'strike') {
        if ($HEIGHT_DIFFERENCE > $HEIGHT_ADVANTAGE_THRESHOLD) {
            $damage *= (1 + $HEIGHT_DAMAGE_MODIFIER);
            $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} uses reach advantage with their strike!"];
        } else if ($HEIGHT_DIFFERENCE < -$HEIGHT_ADVANTAGE_THRESHOLD) {
            $damage *= (1 - $HEIGHT_DAMAGE_MODIFIER);
            $matchLogEntries[] = ['type' => 'info', 'message' => "{$attacker['name']} struggles to connect due to height disadvantage!"];
        }
    }

    $DAMAGE_BONUS_PERCENTAGE = 0.10;

    if (($move['type'] ?? '') === 'grapple') {
        if (($attacker['stats']['strength'] ?? 0) >= 95 || ($attacker['stats']['technicalAbility'] ?? 0) >= 95) {
            $damage *= (1 + $DAMAGE_BONUS_PERCENTAGE);
            $matchLogEntries[] = ['type' => 'action', 'message' => "{$attacker['name']} lands a powerful grapple due to their superior grappling ability!"];
        }
    }

    if (($move['type'] ?? '') === 'highFlying') {
        if (($attacker['stats']['aerialAbility'] ?? 0) >= 90) {
            $damage *= (1 + $DAMAGE_BONUS_PERCENTAGE);
            $matchLogEntries[] = ['type' => 'action', 'message' => "{$attacker['name']} executes a spectacular high-flying move with extra impact!"];
        }
    }

    if (($move['type'] ?? '') === 'strike') {
        if (($attacker['stats']['brawlingAbility'] ?? 0) >= 95) {
            $damage *= (1 + $DAMAGE_BONUS_PERCENTAGE);
            $matchLogEntries[] = ['type' => 'action', 'message' => "{$attacker['name']} delivers a devastating strike with their brawling prowess!"];
        }
    }

    $COMEBACK_HP_THRESHOLD_PERCENT = 0.25;
    $COMEBACK_DAMAGE_BONUS_PERCENT = 0.25;

    $actualAttackerCurrentHp = $matchStateObj['currentHp'][$attacker['id']] ?? 0;
    $attackerInitialHp = $matchStateObj['initialHp'][$attacker['id']] ?? 0;

    if ($attackerInitialHp > 0 && ($actualAttackerCurrentHp / $attackerInitialHp) <= $COMEBACK_HP_THRESHOLD_PERCENT) {
        $damage *= (1 + $COMEBACK_DAMAGE_BONUS_PERCENT);
        $matchLogEntries[] = ['type' => 'action', 'message' => "{$attacker['name']} is fired up and delivers a powerful comeback blow!"];
        triggerCrowdReaction($matchLogEntries, 'comeback');
    }

    $toughnessReduction = ($defender['stats']['toughness'] ?? 0) * 0.004;
    $resilienceReduction = ($defender['stats']['resilience'] ?? 0) * 0.002;

    $damage *= (1 - ($toughnessReduction + $resilienceReduction));

    $finalDamage = max(0, round($damage));

    $BIG_DAMAGE_THRESHOLD_PERCENT = 0.15;
    $defenderInitialHp = $matchStateObj['initialHp'][$defender['id']] ?? 0;
    if ($defenderInitialHp > 0 && ($finalDamage / $defenderInitialHp) >= $BIG_DAMAGE_THRESHOLD_PERCENT) {
        triggerCrowdReaction($matchLogEntries, 'bigDamage');
        updateMomentum($matchStateObj, $attacker['id'], 10, $wrestlerLookupFn, $matchLogEntries);
        updateMomentum($matchStateObj, $defender['id'], -5, $wrestlerLookupFn, $matchLogEntries);
    }

    return $finalDamage;
}


// --- Main execution block for simulate_turn.php ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $matchState = $input['matchState'];
    $selectedWrestlers = $input['selectedWrestlers'];
    $currentMatchType = $input['currentMatchType'];
    $allWrestlers = $input['allWrestlers']; // All wrestlers are passed to allow lookup by ID
    $isBulkSimulation = $input['isBulkSimulation'] ?? false; // Flag to control logging verbosity

    // Helper function for wrestler lookup within PHP
    $wrestlerLookupFn = function($id) use ($allWrestlers) {
        foreach ($allWrestlers as $wrestler) {
            if (($wrestler['id'] ?? null) === $id) {
                return $wrestler;
            }
        }
        return null;
    };

    $matchLogEntries = []; // To collect log messages for this turn

    // Simulate the turn
    $matchState['currentRound']++;
    $winner = null;

    if ($matchState['currentRound'] > $matchState['maxRounds']) {
        if (!$isBulkSimulation) {
            $matchLogEntries[] = ['type' => 'result', 'message' => "--- The match ends in a time limit draw! ---"];
        }
        $winner = 'draw';
    } else {
        if (!$isBulkSimulation) {
            $matchLogEntries[] = ['type' => 'info', 'message' => "--- Round {$matchState['currentRound']} ---"];
        }

        if ($currentMatchType === 'single') {
            $p1 = $selectedWrestlers['player1'];
            $p2 = $selectedWrestlers['player2'];

            // Stamina recovery
            $p1StaminaRecovery = $p1['stats']['staminaRecoveryRate'] ?? 0;
            $matchState['currentStamina'][$p1['id']] = min(
                ($matchState['initialStamina'][$p1['id']] ?? 0),
                ($matchState['currentStamina'][$p1['id']] ?? 0) + $p1StaminaRecovery
            );
            if (!$isBulkSimulation) {
                $matchLogEntries[] = ['type' => 'info', 'message' => "{$p1['name']} recovers {$p1StaminaRecovery} stamina."];
            }

            $p2StaminaRecovery = $p2['stats']['staminaRecoveryRate'] ?? 0;
            $matchState['currentStamina'][$p2['id']] = min(
                ($matchState['initialStamina'][$p2['id']] ?? 0),
                ($matchState['currentStamina'][$p2['id']] ?? 0) + $p2StaminaRecovery
            );
            if (!$isBulkSimulation) {
                $matchLogEntries[] = ['type' => 'info', 'message' => "{$p2['name']} recovers {$p2StaminaRecovery} stamina."];
            }

            // Player 1 attacks Player 2
            if (($matchState['currentHp'][$p1['id']] ?? 0) > 0 && ($matchState['currentHp'][$p2['id']] ?? 0) > 0) {
                $p1ChosenMove = selectRandomMove($p1, $matchState, $wrestlerLookupFn, $selectedWrestlers, $currentMatchType, $matchLogEntries);
                if ($p1ChosenMove) {
                    $p1StaminaCost = floatval($p1ChosenMove['staminaCost'] ?? 0);
                    if (($matchState['currentStamina'][$p1['id']] ?? 0) >= $p1StaminaCost) {
                        $matchState['currentStamina'][$p1['id']] -= $p1StaminaCost;
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'action', 'message' => "{$p1['name']} performs {$p1ChosenMove['name']} on {$p2['name']}!"];
                            if (($p1ChosenMove['name'] ?? null) === ($p1['finisherMoveName'] ?? null)) {
                                triggerCrowdReaction($matchLogEntries, 'finisherHit');
                            }
                        }

                        $p1DamageDealt = calculateDamage($p1, $p2, $p1ChosenMove, $matchState, $wrestlerLookupFn, $matchLogEntries);
                        $matchState['currentHp'][$p2['id']] = max(0, ($matchState['currentHp'][$p2['id']] ?? 0) - $p1DamageDealt);
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'damage', 'message' => "{$p2['name']} takes {$p1DamageDealt} damage!"];
                        }
                    } else if (!$isBulkSimulation) {
                        $matchLogEntries[] = ['type' => 'info', 'message' => "{$p1['name']} is too tired to use {$p1ChosenMove['name']}!"];
                        updateMomentum($matchState, $p1['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                    }
                } else if (!$isBulkSimulation) {
                    $matchLogEntries[] = ['type' => 'info', 'message' => "{$p1['name']} couldn't find a valid move to perform!"];
                    updateMomentum($matchState, $p1['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                }
            }

            $winner = determineWinner($matchState, $selectedWrestlers, $currentMatchType);

            if (!$winner && ($matchState['currentHp'][$p1['id']] ?? 0) > 0 && ($matchState['currentHp'][$p2['id']] ?? 0) > 0) {
                // Player 2 attacks Player 1
                $p2ChosenMove = selectRandomMove($p2, $matchState, $wrestlerLookupFn, $selectedWrestlers, $currentMatchType, $matchLogEntries);
                if ($p2ChosenMove) {
                    $p2StaminaCost = floatval($p2ChosenMove['staminaCost'] ?? 0);
                    if (($matchState['currentStamina'][$p2['id']] ?? 0) >= $p2StaminaCost) {
                        $matchState['currentStamina'][$p2['id']] -= $p2StaminaCost;
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'action', 'message' => "{$p2['name']} performs {$p2ChosenMove['name']} on {$p1['name']}!"];
                            if (($p2ChosenMove['name'] ?? null) === ($p2['finisherMoveName'] ?? null)) {
                                triggerCrowdReaction($matchLogEntries, 'finisherHit');
                            }
                        }

                        $p2DamageDealt = calculateDamage($p2, $p1, $p2ChosenMove, $matchState, $wrestlerLookupFn, $matchLogEntries);
                        $matchState['currentHp'][$p1['id']] = max(0, ($matchState['currentHp'][$p1['id']] ?? 0) - $p2DamageDealt);
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'damage', 'message' => "{$p1['name']} takes {$p2DamageDealt} damage!"];
                        }
                    } else if (!$isBulkSimulation) {
                        $matchLogEntries[] = ['type' => 'info', 'message' => "{$p2['name']} is too tired to use {$p2ChosenMove['name']}!"];
                        updateMomentum($matchState, $p2['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                    }
                } else if (!$isBulkSimulation) {
                    $matchLogEntries[] = ['type' => 'info', 'message' => "{$p2['name']} couldn't find a valid move to perform!"];
                    updateMomentum($matchState, $p2['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                }
            }

            $winner = determineWinner($matchState, $selectedWrestlers, $currentMatchType);

        } else if ($currentMatchType === 'tagTeam') {
            $team1_p1 = $selectedWrestlers['team1Player1'];
            $team1_p2 = $selectedWrestlers['team1Player2'];
            $team2_p1 = $selectedWrestlers['team2Player1'];
            $team2_p2 = $selectedWrestlers['team2Player2'];

            $activeTeam1Wrestler = null;
            $inactiveTeam1Wrestler = null;
            if (($matchState['currentHp'][$team1_p1['id']] ?? 0) > 0 && ($matchState['currentHp'][$team1_p2['id']] ?? 0) > 0) {
                $activeTeam1Wrestler = (getRandomInt(0, 1) === 0 ? $team1_p1 : $team1_p2);
                $inactiveTeam1Wrestler = ($activeTeam1Wrestler['id'] === $team1_p1['id'] ? $team1_p2 : $team1_p1);
            } else if (($matchState['currentHp'][$team1_p1['id']] ?? 0) > 0) {
                $activeTeam1Wrestler = $team1_p1;
            } else if (($matchState['currentHp'][$team1_p2['id']] ?? 0) > 0) {
                $activeTeam1Wrestler = $team1_p2;
            }

            $activeTeam2Wrestler = null;
            $inactiveTeam2Wrestler = null;
            if (($matchState['currentHp'][$team2_p1['id']] ?? 0) > 0 && ($matchState['currentHp'][$team2_p2['id']] ?? 0) > 0) {
                $activeTeam2Wrestler = (getRandomInt(0, 1) === 0 ? $team2_p1 : $team2_p2);
                $inactiveTeam2Wrestler = ($activeTeam2Wrestler['id'] === $team2_p1['id'] ? $team2_p2 : $team2_p1);
            } else if (($matchState['currentHp'][$team2_p1['id']] ?? 0) > 0) {
                $activeTeam2Wrestler = $team2_p1;
            } else if (($matchState['currentHp'][$team2_p2['id']] ?? 0) > 0) {
                $activeTeam2Wrestler = $team2_p2;
            }

            // Stamina & HP recovery for all wrestlers
            foreach ([$team1_p1, $team1_p2, $team2_p1, $team2_p2] as $p) {
                $staminaRecovery = $p['stats']['staminaRecoveryRate'] ?? 0;
                $matchState['currentStamina'][$p['id']] = min(($matchState['initialStamina'][$p['id']] ?? 0), ($matchState['currentStamina'][$p['id']] ?? 0) + $staminaRecovery);
                $matchState['currentHp'][$p['id']] = min(($matchState['initialHp'][$p['id']] ?? 0), ($matchState['currentHp'][$p['id']] ?? 0) + 2); // Small HP recovery
                if (!$isBulkSimulation) {
                    $matchLogEntries[] = ['type' => 'info', 'message' => "{$p['name']} recovers! HP: " . round($matchState['currentHp'][$p['id']]) . " | Stamina: " . round($matchState['currentStamina'][$p['id']]) . " | Momentum: " . round($matchState['currentMomentum'][$p['id']])];
                }
            }

            $winner = determineWinner($matchState, $selectedWrestlers, $currentMatchType);
            if ($winner) {
                echo json_encode(['matchState' => $matchState, 'matchLog' => $matchLogEntries, 'winner' => $winner]);
                exit();
            }

            if ($activeTeam1Wrestler && $activeTeam2Wrestler) {
                // Team 1 active wrestler attacks Team 2 active wrestler
                $t1ChosenMove = selectRandomMove($activeTeam1Wrestler, $matchState, $wrestlerLookupFn, $selectedWrestlers, $currentMatchType, $matchLogEntries);
                if ($t1ChosenMove) {
                    $t1StaminaCost = floatval($t1ChosenMove['staminaCost'] ?? 0);
                    if (($matchState['currentStamina'][$activeTeam1Wrestler['id']] ?? 0) >= $t1StaminaCost) {
                        $matchState['currentStamina'][$activeTeam1Wrestler['id']] -= $t1StaminaCost;
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'action', 'message' => "{$activeTeam1Wrestler['name']} performs {$t1ChosenMove['name']} on {$activeTeam2Wrestler['name']}!"];
                            if (($t1ChosenMove['name'] ?? null) === ($activeTeam1Wrestler['finisherMoveName'] ?? null)) {
                                triggerCrowdReaction($matchLogEntries, 'finisherHit');
                            }
                        }

                        $t1DamageDealt = calculateDamage($activeTeam1Wrestler, $activeTeam2Wrestler, $t1ChosenMove, $matchState, $wrestlerLookupFn, $matchLogEntries);
                        $matchState['currentHp'][$activeTeam2Wrestler['id']] = max(0, ($matchState['currentHp'][$activeTeam2Wrestler['id']] ?? 0) - $t1DamageDealt);
                        if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'damage', 'message' => "{$activeTeam2Wrestler['name']} takes {$t1DamageDealt} damage!"];
                        }
                    } else if (!$isBulkSimulation) {
                        $matchLogEntries[] = ['type' => 'info', 'message' => "{$activeTeam1Wrestler['name']} is too tired to use {$t1ChosenMove['name']}!"];
                        updateMomentum($matchState, $activeTeam1Wrestler['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                    }
                } else if (!$isBulkSimulation) {
                    $matchLogEntries[] = ['type' => 'info', 'message' => "{$activeTeam1Wrestler['name']} couldn't find a valid move to perform!"];
                    updateMomentum($matchState, $activeTeam1Wrestler['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                }

                $winner = determineWinner($matchState, $selectedWrestlers, $currentMatchType);
                if ($winner) {
                    echo json_encode(['matchState' => $matchState, 'matchLog' => $matchLogEntries, 'winner' => $winner]);
                    exit();
                }

                if (($matchState['currentHp'][$activeTeam1Wrestler['id']] ?? 0) > 0 && ($matchState['currentHp'][$activeTeam2Wrestler['id']] ?? 0) > 0) {
                    // Team 2 active wrestler attacks Team 1 active wrestler
                    $t2ChosenMove = selectRandomMove($activeTeam2Wrestler, $matchState, $wrestlerLookupFn, $selectedWrestlers, $currentMatchType, $matchLogEntries);
                    if ($t2ChosenMove) {
                        $t2StaminaCost = floatval($t2ChosenMove['staminaCost'] ?? 0);
                        if (($matchState['currentStamina'][$activeTeam2Wrestler['id']] ?? 0) >= $t2StaminaCost) {
                            $matchState['currentStamina'][$activeTeam2Wrestler['id']] -= $t2StaminaCost;
                            if (!$isBulkSimulation) {
                                $matchLogEntries[] = ['type' => 'action', 'message' => "{$activeTeam2Wrestler['name']} performs {$t2ChosenMove['name']} on {$activeTeam1Wrestler['name']}!"];
                                if (($t2ChosenMove['name'] ?? null) === ($activeTeam2Wrestler['finisherMoveName'] ?? null)) {
                                    triggerCrowdReaction($matchLogEntries, 'finisherHit');
                                }
                            }

                            $t2DamageDealt = calculateDamage($activeTeam2Wrestler, $activeTeam1Wrestler, $t2ChosenMove, $matchState, $wrestlerLookupFn, $matchLogEntries);
                            $matchState['currentHp'][$activeTeam1Wrestler['id']] = max(0, ($matchState['currentHp'][$activeTeam1Wrestler['id']] ?? 0) - $t2DamageDealt);
                            if (!$isBulkSimulation) {
                                $matchLogEntries[] = ['type' => 'damage', 'message' => "{$activeTeam1Wrestler['name']} takes {$t2DamageDealt} damage!"];
                            }
                        } else if (!$isBulkSimulation) {
                            $matchLogEntries[] = ['type' => 'info', 'message' => "{$activeTeam2Wrestler['name']} is too tired to use {$t2ChosenMove['name']}!"];
                            updateMomentum($matchState, $activeTeam2Wrestler['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                        }
                    } else if (!$isBulkSimulation) {
                        $matchLogEntries[] = ['type' => 'info', 'message' => "{$activeTeam2Wrestler['name']} couldn't find a valid move to perform!"];
                        updateMomentum($matchState, $activeTeam2Wrestler['id'], -5, $wrestlerLookupFn, $matchLogEntries);
                    }
                }
                $winner = determineWinner($matchState, $selectedWrestlers, $currentMatchType);
            }
        }
    }

    echo json_encode(['matchState' => $matchState, 'matchLog' => $matchLogEntries, 'winner' => $winner]);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method.']);
}

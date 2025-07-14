// app.js

import { wrestlers, getRandomInt } from './data.js'; // wrestlers is now a Promise
import {
    renderWrestlerCard, initializeRoster, setupDragAndDropListeners,
    updateDropZoneVisual, renderWrestlerInDropZone, hideWrestlerCardInRoster,
    showWrestlerCardInRoster, showModal, hideModal, updateMatchLog,
    updateMatchResult, resetDropZonesUI, toggleMatchLayout,
    updateWrestlerHealthDisplay, triggerDamageAnimation,
    renderWrestlerInModalDisplay,
    // New touch-related imports for robust drag-and-drop
    createDragCloneForTouch, updateDragClonePosition, removeDragClone,
    highlightDropZone, unhighlightDropZone
} from './dom.js';

// Match state
let currentMatchType = 'single';
let selectedWrestlers = {
    player1: null,
    player2: null,
    team1Player1: null,
    team1Player2: null,
    team2Player1: null,
    team2Player2: null
};

let draggedWrestlerId = null;
let isDraggingTouch = false;
let currentTouchDragClone = null;
let currentDropZone = null; // To keep track of the currently highlighted drop zone during drag/touch

// Global match state for turn-based simulation
let matchState = {
    currentHp: {}, // Stores current HP for each wrestler by ID
    currentStamina: {}, // Stores current Stamina for each wrestler by ID
    initialHp: {}, // Stores initial HP for percentage calculation
    initialStamina: {}, // Stores initial Stamina for each wrestler by ID
    currentRound: 0,
    matchLogEntries: [],
    maxRounds: 0, // Will be set based on match type
    modalDisplayZoneMap: {} // Maps wrestler IDs to their modal display elements
};

// Store the loaded wrestlers globally within app.js after fetching
let loadedWrestlers = [];

// --- Helper Functions ---

/**
 * Finds a wrestler by their ID from the loaded wrestlers array.
 * @param {string} id - The ID of the wrestler.
 * @returns {object|null} The wrestler object or null if not found.
 */
function findWrestlerById(id) {
    return loadedWrestlers.find(w => w.id === id);
}

/**
 * Calculates damage based on move and attacker's stats.
 * @param {object} attacker - The attacking wrestler object.
 * @param {object} move - The move object.
 * @returns {number} The calculated damage.
 */
function calculateDamage(attacker, move) {
    // Ensure damage values are numbers
    const minDamage = parseFloat(move.damage.min) || 0;
    const maxDamage = parseFloat(move.damage.max) || 0;

    // Check if damage range is valid
    if (minDamage === 0 && maxDamage === 0) {
        console.warn(`Move "${move.name}" has zero damage range. Skipping damage calculation.`);
        return 0;
    }

    // Base damage from the move's defined range
    let damage = getRandomInt(minDamage, maxDamage);

    // Apply attacker's strength bonus if move type is 'strike' or 'grapple'
    // Assuming a simple linear scaling for now
    if (move.type === 'strike' && attacker.stats.strength) {
        damage += Math.round(attacker.stats.strength * 0.1); // 10% of strength as bonus damage
    } else if (move.type === 'grapple' && attacker.stats.technicalAbility) {
        damage += Math.round(attacker.stats.technicalAbility * 0.1); // 10% of technical ability as bonus damage
    } else if (move.type === 'highFlying' && attacker.stats.aerialAbility) {
        damage += Math.round(attacker.stats.aerialAbility * 0.15); // 15% of aerial ability as bonus damage
    }
    // Add more complex calculations here based on stats, move properties, etc.

    return damage;
}

/**
 * Selects a random valid move for a wrestler based on their current stamina and move types.
 * @param {object} wrestler - The wrestler object.
 * @returns {object|null} A valid move object, or null if no valid moves are found.
 */
function selectRandomMove(wrestler) {
    let availableMoves = [];

    // Iterate through all move types defined for the wrestler
    for (const moveType in wrestler.moves) {
        if (wrestler.moves.hasOwnProperty(moveType) && Array.isArray(wrestler.moves[moveType])) {
            wrestler.moves[moveType].forEach(move => {
                // Ensure move and its properties exist and are valid numbers
                const staminaCost = parseFloat(move.staminaCost) || 0;
                const minDamage = parseFloat(move.damage.min) || 0;
                const maxDamage = parseFloat(move.damage.max) || 0;

                // A move is valid if the wrestler has enough stamina and it deals damage
                if (matchState.currentStamina[wrestler.id] >= staminaCost && (minDamage > 0 || maxDamage > 0)) {
                    availableMoves.push(move);
                }
            });
        }
    }

    if (availableMoves.length === 0) {
        console.warn(`${wrestler.name} has no valid moves across all categories!`);
        updateMatchLog(`${wrestler.name} couldn't find a valid move to perform!`, 'info');
        return null;
    }

    // Select a random move from the available ones
    const randomIndex = getRandomInt(0, availableMoves.length - 1);
    return availableMoves[randomIndex];
}


/**
 * Determines the winner of the match.
 * @returns {object|null} The winning wrestler object, or null if no winner yet.
 */
function determineWinner() {
    if (currentMatchType === 'single') {
        const player1Hp = matchState.currentHp[selectedWrestlers.player1.id];
        const player2Hp = matchState.currentHp[selectedWrestlers.player2.id];

        if (player1Hp <= 0 && player2Hp <= 0) {
            return 'draw'; // Double KO
        } else if (player1Hp <= 0) {
            return selectedWrestlers.player2;
        } else if (player2Hp <= 0) {
            return selectedWrestlers.player1;
        }
    } else if (currentMatchType === 'tagTeam') {
        const team1Alive = (matchState.currentHp[selectedWrestlers.team1Player1.id] > 0 || matchState.currentHp[selectedWrestlers.team1Player2.id] > 0);
        const team2Alive = (matchState.currentHp[selectedWrestlers.team2Player1.id] > 0 || matchState.currentHp[selectedWrestlers.team2Player2.id] > 0);

        if (!team1Alive && !team2Alive) {
            return 'draw'; // Double team KO
        } else if (!team1Alive) {
            return 'Team 2'; // Return string for team winner
        } else if (!team2Alive) {
            return 'Team 1'; // Return string for team winner
        }
    }
    return null; // No winner yet
}

/**
 * Handles the end of the match, displaying the winner.
 * @param {object|string} winner - The winning wrestler object or team string ('Team 1', 'Team 2', 'draw').
 */
function endMatch(winner) {
    hideModal(matchLogModal); // Hide match log
    showModal(winnerModal); // Show winner modal

    const winnerImageContainer = document.getElementById('winnerImageContainer');
    winnerImageContainer.innerHTML = ''; // Clear previous images
    winnerImageContainer.classList.remove('hidden'); // Ensure container is visible

    if (winner === 'draw') {
        updateMatchResult("It's a Draw!", "Both wrestlers are knocked out!");
        winnerImageContainer.classList.add('hidden'); // Hide image container for draws
    } else if (typeof winner === 'string' && (winner === 'Team 1' || winner === 'Team 2')) {
        updateMatchResult(`${winner} Wins!`, `All members of the opposing team are knocked out!`);
        // Display images of the winning team members
        if (winner === 'Team 1') {
            const team1Player1 = findWrestlerById(selectedWrestlers.team1Player1.id);
            const team1Player2 = findWrestlerById(selectedWrestlers.team1Player2.id);
            if (team1Player1) {
                const img1 = document.createElement('img');
                img1.src = team1Player1.image;
                img1.alt = team1Player1.name;
                img1.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-2', 'border-2', 'border-green-500');
                winnerImageContainer.appendChild(img1);
            }
            if (team1Player2) {
                const img2 = document.createElement('img');
                img2.src = team1Player2.image;
                img2.alt = team1Player2.name;
                img2.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-2', 'border-2', 'border-green-500');
                winnerImageContainer.appendChild(img2);
            }
        } else if (winner === 'Team 2') {
            const team2Player1 = findWrestlerById(selectedWrestlers.team2Player1.id);
            const team2Player2 = findWrestlerById(selectedWrestlers.team2Player2.id);
            if (team2Player1) {
                const img1 = document.createElement('img');
                img1.src = team2Player1.image;
                img1.alt = team2Player1.name;
                img1.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-2', 'border-2', 'border-green-500');
                winnerImageContainer.appendChild(img1);
            }
            if (team2Player2) {
                const img2 = document.createElement('img');
                img2.src = team2Player2.image;
                img2.alt = team2Player2.name;
                img2.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-2', 'border-2', 'border-green-500');
                winnerImageContainer.appendChild(img2);
            }
        }
    } else {
        // Single match winner
        updateMatchResult(`${winner.name} Wins!`, `The opponent has been knocked out!`);
        const winnerImage = document.createElement('img');
        winnerImage.src = winner.image;
        winnerImage.alt = winner.name;
        winnerImage.classList.add('w-32', 'h-32', 'rounded-full', 'object-cover', 'mx-auto', 'border-4', 'border-green-500');
        winnerImageContainer.appendChild(winnerImage);
    }
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    if (nextTurnBtn) {
        nextTurnBtn.classList.add('hidden'); // Hide next turn button
    }
}


/**
 * Simulates a single turn in the match.
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates and delays.
 */
async function advanceTurn(isBulkSimulation = false) {
    let winner = null;
    matchState.currentRound++;

    // Only update UI elements if not in bulk simulation
    const modalSinglePlayer1 = isBulkSimulation ? null : document.getElementById('modalSinglePlayer1');
    const modalSinglePlayer2 = isBulkSimulation ? null : document.getElementById('modalSinglePlayer2');
    const modalTeam1Player1 = isBulkSimulation ? null : document.getElementById('modalTeam1Player1');
    const modalTeam1Player2 = isBulkSimulation ? null : document.getElementById('modalTeam1Player2');
    const modalTeam2Player1 = isBulkSimulation ? null : document.getElementById('modalTeam2Player1');
    const modalTeam2Player2 = isBulkSimulation ? null : document.getElementById('modalTeam2Player2');

    if (matchState.currentRound > matchState.maxRounds) {
        if (!isBulkSimulation) {
            updateMatchLog(`--- The match ends in a time limit draw! ---`, 'result');
        }
        winner = 'draw';
    } else {
        if (!isBulkSimulation) {
            updateMatchLog(`--- Round ${matchState.currentRound} ---`, 'info');
        }

        if (currentMatchType === 'single') {
            const p1 = selectedWrestlers.player1;
            const p2 = selectedWrestlers.player2;

            // Stamina recovery before action for both
            const p1StaminaRecovery = p1.stats.staminaRecoveryRate || 0;
            matchState.currentStamina[p1.id] = Math.min(
                matchState.initialStamina[p1.id],
                matchState.currentStamina[p1.id] + p1StaminaRecovery
            );
            if (!isBulkSimulation) {
                updateWrestlerHealthDisplay(p1.id, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                renderWrestlerInModalDisplay(modalSinglePlayer1, p1, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                updateMatchLog(`${p1.name} recovers ${p1StaminaRecovery} stamina.`, 'info');
            }


            const p2StaminaRecovery = p2.stats.staminaRecoveryRate || 0;
            matchState.currentStamina[p2.id] = Math.min(
                matchState.initialStamina[p2.id],
                matchState.currentStamina[p2.id] + p2StaminaRecovery
            );
            if (!isBulkSimulation) {
                updateWrestlerHealthDisplay(p2.id, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                renderWrestlerInModalDisplay(modalSinglePlayer2, p2, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                updateMatchLog(`${p2.name} recovers ${p2StaminaRecovery} stamina.`, 'info');
            }


            // Player 1 attacks Player 2
            if (matchState.currentHp[p1.id] > 0 && matchState.currentHp[p2.id] > 0) {
                const p1ChosenMove = selectRandomMove(p1);
                if (p1ChosenMove) {
                    const p1StaminaCost = parseFloat(p1ChosenMove.staminaCost) || 0;
                    if (matchState.currentStamina[p1.id] >= p1StaminaCost) {
                        matchState.currentStamina[p1.id] -= p1StaminaCost;
                        if (!isBulkSimulation) {
                            updateMatchLog(`${p1.name} performs ${p1ChosenMove.name} on ${p2.name}!`, 'action');
                        }

                        const p1DamageDealt = calculateDamage(p1, p1ChosenMove);
                        matchState.currentHp[p2.id] = Math.max(0, matchState.currentHp[p2.id] - p1DamageDealt);
                        if (!isBulkSimulation) {
                            updateMatchLog(`${p2.name} takes ${p1DamageDealt} damage!`, 'damage');
                            triggerDamageAnimation(p2.id);
                            updateWrestlerHealthDisplay(p1.id, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                            updateWrestlerHealthDisplay(p2.id, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                            renderWrestlerInModalDisplay(modalSinglePlayer1, p1, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                            renderWrestlerInModalDisplay(modalSinglePlayer2, p2, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                            await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for animation
                        }
                    } else if (!isBulkSimulation) {
                        updateMatchLog(`${p1.name} is too tired to use ${p1ChosenMove.name}!`, 'info');
                    }
                } else if (!isBulkSimulation) {
                    updateMatchLog(`${p1.name} couldn't find a valid move to perform!`, 'info');
                }
            }

            if (matchState.currentHp[p2.id] <= 0) {
                winner = p1;
            }

            if (!winner && matchState.currentHp[p1.id] > 0 && matchState.currentHp[p2.id] > 0) {
                // Player 2 attacks Player 1
                const p2ChosenMove = selectRandomMove(p2);
                if (p2ChosenMove) {
                    const p2StaminaCost = parseFloat(p2ChosenMove.staminaCost) || 0;
                    if (matchState.currentStamina[p2.id] >= p2StaminaCost) {
                        matchState.currentStamina[p2.id] -= p2StaminaCost;
                        if (!isBulkSimulation) {
                            updateMatchLog(`${p2.name} performs ${p2ChosenMove.name} on ${p1.name}!`, 'action');
                        }

                        const p2DamageDealt = calculateDamage(p2, p2ChosenMove);
                        matchState.currentHp[p1.id] = Math.max(0, matchState.currentHp[p1.id] - p2DamageDealt);
                        if (!isBulkSimulation) {
                            updateMatchLog(`${p1.name} takes ${p2DamageDealt} damage!`, 'damage');
                            triggerDamageAnimation(p1.id);
                            updateWrestlerHealthDisplay(p1.id, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                            updateWrestlerHealthDisplay(p2.id, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                            renderWrestlerInModalDisplay(modalSinglePlayer1, p1, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
                            renderWrestlerInModalDisplay(modalSinglePlayer2, p2, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);
                            await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for animation
                        }
                    } else if (!isBulkSimulation) {
                        updateMatchLog(`${p2.name} is too tired to use ${p2ChosenMove.name}!`, 'info');
                    }
                } else if (!isBulkSimulation) {
                    updateMatchLog(`${p2.name} couldn't find a valid move to perform!`, 'info');
                }
            }

            if (matchState.currentHp[p1.id] <= 0) {
                winner = p2;
            }

        } else if (currentMatchType === 'tagTeam') {
            const team1_p1 = selectedWrestlers.team1Player1;
            const team1_p2 = selectedWrestlers.team1Player2;
            const team2_p1 = selectedWrestlers.team2Player1;
            const team2_p2 = selectedWrestlers.team2Player2;

            let activeTeam1Wrestler = null;
            let inactiveTeam1Wrestler = null;
            if (matchState.currentHp[team1_p1.id] > 0 && matchState.currentHp[team1_p2.id] > 0) {
                activeTeam1Wrestler = getRandomInt(0, 1) === 0 ? team1_p1 : team1_p2;
                inactiveTeam1Wrestler = (activeTeam1Wrestler === team1_p1) ? team1_p2 : team1_p1;
            } else if (matchState.currentHp[team1_p1.id] > 0) {
                activeTeam1Wrestler = team1_p1;
                inactiveTeam1Wrestler = team1_p2;
            } else if (matchState.currentHp[team1_p2.id] > 0) {
                activeTeam1Wrestler = team1_p2;
                inactiveTeam1Wrestler = team1_p1;
            }

            let activeTeam2Wrestler = null;
            let inactiveTeam2Wrestler = null;
            if (matchState.currentHp[team2_p1.id] > 0 && matchState.currentHp[team2_p2.id] > 0) {
                activeTeam2Wrestler = getRandomInt(0, 1) === 0 ? team2_p1 : team2_p2;
                inactiveTeam2Wrestler = (activeTeam2Wrestler === team2_p1) ? team2_p2 : team2_p1;
            } else if (matchState.currentHp[team2_p1.id] > 0) {
                activeTeam2Wrestler = team2_p1;
                inactiveTeam2Wrestler = team2_p2;
            } else if (matchState.currentHp[team2_p2.id] > 0) {
                activeTeam2Wrestler = team2_p2;
                inactiveTeam2Wrestler = team2_p1;
            }

            // Stamina recovery for active wrestlers
            if (activeTeam1Wrestler) {
                const t1ActiveStaminaRecovery = activeTeam1Wrestler.stats.staminaRecoveryRate || 0;
                matchState.currentStamina[activeTeam1Wrestler.id] = Math.min(
                    matchState.initialStamina[activeTeam1Wrestler.id],
                    matchState.currentStamina[activeTeam1Wrestler.id] + t1ActiveStaminaRecovery
                );
                if (!isBulkSimulation) {
                    updateWrestlerHealthDisplay(activeTeam1Wrestler.id, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                    renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam1Wrestler.id], activeTeam1Wrestler, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                    updateMatchLog(`${activeTeam1Wrestler.name} recovers ${t1ActiveStaminaRecovery} stamina.`, 'info');
                }
            }
            if (activeTeam2Wrestler) {
                const t2ActiveStaminaRecovery = activeTeam2Wrestler.stats.staminaRecoveryRate || 0;
                matchState.currentStamina[activeTeam2Wrestler.id] = Math.min(
                    matchState.initialStamina[activeTeam2Wrestler.id],
                    matchState.currentStamina[activeTeam2Wrestler.id] + t2ActiveStaminaRecovery
                );
                if (!isBulkSimulation) {
                    updateWrestlerHealthDisplay(activeTeam2Wrestler.id, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                    renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam2Wrestler.id], activeTeam2Wrestler, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                    updateMatchLog(`${activeTeam2Wrestler.name} recovers ${t2ActiveStaminaRecovery} stamina.`, 'info');
                }
            }

            // HP and Stamina recovery for inactive wrestlers (if they exist and are not knocked out)
            if (inactiveTeam1Wrestler && matchState.currentHp[inactiveTeam1Wrestler.id] > 0) {
                const t1InactiveHpRecovery = 5; // Reduced HP recovery
                const t1InactiveStaminaRecovery = inactiveTeam1Wrestler.stats.staminaRecoveryRate || 0;
                matchState.currentHp[inactiveTeam1Wrestler.id] = Math.min(matchState.initialHp[inactiveTeam1Wrestler.id], matchState.currentHp[inactiveTeam1Wrestler.id] + t1InactiveHpRecovery);
                matchState.currentStamina[inactiveTeam1Wrestler.id] = Math.min(matchState.initialStamina[inactiveTeam1Wrestler.id], matchState.currentStamina[inactiveTeam1Wrestler.id] + t1InactiveStaminaRecovery);
                if (!isBulkSimulation) {
                    updateMatchLog(`${inactiveTeam1Wrestler.name} recovers! HP: ${matchState.currentHp[inactiveTeam1Wrestler.id].toFixed(0)} | Stamina: ${matchState.currentStamina[inactiveTeam1Wrestler.id].toFixed(0)}`, 'info');
                    updateWrestlerHealthDisplay(inactiveTeam1Wrestler.id, matchState.currentHp[inactiveTeam1Wrestler.id], matchState.initialHp[inactiveTeam1Wrestler.id], matchState.currentStamina[inactiveTeam1Wrestler.id], matchState.initialStamina[inactiveTeam1Wrestler.id]);
                    renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[inactiveTeam1Wrestler.id], inactiveTeam1Wrestler, matchState.currentHp[inactiveTeam1Wrestler.id], matchState.initialHp[inactiveTeam1Wrestler.id], matchState.currentStamina[inactiveTeam1Wrestler.id], matchState.initialStamina[inactiveTeam1Wrestler.id]);
                }
            }
            if (inactiveTeam2Wrestler && matchState.currentHp[inactiveTeam2Wrestler.id] > 0) {
                const t2InactiveHpRecovery = 5; // Reduced HP recovery
                const t2InactiveStaminaRecovery = inactiveTeam2Wrestler.stats.staminaRecoveryRate || 0;
                matchState.currentHp[inactiveTeam2Wrestler.id] = Math.min(matchState.initialHp[inactiveTeam2Wrestler.id], matchState.currentHp[inactiveTeam2Wrestler.id] + t2InactiveHpRecovery);
                matchState.currentStamina[inactiveTeam2Wrestler.id] = Math.min(matchState.initialStamina[inactiveTeam2Wrestler.id], matchState.currentStamina[inactiveTeam2Wrestler.id] + t2InactiveStaminaRecovery);
                if (!isBulkSimulation) {
                    updateMatchLog(`${inactiveTeam2Wrestler.name} recovers! HP: ${matchState.currentHp[inactiveTeam2Wrestler.id].toFixed(0)} | Stamina: ${matchState.currentStamina[inactiveTeam2Wrestler.id].toFixed(0)}`, 'info');
                    updateWrestlerHealthDisplay(inactiveTeam2Wrestler.id, matchState.currentHp[inactiveTeam2Wrestler.id], matchState.initialHp[inactiveTeam2Wrestler.id], matchState.currentStamina[inactiveTeam2Wrestler.id], matchState.initialStamina[inactiveTeam2Wrestler.id]);
                    renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[inactiveTeam2Wrestler.id], inactiveTeam2Wrestler, matchState.currentHp[inactiveTeam2Wrestler.id], matchState.initialHp[inactiveTeam2Wrestler.id], matchState.currentStamina[inactiveTeam2Wrestler.id], matchState.initialStamina[inactiveTeam2Wrestler.id]);
                }
            }

            // Check for team KOs before attacks
            if ((matchState.currentHp[team1_p1.id] <= 0 && matchState.currentHp[team1_p2.id] <= 0) ||
                (matchState.currentHp[team2_p1.id] <= 0 && matchState.currentHp[team2_p2.id] <= 0)) {
                winner = determineWinner(); // Check for winner based on HP
            }

            if (!winner && activeTeam1Wrestler && activeTeam2Wrestler) {
                // Team 1 active wrestler attacks Team 2 active wrestler
                const t1ChosenMove = selectRandomMove(activeTeam1Wrestler);
                if (t1ChosenMove) {
                    const t1StaminaCost = parseFloat(t1ChosenMove.staminaCost) || 0;
                    if (matchState.currentStamina[activeTeam1Wrestler.id] >= t1StaminaCost) {
                        matchState.currentStamina[activeTeam1Wrestler.id] -= t1StaminaCost;
                        if (!isBulkSimulation) {
                            updateMatchLog(`${activeTeam1Wrestler.name} performs ${t1ChosenMove.name} on ${activeTeam2Wrestler.name}!`, 'action');
                        }

                        const t1DamageDealt = calculateDamage(activeTeam1Wrestler, t1ChosenMove);
                        matchState.currentHp[activeTeam2Wrestler.id] = Math.max(0, matchState.currentHp[activeTeam2Wrestler.id] - t1DamageDealt);
                        if (!isBulkSimulation) {
                            updateMatchLog(`${activeTeam2Wrestler.name} takes ${t1DamageDealt} damage!`, 'damage');
                            triggerDamageAnimation(activeTeam2Wrestler.id);
                            updateWrestlerHealthDisplay(activeTeam1Wrestler.id, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                            updateWrestlerHealthDisplay(activeTeam2Wrestler.id, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                            renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam1Wrestler.id], activeTeam1Wrestler, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                            renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam2Wrestler.id], activeTeam2Wrestler, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
                    } else if (!isBulkSimulation) {
                        updateMatchLog(`${activeTeam1Wrestler.name} is too tired to use ${t1ChosenMove.name}!`, 'info');
                    }
                } else if (!isBulkSimulation) {
                    updateMatchLog(`${activeTeam1Wrestler.name} couldn't find a valid move to perform!`, 'info');
                }

                winner = determineWinner(); // Check for winner after Team 1's attack

                if (!winner && matchState.currentHp[activeTeam1Wrestler.id] > 0 && matchState.currentHp[activeTeam2Wrestler.id] > 0) {
                    // Team 2 active wrestler attacks Team 1 active wrestler
                    const t2ChosenMove = selectRandomMove(activeTeam2Wrestler);
                    if (t2ChosenMove) {
                        const t2StaminaCost = parseFloat(t2ChosenMove.staminaCost) || 0;
                        if (matchState.currentStamina[activeTeam2Wrestler.id] >= t2StaminaCost) {
                            matchState.currentStamina[activeTeam2Wrestler.id] -= t2StaminaCost;
                            if (!isBulkSimulation) {
                                updateMatchLog(`${activeTeam2Wrestler.name} performs ${t2ChosenMove.name} on ${activeTeam1Wrestler.name}!`, 'action');
                            }

                            const t2DamageDealt = calculateDamage(activeTeam2Wrestler, t2ChosenMove);
                            matchState.currentHp[activeTeam1Wrestler.id] = Math.max(0, matchState.currentHp[activeTeam1Wrestler.id] - t2DamageDealt);
                            if (!isBulkSimulation) {
                                updateMatchLog(`${activeTeam1Wrestler.name} takes ${t2DamageDealt} damage!`, 'damage');
                                triggerDamageAnimation(activeTeam1Wrestler.id);
                                updateWrestlerHealthDisplay(activeTeam1Wrestler.id, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                                updateWrestlerHealthDisplay(activeTeam2Wrestler.id, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                                renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam1Wrestler.id], activeTeam1Wrestler, matchState.currentHp[activeTeam1Wrestler.id], matchState.initialHp[activeTeam1Wrestler.id], matchState.currentStamina[activeTeam1Wrestler.id], matchState.initialStamina[activeTeam1Wrestler.id]);
                                renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[activeTeam2Wrestler.id], activeTeam2Wrestler, matchState.currentHp[activeTeam2Wrestler.id], matchState.initialHp[activeTeam2Wrestler.id], matchState.currentStamina[activeTeam2Wrestler.id], matchState.initialStamina[activeTeam2Wrestler.id]);
                                await new Promise(resolve => setTimeout(resolve, 500));
                            }
                        } else if (!isBulkSimulation) {
                            updateMatchLog(`${activeTeam2Wrestler.name} is too tired to use ${t2ChosenMove.name}!`, 'info');
                        }
                    } else if (!isBulkSimulation) {
                        updateMatchLog(`${activeTeam2Wrestler.name} couldn't find a valid move to perform!`, 'info');
                    }
                }
                winner = determineWinner(); // Check for winner after Team 2's attack
            }
        }
    }

    if (!isBulkSimulation) {
        const nextTurnBtn = document.getElementById('nextTurnBtn');
        if (winner) {
            if (nextTurnBtn) {
                nextTurnBtn.classList.add('hidden');
            }
            endMatch(winner); // Call endMatch for UI update
        }
    }
    return winner; // Return winner for bulk simulation
}

/**
 * Runs multiple match simulations and displays the aggregated results.
 */
async function runMultipleSimulations() {
    if ((currentMatchType === 'single' && (!selectedWrestlers.player1 || !selectedWrestlers.player2)) ||
        (currentMatchType === 'tagTeam' && (!selectedWrestlers.team1Player1 || !selectedWrestlers.team1Player2 || !selectedWrestlers.team2Player1 || !selectedWrestlers.team2Player2))) {
        showModal(document.getElementById('resultModal'), 'Simulation Error', 'Please select the required number of wrestlers before running simulations.');
        return;
    }

    const numSimulations = 100;
    const simulationResults = [];
    let tempMatchState = {}; // Use a temporary state for headless simulation

    // Disable UI buttons during simulation
    const buttonsToDisable = ['startMatchBtn', 'nextTurnBtn', 'randomMatchupBtn', 'singleMatchBtn', 'tagTeamMatchBtn', 'simulate100xBtn', 'resetMatchBtn', 'resetMatchBtnModal', 'resetMatchBtnWinnerModal'];
    buttonsToDisable.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = true;
    });

    showModal(document.getElementById('resultModal'), 'Simulating...', 'Running 100 matches. Please wait...');

    for (let i = 0; i < numSimulations; i++) {
        let currentSimWinner = null;
        let simRound = 0;

        // Deep copy selected wrestlers to avoid modifying original wrestler objects
        // Ensure to copy the entire wrestler object, including stats and moves
        let simP1 = selectedWrestlers.player1 ? JSON.parse(JSON.stringify(selectedWrestlers.player1)) : null;
        let simP2 = selectedWrestlers.player2 ? JSON.parse(JSON.stringify(selectedWrestlers.player2)) : null;
        let simTeam1P1 = selectedWrestlers.team1Player1 ? JSON.parse(JSON.stringify(selectedWrestlers.team1Player1)) : null;
        let simTeam1P2 = selectedWrestlers.team1Player2 ? JSON.parse(JSON.stringify(selectedWrestlers.team1Player2)) : null;
        let simTeam2P1 = selectedWrestlers.team2Player1 ? JSON.parse(JSON.stringify(selectedWrestlers.team2Player1)) : null;
        let simTeam2P2 = selectedWrestlers.team2Player2 ? JSON.parse(JSON.stringify(selectedWrestlers.team2Player2)) : null;


        // Initialize temporary HP and Stamina for this simulation
        tempMatchState = {
            currentHp: {},
            currentStamina: {},
            initialHp: {},
            initialStamina: {},
            // Use the updated maxRounds for simulations as well
            maxRounds: currentMatchType === 'single' ? 75 : 125
        };

        if (currentMatchType === 'single') {
            tempMatchState.initialHp[simP1.id] = simP1.baseHp + simP1.stats.stamina;
            tempMatchState.currentHp[simP1.id] = simP1.baseHp + simP1.stats.stamina;
            tempMatchState.initialStamina[simP1.id] = simP1.stats.stamina;
            tempMatchState.currentStamina[simP1.id] = simP1.stats.stamina;

            tempMatchState.initialHp[simP2.id] = simP2.baseHp + simP2.stats.stamina;
            tempMatchState.currentHp[simP2.id] = simP2.baseHp + simP2.stats.stamina;
            tempMatchState.initialStamina[simP2.id] = simP2.stats.stamina;
            tempMatchState.currentStamina[simP2.id] = simP2.stats.stamina;

        } else if (currentMatchType === 'tagTeam') {
            tempMatchState.initialHp[simTeam1P1.id] = simTeam1P1.baseHp + simTeam1P1.stats.stamina;
            tempMatchState.currentHp[simTeam1P1.id] = simTeam1P1.baseHp + simTeam1P1.stats.stamina;
            tempMatchState.initialStamina[simTeam1P1.id] = simTeam1P1.stats.stamina;
            tempMatchState.currentStamina[simTeam1P1.id] = simTeam1P1.stats.stamina;

            tempMatchState.initialHp[simTeam1P2.id] = simTeam1P2.baseHp + simTeam1P2.stats.stamina;
            tempMatchState.currentHp[simTeam1P2.id] = simTeam1P2.baseHp + simTeam1P2.stats.stamina;
            tempMatchState.initialStamina[simTeam1P2.id] = simTeam1P2.stats.stamina;
            tempMatchState.currentStamina[simTeam1P2.id] = simTeam1P2.stats.stamina;

            tempMatchState.initialHp[simTeam2P1.id] = simTeam2P1.baseHp + simTeam2P1.stats.stamina;
            tempMatchState.currentHp[simTeam2P1.id] = simTeam2P1.baseHp + simTeam2P1.stats.stamina;
            tempMatchState.initialStamina[simTeam2P1.id] = simTeam2P1.stats.stamina;
            tempMatchState.currentStamina[simTeam2P1.id] = simTeam2P1.stats.stamina;

            tempMatchState.initialHp[simTeam2P2.id] = simTeam2P2.baseHp + simTeam2P2.stats.stamina;
            tempMatchState.currentHp[simTeam2P2.id] = simTeam2P2.baseHp + simTeam2P2.stats.stamina;
            tempMatchState.initialStamina[simTeam2P2.id] = simTeam2P2.stats.stamina;
            tempMatchState.currentStamina[simTeam2P2.id] = simTeam2P2.stats.stamina;
        }

        // Simulate one match (headless)
        while (!currentSimWinner && simRound < tempMatchState.maxRounds) {
            simRound++;

            if (currentMatchType === 'single') {
                // Stamina recovery before action for both
                const p1StaminaRecovery = simP1.stats.staminaRecoveryRate || 0;
                tempMatchState.currentStamina[simP1.id] = Math.min(
                    tempMatchState.initialStamina[simP1.id],
                    tempMatchState.currentStamina[simP1.id] + p1StaminaRecovery
                );

                const p2StaminaRecovery = simP2.stats.staminaRecoveryRate || 0;
                tempMatchState.currentStamina[simP2.id] = Math.min(
                    tempMatchState.initialStamina[simP2.id],
                    tempMatchState.currentStamina[simP2.id] + p2StaminaRecovery
                );

                // Player 1 attacks Player 2
                if (tempMatchState.currentHp[simP1.id] > 0 && tempMatchState.currentHp[simP2.id] > 0) {
                    const p1ChosenMove = selectRandomMove(simP1); // Use simP1
                    if (p1ChosenMove) {
                        const p1StaminaCost = parseFloat(p1ChosenMove.staminaCost) || 0;
                        if (tempMatchState.currentStamina[simP1.id] >= p1StaminaCost) {
                            tempMatchState.currentStamina[simP1.id] -= p1StaminaCost;
                            const p1DamageDealt = calculateDamage(simP1, p1ChosenMove); // Use simP1
                            tempMatchState.currentHp[simP2.id] = Math.max(0, tempMatchState.currentHp[simP2.id] - p1DamageDealt);
                        }
                    }
                }
                if (tempMatchState.currentHp[simP2.id] <= 0) {
                    currentSimWinner = simP1.name;
                }

                if (!currentSimWinner && tempMatchState.currentHp[simP1.id] > 0 && tempMatchState.currentHp[simP2.id] > 0) {
                    // Player 2 attacks Player 1
                    const p2ChosenMove = selectRandomMove(simP2); // Use simP2
                    if (p2ChosenMove) {
                        const p2StaminaCost = parseFloat(p2ChosenMove.staminaCost) || 0;
                        if (tempMatchState.currentStamina[simP2.id] >= p2StaminaCost) {
                            tempMatchState.currentStamina[simP2.id] -= p2StaminaCost;
                            const p2DamageDealt = calculateDamage(simP2, p2ChosenMove); // Use simP2
                            tempMatchState.currentHp[simP1.id] = Math.max(0, tempMatchState.currentHp[simP1.id] - p2DamageDealt);
                        }
                    }
                }
                if (tempMatchState.currentHp[simP1.id] <= 0) {
                    currentSimWinner = simP2.name;
                }

            } else if (currentMatchType === 'tagTeam') {
                let activeTeam1Wrestler = null;
                let inactiveTeam1Wrestler = null;
                if (tempMatchState.currentHp[simTeam1P1.id] > 0 && tempMatchState.currentHp[simTeam1P2.id] > 0) {
                    activeTeam1Wrestler = getRandomInt(0, 1) === 0 ? simTeam1P1 : simTeam1P2;
                    inactiveTeam1Wrestler = (activeTeam1Wrestler === simTeam1P1) ? simTeam1P2 : simTeam1P1;
                } else if (tempMatchState.currentHp[simTeam1P1.id] > 0) {
                    activeTeam1Wrestler = simTeam1P1;
                    inactiveTeam1Wrestler = simTeam1P2;
                } else if (tempMatchState.currentHp[simTeam1P2.id] > 0) {
                    activeTeam1Wrestler = simTeam1P2;
                    inactiveTeam1Wrestler = simTeam1P1;
                }

                let activeTeam2Wrestler = null;
                let inactiveTeam2Wrestler = null;
                if (tempMatchState.currentHp[simTeam2P1.id] > 0 && tempMatchState.currentHp[simTeam2P2.id] > 0) {
                    activeTeam2Wrestler = getRandomInt(0, 1) === 0 ? simTeam2P1 : simTeam2P2;
                    inactiveTeam2Wrestler = (activeTeam2Wrestler === simTeam2P1) ? simTeam2P2 : simTeam2P1;
                } else if (tempMatchState.currentHp[simTeam2P1.id] > 0) {
                    activeTeam2Wrestler = simTeam2P1;
                    inactiveTeam2Wrestler = simTeam2P2;
                } else if (tempMatchState.currentHp[simTeam2P2.id] > 0) {
                    activeTeam2Wrestler = simTeam2P2;
                    inactiveTeam2Wrestler = simTeam2P1;
                }

                // Stamina recovery for active wrestlers
                if (activeTeam1Wrestler) {
                    const t1ActiveStaminaRecovery = activeTeam1Wrestler.stats.staminaRecoveryRate || 0;
                    tempMatchState.currentStamina[activeTeam1Wrestler.id] = Math.min(
                        tempMatchState.initialStamina[activeTeam1Wrestler.id],
                        tempMatchState.currentStamina[activeTeam1Wrestler.id] + t1ActiveStaminaRecovery
                    );
                }
                if (activeTeam2Wrestler) {
                    const t2ActiveStaminaRecovery = activeTeam2Wrestler.stats.staminaRecoveryRate || 0;
                    tempMatchState.currentStamina[activeTeam2Wrestler.id] = Math.min(
                        tempMatchState.initialStamina[activeTeam2Wrestler.id],
                        tempMatchState.currentStamina[activeTeam2Wrestler.id] + t2ActiveStaminaRecovery
                    );
                }

                // HP and Stamina recovery for inactive wrestlers (if they exist and are not knocked out)
                if (inactiveTeam1Wrestler && tempMatchState.currentHp[inactiveTeam1Wrestler.id] > 0) {
                    const t1InactiveHpRecovery = 5;
                    const t1InactiveStaminaRecovery = inactiveTeam1Wrestler.stats.staminaRecoveryRate || 0;
                    tempMatchState.currentHp[inactiveTeam1Wrestler.id] = Math.min(tempMatchState.initialHp[inactiveTeam1Wrestler.id], tempMatchState.currentHp[inactiveTeam1Wrestler.id] + t1InactiveHpRecovery);
                    tempMatchState.currentStamina[inactiveTeam1Wrestler.id] = Math.min(tempMatchState.initialStamina[inactiveTeam1Wrestler.id], tempMatchState.currentStamina[inactiveTeam1Wrestler.id] + t1InactiveStaminaRecovery);
                }
                if (inactiveTeam2Wrestler && tempMatchState.currentHp[inactiveTeam2Wrestler.id] > 0) {
                    const t2InactiveHpRecovery = 5;
                    const t2InactiveStaminaRecovery = inactiveTeam2Wrestler.stats.staminaRecoveryRate || 0;
                    tempMatchState.currentHp[inactiveTeam2Wrestler.id] = Math.min(tempMatchState.initialHp[inactiveTeam2Wrestler.id], tempMatchState.currentHp[inactiveTeam2Wrestler.id] + t2InactiveHpRecovery);
                    tempMatchState.currentStamina[inactiveTeam2Wrestler.id] = Math.min(tempMatchState.initialStamina[inactiveTeam2Wrestler.id], tempMatchState.currentStamina[inactiveTeam2Wrestler.id] + t2InactiveStaminaRecovery);
                }

                // Check for team KOs before attacks
                if ((tempMatchState.currentHp[simTeam1P1.id] <= 0 && tempMatchState.currentHp[simTeam1P2.id] <= 0) ||
                    (tempMatchState.currentHp[simTeam2P1.id] <= 0 && tempMatchState.currentHp[simTeam2P2.id] <= 0)) {
                    // Determine winner for simulation based on current state
                    const team1AliveSim = (tempMatchState.currentHp[simTeam1P1.id] > 0 || tempMatchState.currentHp[simTeam1P2.id] > 0);
                    const team2AliveSim = (tempMatchState.currentHp[simTeam2P1.id] > 0 || tempMatchState.currentHp[simTeam2P2.id] > 0);
                    if (!team1AliveSim && !team2AliveSim) {
                        currentSimWinner = 'draw';
                    } else if (!team1AliveSim) {
                        currentSimWinner = 'Team 2';
                    } else if (!team2AliveSim) {
                        currentSimWinner = 'Team 1';
                    }
                }

                if (!currentSimWinner && activeTeam1Wrestler && activeTeam2Wrestler) {
                    // Team 1 active wrestler attacks Team 2 active wrestler
                    const t1ChosenMove = selectRandomMove(activeTeam1Wrestler);
                    if (t1ChosenMove) {
                        const t1StaminaCost = parseFloat(t1ChosenMove.staminaCost) || 0;
                        if (tempMatchState.currentStamina[activeTeam1Wrestler.id] >= t1StaminaCost) {
                            tempMatchState.currentStamina[activeTeam1Wrestler.id] -= t1StaminaCost;
                            const t1DamageDealt = calculateDamage(activeTeam1Wrestler, t1ChosenMove);
                            tempMatchState.currentHp[activeTeam2Wrestler.id] = Math.max(0, tempMatchState.currentHp[activeTeam2Wrestler.id] - t1DamageDealt);
                        }
                    }

                    // Check for winner after Team 1's attack
                    const team1AliveSim = (tempMatchState.currentHp[simTeam1P1.id] > 0 || tempMatchState.currentHp[simTeam1P2.id] > 0);
                    const team2AliveSim = (tempMatchState.currentHp[simTeam2P1.id] > 0 || tempMatchState.currentHp[simTeam2P2.id] > 0);
                    if (!team1AliveSim && !team2AliveSim) {
                        currentSimWinner = 'draw';
                    } else if (!team1AliveSim) {
                        currentSimWinner = 'Team 2';
                    } else if (!team2AliveSim) {
                        currentSimWinner = 'Team 1';
                    }

                    if (!currentSimWinner && tempMatchState.currentHp[activeTeam1Wrestler.id] > 0 && tempMatchState.currentHp[activeTeam2Wrestler.id] > 0) {
                        // Team 2 active wrestler attacks Team 1 active wrestler
                        const t2ChosenMove = selectRandomMove(activeTeam2Wrestler);
                        if (t2ChosenMove) {
                            const t2StaminaCost = parseFloat(t2ChosenMove.staminaCost) || 0;
                            if (tempMatchState.currentStamina[activeTeam2Wrestler.id] >= t2StaminaCost) {
                                tempMatchState.currentStamina[activeTeam2Wrestler.id] -= t2StaminaCost;
                                const t2DamageDealt = calculateDamage(activeTeam2Wrestler, t2ChosenMove);
                                tempMatchState.currentHp[activeTeam1Wrestler.id] = Math.max(0, tempMatchState.currentHp[activeTeam1Wrestler.id] - t2DamageDealt);
                            }
                        }
                    }
                    // Check for winner after Team 2's attack
                    const team1AliveSimFinal = (tempMatchState.currentHp[simTeam1P1.id] > 0 || tempMatchState.currentHp[simTeam1P2.id] > 0);
                    const team2AliveSimFinal = (tempMatchState.currentHp[simTeam2P1.id] > 0 || tempMatchState.currentHp[simTeam2P2.id] > 0);
                    if (!team1AliveSimFinal && !team2AliveSimFinal) {
                        currentSimWinner = 'draw';
                    } else if (!team1AliveSimFinal) {
                        currentSimWinner = 'Team 2';
                    } else if (!team2AliveSimFinal) {
                        currentSimWinner = 'Team 1';
                    }
                }
            }
        }
        if (!currentSimWinner && simRound >= tempMatchState.maxRounds) {
            currentSimWinner = 'draw';
        }
        simulationResults.push(currentSimWinner);
    }

    hideModal(document.getElementById('resultModal')); // Hide "Simulating..." modal
    showSimulationResultsModal(simulationResults);

    // Re-enable UI buttons after simulation
    buttonsToDisable.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = false;
    });
}

/**
 * Displays the aggregated results of multiple simulations.
 * @param {Array<string>} results - An array of winner names or 'draw' strings.
 */
function showSimulationResultsModal(results) {
    const counts = {};
    results.forEach(result => {
        counts[result] = (counts[result] || 0) + 1;
    });

    let resultHtml = '<h2 class="text-3xl font-bold text-yellow-400 mb-4">Simulation Results (100 Matches)</h2>';
    resultHtml += '<div class="text-left text-gray-300 mb-6">';
    for (const winner in counts) {
        resultHtml += `<p class="text-lg">${winner}: <span class="font-bold">${counts[winner]} wins</span></p>`;
    }
    resultHtml += '</div>';

    // Create a new modal for simulation results
    const simulationResultModal = document.createElement('div');
    simulationResultModal.id = 'simulationResultModal';
    simulationResultModal.classList.add('modal', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50');
    simulationResultModal.innerHTML = `
        <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 relative border-2 border-yellow-500 text-center">
            ${resultHtml}
            <button id="closeSimulationResultsModalBtn" class="btn btn-primary mt-4">Close</button>
        </div>
    `;
    document.body.appendChild(simulationResultModal);

    const closeBtn = document.getElementById('closeSimulationResultsModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            simulationResultModal.remove();
        });
    }
}

/**
 * Creates a random matchup based on the current match type.
 */
function createRandomMatchup() {
    resetMatch(); // Clear any existing selections

    if (loadedWrestlers.length < 2) {
        showModal(document.getElementById('resultModal'), 'Error', 'Not enough wrestlers in the roster to create a random matchup.');
        return;
    }

    const availableWrestlers = [...loadedWrestlers]; // Create a mutable copy

    if (currentMatchType === 'single') {
        if (availableWrestlers.length < 2) {
            showModal(document.getElementById('resultModal'), 'Error', 'Not enough wrestlers for a random single match.');
            return;
        }
        const p1Index = getRandomInt(0, availableWrestlers.length - 1);
        const p1 = availableWrestlers.splice(p1Index, 1)[0];

        const p2Index = getRandomInt(0, availableWrestlers.length - 1);
        const p2 = availableWrestlers.splice(p2Index, 1)[0];

        selectedWrestlers.player1 = p1;
        selectedWrestlers.player2 = p2;

        renderWrestlerInDropZone(document.getElementById('player1DropZone'), p1);
        renderWrestlerInDropZone(document.getElementById('player2DropZone'), p2);
        hideWrestlerCardInRoster(p1.id);
        hideWrestlerCardInRoster(p2.id);

    } else if (currentMatchType === 'tagTeam') {
        if (availableWrestlers.length < 4) {
            showModal(document.getElementById('resultModal'), 'Error', 'Not enough wrestlers for a random tag team match.');
            return;
        }

        const selectRandomWrestler = () => {
            const index = getRandomInt(0, availableWrestlers.length - 1);
            return availableWrestlers.splice(index, 1)[0];
        };

        selectedWrestlers.team1Player1 = selectRandomWrestler();
        selectedWrestlers.team1Player2 = selectRandomWrestler();
        selectedWrestlers.team2Player1 = selectRandomWrestler();
        selectedWrestlers.team2Player2 = selectRandomWrestler();

        renderWrestlerInDropZone(document.getElementById('team1Player1DropZone'), selectedWrestlers.team1Player1);
        renderWrestlerInDropZone(document.getElementById('team1Player2DropZone'), selectedWrestlers.team1Player2);
        renderWrestlerInDropZone(document.getElementById('team2Player1DropZone'), selectedWrestlers.team2Player1);
        renderWrestlerInDropZone(document.getElementById('team2Player2DropZone'), selectedWrestlers.team2Player2);

        hideWrestlerCardInRoster(selectedWrestlers.team1Player1.id);
        hideWrestlerCardInRoster(selectedWrestlers.team1Player2.id);
        hideWrestlerCardInRoster(selectedWrestlers.team2Player1.id);
        hideWrestlerCardInRoster(selectedWrestlers.team2Player2.id);
    }
    checkAndToggleStartButton(); // Check if start button should be enabled after random selection
}


// --- Event Handlers for Drag and Drop (Mouse & Touch) ---

/**
 * Handles the start of a drag operation (mouse).
 * @param {DragEvent} event - The dragstart event.
 */
function handleDragStart(event) {
    draggedWrestlerId = event.target.id;
    event.dataTransfer.setData('text/plain', draggedWrestlerId);
    event.dataTransfer.effectAllowed = 'move';
    event.target.classList.add('opacity-50'); // Reduce opacity of original card
    console.log('Mouse drag started for:', draggedWrestlerId);
}

/**
 * Handles drag over event for drop zones (mouse).
 * @param {DragEvent} event - The dragover event.
 */
function handleDragOver(event) {
    event.preventDefault(); // Allow drop
    event.dataTransfer.dropEffect = 'move';
    const dropZone = event.currentTarget;
    if (dropZone !== currentDropZone) {
        if (currentDropZone) {
            updateDropZoneVisual(currentDropZone, false); // Unhighlight previous
        }
        updateDropZoneVisual(dropZone, true); // Highlight current
        currentDropZone = dropZone;
    }
}

/**
 * Handles the drop action for drop zones (mouse).
 * @param {DragEvent} event - The drop event.
 */
function handleDrop(event) {
    event.preventDefault();
    const dropZone = event.currentTarget;
    updateDropZoneVisual(dropZone, false); // Remove highlight
    currentDropZone = null; // Reset

    const id = event.dataTransfer.getData('text/plain');
    const wrestler = findWrestlerById(id);

    if (wrestler) {
        // Return original card to full opacity if it was a mouse drag
        const originalCardInRoster = document.getElementById(id);
        if (originalCardInRoster) {
            originalCardInRoster.classList.remove('opacity-50');
        }

        // Check which drop zone it is and assign accordingly
        if (dropZone.id === 'player1DropZone') {
            if (selectedWrestlers.player1) { // If already occupied, return original to roster
                showWrestlerCardInRoster(selectedWrestlers.player1.id);
            }
            selectedWrestlers.player1 = wrestler;
        } else if (dropZone.id === 'player2DropZone') {
            if (selectedWrestlers.player2) {
                showWrestlerCardInRoster(selectedWrestlers.player2.id);
            }
            selectedWrestlers.player2 = wrestler;
        } else if (dropZone.id === 'team1Player1DropZone') {
            if (selectedWrestlers.team1Player1) {
                showWrestlerCardInRoster(selectedWrestlers.team1Player1.id);
            }
            selectedWrestlers.team1Player1 = wrestler;
        } else if (dropZone.id === 'team1Player2DropZone') {
            if (selectedWrestlers.team1Player2) {
                showWrestlerCardInRoster(selectedWrestlers.team1Player2.id);
            }
            selectedWrestlers.team1Player2 = wrestler;
        } else if (dropZone.id === 'team2Player1DropZone') {
            if (selectedWrestlers.team2Player1) {
                showWrestlerCardInRoster(selectedWrestlers.team2Player1.id);
            }
            selectedWrestlers.team2Player1 = wrestler;
        } else if (dropZone.id === 'team2Player2DropZone') {
            if (selectedWrestlers.team2Player2) {
                showWrestlerCardInRoster(selectedWrestlers.team2Player2.id);
            }
            selectedWrestlers.team2Player2 = wrestler;
        }

        renderWrestlerInDropZone(dropZone, wrestler);
        hideWrestlerCardInRoster(id);
        checkAndToggleStartButton();
    }
    draggedWrestlerId = null; // Reset dragged ID after drop
}


/**
 * Handles touch start event for wrestler cards (mobile drag).
 * @param {TouchEvent} event - The touchstart event.
 */
function handleTouchStart(event) {
    isDraggingTouch = false; // Reset for new touch
    // Only proceed if it's a single touch
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        const touchedCard = event.currentTarget; // The wrestler card
        draggedWrestlerId = touchedCard.id;

        // Create a visual clone immediately
        currentTouchDragClone = createDragCloneForTouch(touchedCard);
        updateDragClonePosition(touch.clientX, touch.clientY);

        // Set a flag to indicate potential drag, but don't preventDefault yet
        // We only preventDefault on touchmove if significant movement occurs
        isDraggingTouch = true;

        // Reduce opacity of original card
        touchedCard.classList.add('opacity-50');
    }
}

/**
 * Handles touch move event for wrestler cards (mobile drag).
 * @param {TouchEvent} event - The touchmove event.
 */
function handleTouchMove(event) {
    if (isDraggingTouch && event.touches.length === 1) {
        const touch = event.touches[0];
        updateDragClonePosition(touch.clientX, touch.clientY);

        // Prevent default scrolling *only if* we are actively dragging a clone
        // This is crucial to allow normal scrolling when not dragging
        event.preventDefault();

        // Identify the element under the touch point
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        let newDropZone = null;

        if (targetElement) {
            // Traverse up the DOM to find a drop-zone parent
            let current = targetElement;
            while (current && !current.classList.contains('drop-zone')) {
                current = current.parentElement;
            }
            if (current && current.classList.contains('drop-zone')) {
                newDropZone = current;
            }
        }

        if (newDropZone !== currentDropZone) {
            if (currentDropZone) {
                unhighlightDropZone(currentDropZone);
            }
            if (newDropZone) {
                highlightDropZone(newDropZone);
            }
            currentDropZone = newDropZone;
        }
    }
}

/**
 * Handles touch end event for wrestler cards (mobile drop).
 * @param {TouchEvent} event - The touchend event.
 */
function handleTouchEnd(event) {
    if (isDraggingTouch) {
        // Get the last touch position (from where the finger was lifted)
        const touch = event.changedTouches[0];
        if (!touch) {
            console.warn("No changedTouches found on touchend, cannot determine drop position.");
            removeDragClone();
            isDraggingTouch = false;
            if (currentDropZone) {
                unhighlightDropZone(currentDropZone);
                currentDropZone = null;
            }
            return;
        }

        const dropPointX = touch.clientX;
        const dropPointY = touch.clientY;

        // Identify the element under the final touch point
        const targetElement = document.elementFromPoint(dropPointX, dropPointY);
        let finalDropZone = null;

        if (targetElement) {
            let current = targetElement;
            while (current && !current.classList.contains('drop-zone')) {
                current = current.parentElement;
            }
            if (current && current.classList.contains('drop-zone')) {
                finalDropZone = current;
            }
        }

        if (currentDropZone) {
            unhighlightDropZone(currentDropZone); // Remove highlight from any active zone
            currentDropZone = null;
        }

        if (finalDropZone && draggedWrestlerId) {
            const wrestler = findWrestlerById(draggedWrestlerId);
            if (wrestler) {
                // Return original card to full opacity
                const originalCardInRoster = document.getElementById(draggedWrestlerId);
                if (originalCardInRoster) {
                    originalCardInRoster.classList.remove('opacity-50');
                }

                // This logic is duplicated from handleDrop, can be refactored
                if (finalDropZone.id === 'player1DropZone') {
                    if (selectedWrestlers.player1) {
                        showWrestlerCardInRoster(selectedWrestlers.player1.id);
                    }
                    selectedWrestlers.player1 = wrestler;
                } else if (finalDropZone.id === 'player2DropZone') {
                    if (selectedWrestlers.player2) {
                        showWrestlerCardInRoster(selectedWrestlers.player2.id);
                    }
                    selectedWrestlers.player2 = wrestler;
                } else if (finalDropZone.id === 'team1Player1DropZone') {
                    if (selectedWrestlers.team1Player1) {
                        showWrestlerCardInRoster(selectedWrestlers.team1Player1.id);
                    }
                    selectedWrestlers.team1Player1 = wrestler;
                } else if (finalDropZone.id === 'team1Player2DropZone') {
                    if (selectedWrestlers.team1Player2) {
                        showWrestlerCardInRoster(selectedWrestlers.team1Player2.id);
                    }
                    selectedWrestlers.team1Player2 = wrestler;
                } else if (finalDropZone.id === 'team2Player1DropZone') {
                    if (selectedWrestlers.team2Player1) {
                        showWrestlerCardInRoster(selectedWrestlers.team2Player1.id);
                    }
                    selectedWrestlers.team2Player1 = wrestler;
                } else if (finalDropZone.id === 'team2Player2DropZone') {
                    if (selectedWrestlers.team2Player2) {
                        showWrestlerCardInRoster(selectedWrestlers.team2Player2.id);
                    }
                    selectedWrestlers.team2Player2 = wrestler;
                }

                renderWrestlerInDropZone(finalDropZone, wrestler);
                hideWrestlerCardInRoster(draggedWrestlerId);
                checkAndToggleStartButton();
            }
        }
        removeDragClone();
        draggedWrestlerId = null;
        isDraggingTouch = false;
    }
}


/**
 * Checks if enough wrestlers are selected for the current match type and toggles the start button.
 */
function checkAndToggleStartButton() {
    const startMatchBtn = document.getElementById('startMatchBtn');
    let canStart = false;

    if (currentMatchType === 'single') {
        canStart = selectedWrestlers.player1 !== null && selectedWrestlers.player2 !== null;
    } else if (currentMatchType === 'tagTeam') {
        canStart = selectedWrestlers.team1Player1 !== null && selectedWrestlers.team1Player2 !== null &&
                   selectedWrestlers.team2Player1 !== null && selectedWrestlers.team2Player2 !== null;
    }

    if (startMatchBtn) {
        if (canStart) {
            startMatchBtn.classList.remove('hidden');
        } else {
            startMatchBtn.classList.add('hidden');
        }
    }
}

/**
 * Resets the entire match state and UI.
 */
function resetMatch() {
    console.log("[resetMatch] called.");
    // Clear selected wrestlers
    for (const key in selectedWrestlers) {
        if (selectedWrestlers[key]) {
            showWrestlerCardInRoster(selectedWrestlers[key].id);
            selectedWrestlers[key] = null;
        }
    }
    // Reset UI for drop zones
    const dropZones = { // Re-fetch dropZones here as well for safety
        player1: document.getElementById('player1DropZone'),
        player2: document.getElementById('player2DropZone'),
        team1Player1: document.getElementById('team1Player1DropZone'),
        team1Player2: document.getElementById('team1Player2DropZone'),
        team2Player1: document.getElementById('team2Player1DropZone'),
        team2Player2: document.getElementById('team2Player2DropZone')
    };
    resetDropZonesUI(dropZones); // Pass the dropZones object to the DOM function
    // Clear match log and result
    updateMatchLog([]); // Clear log by passing empty array
    updateMatchResult('Awaiting Match...');
    hideModal(document.getElementById('matchLogModal')); // Hide match log modal

    const winnerModal = document.getElementById('winnerModal');
    if (winnerModal) {
        hideModal(winnerModal); // Use hideModal for consistency
        console.log("[resetMatch] Winner modal hidden successfully during reset.");
    } else {
        console.warn("[resetMatch] Winner modal not found during reset. Cannot hide.");
    }

    const nextTurnBtn = document.getElementById('nextTurnBtn');
    if (nextTurnBtn) {
        nextTurnBtn.classList.add('hidden');
    }

    const startMatchBtn = document.getElementById('startMatchBtn');
    if (startMatchBtn) {
        startMatchBtn.classList.add('hidden');
    }

    // Clear and hide all modal display containers
    const modalSingleMatchDisplay = document.getElementById('modalSingleMatchDisplay');
    const modalTagTeamMatchDisplay = document.getElementById('modalTagTeamMatchDisplay');
    const modalTeam1Display = document.getElementById('modalTeam1Display');
    const modalTeam2Display = document.getElementById('modalTeam2Display');

    if (modalSingleMatchDisplay) modalSingleMatchDisplay.classList.add('hidden');
    if (modalTagTeamMatchDisplay) modalTagTeamMatchDisplay.classList.add('hidden');
    if (modalTeam1Display) modalTeam1Display.classList.add('hidden');
    if (modalTeam2Display) modalTeam2Display.classList.add('hidden');

    // Clear and hide individual modal wrestler display zones
    const modalSinglePlayer1 = document.getElementById('modalSinglePlayer1');
    const modalSinglePlayer2 = document.getElementById('modalSinglePlayer2');
    const modalTeam1Player1 = document.getElementById('modalTeam1Player1');
    const modalTeam1Player2 = document.getElementById('modalTeam1Player2');
    const modalTeam2Player1 = document.getElementById('modalTeam2Player1');
    const modalTeam2Player2 = document.getElementById('modalTeam2Player2');

    [modalSinglePlayer1, modalSinglePlayer2, modalTeam1Player1, modalTeam1Player2, modalTeam2Player1, modalTeam2Player2].forEach(el => {
        if (el) {
            el.classList.add('hidden');
            el.innerHTML = '';
        }
    });

    // Reset matchState
    matchState = {
        currentHp: {}, currentStamina: {}, initialHp: {}, initialStamina: {},
        currentRound: 0, matchLogEntries: [], maxRounds: 0, modalDisplayZoneMap: {}
    };

    // Ensure the correct match layout is shown based on currentMatchType
    toggleMatchLayout(currentMatchType, document.getElementById('singleMatchLayout'), document.getElementById('tagTeamMatchLayout'), document.getElementById('singleMatchBtn'), document.getElementById('tagTeamMatchBtn'));
    checkAndToggleStartButton(); // Re-evaluate start button visibility
}


/**
 * Starts the match simulation.
 */
function simulateMatch() {
    // Reset matchState for a new match
    matchState = {
        currentHp: {},
        currentStamina: {},
        initialHp: {},
        initialStamina: {},
        currentRound: 0,
        matchLogEntries: [],
        maxRounds: 0,
        modalDisplayZoneMap: {}
    };

    // DOM elements for modal display (fetched inside function for safety)
    const modalSingleMatchDisplay = document.getElementById('modalSingleMatchDisplay');
    const modalTagTeamMatchDisplay = document.getElementById('modalTagTeamMatchDisplay');
    const modalTeam1Display = document.getElementById('modalTeam1Display');
    const modalTeam2Display = document.getElementById('modalTeam2Display');
    const matchLogModal = document.getElementById('matchLogModal');
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const winnerModal = document.getElementById('winnerModal');
    const modalTitle = document.getElementById('modalMatchTitle'); // Assuming this is for the match log modal title


    // Clear and hide all modal display containers initially
    if (modalSingleMatchDisplay) modalSingleMatchDisplay.classList.add('hidden');
    if (modalTagTeamMatchDisplay) modalTagTeamMatchDisplay.classList.add('hidden');
    if (modalTeam1Display) modalTeam1Display.classList.add('hidden');
    if (modalTeam2Display) modalTeam2Display.classList.add('hidden');


    // Clear and hide all individual modal wrestler display zones initially
    const modalSinglePlayer1 = document.getElementById('modalSinglePlayer1');
    const modalSinglePlayer2 = document.getElementById('modalSinglePlayer2');
    const modalTeam1Player1 = document.getElementById('modalTeam1Player1');
    const modalTeam1Player2 = document.getElementById('modalTeam1Player2');
    const modalTeam2Player1 = document.getElementById('modalTeam2Player1');
    const modalTeam2Player2 = document.getElementById('modalTeam2Player2');

    [modalSinglePlayer1, modalSinglePlayer2, modalTeam1Player1, modalTeam1Player2, modalTeam2Player1, modalTeam2Player2].forEach(el => {
        if (el) {
            el.classList.add('hidden');
            el.innerHTML = ''; // Clear content
        }
    });

    if (currentMatchType === 'single') {
        const p1 = selectedWrestlers.player1;
        const p2 = selectedWrestlers.player2;

        if (!p1 || !p2) {
            showModal(document.getElementById('resultModal'), 'Match Error', 'Please select two wrestlers for a single match.');
            return;
        }

        // Show single match display container
        if (modalSingleMatchDisplay) modalSingleMatchDisplay.classList.remove('hidden');
        if (modalTitle) modalTitle.textContent = "Single Match Log";


        // Initialize HP and Stamina for single match
        // Effective HP is baseHp + stamina
        matchState.initialHp[p1.id] = p1.baseHp + p1.stats.stamina;
        matchState.currentHp[p1.id] = p1.baseHp + p1.stats.stamina;
        matchState.initialStamina[p1.id] = p1.stats.stamina;
        matchState.currentStamina[p1.id] = p1.stats.stamina;

        matchState.initialHp[p2.id] = p2.baseHp + p2.stats.stamina;
        matchState.currentHp[p2.id] = p2.baseHp + p2.stats.stamina;
        matchState.initialStamina[p2.id] = p2.stats.stamina;
        matchState.currentStamina[p2.id] = p2.stats.stamina;

        // Reduced max rounds for single matches
        matchState.maxRounds = 75;

        // Map wrestler IDs to their modal display zones
        matchState.modalDisplayZoneMap[p1.id] = modalSinglePlayer1;
        matchState.modalDisplayZoneMap[p2.id] = modalSinglePlayer2;

        // Render wrestlers in modal display zones
        renderWrestlerInModalDisplay(modalSinglePlayer1, p1, matchState.currentHp[p1.id], matchState.initialHp[p1.id], matchState.currentStamina[p1.id], matchState.initialStamina[p1.id]);
        renderWrestlerInModalDisplay(modalSinglePlayer2, p2, matchState.currentHp[p2.id], matchState.initialHp[p2.id], matchState.currentStamina[p2.id], matchState.initialStamina[p2.id]);

        updateMatchLog([`<h3>--- Single Match: ${p1.name} vs. ${p2.name} ---</h3>`]);
        updateMatchLog([`<p>${p1.name} HP: ${matchState.currentHp[p1.id]} | Stamina: ${matchState.currentStamina[p1.id].toFixed(0)} | ${p2.name} HP: ${matchState.currentHp[p2.id]} | Stamina: ${matchState.currentStamina[p2.id].toFixed(0)}</p>`]);

    } else if (currentMatchType === 'tagTeam') {
        const team1_p1 = selectedWrestlers.team1Player1;
        const team1_p2 = selectedWrestlers.team1Player2;
        const team2_p1 = selectedWrestlers.team2Player1;
        const team2_p2 = selectedWrestlers.team2Player2;

        if (!team1_p1 || !team1_p2 || !team2_p1 || !team2_p2) {
            showModal(document.getElementById('resultModal'), 'Match Error', 'Please select four wrestlers for a tag team match.');
            return;
        }

        // Show tag team display container
        if (modalTagTeamMatchDisplay) modalTagTeamMatchDisplay.classList.remove('hidden');
        if (modalTeam1Display) modalTeam1Display.classList.remove('hidden');
        if (modalTeam2Display) modalTeam2Display.classList.remove('hidden');
        if (modalTitle) modalTitle.textContent = "Tag Team Match Log";


        // Initialize HP and Stamina for tag team match
        matchState.initialHp[team1_p1.id] = team1_p1.baseHp + team1_p1.stats.stamina;
        matchState.currentHp[team1_p1.id] = team1_p1.baseHp + team1_p1.stats.stamina;
        matchState.initialStamina[team1_p1.id] = team1_p1.stats.stamina;
        matchState.currentStamina[team1_p1.id] = team1_p1.stats.stamina;

        matchState.initialHp[team1_p2.id] = team1_p2.baseHp + team1_p2.stats.stamina;
        matchState.currentHp[team1_p2.id] = team1_p2.baseHp + team1_p2.stats.stamina;
        matchState.initialStamina[team1_p2.id] = team1_p2.stats.stamina;
        matchState.currentStamina[team1_p2.id] = team1_p2.stats.stamina;

        matchState.initialHp[team2_p1.id] = team2_p1.baseHp + team2_p1.stats.stamina;
        matchState.currentHp[team2_p1.id] = team2_p1.baseHp + team2_p1.stats.stamina;
        matchState.initialStamina[team2_p1.id] = team2_p1.stats.stamina;
        matchState.currentStamina[team2_p1.id] = team2_p1.stats.stamina;

        matchState.initialHp[team2_p2.id] = team2_p2.baseHp + team2_p2.stats.stamina;
        matchState.currentHp[team2_p2.id] = team2_p2.baseHp + team2_p2.stats.stamina;
        matchState.initialStamina[team2_p2.id] = team2_p2.stats.stamina;
        matchState.currentStamina[team2_p2.id] = team2_p2.stats.stamina;

        // Reduced max rounds for tag team matches
        matchState.maxRounds = 125;

        // Map wrestler IDs to their modal display zones
        matchState.modalDisplayZoneMap[team1_p1.id] = document.getElementById('modalTeam1Player1');
        matchState.modalDisplayZoneMap[team1_p2.id] = document.getElementById('modalTeam1Player2');
        matchState.modalDisplayZoneMap[team2_p1.id] = document.getElementById('modalTeam2Player1');
        matchState.modalDisplayZoneMap[team2_p2.id] = document.getElementById('modalTeam2Player2');

        // Render wrestlers in modal display zones
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team1_p1.id], team1_p1, matchState.currentHp[team1_p1.id], matchState.initialHp[team1_p1.id], matchState.currentStamina[team1_p1.id], matchState.initialStamina[team1_p1.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team1_p2.id], team1_p2, matchState.currentHp[team1_p2.id], matchState.initialHp[team1_p2.id], matchState.currentStamina[team1_p2.id], matchState.initialStamina[team1_p2.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team2_p1.id], team2_p1, matchState.currentHp[team2_p1.id], matchState.initialHp[team2_p1.id], matchState.currentStamina[team2_p1.id], matchState.initialStamina[team2_p1.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team2_p2.id], team2_p2, matchState.currentHp[team2_p2.id], matchState.initialHp[team2_p2.id], matchState.currentStamina[team2_p2.id], matchState.initialStamina[team2_p2.id]);

        updateMatchLog([`<h3>--- Tag Team Match: ${team1_p1.name} & ${team1_p2.name} vs. ${team2_p1.name} & ${team2_p2.name} ---</h3>`]);
        updateMatchLog([`<p>Team 1: ${team1_p1.name} HP: ${matchState.currentHp[team1_p1.id]} | Stamina: ${matchState.currentStamina[team1_p1.id].toFixed(0)} | ${team1_p2.name} HP: ${matchState.currentHp[team1_p2.id]} | Stamina: ${matchState.currentStamina[team1_p2.id].toFixed(0)}</p>`]);
        updateMatchLog([`<p>Team 2: ${team2_p1.name} HP: ${matchState.currentHp[team2_p1.id]} | Stamina: ${matchState.currentStamina[team2_p1.id].toFixed(0)} | ${team2_p2.name} HP: ${matchState.currentStamina[team2_p2.id].toFixed(0)} | Stamina: ${matchState.currentStamina[team2_p2.id].toFixed(0)}</p>`]);
    }

    showModal(matchLogModal); // Pass the specific modal element
    if (nextTurnBtn) {
        nextTurnBtn.classList.remove('hidden');
    }
    if (winnerModal) {
        hideModal(winnerModal); // Ensure winner modal is hidden
    }
    advanceTurn(); // Start the first turn
}


// --- DOMContentLoaded and Event Listener Setup ---
document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements (fetched once inside DOMContentLoaded)
    const singleMatchBtn = document.getElementById('singleMatchBtn');
    const tagTeamMatchBtn = document.getElementById('tagTeamMatchBtn');
    const randomMatchupBtn = document.getElementById('randomMatchupBtn');
    const simulate100xBtn = document.getElementById('simulate100xBtn');
    const singleMatchLayout = document.getElementById('singleMatchLayout');
    const tagTeamMatchLayout = document.getElementById('tagTeamMatchLayout');
    const startMatchBtn = document.getElementById('startMatchBtn');
    const matchLogModal = document.getElementById('matchLogModal'); // Corrected to matchLogModal
    const resetMatchBtnModal = document.getElementById('resetMatchBtnModal');
    const resetMatchBtn = document.getElementById('resetMatchBtn'); // This is the main reset button
    const wrestlerRosterElement = document.getElementById('wrestlerRoster');

    // New DOM elements for the turn-based system and winner modal
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const winnerModal = document.getElementById('winnerModal');
    const resetMatchBtnWinnerModal = document.getElementById('resetMatchBtnWinnerModal');


    // Await the resolution of the wrestlers promise from data.js
    loadedWrestlers = await wrestlers;
    console.log('[DOMContentLoaded] Wrestlers loaded:', loadedWrestlers.length);


    if (wrestlerRosterElement) {
        initializeRoster(loadedWrestlers, handleDragStart, handleTouchStart); // Pass loadedWrestlers and touch handler
        wrestlerRosterElement.style.position = 'relative';
        wrestlerRosterElement.style.zIndex = '10';
        wrestlerRosterElement.style.pointerEvents = 'auto';
    } else {
        console.error('[DOMContentLoaded] wrestlerRosterElement not found!');
    }

    // Setup drag and drop listeners for drop zones
    setupDragAndDropListeners(handleDragOver, handleDrop, handleTouchEnd); // Pass touchEndHandler

    // Event listeners for match type selection
    if (singleMatchBtn) {
        singleMatchBtn.addEventListener('click', () => {
            currentMatchType = 'single';
            toggleMatchLayout('single', singleMatchLayout, tagTeamMatchLayout, singleMatchBtn, tagTeamMatchBtn);
            resetMatch(); // Reset to clear drop zones and state
        });
    } else {
        console.warn('[DOMContentLoaded] singleMatchBtn not found. Listener not attached.');
    }

    if (tagTeamMatchBtn) {
        tagTeamMatchBtn.addEventListener('click', () => {
            currentMatchType = 'tagTeam'; // Corrected to 'tagTeam' for consistency
            toggleMatchLayout('tagTeam', singleMatchLayout, tagTeamMatchLayout, singleMatchBtn, tagTeamMatchBtn);
            resetMatch(); // Reset to clear drop zones and state
        });
    } else {
        console.warn('[DOMContentLoaded] tagTeamMatchBtn not found. Listener not attached.');
    }

    if (randomMatchupBtn) {
        randomMatchupBtn.addEventListener('click', () => {
            createRandomMatchup();
        });
    } else {
        console.warn('[DOMContentLoaded] randomMatchupBtn not found. Listener not attached. Please ensure this element exists in your HTML.');
    }

    if (startMatchBtn) {
        startMatchBtn.addEventListener('click', simulateMatch);
    } else {
        console.warn('[DOMContentLoaded] startMatchBtn not found. Listener not attached.');
    }

    if (simulate100xBtn) {
        simulate100xBtn.addEventListener('click', runMultipleSimulations);
    } else {
        console.warn('[DOMContentLoaded] simulate100xBtn not found. Listener not attached. Please ensure this element exists in your HTML.');
    }

    // Close modal buttons (using a more generic selector for all close buttons)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            hideModal(event.target.closest('.modal'));
        });
    });

    if (nextTurnBtn) {
        nextTurnBtn.addEventListener('click', async () => {
            nextTurnBtn.disabled = true;
            await advanceTurn(); // Call with default isBulkSimulation = false
            nextTurnBtn.disabled = false;
        });
    } else {
        console.warn('[DOMContentLoaded] nextTurnBtn not found. Listener not attached.');
    }

    if (resetMatchBtnModal) {
        resetMatchBtnModal.addEventListener('click', resetMatch);
    } else {
        console.warn('[DOMContentLoaded] resetMatchBtnModal not found. Listener not attached.');
    }

    if (resetMatchBtn) { // Main reset button
        resetMatchBtn.addEventListener('click', resetMatch);
    } else {
        console.warn('[DOMContentLoaded] resetMatchBtn not found. Listener not attached.');
    }

    if (resetMatchBtnWinnerModal) {
        resetMatchBtnWinnerModal.addEventListener('click', resetMatch);
    } else {
        console.warn('[DOMContentLoaded] resetMatchBtnWinnerModal not found. Listener not attached.');
    }

    // Initial layout setup
    toggleMatchLayout(currentMatchType, singleMatchLayout, tagTeamMatchLayout, singleMatchBtn, tagTeamMatchBtn);
    checkAndToggleStartButton(); // Check initial state of start button
});

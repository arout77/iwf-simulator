// app.js

import { wrestlers, getRandomInt } from './data.js';
import {
    renderWrestlerCard, initializeRoster, setupDragAndDropListeners,
    updateDropZoneVisual, renderWrestlerInDropZone, hideWrestlerCardInRoster,
    showWrestlerCardInRoster, showModal, hideModal, updateMatchLog,
    updateMatchResult, resetDropZonesUI, toggleMatchLayout,
    updateWrestlerHealthDisplay, triggerDamageAnimation,
    renderWrestlerInModalDisplay
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

// Global match state for turn-based simulation
let matchState = {
    currentHp: {}, // Stores current HP for each wrestler by ID
    currentStamina: {}, // Stores current Stamina for each wrestler by ID
    initialHp: {}, // Stores initial HP for percentage calculation
    initialStamina: {}, // Stores initial Stamina for percentage calculation
    currentRound: 0,
    matchLogEntries: [],
    maxRounds: 0, // Will be set based on match type
    modalDisplayZoneMap: {} // Maps wrestler IDs to their modal display elements
};

// --- Drag and Drop Handlers (Mouse & Touch) ---

/**
 * Handles the start of a drag operation (mouse or touch).
 * @param {Event} e - The event object (DragEvent or TouchEvent).
 */
function handleDragStart(e) {
    const originalCard = e.target.closest('.wrestler-roster-card-item'); // Use the specific class for roster items
    if (!originalCard) {
        console.warn('Drag start initiated on an element not part of a wrestler card.');
        return;
    }

    draggedWrestlerId = originalCard.id;
    console.log('[handleDragStart] Drag start initiated. Original card ID:', originalCard.id);
    console.log('[handleDragStart] draggedWrestlerId set to:', draggedWrestlerId);

    if (e.type === 'touchstart') {
        e.preventDefault();
        isDraggingTouch = true;

        currentTouchDragClone = originalCard.cloneNode(true);
        currentTouchDragClone.style.position = 'absolute';
        currentTouchDragClone.style.zIndex = '1000';
        currentTouchDragClone.style.pointerEvents = 'none';
        currentTouchDragClone.style.width = originalCard.offsetWidth + 'px';
        currentTouchDragClone.classList.add('opacity-75', 'shadow-xl', 'scale-105');

        document.body.appendChild(currentTouchDragClone);

        const touch = e.touches[0];
        currentTouchDragClone.style.left = (touch.clientX - currentTouchDragClone.offsetWidth / 2) + 'px';
        currentTouchDragClone.style.top = (touch.clientY - currentTouchDragClone.offsetHeight / 2) + 'px';

        originalCard.classList.add('opacity-50');

    } else if (e.type === 'dragstart') {
        e.dataTransfer.setData('text/plain', draggedWrestlerId);
        console.log('[handleDragStart] Mouse drag start. Setting dataTransfer:', draggedWrestlerId);
        e.dataTransfer.effectAllowed = 'move';
        originalCard.classList.add('opacity-50');
    }
}

/**
 * Handles ongoing drag/touch movement.
 * @param {Event} e - The event object (DragEvent or TouchEvent).
 */
function handleDragOver(e) {
    e.preventDefault();

    if (e.type === 'dragover') {
        e.dataTransfer.dropEffect = 'move';
    } else if (e.type === 'touchmove' && isDraggingTouch && currentTouchDragClone) {
        const touch = e.touches[0];
        currentTouchDragClone.style.left = (touch.clientX - currentTouchDragClone.offsetWidth / 2) + 'px';
        currentTouchDragClone.style.top = (touch.clientY - currentTouchDragClone.offsetHeight / 2) + 'px';

        // Re-fetch dropZones here to ensure they are always up-to-date in case of dynamic changes
        const dropZones = {
            player1: document.getElementById('player1DropZone'),
            player2: document.getElementById('player2DropZone'),
            team1Player1: document.getElementById('team1Player1DropZone'),
            team1Player2: document.getElementById('team1Player2DropZone'),
            team2Player1: document.getElementById('team2Player1DropZone'),
            team2Player2: document.getElementById('team2Player2DropZone')
        };

        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        Object.values(dropZones).forEach(zone => {
            if (zone && (zone.contains(targetElement) || targetElement === zone)) {
                updateDropZoneVisual(zone, true);
            } else if (zone) {
                updateDropZoneVisual(zone, false);
            }
        });
    }
}

/**
 * Handles entering a drop zone (mouse).
 * @param {DragEvent} e - The dragenter event object.
 */
function handleDragEnter(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        updateDropZoneVisual(dropZone, true);
    }
}

/**
 * Handles leaving a drop zone (mouse).
 * @param {DragEvent} e - The dragleave event object.
 */
function handleDragLeave(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        updateDropZoneVisual(dropZone, false);
    }
}

/**
 * Handles the drop action (mouse or touch).
 * @param {Event} e - The event object (DragEvent or TouchEvent).
 */
function handleDrop(e) {
    e.preventDefault();
    let dropZone = null;
    let data = null;

    if (e.type === 'drop') {
        dropZone = e.target.closest('.drop-zone');
        data = e.dataTransfer.getData('text/plain'); // This is the wrestler ID
        console.log('[handleDrop] Mouse drop event. DropZone:', dropZone ? dropZone.id : 'none', 'Data (from dataTransfer):', data);
    } else if (e.type === 'touchend' && isDraggingTouch) {
        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        dropZone = targetElement ? targetElement.closest('.drop-zone') : null;
        data = draggedWrestlerId; // Use the manually stored ID for touch
        console.log('[handleDrop] Touch end event. DropZone:', dropZone ? dropZone.id : 'none', 'Data (from draggedWrestlerId):', data);
    }

    console.log('[handleDrop] Current wrestlers array in handleDrop:', wrestlers);
    const droppedWrestler = wrestlers.find(w => w.id === data);
    console.log('[handleDrop] Attempting to find wrestler with ID:', data, 'Result:', droppedWrestler ? droppedWrestler.name : 'not found');

    if (dropZone && droppedWrestler) {
        const dropZoneKey = dropZone.id.replace('DropZone', '');

        const previousWrestlerInZone = selectedWrestlers[dropZoneKey];
        if (previousWrestlerInZone) {
            console.log(`[handleDrop] Moving ${previousWrestlerInZone.name} back to roster from ${dropZoneKey}.`);
            showWrestlerCardInRoster(previousWrestlerInZone.id);
        }

        selectedWrestlers[dropZoneKey] = droppedWrestler;
        console.log(`[handleDrop] Wrestler ${droppedWrestler.name} assigned to ${dropZoneKey}.`);

        // When rendering in drop zone, pass initial HP for display
        // Keep stats visible in the main drop zones
        renderWrestlerInDropZone(dropZone, droppedWrestler, droppedWrestler.baseHp, droppedWrestler.baseHp);
        hideWrestlerCardInRoster(data);

    } else {
        console.warn(`[handleDrop] Drop failed. DropZone valid: ${!!dropZone}, DroppedWrestler valid: ${!!droppedWrestler}.`);
        // If drop failed, ensure the original card's opacity is reset if it was a mouse drag
        if (draggedWrestlerId) {
            const originalCard = document.getElementById(draggedWrestlerId);
            if (originalCard) {
                originalCard.classList.remove('opacity-50');
                console.log(`[handleDrop] Restored opacity for original card: ${draggedWrestlerId}`);
            }
        }
    }

    // Re-fetch dropZones here to ensure they are always up-to-date
    const dropZones = {
        player1: document.getElementById('player1DropZone'),
        player2: document.getElementById('player2DropZone'),
        team1Player1: document.getElementById('team1Player1DropZone'),
        team1Player2: document.getElementById('team1Player2DropZone'),
        team2Player1: document.getElementById('team2Player1DropZone'),
        team2Player2: document.getElementById('team2Player2DropZone')
    };
    Object.values(dropZones).forEach(zone => {
        if (zone) updateDropZoneVisual(zone, false);
    });

    // Clean up touch drag clone
    if (currentTouchDragClone) {
        currentTouchDragClone.remove();
        currentTouchDragClone = null;
        console.log('[handleDrop] Removed touch drag clone.');
    }
    // Reset opacity for the original card if it was a touch drag
    if (isDraggingTouch && draggedWrestlerId) {
        const originalCard = document.getElementById(draggedWrestlerId);
        if (originalCard) {
            originalCard.classList.remove('opacity-50');
        }
    }
    isDraggingTouch = false;
    draggedWrestlerId = null;
    console.log('[handleDrop] Reset drag state variables.');
}


// --- Match Simulation Logic ---

/**
 * Initializes and starts a match, setting up the modal for turn-based combat.
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
            showModal('Match Error', 'Please select two wrestlers for a single match.');
            return;
        }

        // Show single match display container
        if (modalSingleMatchDisplay) modalSingleMatchDisplay.classList.remove('hidden');

        // Initialize HP and Stamina for single match
        matchState.initialHp[p1.id] = p1.baseHp;
        matchState.currentHp[p1.id] = p1.baseHp;
        matchState.initialStamina[p1.id] = p1.stats.stamina;
        matchState.currentStamina[p1.id] = p1.stats.stamina;

        matchState.initialHp[p2.id] = p2.baseHp;
        matchState.currentHp[p2.id] = p2.baseHp;
        matchState.initialStamina[p2.id] = p2.stats.stamina;
        matchState.currentStamina[p2.id] = p2.stats.stamina;

        matchState.maxRounds = 50; // Increased single match round limit to 50

        // Map wrestler IDs to their modal display zones
        matchState.modalDisplayZoneMap[p1.id] = modalSinglePlayer1;
        matchState.modalDisplayZoneMap[p2.id] = modalSinglePlayer2;

        // Render wrestlers in modal display zones
        renderWrestlerInModalDisplay(modalSinglePlayer1, p1, matchState.currentHp[p1.id], matchState.initialHp[p1.id]);
        renderWrestlerInModalDisplay(modalSinglePlayer2, p2, matchState.currentHp[p2.id], matchState.initialHp[p2.id]);

        matchState.matchLogEntries.push(`<h3>--- Single Match: ${p1.name} vs. ${p2.name} ---</h3>`);
        matchState.matchLogEntries.push(`<p>${p1.name} HP: ${matchState.currentHp[p1.id]} | Stamina: ${matchState.currentStamina[p1.id].toFixed(0)} | ${p2.name} HP: ${matchState.currentHp[p2.id]} | Stamina: ${matchState.currentStamina[p2.id].toFixed(0)}</p>`);

    } else if (currentMatchType === 'tag-team') {
        const team1_p1 = selectedWrestlers.team1Player1;
        const team1_p2 = selectedWrestlers.team1Player2;
        const team2_p1 = selectedWrestlers.team2Player1;
        const team2_p2 = selectedWrestlers.team2Player2;

        if (!team1_p1 || !team1_p2 || !team2_p1 || !team2_p2) {
            showModal('Match Error', 'Please select four wrestlers for a tag team match.');
            return;
        }

        // Show tag team display container
        if (modalTagTeamMatchDisplay) modalTagTeamMatchDisplay.classList.remove('hidden');
        if (modalTeam1Display) modalTeam1Display.classList.remove('hidden');
        if (modalTeam2Display) modalTeam2Display.classList.remove('hidden');


        // Initialize HP and Stamina for tag team match
        matchState.initialHp[team1_p1.id] = team1_p1.baseHp;
        matchState.currentHp[team1_p1.id] = team1_p1.baseHp;
        matchState.initialStamina[team1_p1.id] = team1_p1.stats.stamina;
        matchState.currentStamina[team1_p1.id] = team1_p1.stats.stamina;

        matchState.initialHp[team1_p2.id] = team1_p2.baseHp;
        matchState.currentHp[team1_p2.id] = team1_p2.baseHp;
        matchState.initialStamina[team1_p2.id] = team1_p2.stats.stamina;
        matchState.currentStamina[team1_p2.id] = team1_p2.stats.stamina;

        matchState.initialHp[team2_p1.id] = team2_p1.baseHp;
        matchState.currentHp[team2_p1.id] = team2_p1.baseHp;
        matchState.initialStamina[team2_p1.id] = team2_p1.stats.stamina;
        matchState.currentStamina[team2_p1.id] = team2_p1.stats.stamina;

        matchState.initialHp[team2_p2.id] = team2_p2.baseHp;
        matchState.currentHp[team2_p2.id] = team2_p2.baseHp;
        matchState.initialStamina[team2_p2.id] = team2_p2.stats.stamina;
        matchState.currentStamina[team2_p2.id] = team2_p2.stats.stamina;

        matchState.maxRounds = 75; // Increased tag team match round limit to 75

        // Map wrestler IDs to their modal display zones
        matchState.modalDisplayZoneMap[team1_p1.id] = document.getElementById('modalTeam1Player1');
        matchState.modalDisplayZoneMap[team1_p2.id] = document.getElementById('modalTeam1Player2');
        matchState.modalDisplayZoneMap[team2_p1.id] = document.getElementById('modalTeam2Player1');
        matchState.modalDisplayZoneMap[team2_p2.id] = document.getElementById('modalTeam2Player2');

        // Render wrestlers in modal display zones
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team1_p1.id], team1_p1, matchState.currentHp[team1_p1.id], matchState.initialHp[team1_p1.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team1_p2.id], team1_p2, matchState.currentHp[team1_p2.id], matchState.initialHp[team1_p2.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team2_p1.id], team2_p1, matchState.currentHp[team2_p1.id], matchState.initialHp[team2_p1.id]);
        renderWrestlerInModalDisplay(matchState.modalDisplayZoneMap[team2_p2.id], team2_p2, matchState.currentHp[team2_p2.id], matchState.initialHp[team2_p2.id]);

        matchState.matchLogEntries.push(`<h3>--- Tag Team Match: ${team1_p1.name} & ${team1_p2.name} vs. ${team2_p1.name} & ${team2_p2.name} ---</h3>`);
        matchState.matchLogEntries.push(`<p>Team 1: ${team1_p1.name} HP: ${matchState.currentHp[team1_p1.id]} | Stamina: ${matchState.currentStamina[team1_p1.id].toFixed(0)} | ${team1_p2.name} HP: ${matchState.currentHp[team1_p2.id]} | Stamina: ${matchState.currentStamina[team1_p2.id].toFixed(0)}</p>`);
        matchState.matchLogEntries.push(`<p>Team 2: ${team2_p1.name} HP: ${matchState.currentHp[team2_p1.id]} | Stamina: ${matchState.currentStamina[team2_p1.id].toFixed(0)} | ${team2_p2.name} HP: ${matchState.currentStamina[team2_p2.id].toFixed(0)} | Stamina: ${matchState.currentStamina[team2_p2.id].toFixed(0)}</p>`);
    }

    updateMatchLog(matchState.matchLogEntries);
    updateMatchResult('Match in Progress...');
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const winnerModal = document.getElementById('winnerModal');
    showModal('Match in Progress', '');
    if (nextTurnBtn) {
        nextTurnBtn.classList.remove('hidden');
    }
    if (winnerModal) {
        winnerModal.classList.add('hidden');
    }
}

/**
 * Advances the match by one turn/round.
 */
async function advanceTurn() {
    let winner = null;
    matchState.currentRound++;

    const modalSinglePlayer1 = document.getElementById('modalSinglePlayer1');
    const modalSinglePlayer2 = document.getElementById('modalSinglePlayer2');
    const modalTeam1Player1 = document.getElementById('modalTeam1Player1');
    const modalTeam1Player2 = document.getElementById('modalTeam1Player2');
    const modalTeam2Player1 = document.getElementById('modalTeam2Player1');
    const modalTeam2Player2 = document.getElementById('modalTeam2Player2');

    if (matchState.currentRound > matchState.maxRounds) {
        matchState.matchLogEntries.push(`<h3 class="text-yellow-400 font-bold mt-4">--- The match ends in a time limit draw! ---</h3>`);
        updateMatchLog(matchState.matchLogEntries);
        winner = 'Draw';
    } else {
        matchState.matchLogEntries.push(`<p class="text-red-300 font-semibold mt-2">--- Round ${matchState.currentRound} ---</p>`);

        if (currentMatchType === 'single') {
            const p1 = selectedWrestlers.player1;
            const p2 = selectedWrestlers.player2;

            // Decrease stamina for active wrestlers
            matchState.currentStamina[p1.id] = Math.max(0, matchState.currentStamina[p1.id] - 5);
            matchState.currentStamina[p2.id] = Math.max(0, matchState.currentStamina[p2.id] - 5);
            matchState.matchLogEntries.push(`<p>${p1.name} stamina: ${matchState.currentStamina[p1.id].toFixed(0)} | ${p2.name} stamina: ${matchState.currentStamina[p2.id].toFixed(0)}</p>`);


            // Player 1 attacks Player 2
            if (p1.moves && Object.keys(p1.moves).length > 0) {
                // Filter move types to only include those with valid moves
                const validP1MoveTypes = Object.keys(p1.moves).filter(type =>
                    p1.moves[type] && p1.moves[type].some(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0))
                );

                if (validP1MoveTypes.length > 0) {
                    let randomMoveType = validP1MoveTypes[getRandomInt(0, validP1MoveTypes.length - 1)];
                    const availableP1Moves = p1.moves[randomMoveType].filter(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0));

                    if (availableP1Moves.length > 0) {
                        let p1Move = availableP1Moves[getRandomInt(0, availableP1Moves.length - 1)];
                        let p1Damage = getRandomInt(p1Move.damage.min, p1Move.damage.max);
                        matchState.currentHp[p2.id] -= p1Damage;
                        matchState.matchLogEntries.push(`<p>${p1.name} uses ${p1Move.name} for ${p1Damage} damage! (${p2.name} HP: ${Math.max(0, matchState.currentHp[p2.id])})</p>`);
                        updateMatchLog(matchState.matchLogEntries);
                        
                        updateWrestlerHealthDisplay(modalSinglePlayer2, p2.id, matchState.currentHp[p2.id], matchState.initialHp[p2.id]);
                        triggerDamageAnimation(modalSinglePlayer2);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        // This case should ideally not be reached if validP1MoveTypes is correctly filtered
                        matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p1.name} has no valid moves in the '${randomMoveType}' category after selection!</p>`);
                        updateMatchLog(matchState.matchLogEntries);
                    }
                } else {
                    matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p1.name} has no valid moves across all categories!</p>`);
                    updateMatchLog(matchState.matchLogEntries);
                }
            } else {
                matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p1.name} has no moves defined!</p>`);
                updateMatchLog(matchState.matchLogEntries);
            }

            if (matchState.currentHp[p2.id] <= 0) {
                winner = p1.name;
            }

            if (!winner) {
                // Player 2 attacks Player 1
                if (p2.moves && Object.keys(p2.moves).length > 0) {
                    // Filter move types to only include those with valid moves
                    const validP2MoveTypes = Object.keys(p2.moves).filter(type =>
                        p2.moves[type] && p2.moves[type].some(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0))
                    );

                    if (validP2MoveTypes.length > 0) {
                        let randomMoveType = validP2MoveTypes[getRandomInt(0, validP2MoveTypes.length - 1)];
                        const availableP2Moves = p2.moves[randomMoveType].filter(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0));

                        if (availableP2Moves.length > 0) {
                            let p2Move = availableP2Moves[getRandomInt(0, availableP2Moves.length - 1)];
                            let p2Damage = getRandomInt(p2Move.damage.min, p2Move.damage.max);
                            matchState.currentHp[p1.id] -= p2Damage;
                            matchState.matchLogEntries.push(`<p>${p2.name} uses ${p2Move.name} for ${p2Damage} damage! (${p1.name} HP: ${Math.max(0, matchState.currentHp[p1.id])})</p>`);
                            updateMatchLog(matchState.matchLogEntries);
                            
                            updateWrestlerHealthDisplay(modalSinglePlayer1, p1.id, matchState.currentHp[p1.id], matchState.initialHp[p1.id]);
                            triggerDamageAnimation(modalSinglePlayer1);
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        } else {
                            // This case should ideally not be reached if validP2MoveTypes is correctly filtered
                            matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p2.name} has no valid moves in the '${randomMoveType}' category after selection!</p>`);
                            updateMatchLog(matchState.matchLogEntries);
                        }
                    } else {
                        matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p2.name} has no valid moves across all categories!</p>`);
                        updateMatchLog(matchState.matchLogEntries);
                    }
                } else {
                    matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${p2.name} has no moves defined!</p>`);
                    updateMatchLog(matchState.matchLogEntries);
                }

                if (matchState.currentHp[p1.id] <= 0) {
                    winner = p2.name;
                }
            }

        } else if (currentMatchType === 'tag-team') {
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

            // Stamina decrease for active wrestlers
            if (activeTeam1Wrestler) {
                matchState.currentStamina[activeTeam1Wrestler.id] = Math.max(0, matchState.currentStamina[activeTeam1Wrestler.id] - 5);
            }
            if (activeTeam2Wrestler) {
                matchState.currentStamina[activeTeam2Wrestler.id] = Math.max(0, matchState.currentStamina[activeTeam2Wrestler.id] - 5);
            }
            matchState.matchLogEntries.push(`<p>Active Stamina: ${activeTeam1Wrestler?.name || 'N/A'} stamina: ${matchState.currentStamina[activeTeam1Wrestler?.id]?.toFixed(0) || 'N/A'} | ${activeTeam2Wrestler?.name || 'N/A'} stamina: ${matchState.currentStamina[activeTeam2Wrestler?.id]?.toFixed(0) || 'N/A'}</p>`);


            // HP and Stamina recovery for inactive wrestlers
            if (inactiveTeam1Wrestler && matchState.currentHp[inactiveTeam1Wrestler.id] < matchState.initialHp[inactiveTeam1Wrestler.id] * 0.5) {
                matchState.currentHp[inactiveTeam1Wrestler.id] = Math.min(matchState.initialHp[inactiveTeam1Wrestler.id], matchState.currentHp[inactiveTeam1Wrestler.id] + 10);
                matchState.currentStamina[inactiveTeam1Wrestler.id] = Math.min(matchState.initialStamina[inactiveTeam1Wrestler.id], matchState.currentStamina[inactiveTeam1Wrestler.id] + (inactiveTeam1Wrestler.stats.staminaRecoveryRate || 0)); // Use staminaRecoveryRate
                matchState.matchLogEntries.push(`<p>${inactiveTeam1Wrestler.name} recovers! HP: ${matchState.currentHp[inactiveTeam1Wrestler.id].toFixed(0)} | Stamina: ${matchState.currentStamina[inactiveTeam1Wrestler.id].toFixed(0)}</p>`);
                updateWrestlerHealthDisplay(matchState.modalDisplayZoneMap[inactiveTeam1Wrestler.id], inactiveTeam1Wrestler.id, matchState.currentHp[inactiveTeam1Wrestler.id], matchState.initialHp[inactiveTeam1Wrestler.id]);
            }
            if (inactiveTeam2Wrestler && matchState.currentHp[inactiveTeam2Wrestler.id] < matchState.initialHp[inactiveTeam2Wrestler.id] * 0.5) {
                matchState.currentHp[inactiveTeam2Wrestler.id] = Math.min(matchState.initialHp[inactiveTeam2Wrestler.id], matchState.currentHp[inactiveTeam2Wrestler.id] + 10);
                matchState.currentStamina[inactiveTeam2Wrestler.id] = Math.min(matchState.initialStamina[inactiveTeam2Wrestler.id], matchState.currentStamina[inactiveTeam2Wrestler.id] + (inactiveTeam2Wrestler.stats.staminaRecoveryRate || 0)); // Use staminaRecoveryRate
                matchState.matchLogEntries.push(`<p>${inactiveTeam2Wrestler.name} recovers! HP: ${matchState.currentHp[inactiveTeam2Wrestler.id].toFixed(0)} | Stamina: ${matchState.currentStamina[inactiveTeam2Wrestler.id].toFixed(0)}</p>`);
                updateWrestlerHealthDisplay(matchState.modalDisplayZoneMap[inactiveTeam2Wrestler.id], inactiveTeam2Wrestler.id, matchState.currentHp[inactiveTeam2Wrestler.id], matchState.initialHp[inactiveTeam2Wrestler.id]);
            }


            if (!activeTeam1Wrestler || !activeTeam2Wrestler) {
                if (!activeTeam1Wrestler) winner = `Team 2 (${team2_p1.name} & ${team2_p2.name})`;
                else if (!activeTeam2Wrestler) winner = `Team 1 (${team1_p1.name} & ${team1_p2.name})`;
            } else {
                // Team 1 active wrestler attacks Team 2 active wrestler
                if (activeTeam1Wrestler.moves && Object.keys(activeTeam1Wrestler.moves).length > 0) {
                    // Filter move types to only include those with valid moves
                    const validT1MoveTypes = Object.keys(activeTeam1Wrestler.moves).filter(type =>
                        activeTeam1Wrestler.moves[type] && activeTeam1Wrestler.moves[type].some(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0))
                    );

                    if (validT1MoveTypes.length > 0) {
                        let randomMoveType = validT1MoveTypes[getRandomInt(0, validT1MoveTypes.length - 1)];
                        const availableT1Moves = activeTeam1Wrestler.moves[randomMoveType].filter(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0));

                        if (availableT1Moves.length > 0) {
                            let t1Move = availableT1Moves[getRandomInt(0, availableT1Moves.length - 1)];
                            let t1Damage = getRandomInt(t1Move.damage.min, t1Move.damage.max);

                            if (activeTeam2Wrestler === team2_p1) {
                                matchState.currentHp[team2_p1.id] -= t1Damage;
                                matchState.matchLogEntries.push(`<p>${activeTeam1Wrestler.name} uses ${t1Move.name} on ${activeTeam2Wrestler.name} for ${t1Damage} damage! (${activeTeam2Wrestler.name} HP: ${Math.max(0, matchState.currentHp[team2_p1.id])})</p>`);
                                updateMatchLog(matchState.matchLogEntries);
                                updateWrestlerHealthDisplay(modalTeam2Player1, team2_p1.id, matchState.currentHp[team2_p1.id], matchState.initialHp[team2_p1.id]);
                                triggerDamageAnimation(modalTeam2Player1);
                            } else {
                                matchState.currentHp[team2_p2.id] -= t1Damage;
                                matchState.matchLogEntries.push(`<p>${activeTeam1Wrestler.name} uses ${t1Move.name} on ${activeTeam2Wrestler.name} for ${t1Damage} damage! (${activeTeam2Wrestler.name} HP: ${Math.max(0, matchState.currentHp[team2_p2.id])})</p>`);
                                updateMatchLog(matchState.matchLogEntries);
                                updateWrestlerHealthDisplay(modalTeam2Player2, team2_p2.id, matchState.currentHp[team2_p2.id], matchState.initialHp[team2_p2.id]);
                                triggerDamageAnimation(modalTeam2Player2);
                            }
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        } else {
                            // This case should ideally not be reached if validT1MoveTypes is correctly filtered
                            matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam1Wrestler.name} has no valid moves in the '${randomMoveType}' category after selection!</p>`);
                            updateMatchLog(matchState.matchLogEntries);
                        }
                    } else {
                        matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam1Wrestler.name} has no valid moves across all categories!</p>`);
                        updateMatchLog(matchState.matchLogEntries);
                    }
                } else {
                    matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam1Wrestler.name} has no moves defined!</p>`);
                    updateMatchLog(matchState.matchLogEntries);
                }

                if (matchState.currentHp[team2_p1.id] <= 0 && matchState.currentHp[team2_p2.id] <= 0) {
                    winner = `Team 1 (${team1_p1.name} & ${team1_p2.name})`;
                }

                if (!winner) {
                    // Team 2 active wrestler attacks Team 1 active wrestler
                    if (activeTeam2Wrestler.moves && Object.keys(activeTeam2Wrestler.moves).length > 0) {
                        // Filter move types to only include those with valid moves
                        const validT2MoveTypes = Object.keys(activeTeam2Wrestler.moves).filter(type =>
                            activeTeam2Wrestler.moves[type] && activeTeam2Wrestler.moves[type].some(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0))
                        );

                        if (validT2MoveTypes.length > 0) {
                            let randomMoveType = validT2MoveTypes[getRandomInt(0, validT2MoveTypes.length - 1)];
                            const availableT2Moves = activeTeam2Wrestler.moves[randomMoveType].filter(move => move.name !== "None" && !(move.damage.min === 0 && move.damage.max === 0));

                            if (availableT2Moves.length > 0) {
                                let t2Move = availableT2Moves[getRandomInt(0, availableT2Moves.length - 1)];
                                let t2Damage = getRandomInt(t2Move.damage.min, t2Move.damage.max);

                                if (activeTeam1Wrestler === team1_p1) {
                                    matchState.currentHp[team1_p1.id] -= t2Damage;
                                    matchState.matchLogEntries.push(`<p>${activeTeam2Wrestler.name} uses ${t2Move.name} on ${activeTeam1Wrestler.name} for ${t2Damage} damage! (${activeTeam1Wrestler.name} HP: ${Math.max(0, matchState.currentHp[team1_p1.id])})</p>`);
                                    updateMatchLog(matchState.matchLogEntries);
                                    updateWrestlerHealthDisplay(modalTeam1Player1, team1_p1.id, matchState.currentHp[team1_p1.id], matchState.initialHp[team1_p1.id]);
                                    triggerDamageAnimation(modalTeam1Player1);
                                } else {
                                    matchState.currentHp[team1_p2.id] -= t2Damage;
                                    matchState.matchLogEntries.push(`<p>${activeTeam2Wrestler.name} uses ${t2Move.name} on ${activeTeam1Wrestler.name} for ${t2Damage} damage! (${activeTeam1Wrestler.name} HP: ${Math.max(0, matchState.currentHp[team1_p2.id])})</p>`);
                                    updateMatchLog(matchState.matchLogEntries);
                                    updateWrestlerHealthDisplay(modalTeam1Player2, team1_p2.id, matchState.currentHp[team1_p2.id], matchState.initialHp[team1_p2.id]);
                                    triggerDamageAnimation(modalTeam1Player2);
                                }
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            } else {
                                // This case should ideally not be reached if validT2MoveTypes is correctly filtered
                                matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam2Wrestler.name} has no valid moves in the '${randomMoveType}' category after selection!</p>`);
                                updateMatchLog(matchState.matchLogEntries);
                            }
                        } else {
                            matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam2Wrestler.name} has no valid moves across all categories!</p>`);
                            updateMatchLog(matchState.matchLogEntries);
                        }
                    } else {
                        matchState.matchLogEntries.push(`<p class="text-red-500">Error: ${activeTeam2Wrestler.name} has no moves defined!</p>`);
                        updateMatchLog(matchState.matchLogEntries);
                    }

                    if (matchState.currentHp[team1_p1.id] <= 0 && matchState.currentHp[team1_p2.id] <= 0) {
                        winner = `Team 2 (${team2_p1.name} & ${team2_p2.name})`;
                    }
                }
            }
        }
    }

    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const winnerModal = document.getElementById('winnerModal');

    if (winner) {
        if (nextTurnBtn) {
            nextTurnBtn.classList.add('hidden');
        }
        hideModal();
        showWinnerModal(winner);
    }
}

/**
 * Displays the final winner modal.
 * @param {string} winnerName - The name of the winning wrestler or team, or 'Draw'.
 */
function showWinnerModal(winnerName) {
    console.log("[showWinnerModal] called with winner:", winnerName);
    const winnerModal = document.getElementById('winnerModal');
    const winnerModalTitle = document.getElementById('winnerModalTitle');
    const winnerModalMessage = document.getElementById('winnerModalMessage');
    const winnerImageContainer = document.getElementById('winnerImageContainer');

    if (winnerModal && winnerModalTitle && winnerModalMessage && winnerImageContainer) {
        winnerModal.classList.remove('hidden');
        winnerImageContainer.innerHTML = '';
        winnerImageContainer.classList.add('hidden');

        if (winnerName === 'Draw') {
            winnerModalTitle.textContent = 'Match Result: Draw!';
            winnerModalMessage.textContent = 'Neither side could secure a victory!';
            const drawImage = document.createElement('img');
            drawImage.src = 'https://placehold.co/128x128/0f172a/e2e8f0?text=Draw';
            drawImage.alt = 'Draw';
            drawImage.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-auto');
            winnerImageContainer.appendChild(drawImage);
            winnerImageContainer.classList.remove('hidden');
        } else {
            winnerModalTitle.textContent = 'Match Winner!';
            winnerModalMessage.textContent = `${winnerName} emerges victorious!`;

            if (currentMatchType === 'tag-team') {
                let winningTeamWrestlers = [];
                if (winnerName.includes('Team 1')) {
                    winningTeamWrestlers.push(selectedWrestlers.team1Player1);
                    winningTeamWrestlers.push(selectedWrestlers.team1Player2);
                } else if (winnerName.includes('Team 2')) {
                    winningTeamWrestlers.push(selectedWrestlers.team2Player1);
                    winningTeamWrestlers.push(selectedWrestlers.team2Player2);
                }

                if (winningTeamWrestlers.length === 2) {
                    winningTeamWrestlers.forEach(wrestler => {
                        const img = document.createElement('img');
                        img.src = wrestler.image;
                        img.alt = wrestler.name;
                        img.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-2', 'border-4', 'border-yellow-400');
                        winnerImageContainer.appendChild(img);
                    });
                    winnerImageContainer.classList.remove('hidden');
                    winnerImageContainer.classList.add('flex', 'justify-center', 'items-center', 'mt-4');
                } else {
                    const placeholderImage = document.createElement('img');
                    placeholderImage.src = 'https://placehold.co/128x128/0f172a/e2e8f0?text=Winner';
                    placeholderImage.alt = 'Winner';
                    placeholderImage.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-auto');
                    winnerImageContainer.appendChild(placeholderImage);
                    winnerImageContainer.classList.remove('hidden');
                }
            } else {
                const winningWrestler = wrestlers.find(w => w.name === winnerName);
                if (winningWrestler) {
                    const img = document.createElement('img');
                    img.src = winningWrestler.image;
                    img.alt = winningWrestler.name;
                    img.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-auto', 'border-4', 'border-yellow-400');
                    winnerImageContainer.appendChild(img);
                    winnerImageContainer.classList.remove('hidden');
                } else {
                    const placeholderImage = document.createElement('img');
                    placeholderImage.src = 'https://placehold.co/128x128/0f172a/e2e8f0?text=Winner';
                    placeholderImage.alt = 'Winner';
                    placeholderImage.classList.add('w-24', 'h-24', 'rounded-full', 'object-cover', 'mx-auto');
                    winnerImageContainer.appendChild(placeholderImage);
                    winnerImageContainer.classList.remove('hidden');
                }
            }
        }
    } else {
        console.error('[showWinnerModal] One or more winner modal elements not found!');
        console.log({winnerModal, winnerModalTitle, winnerModalMessage, winnerImageContainer});
    }
}

/**
 * Creates a random matchup based on the current match type.
 */
function createRandomMatchup() {
    console.log("[createRandomMatchup] called.");
    // First, reset any currently selected wrestlers
    resetMatch();

    const availableWrestlers = [...wrestlers]; // Create a shallow copy to avoid modifying the original array

    if (availableWrestlers.length === 0) {
        showModal('Error', 'No wrestlers available in the roster to create a random match.');
        return;
    }

    if (currentMatchType === 'single') {
        if (availableWrestlers.length < 2) {
            showModal('Error', 'Not enough wrestlers to create a random single match.');
            return;
        }
        // Select two unique random wrestlers
        const randomIndex1 = getRandomInt(0, availableWrestlers.length - 1);
        const p1 = availableWrestlers.splice(randomIndex1, 1)[0]; // Remove to ensure uniqueness

        const randomIndex2 = getRandomInt(0, availableWrestlers.length - 1);
        const p2 = availableWrestlers.splice(randomIndex2, 1)[0];

        selectedWrestlers.player1 = p1;
        selectedWrestlers.player2 = p2;

        const dropZones = {
            player1: document.getElementById('player1DropZone'),
            player2: document.getElementById('player2DropZone')
        };

        if (dropZones.player1 && dropZones.player2) {
            renderWrestlerInDropZone(dropZones.player1, p1, p1.baseHp, p1.baseHp);
            hideWrestlerCardInRoster(p1.id);
            renderWrestlerInDropZone(dropZones.player2, p2, p2.baseHp, p2.baseHp);
            hideWrestlerCardInRoster(p2.id);
            console.log(`[createRandomMatchup] Random single match created: ${p1.name} vs. ${p2.name}`);
        } else {
            console.error("[createRandomMatchup] Single match drop zones not found.");
        }

    } else if (currentMatchType === 'tag-team') {
        if (availableWrestlers.length < 4) {
            showModal('Error', 'Not enough wrestlers to create a random tag team match.');
            return;
        }
        // Select four unique random wrestlers
        const teamWrestlers = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = getRandomInt(0, availableWrestlers.length - 1);
            teamWrestlers.push(availableWrestlers.splice(randomIndex, 1)[0]);
        }

        selectedWrestlers.team1Player1 = teamWrestlers[0];
        selectedWrestlers.team1Player2 = teamWrestlers[1];
        selectedWrestlers.team2Player1 = teamWrestlers[2];
        selectedWrestlers.team2Player2 = teamWrestlers[3];

        const dropZones = {
            team1Player1: document.getElementById('team1Player1DropZone'),
            team1Player2: document.getElementById('team1Player2DropZone'),
            team2Player1: document.getElementById('team2Player1DropZone'),
            team2Player2: document.getElementById('team2Player2DropZone')
        };

        if (dropZones.team1Player1 && dropZones.team1Player2 && dropZones.team2Player1 && dropZones.team2Player2) {
            renderWrestlerInDropZone(dropZones.team1Player1, selectedWrestlers.team1Player1, selectedWrestlers.team1Player1.baseHp, selectedWrestlers.team1Player1.baseHp);
            hideWrestlerCardInRoster(selectedWrestlers.team1Player1.id);
            renderWrestlerInDropZone(dropZones.team1Player2, selectedWrestlers.team1Player2, selectedWrestlers.team1Player2.baseHp, selectedWrestlers.team1Player2.baseHp);
            hideWrestlerCardInRoster(selectedWrestlers.team1Player2.id);
            renderWrestlerInDropZone(dropZones.team2Player1, selectedWrestlers.team2Player1, selectedWrestlers.team2Player1.baseHp, selectedWrestlers.team2Player1.baseHp);
            hideWrestlerCardInRoster(selectedWrestlers.team2Player1.id);
            renderWrestlerInDropZone(dropZones.team2Player2, selectedWrestlers.team2Player2, selectedWrestlers.team2Player2.baseHp, selectedWrestlers.team2Player2.baseHp);
            hideWrestlerCardInRoster(selectedWrestlers.team2Player2.id);
            console.log(`[createRandomMatchup] Random tag team match created: Team 1 (${selectedWrestlers.team1Player1.name}, ${selectedWrestlers.team1Player2.name}) vs. Team 2 (${selectedWrestlers.team2Player1.name}, ${selectedWrestlers.team2Player2.name})`);
        } else {
            console.error("[createRandomMatchup] Tag team drop zones not found.");
        }
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements (fetched once inside DOMContentLoaded)
    const singleMatchBtn = document.getElementById('singleMatchBtn');
    const tagTeamMatchBtn = document.getElementById('tagTeamMatchBtn');
    const randomMatchupBtn = document.getElementById('randomMatchupBtn'); // NEW: Random Matchup Button
    const singleMatchLayout = document.getElementById('singleMatchLayout');
    const tagTeamMatchLayout = document.getElementById('tagTeamMatchLayout');
    const startMatchBtn = document.getElementById('startMatchBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const resetMatchBtnModal = document.getElementById('resetMatchBtnModal');
    const resetMatchBtnMain = document.getElementById('resetMatchBtnMain');
    const wrestlerRosterElement = document.getElementById('wrestlerRoster');

    // New DOM elements for the turn-based system and winner modal
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const winnerModal = document.getElementById('winnerModal');
    const winnerModalTitle = document.getElementById('winnerModalTitle'); // Corrected ID
    const winnerModalMessage = document.getElementById('modalMessage'); // Corrected ID
    const winnerImageContainer = document.getElementById('winnerImageContainer');
    const resetMatchBtnWinnerModal = document.getElementById('resetMatchBtnWinnerModal');

    // New containers for modal display layouts
    const modalSingleMatchDisplay = document.getElementById('modalSingleMatchDisplay');
    const modalTagTeamMatchDisplay = document.getElementById('modalTagTeamMatchDisplay');
    const modalTeam1Display = document.getElementById('modalTeam1Display');
    const modalTeam2Display = document.getElementById('modalTeam2Display');

    // Store references to the drop zones for easier iteration
    const dropZones = {
        player1: document.getElementById('player1DropZone'),
        player2: document.getElementById('player2DropZone'),
        team1Player1: document.getElementById('team1Player1DropZone'),
        team1Player2: document.getElementById('team1Player2DropZone'),
        team2Player1: document.getElementById('team2Player1DropZone'),
        team2Player2: document.getElementById('team2Player2DropZone')
    };
    console.log('[DOMContentLoaded] Initialized dropZones:', dropZones);


    if (wrestlerRosterElement) {
        initializeRoster(handleDragStart);
        wrestlerRosterElement.style.position = 'relative';
        wrestlerRosterElement.style.zIndex = '10';
        wrestlerRosterElement.style.pointerEvents = 'auto';
    } else {
        console.error('[DOMContentLoaded] wrestlerRosterElement not found!');
    }

    setupDragAndDropListeners(dropZones, handleDragOver, handleDragEnter, handleDragLeave, handleDrop);

    if (wrestlerRosterElement) {
        wrestlerRosterElement.addEventListener('touchstart', handleDragStart, { passive: false });
    }
    document.addEventListener('touchmove', handleDragOver, { passive: false });
    document.addEventListener('touchend', handleDrop);

    if (singleMatchBtn) {
        singleMatchBtn.addEventListener('click', () => {
            currentMatchType = 'single';
            // Corrected: Changed tagTeamBtn to tagTeamMatchBtn
            toggleMatchLayout('single', singleMatchLayout, tagTeamMatchLayout, singleMatchBtn, tagTeamMatchBtn);
            resetMatch(); // Reset to clear drop zones
        });
    } else {
        console.warn('[DOMContentLoaded] singleMatchBtn not found. Listener not attached.');
    }

    if (tagTeamMatchBtn) {
        tagTeamMatchBtn.addEventListener('click', () => {
            currentMatchType = 'tag-team';
            // Corrected: Changed tagTeamBtn to tagTeamMatchBtn
            toggleMatchLayout('tag-team', singleMatchLayout, tagTeamMatchLayout, singleMatchBtn, tagTeamMatchBtn);
            resetMatch(); // Reset to clear drop zones
        });
    } else {
        console.warn('[DOMContentLoaded] tagTeamMatchBtn not found. Listener not attached.');
    }

    if (randomMatchupBtn) { // NEW: Event listener for random matchup button
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

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    } else {
        console.warn('[DOMContentLoaded] closeModalBtn not found. Listener not attached.');
    }
    
    if (nextTurnBtn) {
        nextTurnBtn.addEventListener('click', async () => {
            nextTurnBtn.disabled = true;
            await advanceTurn();
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

    if (resetMatchBtnMain) {
        resetMatchBtnMain.addEventListener('click', resetMatch);
    } else {
        console.warn('[DOMContentLoaded] resetMatchBtnMain not found. Listener not attached.');
    }

    if (resetMatchBtnWinnerModal) {
        resetMatchBtnWinnerModal.addEventListener('click', resetMatch);
    } else {
        console.warn('[DOMContentLoaded] resetMatchBtnWinnerModal not found. Listener not attached.');
    }
});

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
    resetDropZonesUI(dropZones);
    // Clear match log and result
    updateMatchLog(['<p class="text-center text-gray-500">No match has started yet.</p>']);
    updateMatchResult('Awaiting Match...');
    hideModal(); // Hide match log modal

    const winnerModal = document.getElementById('winnerModal');
    if (winnerModal) {
        winnerModal.classList.add('hidden');
        console.log("[resetMatch] Winner modal hidden successfully during reset.");
    } else {
        console.warn("[resetMatch] Winner modal not found during reset. Cannot hide.");
    }

    const nextTurnBtn = document.getElementById('nextTurnBtn');
    if (nextTurnBtn) {
        nextTurnBtn.classList.add('hidden');
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
}

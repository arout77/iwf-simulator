// booking.js

import { wrestlers, getRandomInt } from './data.js';
import {
    renderWrestlerCard, initializeRoster, setupDragAndDropListeners,
    updateDropZoneVisual, renderWrestlerInDropZone, hideWrestlerCardInRoster,
    showWrestlerCardInRoster, showModal, hideModal, updateMatchLog,
    updateWrestlerHealthDisplay, triggerDamageAnimation,
    renderWrestlerInModalDisplay,
    createDragCloneForTouch, updateDragClonePosition, removeDragClone,
    highlightDropZone, unhighlightDropZone
} from './dom.js';

// Global state for the booking page
let allWrestlers = []; // Full list of all wrestlers fetched from data.js
let contractedWrestlers = []; // Wrestlers currently on the user's roster
let freeAgents = []; // Wrestlers available for signing
let currentBookedMatches = { // Stores wrestlers booked into each match slot
    match1Player1: null,
    match1Player2: null,
    match2Player1: null,
    match2Player2: null,
    match3TeamA1: null,
    match3TeamA2: null,
    match3TeamB1: null,
    match3TeamB2: null,
};
let currentMoney = 20000; // Starting money for the promoter
const MIN_ROSTER_SIZE = 10;

// Venue data
const venues = [
    { name: "High School Gym", cost: 500, capacity: 500, ticketPrice: 5, merchSalesPerFan: 2 },
    { name: "Local Fairgrounds", cost: 2000, capacity: 2000, ticketPrice: 10, merchSalesPerFan: 3 },
    { name: "Community Arena", cost: 7500, capacity: 5000, ticketPrice: 15, merchSalesPerFan: 4 },
    { name: "Major City Stadium", cost: 25000, capacity: 15000, ticketPrice: 25, merchSalesPerFan: 6 },
    { name: "Madison Square Garden", cost: 100000, capacity: 20000, ticketPrice: 50, merchSalesPerFan: 10 }
];
let selectedVenue = venues[0]; // Default to the cheapest venue

let advertisingSpend = 0; // Initial advertising spend

// DOM Elements
const wrestlerRosterDiv = document.getElementById('wrestlerRoster');
const ppvNameInput = document.getElementById('ppvName');
const currentMoneySpan = document.getElementById('currentMoney');
const currentRosterSizeSpan = document.getElementById('currentRosterSize');
const currentRosterSizeModalSpan = document.getElementById('currentRosterSizeModal');
const matchSlotsContainer = document.getElementById('matchSlotsContainer');
const bookPpvBtn = document.getElementById('bookPpvBtn');
const resetPpvBtn = document.getElementById('resetPpvBtn');
const ppvLogModal = document.getElementById('ppvLogModal'); // The modal itself
const ppvLog = document.getElementById('ppvLog'); // The content div inside the modal
const openFreeAgencyModalBtn = document.getElementById('openFreeAgencyModalBtn');
const freeAgentListDiv = document.getElementById('freeAgentList');
const venueSelect = document.getElementById('venueSelect');
const venueDetailsP = document.getElementById('venueDetails');
const advertisingSpendInput = document.getElementById('advertisingSpend');
const advertisingValueSpan = document.getElementById('advertisingValue');

// Drag and Drop state (re-using from app.js, ensure consistency)
let draggedWrestlerId = null;
let isDraggingTouch = false;
let currentTouchDragClone = null;
let currentDropZone = null; // To keep track of the currently highlighted drop zone during drag/touch

// --- Helper Functions ---

/**
 * Updates the money display in the UI.
 */
function updateMoneyDisplay() {
    if (currentMoneySpan) {
        currentMoneySpan.textContent = `$${currentMoney.toFixed(2)}`;
    }
}

/**
 * Updates the roster size display in the UI.
 */
function updateRosterSizeDisplay() {
    if (currentRosterSizeSpan) {
        currentRosterSizeSpan.textContent = `${contractedWrestlers.length} / ${MIN_ROSTER_SIZE} (min)`;
    }
    if (currentRosterSizeModalSpan) {
        currentRosterSizeModalSpan.textContent = `${contractedWrestlers.length} / ${MIN_ROSTER_SIZE} (min)`;
    }
    // Enable/disable sign button based on roster size
    // This logic will be handled when rendering free agents
}

/**
 * Assigns a wrestler to a match drop zone.
 * @param {HTMLElement} dropZone - The drop zone element.
 * @param {object} wrestler - The wrestler object.
 */
function assignWrestlerToDropZone(dropZone, wrestler) {
    // Check if the wrestler is already booked in another slot
    for (const slot in currentBookedMatches) {
        if (currentBookedMatches[slot] && currentBookedMatches[slot].id === wrestler.id) {
            // If already booked, move them from their old slot back to the roster
            console.log(`Wrestler ${wrestler.name} (ID: ${wrestler.id}) is already in ${slot}. Moving them back to roster.`);
            const oldDropZone = document.getElementById(slot);
            if (oldDropZone) {
                renderWrestlerInDropZone(oldDropZone, null); // Clear the old slot UI
                currentBookedMatches[slot] = null; // Clear the old slot in state
            }
            break; // Only one instance of a wrestler can be booked at a time
        }
    }

    // If the target drop zone is already occupied, return its wrestler to the roster
    if (currentBookedMatches[dropZone.id]) {
        showWrestlerCardInRoster(currentBookedMatches[dropZone.id].id);
    }

    currentBookedMatches[dropZone.id] = wrestler;
    renderWrestlerInDropZone(dropZone, wrestler);
    hideWrestlerCardInRoster(wrestler.id); // Hide from contracted roster
    console.log(`Assigned ${wrestler.name} to ${dropZone.id}`);
}

/**
 * Removes a wrestler from a match drop zone and returns them to the roster.
 * @param {string} dropZoneId - The ID of the drop zone to clear.
 */
function removeWrestlerFromDropZone(dropZoneId) {
    const wrestler = currentBookedMatches[dropZoneId];
    if (wrestler) {
        const dropZone = document.getElementById(dropZoneId);
        if (dropZone) {
            renderWrestlerInDropZone(dropZone, null); // Clear UI
        }
        currentBookedMatches[dropZoneId] = null; // Clear state
        showWrestlerCardInRoster(wrestler.id); // Return to roster
        console.log(`Removed ${wrestler.name} from ${dropZoneId}`);
    }
}

// --- Drag and Drop Handlers (adapted for booking.js) ---

/**
 * Handles the start of a drag operation (mouse).
 * @param {DragEvent} event - The dragstart event.
 */
function handleDragStart(event) {
    draggedWrestlerId = event.currentTarget.id;
    event.dataTransfer.setData('text/plain', draggedWrestlerId);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.classList.add('opacity-50'); // Reduce opacity of original card
    document.body.style.cursor = 'grabbing'; // Change cursor to grabbing
    console.log('DRAG_START: ID:', draggedWrestlerId);
}

/**
 * Handles drag over event for drop zones (mouse).
 * @param {DragEvent} event - The dragover event.
 */
function handleDragOver(event) {
    event.preventDefault(); // Allow drop
    event.dataTransfer.dropEffect = 'move'; // Explicitly set dropEffect to 'move'
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
    const wrestler = contractedWrestlers.find(w => w.id === id); // Find in contracted roster

    if (wrestler) {
        assignWrestlerToDropZone(dropZone, wrestler);
    } else {
        console.warn('handleDrop: Wrestler not found in contracted roster for ID:', id);
        showWrestlerCardInRoster(id); // Ensure it's visible if not a valid drop
    }
    draggedWrestlerId = null; // Reset dragged ID after drop
}

/**
 * Handles the end of a drag operation (mouse).
 * @param {DragEvent} event - The dragend event.
 */
function handleDragEnd(event) {
    const draggedElementId = event.currentTarget.id;
    const originalCardInRoster = document.getElementById(draggedElementId);
    if (originalCardInRoster) {
        originalCardInRoster.classList.remove('opacity-50'); // Ensure opacity is reset
    }

    if (currentDropZone) {
        updateDropZoneVisual(currentDropZone, false);
        currentDropZone = null;
    }
    draggedWrestlerId = null; // Clear global state for next drag
    document.body.style.cursor = 'auto'; // Reset cursor to auto
}

/**
 * Handles touch start event for wrestler cards (mobile drag).
 * @param {TouchEvent} event - The touchstart event.
 */
function handleTouchStart(event) {
    if (event.touches.length === 1) {
        isDraggingTouch = true;
        const touch = event.touches[0];
        const touchedCard = event.currentTarget;
        draggedWrestlerId = touchedCard.id;

        currentTouchDragClone = createDragCloneForTouch(touchedCard);
        updateDragClonePosition(touch.clientX, touch.clientY);

        touchedCard.classList.add('opacity-50');

        document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.body.addEventListener('touchend', handleTouchEnd);
        document.body.addEventListener('touchcancel', handleTouchCancel);
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
        event.preventDefault(); // Prevent default scrolling

        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        let newDropZone = null;

        if (targetElement) {
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
        const touch = event.changedTouches[0];
        if (!touch) {
            console.warn("handleTouchEnd: No changedTouches found on touchend, cannot determine drop position.");
            handleTouchCleanup();
            return;
        }

        const dropPointX = touch.clientX;
        const dropPointY = touch.clientY;

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
            unhighlightDropZone(currentDropZone);
        }

        if (finalDropZone && draggedWrestlerId) {
            const wrestler = contractedWrestlers.find(w => w.id === draggedWrestlerId);
            if (wrestler) {
                assignWrestlerToDropZone(finalDropZone, wrestler);
            } else {
                console.warn('TOUCH_END: Wrestler not found in contracted roster for ID:', draggedWrestlerId);
                showWrestlerCardInRoster(draggedWrestlerId);
            }
        } else {
            showWrestlerCardInRoster(draggedWrestlerId); // Return to roster if no valid drop zone
        }
    }
    handleTouchCleanup();
}

/**
 * Handles touchcancel event.
 * @param {TouchEvent} event - The touchcancel event.
 */
function handleTouchCancel(event) {
    console.warn('Touch drag cancelled.');
    if (draggedWrestlerId) {
        showWrestlerCardInRoster(draggedWrestlerId);
    }
    handleTouchCleanup();
}

/**
 * Cleans up touch drag state.
 */
function handleTouchCleanup() {
    removeDragClone();
    draggedWrestlerId = null;
    isDraggingTouch = false;
    currentDropZone = null;
    document.body.removeEventListener('touchmove', handleTouchMove);
    document.body.removeEventListener('touchend', handleTouchEnd);
    document.body.removeEventListener('touchcancel', handleTouchCancel);
}

/**
 * Renders the free agent list in the modal.
 */
function renderFreeAgents() {
    if (!freeAgentListDiv) return;
    freeAgentListDiv.innerHTML = ''; // Clear previous list

    if (freeAgents.length === 0) {
        freeAgentListDiv.innerHTML = '<p class="text-gray-400 col-span-full">No free agents available at this time.</p>';
        return;
    }

    freeAgents.forEach(wrestler => {
        const card = renderWrestlerCard(wrestler, false); // Not draggable in this modal
        card.classList.add('relative'); // For button positioning

        const signButton = document.createElement('button');
        signButton.textContent = `Sign ($${wrestler.salary})`;
        signButton.classList.add('absolute', 'bottom-2', 'left-1/2', '-translate-x-1/2', 'bg-green-600', 'hover:bg-green-700', 'text-white', 'text-xs', 'font-bold', 'py-1', 'px-2', 'rounded-full', 'transition-colors', 'duration-200');
        
        // Disable if not enough money or roster is full
        if (currentMoney < wrestler.salary || contractedWrestlers.length >= 20) { // Cap roster at 20 for now
            signButton.disabled = true;
            signButton.classList.remove('bg-green-600', 'hover:bg-green-700');
            signButton.classList.add('bg-gray-500', 'cursor-not-allowed');
        }

        signButton.addEventListener('click', () => signWrestler(wrestler.id));
        card.appendChild(signButton);
        freeAgentListDiv.appendChild(card);
    });
}

/**
 * Signs a wrestler from the free agent pool to the contracted roster.
 * @param {string} wrestlerId - The ID of the wrestler to sign.
 */
function signWrestler(wrestlerId) {
    const wrestlerIndex = freeAgents.findIndex(w => w.id === wrestlerId);
    if (wrestlerIndex > -1) {
        const wrestlerToSign = freeAgents[wrestlerIndex];

        if (currentMoney >= wrestlerToSign.salary && contractedWrestlers.length < 20) { // Check money and roster cap
            currentMoney -= wrestlerToSign.salary;
            contractedWrestlers.push(wrestlerToSign);
            freeAgents.splice(wrestlerIndex, 1); // Remove from free agents

            updateMoneyDisplay();
            updateRosterSizeDisplay();
            initializeRoster(contractedWrestlers, wrestlerRosterDiv, handleDragStart, handleTouchStart, handleDragEnd); // Re-render contracted roster
            renderFreeAgents(); // Re-render free agent list

            updateMatchLog(`${wrestlerToSign.name} signed for $${wrestlerToSign.salary}!`, 'info');
        } else {
            let message = '';
            if (currentMoney < wrestlerToSign.salary) {
                message = `Not enough money to sign ${wrestlerToSign.name}. You need $${wrestlerToSign.salary} but only have $${currentMoney.toFixed(2)}.`;
            } else if (contractedWrestlers.length >= 20) {
                message = `Your roster is full! Release a wrestler to sign a new one.`;
            }
            showModal(ppvLogModal, 'Cannot Sign Wrestler', message);
        }
    }
}

/**
 * Populates the venue select dropdown.
 */
function populateVenueSelect() {
    if (!venueSelect) return;
    venueSelect.innerHTML = ''; // Clear existing options

    venues.forEach(venue => {
        const option = document.createElement('option');
        option.value = venue.name;
        option.textContent = `${venue.name} (Cost: $${venue.cost}, Capacity: ${venue.capacity})`;
        venueSelect.appendChild(option);
    });

    // Set initial selected venue and display details
    selectedVenue = venues[0];
    updateVenueDetails();
}

/**
 * Updates the displayed venue details.
 */
function updateVenueDetails() {
    if (venueDetailsP && selectedVenue) {
        venueDetailsP.textContent = `Cost: $${selectedVenue.cost} | Capacity: ${selectedVenue.capacity} | Ticket Price: $${selectedVenue.ticketPrice} | Merch/Food per Fan: $${selectedVenue.merchSalesPerFan}`;
    }
}

/**
 * Simulates a PPV event.
 */
async function simulatePpv() {
    const ppvTitle = ppvNameInput.value.trim();
    if (!ppvTitle) {
        showModal(ppvLogModal, 'Booking Error', 'Please enter a name for your PPV event.');
        return;
    }

    // Validate booked matches
    const bookedWrestlersCount = Object.values(currentBookedMatches).filter(w => w !== null).length;
    if (bookedWrestlersCount === 0) {
        showModal(ppvLogModal, 'Booking Error', 'Please drag and drop wrestlers into match slots to book your PPV.');
        return;
    }

    // Calculate total expenses
    let totalSalaries = 0;
    contractedWrestlers.forEach(w => {
        totalSalaries += w.salary;
    });
    const totalExpenses = totalSalaries + selectedVenue.cost + advertisingSpend;

    // Calculate match quality (average overall of all booked wrestlers)
    let totalOverall = 0;
    let validWrestlersInMatches = 0;
    Object.values(currentBookedMatches).forEach(wrestler => {
        if (wrestler) {
            totalOverall += wrestler.overall;
            validWrestlersInMatches++;
        }
    });

    const averageMatchQuality = validWrestlersInMatches > 0 ? (totalOverall / validWrestlersInMatches) : 50; // Default if no wrestlers booked

    // Calculate revenue
    const qualityMultiplier = 0.5 + (averageMatchQuality / 100) * 0.5; // Scale from 0.5 to 1.0 based on quality
    const attendance = Math.min(selectedVenue.capacity, Math.round(selectedVenue.capacity * qualityMultiplier * (1 + advertisingSpend / 20000))); // Advertising impact
    const ticketRevenue = attendance * selectedVenue.ticketPrice;
    const merchFoodRevenue = attendance * selectedVenue.merchSalesPerFan;
    const totalRevenue = ticketRevenue + merchFoodRevenue;

    const profitLoss = totalRevenue - totalExpenses;
    currentMoney += profitLoss;

    // Update UI
    updateMoneyDisplay();
    showModal(ppvLogModal, `PPV Event: ${ppvTitle} Results`, '');
    ppvLog.innerHTML = `
        <h3 class="text-xl font-bold text-yellow-300 mb-2">Financial Summary for "${ppvTitle}"</h3>
        <p class="text-lg text-gray-300">Venue: ${selectedVenue.name} (Capacity: ${selectedVenue.capacity})</p>
        <p class="text-lg text-gray-300">Advertising Spend: $${advertisingSpend}</p>
        <p class="text-lg text-gray-300">Total Contracted Salaries: $${totalSalaries.toFixed(2)}</p>
        <p class="text-lg text-gray-300">Venue Cost: $${selectedVenue.cost.toFixed(2)}</p>
        <p class="text-lg text-gray-300 font-semibold text-red-400">Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <br>
        <p class="text-lg text-gray-300">Estimated Attendance: ${attendance}</p>
        <p class="text-lg text-gray-300">Ticket Revenue: $${ticketRevenue.toFixed(2)}</p>
        <p class="text-lg text-gray-300">Merchandise/Food Revenue: $${merchFoodRevenue.toFixed(2)}</p>
        <p class="text-lg text-gray-300 font-semibold text-green-400">Total Revenue: $${totalRevenue.toFixed(2)}</p>
        <br>
        <p class="text-2xl font-bold ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}">Profit/Loss: $${profitLoss.toFixed(2)}</p>
        <p class="text-xl font-bold text-yellow-400 mt-4">New Money: $${currentMoney.toFixed(2)}</p>
        <div class="mt-6">
            <h3 class="text-xl font-bold text-yellow-300 mb-2">Match Results:</h3>
            <div id="ppvMatchResults" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Match results will be inserted here -->
            </div>
        </div>
    `;

    // Simulate individual matches and append results
    const ppvMatchResultsDiv = document.getElementById('ppvMatchResults');
    ppvMatchResultsDiv.innerHTML = ''; // Clear previous results

    // Simulate Match 1 (Singles)
    if (currentBookedMatches.match1Player1 && currentBookedMatches.match1Player2) {
        const result = await simulateSingleMatch(currentBookedMatches.match1Player1, currentBookedMatches.match1Player2);
        ppvMatchResultsDiv.innerHTML += `<div class="bg-gray-600 p-3 rounded-lg"><p class="font-bold">${currentBookedMatches.match1Player1.name} vs. ${currentBookedMatches.match1Player2.name}:</p><p>${result}</p></div>`;
    }

    // Simulate Match 2 (Singles)
    if (currentBookedMatches.match2Player1 && currentBookedMatches.match2Player2) {
        const result = await simulateSingleMatch(currentBookedMatches.match2Player1, currentBookedMatches.match2Player2);
        ppvMatchResultsDiv.innerHTML += `<div class="bg-gray-600 p-3 rounded-lg"><p class="font-bold">${currentBookedMatches.match2Player1.name} vs. ${currentBookedMatches.match2Player2.name}:</p><p>${result}</p></div>`;
    }

    // Simulate Match 3 (Tag Team)
    if (currentBookedMatches.match3TeamA1 && currentBookedMatches.match3TeamA2 && currentBookedMatches.match3TeamB1 && currentBookedMatches.match3TeamB2) {
        const result = await simulateTagTeamMatch(
            currentBookedMatches.match3TeamA1, currentBookedMatches.match3TeamA2,
            currentBookedMatches.match3TeamB1, currentBookedMatches.match3TeamB2
        );
        ppvMatchResultsDiv.innerHTML += `<div class="bg-gray-600 p-3 rounded-lg col-span-full"><p class="font-bold">Tag Team Match:</p><p>${result}</p></div>`;
    }

    resetPpv(); // Clear match bookings after simulation
}

/**
 * Simulates a single match for PPV results (headless).
 * @param {object} p1 - Player 1 wrestler object.
 * @param {object} p2 - Player 2 wrestler object.
 * @returns {string} The match result string.
 */
async function simulateSingleMatch(p1, p2) {
    let simMatchState = {
        currentHp: {},
        currentStamina: {},
        initialHp: {},
        initialStamina: {},
        currentRound: 0,
        maxRounds: 75 // Same as app.js single match
    };

    simMatchState.initialHp[p1.id] = p1.baseHp + p1.stats.stamina;
    simMatchState.currentHp[p1.id] = p1.baseHp + p1.stats.stamina;
    simMatchState.initialStamina[p1.id] = p1.stats.stamina;
    simMatchState.currentStamina[p1.id] = p1.stats.stamina;

    simMatchState.initialHp[p2.id] = p2.baseHp + p2.stats.stamina;
    simMatchState.currentHp[p2.id] = p2.baseHp + p2.stats.stamina;
    simMatchState.initialStamina[p2.id] = p2.stats.stamina;
    simMatchState.currentStamina[p2.id] = p2.stats.stamina;

    let winner = null;
    while (!winner && simMatchState.currentRound < simMatchState.maxRounds) {
        simMatchState.currentRound++;

        // Stamina recovery
        const p1StaminaRecovery = p1.stats.staminaRecoveryRate || 0;
        simMatchState.currentStamina[p1.id] = Math.min(simMatchState.initialStamina[p1.id], simMatchState.currentStamina[p1.id] + p1StaminaRecovery);
        const p2StaminaRecovery = p2.stats.staminaRecoveryRate || 0;
        simMatchState.currentStamina[p2.id] = Math.min(simMatchState.initialStamina[p2.id], simMatchState.currentStamina[p2.id] + p2StaminaRecovery);

        // Player 1 attacks Player 2
        if (simMatchState.currentHp[p1.id] > 0 && simMatchState.currentHp[p2.id] > 0) {
            const p1ChosenMove = selectRandomMove(p1, simMatchState.currentStamina, true);
            if (p1ChosenMove) {
                const p1StaminaCost = parseFloat(p1ChosenMove.staminaCost) || 0;
                if (simMatchState.currentStamina[p1.id] >= p1StaminaCost) {
                    simMatchState.currentStamina[p1.id] -= p1StaminaCost;
                    const p1DamageDealt = calculateDamage(p1, p2, p1ChosenMove, simMatchState.currentStamina, true);
                    simMatchState.currentHp[p2.id] = Math.max(0, simMatchState.currentHp[p2.id] - p1DamageDealt);
                }
            }
        }
        if (simMatchState.currentHp[p2.id] <= 0) {
            winner = p1;
        }

        // Player 2 attacks Player 1 (only if no winner yet)
        if (!winner && simMatchState.currentHp[p1.id] > 0 && simMatchState.currentHp[p2.id] > 0) {
            const p2ChosenMove = selectRandomMove(p2, simMatchState.currentStamina, true);
            if (p2ChosenMove) {
                const p2StaminaCost = parseFloat(p2ChosenMove.staminaCost) || 0;
                if (simMatchState.currentStamina[p2.id] >= p2StaminaCost) {
                    simMatchState.currentStamina[p2.id] -= p2StaminaCost;
                    const p2DamageDealt = calculateDamage(p2, p1, p2ChosenMove, simMatchState.currentStamina, true);
                    simMatchState.currentHp[p1.id] = Math.max(0, simMatchState.currentHp[p1.id] - p2DamageDealt);
                }
            }
        }
        if (simMatchState.currentHp[p1.id] <= 0) {
            winner = p2;
        }
    }

    if (!winner && simMatchState.currentRound >= simMatchState.maxRounds) {
        return `Draw (Time Limit)`;
    } else if (winner) {
        return `${winner.name} wins!`;
    }
    return 'Match did not conclude.'; // Should not happen
}

/**
 * Simulates a tag team match for PPV results (headless).
 * @param {object} t1p1 - Team 1 Player 1.
 * @param {object} t1p2 - Team 1 Player 2.
 * @param {object} t2p1 - Team 2 Player 1.
 * @param {object} t2p2 - Team 2 Player 2.
 * @returns {string} The match result string.
 */
async function simulateTagTeamMatch(t1p1, t1p2, t2p1, t2p2) {
    let simMatchState = {
        currentHp: {},
        currentStamina: {},
        initialHp: {},
        initialStamina: {},
        currentRound: 0,
        maxRounds: 125 // Same as app.js tag team match
    };

    // Initialize all wrestlers' HP and stamina
    [t1p1, t1p2, t2p1, t2p2].forEach(p => {
        simMatchState.initialHp[p.id] = p.baseHp + p.stats.stamina;
        simMatchState.currentHp[p.id] = p.baseHp + p.stats.stamina;
        simMatchState.initialStamina[p.id] = p.stats.stamina;
        simMatchState.currentStamina[p.id] = p.stats.stamina;
    });

    const determineTagWinner = () => {
        const team1KnockedOut = (simMatchState.currentHp[t1p1.id] <= 0 && simMatchState.currentHp[t1p2.id] <= 0);
        const team2KnockedOut = (simMatchState.currentHp[t2p1.id] <= 0 && simMatchState.currentHp[t2p2.id] <= 0);

        if (team1KnockedOut && team2KnockedOut) return 'draw';
        if (team1KnockedOut) return 'Team 2';
        if (team2KnockedOut) return 'Team 1';
        return null;
    };

    let winner = null;
    while (!winner && simMatchState.currentRound < simMatchState.maxRounds) {
        simMatchState.currentRound++;

        // Stamina recovery for active and inactive wrestlers
        [t1p1, t1p2, t2p1, t2p2].forEach(p => {
            const staminaRecovery = p.stats.staminaRecoveryRate || 0;
            simMatchState.currentStamina[p.id] = Math.min(simMatchState.initialStamina[p.id], simMatchState.currentStamina[p.id] + staminaRecovery);
            // Inactive wrestlers get additional HP recovery
            if ((p === t1p2 && simMatchState.currentHp[t1p1.id] > 0) || (p === t1p1 && simMatchState.currentHp[t1p2.id] > 0) ||
                (p === t2p2 && simMatchState.currentHp[t2p1.id] > 0) || (p === t2p1 && simMatchState.currentHp[t2p2.id] > 0)) {
                simMatchState.currentHp[p.id] = Math.min(simMatchState.initialHp[p.id], simMatchState.currentHp[p.id] + 5);
            }
        });

        winner = determineTagWinner();
        if (winner) break;

        // Determine active wrestlers
        let activeTeam1Wrestler = null;
        if (simMatchState.currentHp[t1p1.id] > 0 && simMatchState.currentHp[t1p2.id] > 0) {
            activeTeam1Wrestler = getRandomInt(0, 1) === 0 ? t1p1 : t1p2;
        } else if (simMatchState.currentHp[t1p1.id] > 0) {
            activeTeam1Wrestler = t1p1;
        } else if (simMatchState.currentHp[t1p2.id] > 0) {
            activeTeam1Wrestler = t1p2;
        }

        let activeTeam2Wrestler = null;
        if (simMatchState.currentHp[t2p1.id] > 0 && simMatchState.currentHp[t2p2.id] > 0) {
            activeTeam2Wrestler = getRandomInt(0, 1) === 0 ? t2p1 : t2p2;
        } else if (simMatchState.currentHp[t2p1.id] > 0) {
            activeTeam2Wrestler = t2p1;
        } else if (simMatchState.currentHp[t2p2.id] > 0) {
            activeTeam2Wrestler = t2p2;
        }

        if (activeTeam1Wrestler && activeTeam2Wrestler) {
            // Team 1 attacks Team 2
            const t1ChosenMove = selectRandomMove(activeTeam1Wrestler, simMatchState.currentStamina, true);
            if (t1ChosenMove) {
                const t1StaminaCost = parseFloat(t1ChosenMove.staminaCost) || 0;
                if (simMatchState.currentStamina[activeTeam1Wrestler.id] >= t1StaminaCost) {
                    simMatchState.currentStamina[activeTeam1Wrestler.id] -= t1StaminaCost;
                    const t1DamageDealt = calculateDamage(activeTeam1Wrestler, activeTeam2Wrestler, t1ChosenMove, simMatchState.currentStamina, true);
                    simMatchState.currentHp[activeTeam2Wrestler.id] = Math.max(0, simMatchState.currentHp[activeTeam2Wrestler.id] - t1DamageDealt);
                }
            }

            winner = determineTagWinner();
            if (winner) break;

            // Team 2 attacks Team 1 (if no winner yet)
            if (simMatchState.currentHp[activeTeam1Wrestler.id] > 0 && simMatchState.currentHp[activeTeam2Wrestler.id] > 0) {
                const t2ChosenMove = selectRandomMove(activeTeam2Wrestler, simMatchState.currentStamina, true);
                if (t2ChosenMove) {
                    const t2StaminaCost = parseFloat(t2ChosenMove.staminaCost) || 0;
                    if (simMatchState.currentStamina[activeTeam2Wrestler.id] >= t2StaminaCost) {
                        simMatchState.currentStamina[activeTeam2Wrestler.id] -= t2StaminaCost;
                        const t2DamageDealt = calculateDamage(activeTeam2Wrestler, activeTeam1Wrestler, t2ChosenMove, simMatchState.currentStamina, true);
                        simMatchState.currentHp[activeTeam1Wrestler.id] = Math.max(0, simMatchState.currentHp[activeTeam1Wrestler.id] - t2DamageDealt);
                    }
                }
            }
            winner = determineTagWinner();
        } else {
            // If one team has no active wrestlers, the other team wins (or it's a draw if both are out)
            winner = determineTagWinner();
        }
    }

    if (!winner && simMatchState.currentRound >= simMatchState.maxRounds) {
        return `Draw (Time Limit)`;
    } else if (winner === 'draw') {
        return `It's a Draw!`;
    } else if (winner) {
        return `${winner} wins!`;
    }
    return 'Match did not conclude.';
}

/**
 * Calculates damage based on move and attacker's stats, considering height and weight.
 * This is a simplified version for headless simulation, without UI updates.
 * @param {object} attacker - The attacking wrestler object.
 * @param {object} defender - The defending wrestler object.
 * @param {object} move - The move object.
 * @param {Object} currentStaminaMap - The map containing current stamina for wrestlers.
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 * @returns {number} The calculated damage.
 */
function calculateDamage(attacker, defender, move, currentStaminaMap, isBulkSimulation) {
    // Ensure damage values are numbers
    const minDamage = parseFloat(move.damage.min) || 0;
    const maxDamage = parseFloat(move.damage.max) || 0;
    const baseHitChance = parseFloat(move.baseHitChance) || 0.80;

    if (minDamage === 0 && maxDamage === 0) {
        return 0;
    }

    let hitChance = baseHitChance;
    const offenseBonus = (attacker.stats.offense || 0) * 0.005;
    const defensePenalty = (defender.stats.defense || 0) * 0.0002;
    const evasionPenalty = (defender.stats.evasion || 0) * 0.0002;

    hitChance += offenseBonus;
    hitChance -= (defensePenalty + evasionPenalty);

    const attackerCurrentStamina = currentStaminaMap[attacker.id];
    const attackerInitialStamina = attacker.stats.stamina; // Use initial stamina for percentage
    if (attackerInitialStamina > 0) {
        const staminaPercentage = attackerCurrentStamina / attackerInitialStamina;
        if (staminaPercentage < 0.25) {
            hitChance *= 0.8;
        } else if (staminaPercentage < 0.5) {
            hitChance *= 0.95;
        }
    }
    hitChance = Math.max(0.4, Math.min(0.95, hitChance));

    if (Math.random() > hitChance) {
        return 0; // Missed attack
    }

    let damage = getRandomInt(minDamage, maxDamage);

    damage += Math.round((attacker.stats.strength || 0) * 0.25);
    if (move.type === 'strike') {
        damage += Math.round((attacker.stats.offense || 0) * 0.1);
    } else if (move.type === 'grapple') {
        damage += Math.round((attacker.stats.technicalAbility || 0) * 0.1);
    } else if (move.type === 'highFlying') {
        damage += Math.round((attacker.stats.aerialAbility || 0) * 0.2);
    }
    damage += Math.round((attacker.overall || 0) * 0.04);

    // Height and Weight Modifiers (simplified for headless)
    const attackerHeightInches = parseHeightToInches(attacker.height);
    const attackerWeightLbs = parseInt(attacker.weight) || 0;
    const defenderHeightInches = parseHeightToInches(defender.height);
    const defenderWeightLbs = parseInt(defender.weight) || 0;

    const weightDifference = attackerWeightLbs - defenderWeightLbs;
    const WEIGHT_ADVANTAGE_THRESHOLD = 75;
    const WEIGHT_DAMAGE_MODIFIER = 0.10;
    if (weightDifference > WEIGHT_ADVANTAGE_THRESHOLD) {
        damage *= (1 + WEIGHT_DAMAGE_MODIFIER);
    } else if (weightDifference < -WEIGHT_ADVANTAGE_THRESHOLD) {
        damage *= (1 - WEIGHT_DAMAGE_MODIFIER);
    }

    const HEIGHT_ADVANTAGE_THRESHOLD = 6;
    const HEIGHT_DAMAGE_MODIFIER = 0.05;
    if (move.type === 'strike') {
        if (heightDifference > HEIGHT_ADVANTAGE_THRESHOLD) {
            damage *= (1 + HEIGHT_DAMAGE_MODIFIER);
        } else if (heightDifference < -HEIGHT_ADVANTAGE_THRESHOLD) {
            damage *= (1 - HEIGHT_DAMAGE_MODIFIER);
        }
    }

    const DAMAGE_BONUS_PERCENTAGE = 0.10;
    if (move.type === 'grapple' && ((attacker.stats.strength || 0) >= 95 || (attacker.stats.technicalAbility || 0) >= 95)) {
        damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
    }
    if (move.type === 'highFlying' && (attacker.stats.aerialAbility || 0) >= 90) {
        damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
    }
    if (move.type === 'strike' && (attacker.stats.brawlingAbility || 0) >= 95) {
        damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
    }

    const toughnessReduction = (defender.stats.toughness || 0) * 0.004;
    const resilienceReduction = (defender.stats.resilience || 0) * 0.002;
    damage *= (1 - (toughnessReduction + resilienceReduction));

    return Math.max(0, Math.round(damage));
}

/**
 * Parses height string (e.g., "6'2\"") into total inches.
 * @param {string} heightStr - The height string to parse.
 * @returns {number} The height in inches, or 0 if parsing fails.
 */
function parseHeightToInches(heightStr) {
    if (!heightStr || typeof heightStr !== 'string') return 0;
    const parts = heightStr.match(/(\d+)'(\d+)"?/);
    if (parts && parts.length === 3) {
        const feet = parseInt(parts[1]);
        const inches = parseInt(parts[2]);
        return (feet * 12) + inches;
    }
    return 0; // Default to 0 if parsing fails
}

/**
 * Selects a random valid move for a wrestler based on their current stamina and move types.
 * @param {object} wrestler - The wrestler object.
 * @param {Object} currentStaminaMap - The map containing current stamina for wrestlers.
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 * @returns {object|null} A valid move object, or null if no valid moves are found.
 */
function selectRandomMove(wrestler, currentStaminaMap, isBulkSimulation) {
    let availableMoves = [];

    for (const moveType in wrestler.moves) {
        if (wrestler.moves.hasOwnProperty(moveType) && Array.isArray(wrestler.moves[moveType])) {
            wrestler.moves[moveType].forEach(move => {
                const staminaCost = parseFloat(move.staminaCost) || 0;
                const minDamage = parseFloat(move.damage.min) || 0;
                const maxDamage = parseFloat(move.damage.max) || 0;

                if (currentStaminaMap[wrestler.id] >= staminaCost && (minDamage > 0 || maxDamage > 0)) {
                    availableMoves.push(move);
                }
            });
        }
    }

    if (availableMoves.length === 0) {
        return null;
    }

    const randomIndex = getRandomInt(0, availableMoves.length - 1);
    return availableMoves[randomIndex];
}


/**
 * Resets the PPV match booking state and UI.
 */
function resetPpv() {
    // Clear booked matches
    for (const slot in currentBookedMatches) {
        if (currentBookedMatches[slot]) {
            showWrestlerCardInRoster(currentBookedMatches[slot].id); // Return to roster
            const dropZone = document.getElementById(slot);
            if (dropZone) {
                renderWrestlerInDropZone(dropZone, null); // Clear UI
            }
            currentBookedMatches[slot] = null;
        }
    }
    // Clear PPV Name and reset advertising
    if (ppvNameInput) ppvNameInput.value = '';
    if (advertisingSpendInput) advertisingSpendInput.value = 0;
    if (advertisingValueSpan) advertisingValueSpan.textContent = '0';
    
    // Reset venue to default
    if (venueSelect) {
        venueSelect.value = venues[0].name;
        selectedVenue = venues[0];
        updateVenueDetails();
    }

    // Clear PPV log display
    if (ppvLog) {
        ppvLog.innerHTML = '<p class="text-center text-gray-500">No PPV has been booked yet.</p>';
    }
    // Hide the modal if it's open
    hideModal(ppvLogModal);
}


// --- DOMContentLoaded and Event Listener Setup ---
document.addEventListener('DOMContentLoaded', async () => {
    // Await the resolution of the wrestlers promise from data.js
    allWrestlers = await wrestlers;
    console.log('[booking.js] All wrestlers loaded:', allWrestlers.length);

    // Initial Roster and Free Agent setup
    if (allWrestlers.length > 0) {
        // Sort wrestlers by overall rating to get the lowest
        const sortedByOverall = [...allWrestlers].sort((a, b) => a.overall - b.overall);

        // Get the 20 lowest overall wrestlers
        const lowest20Wrestlers = sortedByOverall.slice(0, 20);

        // Randomly select 10 from the lowest 20 for the initial contracted roster
        const shuffledLowest20 = lowest20Wrestlers.sort(() => 0.5 - Math.random());
        contractedWrestlers = shuffledLowest20.slice(0, MIN_ROSTER_SIZE);

        // Determine free agents (all wrestlers not in the initial contracted roster)
        const contractedIds = new Set(contractedWrestlers.map(w => w.id));
        freeAgents = allWrestlers.filter(wrestler => !contractedIds.has(wrestler.id));

        // Deduct initial salaries from starting money
        let initialSalariesCost = 0;
        contractedWrestlers.forEach(wrestler => {
            // Ensure wrestler.salary exists, provide a default if not
            wrestler.salary = wrestler.salary || Math.round(500 + (wrestler.overall * 20));
            initialSalariesCost += wrestler.salary;
        });
        currentMoney -= initialSalariesCost;

        // Initialize roster display with contracted wrestlers
        initializeRoster(contractedWrestlers, wrestlerRosterDiv, handleDragStart, handleTouchStart, handleDragEnd);
        updateMoneyDisplay();
        updateRosterSizeDisplay();
    } else {
        wrestlerRosterDiv.innerHTML = '<p class="text-red-400">Failed to load wrestlers. Please check data.js and PHP backend.</p>';
    }

    // Set up drop zone listeners for match slots
    document.querySelectorAll('.drop-zone').forEach(dropZone => {
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragEnd); // Use dragEnd to clear highlight
        dropZone.addEventListener('drop', handleDrop);
        // Add click listener to clear drop zone
        dropZone.addEventListener('click', (event) => {
            // Ensure click is on the dropzone itself, not a wrestler card inside it
            if (event.target === dropZone || event.target.classList.contains('drop-zone-placeholder')) {
                removeWrestlerFromDropZone(dropZone.id);
            }
        });
    });

    // Initialize money display
    updateMoneyDisplay();

    // Populate venues dropdown
    populateVenueSelect();

    // Event listeners for venue selection
    if (venueSelect) {
        venueSelect.addEventListener('change', (event) => {
            const selectedName = event.target.value;
            selectedVenue = venues.find(v => v.name === selectedName);
            updateVenueDetails();
        });
    }

    // Event listener for advertising spend slider
    if (advertisingSpendInput) {
        advertisingSpendInput.addEventListener('input', (event) => {
            advertisingSpend = parseInt(event.target.value);
            if (advertisingValueSpan) {
                advertisingValueSpan.textContent = advertisingSpend;
            }
        });
    }

    // Event listeners for buttons
    if (bookPpvBtn) {
        bookPpvBtn.addEventListener('click', simulatePpv);
    } else {
        console.warn('[DOMContentLoaded] bookPpvBtn not found. Listener not attached.');
    }

    if (resetPpvBtn) {
        resetPpvBtn.addEventListener('click', resetPpv);
    } else {
        console.warn('[DOMContentLoaded] resetPpvBtn not found. Listener not attached.');
    }

    if (openFreeAgencyModalBtn) {
        openFreeAgencyModalBtn.addEventListener('click', () => {
            renderFreeAgents(); // Render agents every time modal opens to update buttons
            showModal(document.getElementById('freeAgencyModal'), 'Free Agents', '');
        });
    } else {
        console.warn('[DOMContentLoaded] openFreeAgencyModalBtn not found. Listener not attached.');
    }

    // Close button for modals (general handler for all modals with 'close-button' class)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const modalToClose = event.target.closest('.modal');
            if (modalToClose) {
                hideModal(modalToClose);
            }
        });
    });

    // Initial reset to ensure clean state on load
    resetPpv();
});


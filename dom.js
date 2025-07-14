// dom.js

// Removed: import { wrestlers } from './data.js'; // This import is no longer needed here

// DOM Elements - Re-fetch these as they are now inside the modal
const wrestlerRoster = document.getElementById('wrestlerRoster');
const singleMatchLayout = document.getElementById('singleMatchLayout');
const tagTeamMatchLayout = document.getElementById('tagTeamMatchLayout'); // Corrected ID here
const resultModal = document.getElementById('resultModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');


// Base URL for wrestler images (redundant if already in data.js, but kept for clarity in rendering)
const IMAGE_BASE_URL = 'https://php-mentor.com/sandbox/wrestling/images/';

/**
 * Renders a single wrestler card for display in the roster or a drop zone.
 * @param {object} wrestler - The wrestler object.
 * @param {boolean} isDraggable - Whether the card should be draggable.
 * @returns {HTMLElement} The created wrestler card element.
 */
export function renderWrestlerCard(wrestler, isDraggable = true) {
    const card = document.createElement('div');
    // Apply classes for styling and drag-and-drop functionality
    card.id = wrestler.id; // Original ID for roster card
    card.classList.add(
        'wrestler-card', // A new general class for all wrestler cards
        'wrestler-roster-card-item', // Specific class for roster items
        'bg-gray-900', 'rounded-lg', 'shadow-md', 'p-4', 'text-center',
        'transform', 'transition-transform', 'duration-200', 'hover:scale-105',
        'cursor-grab', 'active:cursor-grabbing', 'relative', 'overflow-hidden'
    );

    if (isDraggable) {
        card.setAttribute('draggable', 'true');
    }

    // Add a subtle border glow on hover
    card.style.cssText = 'border: 1px solid transparent; --tw-gradient-from: #fcd34d; --tw-gradient-to: #ef4444; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);';
    card.classList.add('hover:border-yellow-500'); // Tailwind hover border

    // Image container with aspect ratio and overflow hidden
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('w-full', 'h-32', 'overflow-hidden', 'rounded-md', 'mb-3');
    const img = document.createElement('img');
    img.src = wrestler.image;
    img.alt = wrestler.name;
    img.classList.add('w-full', 'h-full', 'object-cover', 'object-top', 'rounded-md'); // object-top to show face
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);

    const name = document.createElement('h3');
    name.classList.add('text-xl', 'font-bold', 'text-yellow-400', 'mb-2');
    name.textContent = wrestler.name;
    card.appendChild(name);

    // Health and Stamina Display
    const healthContainer = document.createElement('div');
    healthContainer.classList.add('w-full', 'mb-2');

    const healthLabel = document.createElement('p');
    healthLabel.classList.add('text-sm', 'text-gray-400', 'mb-1');
    healthLabel.textContent = 'HP:';
    healthContainer.appendChild(healthLabel);

    const healthBarBackground = document.createElement('div');
    healthBarBackground.classList.add('w-full', 'bg-gray-700', 'rounded-full', 'h-3');
    const healthBar = document.createElement('div');
    healthBar.id = `health-bar-${wrestler.id}`;
    healthBar.classList.add('bg-green-500', 'h-3', 'rounded-full', 'transition-all', 'duration-500');
    // Prevent division by zero if initialHp is 0
    healthBar.style.width = `${wrestler.baseHp > 0 ? (wrestler.baseHp / wrestler.baseHp) * 100 : 0}%`; // Initialize to 100%
    healthBarBackground.appendChild(healthBar);
    healthContainer.appendChild(healthBarBackground);

    const hpText = document.createElement('p');
    hpText.id = `hp-text-${wrestler.id}`;
    hpText.classList.add('text-xs', 'text-gray-300', 'mt-1');
    hpText.textContent = `${wrestler.baseHp}/${wrestler.baseHp} HP`;
    healthContainer.appendChild(hpText);
    card.appendChild(healthContainer);

    const staminaContainer = document.createElement('div');
    staminaContainer.classList.add('w-full', 'mb-2');

    const staminaLabel = document.createElement('p');
    staminaLabel.classList.add('text-sm', 'text-gray-400', 'mb-1');
    staminaLabel.textContent = 'Stamina:';
    staminaContainer.appendChild(staminaLabel);

    const staminaBarBackground = document.createElement('div');
    staminaBarBackground.classList.add('w-full', 'bg-gray-700', 'rounded-full', 'h-3');
    const staminaBar = document.createElement('div');
    staminaBar.id = `stamina-bar-${wrestler.id}`;
    staminaBar.classList.add('bg-blue-500', 'h-3', 'rounded-full', 'transition-all', 'duration-500');
    staminaBar.style.width = `${wrestler.stats.stamina > 0 ? (wrestler.stats.stamina / wrestler.stats.stamina) * 100 : 0}%`; // Initialize to 100%
    staminaBarBackground.appendChild(staminaBar);
    staminaContainer.appendChild(staminaBarBackground);

    const staminaText = document.createElement('p');
    staminaText.id = `stamina-text-${wrestler.id}`;
    staminaText.classList.add('text-xs', 'text-gray-300', 'mt-1');
    staminaText.textContent = `${wrestler.stats.stamina}/${wrestler.stats.stamina} Stamina`;
    staminaContainer.appendChild(staminaText);
    card.appendChild(staminaContainer);

    // Overall Rating
    const overall = document.createElement('p');
    overall.classList.add('text-sm', 'font-semibold', 'text-purple-400', 'mt-3');
    overall.textContent = `Overall: ${wrestler.overall}`;
    card.appendChild(overall);

    return card;
}

/**
 * Initializes the wrestler roster display.
 * @param {Array<object>} wrestlers - An array of wrestler objects.
 * @param {Function} dragStartHandler - The function to call on dragstart.
 * @param {Function} touchStartHandler - The function to call on touchstart.
 */
export function initializeRoster(wrestlers, dragStartHandler, touchStartHandler) {
    const rosterDisplay = document.getElementById('rosterDisplay');
    if (!rosterDisplay) {
        console.error("Roster display element not found!");
        return;
    }
    rosterDisplay.innerHTML = ''; // Clear existing content

    wrestlers.forEach(wrestler => {
        const card = renderWrestlerCard(wrestler, true); // Make cards draggable
        card.addEventListener('dragstart', dragStartHandler);
        // Add touchstart listener
        card.addEventListener('touchstart', touchStartHandler, { passive: false }); // passive: false to allow preventDefault
        rosterDisplay.appendChild(card);
    });
}

/**
 * Sets up drag-and-drop listeners for drop zones.
 * @param {Function} dragOverHandler - The function to call on dragover.
 * @param {Function} dropHandler - The function to call on drop.
 * @param {Function} touchEndHandler - The function to call on touchend.
 */
export function setupDragAndDropListeners(dragOverHandler, dropHandler, touchEndHandler) {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOverHandler);
        zone.addEventListener('drop', dropHandler);
        // Add touchend listener for drop zones
        zone.addEventListener('touchend', touchEndEndHandler); // Using touchEndEndHandler as a placeholder for the app.js handler
    });
}


/**
 * Updates the visual state of a drop zone (e.g., adds a highlight).
 * @param {HTMLElement} dropZone - The drop zone element.
 * @param {boolean} isDraggingOver - Whether a draggable item is currently dragging over it.
 */
export function updateDropZoneVisual(dropZone, isDraggingOver) {
    if (isDraggingOver) {
        dropZone.classList.add('border-yellow-500', 'bg-gray-600');
    } else {
        dropZone.classList.remove('border-yellow-500', 'bg-gray-600');
    }
}

/**
 * Renders a wrestler card in a specified drop zone.
 * @param {HTMLElement} dropZone - The drop zone element.
 * @param {object} wrestler - The wrestler object to render.
 */
export function renderWrestlerInDropZone(dropZone, wrestler) {
    dropZone.innerHTML = ''; // Clear existing content
    dropZone.classList.remove('border-2', 'border-dashed', 'border-gray-600', 'bg-gray-700', 'hover:border-yellow-500');
    dropZone.classList.add('bg-gray-800', 'flex', 'items-center', 'justify-center'); // Make it look like a filled card

    const card = renderWrestlerCard(wrestler, false); // Not draggable once in a drop zone
    card.classList.remove('wrestler-roster-card-item', 'hover:scale-105', 'cursor-grab', 'active:cursor-grabbing');
    card.classList.add('w-full', 'h-full'); // Make it fill the drop zone
    card.style.transform = 'none'; // Remove any lingering transform from drag
    card.style.transition = 'none'; // Remove transition

    // Adjust image sizing for drop zone display
    const imgContainer = card.querySelector('div.w-full.h-32');
    if (imgContainer) {
        imgContainer.classList.remove('h-32');
        imgContainer.classList.add('h-24', 'md:h-28'); // Smaller height in drop zone
    }

    // Adjust text sizes for drop zone display
    const nameElement = card.querySelector('h3');
    if (nameElement) {
        nameElement.classList.remove('text-xl');
        nameElement.classList.add('text-lg', 'md:text-xl');
    }
    const overallElement = card.querySelector('p.text-sm.font-semibold');
    if (overallElement) {
        overallElement.classList.remove('text-sm');
        overallElement.classList.add('text-xs', 'md:text-sm');
    }

    dropZone.appendChild(card);
}

/**
 * Hides a wrestler card from the roster display.
 * @param {string} wrestlerId - The ID of the wrestler card to hide.
 */
export function hideWrestlerCardInRoster(wrestlerId) {
    const card = document.getElementById(wrestlerId);
    if (card) {
        card.classList.add('hidden');
    }
}

/**
 * Shows a wrestler card in the roster display.
 * @param {string} wrestlerId - The ID of the wrestler card to show.
 */
export function showWrestlerCardInRoster(wrestlerId) {
    const card = document.getElementById(wrestlerId);
    if (card) {
        card.classList.remove('hidden');
    }
}

/**
 * Shows a modal dialog.
 * @param {HTMLElement} modalElement - The modal element to show.
 */
export function showModal(modalElement) {
    modalElement.classList.remove('hidden');
    modalElement.classList.add('flex'); // Use flex to center
}

/**
 * Hides a modal dialog.
 * @param {HTMLElement} modalElement - The modal element to hide.
 */
export function hideModal(modalElement) {
    modalElement.classList.add('hidden');
    modalElement.classList.remove('flex');
}

/**
 * Appends a new entry to the match log.
 * @param {string} message - The message to add to the log.
 * @param {string} type - 'action', 'damage', 'info', 'result'.
 */
export function updateMatchLog(message, type = 'info') {
    const matchLog = document.getElementById('matchLog');
    if (!matchLog) {
        console.error("Match log element not found!");
        return;
    }

    const logEntry = document.createElement('p');
    logEntry.classList.add('text-sm', 'mb-1');

    if (type === 'action') {
        logEntry.classList.add('text-blue-300', 'font-semibold');
    } else if (type === 'damage') {
        logEntry.classList.add('text-red-400');
    } else if (type === 'result') {
        logEntry.classList.add('text-green-400', 'font-bold', 'text-base');
    } else {
        logEntry.classList.add('text-gray-300');
    }

    logEntry.textContent = message;
    matchLog.appendChild(logEntry);
    matchLog.scrollTop = matchLog.scrollHeight; // Auto-scroll to bottom
}

/**
 * Updates the match result message in the modal.
 * @param {string} title - The title of the result (e.g., "Winner!").
 * @param {string} message - The detailed message.
 */
export function updateMatchResult(title, message) {
    const winnerModalTitle = document.getElementById('winnerModalTitle');
    const winnerModalMessage = document.getElementById('winnerModalMessage');
    if (winnerModalTitle) winnerModalTitle.textContent = title;
    if (winnerModalMessage) winnerModalMessage.textContent = message;
}

/**
 * Resets the UI of all drop zones to their initial empty state.
 */
export function resetDropZonesUI() {
    const dropZoneIds = [
        'player1DropZone', 'player2DropZone',
        'team1Player1DropZone', 'team1Player2DropZone',
        'team2Player1DropZone', 'team2Player2DropZone'
    ];

    dropZoneIds.forEach(id => {
        const dropZone = document.getElementById(id);
        if (dropZone) {
            dropZone.innerHTML = '';
            dropZone.classList.remove('bg-gray-800', 'flex', 'items-center', 'justify-center');
            dropZone.classList.add('border-2', 'border-dashed', 'border-gray-600', 'bg-gray-700', 'hover:border-yellow-500');
            // Reset min-height if it was changed
            if (id === 'player1DropZone' || id === 'player2DropZone') {
                dropZone.classList.remove('min-h-[120px]'); // Remove smaller height if it was applied
                dropZone.classList.add('min-h-[150px]');
            } else {
                dropZone.classList.remove('min-h-[120px]');
                dropZone.classList.add('min-h-[120px]'); // Ensure it retains its specific smaller height
            }
        }
    });
}

/**
 * Toggles the visibility of single match and tag team match layouts.
 * @param {string} matchType - 'single' or 'tagTeam'.
 */
export function toggleMatchLayout(matchType) {
    const singleLayout = document.getElementById('singleMatchLayout');
    const tagTeamLayout = document.getElementById('tagTeamMatchLayout');

    if (matchType === 'single') {
        singleLayout.classList.remove('hidden');
        tagTeamLayout.classList.add('hidden');
    } else if (matchType === 'tagTeam') {
        tagTeamLayout.classList.remove('hidden');
        singleLayout.classList.add('hidden');
    }
}

/**
 * Updates the health and stamina display for a wrestler.
 * @param {string} wrestlerId - The ID of the wrestler.
 * @param {number} currentHp - The current HP.
 * @param {number} initialHp - The initial HP.
 * @param {number} currentStamina - The current stamina.
 * @param {number} initialStamina - The initial stamina.
 */
export function updateWrestlerHealthDisplay(wrestlerId, currentHp, initialHp, currentStamina, initialStamina) {
    const healthBar = document.getElementById(`health-bar-${wrestlerId}`);
    const hpText = document.getElementById(`hp-text-${wrestlerId}`);
    const staminaBar = document.getElementById(`stamina-bar-${wrestlerId}`);
    const staminaText = document.getElementById(`stamina-text-${wrestlerId}`);

    if (healthBar) {
        const hpPercentage = initialHp > 0 ? (currentHp / initialHp) * 100 : 0;
        healthBar.style.width = `${hpPercentage}%`;
        if (hpPercentage < 25) {
            healthBar.classList.remove('bg-green-500', 'bg-yellow-500');
            healthBar.classList.add('bg-red-500');
        } else if (hpPercentage < 50) {
            healthBar.classList.remove('bg-green-500', 'bg-red-500');
            healthBar.classList.add('bg-yellow-500');
        } else {
            healthBar.classList.remove('bg-yellow-500', 'bg-red-500');
            healthBar.classList.add('bg-green-500');
        }
    }
    if (hpText) {
        hpText.textContent = `${Math.max(0, currentHp)}/${initialHp} HP`;
    }

    if (staminaBar) {
        const staminaPercentage = initialStamina > 0 ? (currentStamina / initialStamina) * 100 : 0;
        staminaBar.style.width = `${staminaPercentage}%`;
        if (staminaPercentage < 25) {
            staminaBar.classList.remove('bg-blue-500', 'bg-yellow-500');
            staminaBar.classList.add('bg-orange-500'); // Use orange for low stamina
        } else if (staminaPercentage < 50) {
            staminaBar.classList.remove('bg-blue-500', 'bg-orange-500');
            staminaBar.classList.add('bg-yellow-500');
        } else {
            staminaBar.classList.remove('bg-yellow-500', 'bg-orange-500');
            staminaBar.classList.add('bg-blue-500');
        }
    }
    if (staminaText) {
        staminaText.textContent = `${Math.max(0, currentStamina)}/${initialStamina} Stamina`;
    }
}


/**
 * Triggers a damage animation on a wrestler's image.
 * @param {string} wrestlerId - The ID of the wrestler.
 */
export function triggerDamageAnimation(wrestlerId) {
    const wrestlerCard = document.getElementById(wrestlerId);
    if (wrestlerCard) {
        const img = wrestlerCard.querySelector('img');
        if (img) {
            img.classList.add('animate-shake');
            setTimeout(() => {
                img.classList.remove('animate-shake');
            }, 500); // Animation duration
        }
    }
}

/**
 * Renders a wrestler's card in the modal display zone for match log.
 * @param {HTMLElement} displayZone - The modal display zone element.
 * @param {object} wrestler - The wrestler object.
 * @param {number} currentHp - The current HP of the wrestler.
 * @param {number} initialHp - The initial HP of the wrestler.
 * @param {number} currentStamina - The current stamina of the wrestler.
 * @param {number} initialStamina - The initial stamina of the wrestler.
 */
export function renderWrestlerInModalDisplay(displayZone, wrestler, currentHp, initialHp, currentStamina, initialStamina) {
    if (!displayZone) {
        console.error("Modal display zone not found!");
        return;
    }
    displayZone.innerHTML = '';
    displayZone.classList.remove('hidden'); // Ensure it's visible

    const card = document.createElement('div');
    card.classList.add(
        'w-full', 'h-full', 'bg-gray-900', 'rounded-lg', 'shadow-md', 'p-2', 'text-center',
        'flex', 'flex-col', 'items-center', 'justify-center', 'relative', 'overflow-hidden'
    );

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('w-20', 'h-20', 'md:w-24', 'md:h-24', 'overflow-hidden', 'rounded-full', 'mb-2', 'border-2', 'border-yellow-500');
    const img = document.createElement('img');
    img.src = wrestler.image;
    img.alt = wrestler.name;
    img.classList.add('w-full', 'h-full', 'object-cover', 'object-top', 'rounded-full');
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);

    const name = document.createElement('h3');
    name.classList.add('text-md', 'md:text-lg', 'font-bold', 'text-yellow-400', 'mb-1');
    name.textContent = wrestler.name;
    card.appendChild(name);

    // Health and Stamina Display (simplified for modal)
    const healthContainer = document.createElement('div');
    healthContainer.classList.add('w-full', 'px-2', 'mb-1');
    const healthBarBackground = document.createElement('div');
    healthBarBackground.classList.add('w-full', 'bg-gray-700', 'rounded-full', 'h-2');
    const healthBar = document.createElement('div');
    healthBar.id = `modal-health-bar-${wrestler.id}`;
    healthBar.classList.add('bg-green-500', 'h-2', 'rounded-full');
    healthBar.style.width = `${initialHp > 0 ? (currentHp / initialHp) * 100 : 0}%`;
    healthBarBackground.appendChild(healthBar);
    healthContainer.appendChild(healthBarBackground);
    const hpText = document.createElement('p');
    hpText.id = `modal-hp-text-${wrestler.id}`;
    hpText.classList.add('text-xs', 'text-gray-300', 'mt-0.5');
    hpText.textContent = `${Math.max(0, currentHp)}/${initialHp} HP`;
    healthContainer.appendChild(hpText);
    card.appendChild(healthContainer);

    const staminaContainer = document.createElement('div');
    staminaContainer.classList.add('w-full', 'px-2', 'mb-1');
    const staminaBarBackground = document.createElement('div');
    staminaBarBackground.classList.add('w-full', 'bg-gray-700', 'rounded-full', 'h-2');
    const staminaBar = document.createElement('div');
    staminaBar.id = `modal-stamina-bar-${wrestler.id}`;
    staminaBar.classList.add('bg-blue-500', 'h-2', 'rounded-full');
    staminaBar.style.width = `${initialStamina > 0 ? (currentStamina / initialStamina) * 100 : 0}%`;
    staminaBarBackground.appendChild(staminaBar);
    staminaContainer.appendChild(staminaBarBackground);
    const staminaText = document.createElement('p');
    staminaText.id = `modal-stamina-text-${wrestler.id}`;
    staminaText.classList.add('text-xs', 'text-gray-300', 'mt-0.5');
    staminaText.textContent = `${Math.max(0, currentStamina)}/${initialStamina} Stamina`;
    staminaContainer.appendChild(staminaText);
    card.appendChild(staminaContainer);

    displayZone.appendChild(card);

    // Update health and stamina bar colors based on current values
    updateWrestlerHealthDisplay(wrestler.id, currentHp, initialHp, currentStamina, initialStamina);
}

// --- Touch Drag-and-Drop Helper Functions ---
let touchDragClone = null; // Global reference for the touch clone

/**
 * Creates and appends a draggable clone for touch events.
 * @param {HTMLElement} originalCard - The original wrestler card being dragged.
 * @returns {HTMLElement} The created clone element.
 */
export function createDragCloneForTouch(originalCard) {
    if (touchDragClone) {
        document.body.removeChild(touchDragClone);
    }

    touchDragClone = originalCard.cloneNode(true);
    touchDragClone.id = 'touch-drag-clone'; // Assign a unique ID
    touchDragClone.classList.add(
        'fixed', 'z-50', 'pointer-events-none', // Fixed position, on top, no pointer events
        'opacity-75', 'transform', 'scale-105', 'shadow-2xl', // Visual effects
        'transition-none' // No transition on position changes
    );
    touchDragClone.style.width = originalCard.offsetWidth + 'px';
    touchDragClone.style.height = originalCard.offsetHeight + 'px';
    touchDragClone.style.left = originalCard.getBoundingClientRect().left + 'px';
    touchDragClone.style.top = originalCard.getBoundingClientRect().top + 'px';
    touchDragClone.style.margin = '0'; // Remove any margin

    // Remove draggable attributes from clone
    touchDragClone.removeAttribute('draggable');
    touchDragClone.classList.remove('cursor-grab', 'active:cursor-grabbing');

    // Ensure image and text sizes are appropriate for the clone
    const imgContainer = touchDragClone.querySelector('div.w-full.h-32');
    if (imgContainer) {
        imgContainer.classList.remove('h-32');
        imgContainer.classList.add('h-24', 'md:h-28');
    }
    const nameElement = touchDragClone.querySelector('h3');
    if (nameElement) {
        nameElement.classList.remove('text-xl');
        nameElement.classList.add('text-lg', 'md:text-xl');
    }
    const overallElement = touchDragClone.querySelector('p.text-sm.font-semibold');
    if (overallElement) {
        overallElement.classList.remove('text-sm');
        overallElement.classList.add('text-xs', 'md:text-sm');
    }


    document.body.appendChild(touchDragClone);
    return touchDragClone;
}

/**
 * Updates the position of the touch drag clone.
 * @param {number} x - The new X coordinate.
 * @param {number} y - The new Y coordinate.
 */
export function updateDragClonePosition(x, y) {
    if (touchDragClone) {
        // Offset by half the width/height to center the clone on the touch point
        touchDragClone.style.left = (x - touchDragClone.offsetWidth / 2) + 'px';
        touchDragClone.style.top = (y - touchDragClone.offsetHeight / 2) + 'px';
    }
}

/**
 * Removes the touch drag clone from the DOM.
 */
export function removeDragClone() {
    if (touchDragClone && touchDragClone.parentNode) {
        touchDragClone.parentNode.removeChild(touchDragClone);
        touchDragClone = null;
    }
}

/**
 * Highlights a potential drop zone during touch drag.
 * @param {HTMLElement} dropZone - The drop zone element.
 */
export function highlightDropZone(dropZone) {
    if (dropZone) {
        dropZone.classList.add('border-yellow-500', 'bg-gray-600');
    }
}

/**
 * Removes highlight from a drop zone.
 * @param {HTMLElement} dropZone - The drop zone element.
 */
export function unhighlightDropZone(dropZone) {
    if (dropZone) {
        dropZone.classList.remove('border-yellow-500', 'bg-gray-600');
    }
}
// dom.js

import { wrestlers } from './data.js';

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
        'flex', 'flex-col', 'items-center', 'justify-between', 'relative',
        'overflow-hidden', 'transform', 'transition-all', 'duration-200', 'hover:scale-105', 'hover:shadow-xl'
    );
    if (isDraggable) {
        card.setAttribute('draggable', 'true');
    }

    // Image container
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('w-24', 'h-24', 'rounded-full', 'overflow-hidden', 'mb-2', 'border-2', 'border-yellow-500', 'flex-shrink-0');
    const img = document.createElement('img');
    img.src = wrestler.image;
    img.alt = wrestler.name;
    img.classList.add('w-full', 'h-full', 'object-cover');
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop
        this.src = `https://placehold.co/96x96/2d3748/a0aec0?text=${wrestler.name.split(' ').pop()}`;
    };
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);

    // Wrestler Name
    const name = document.createElement('h3');
    name.classList.add('text-lg', 'font-semibold', 'text-yellow-400', 'mb-2', 'truncate', 'w-full');
    name.textContent = wrestler.name;
    card.appendChild(name);

    // Wrestler Overall Rating
    const overall = document.createElement('p');
    overall.classList.add('text-sm', 'font-bold', 'text-white', 'mb-2');
    overall.innerHTML = `Overall: <span class="text-yellow-300">${wrestler.overall}</span>`;
    card.appendChild(overall);

    // Wrestler Stats Container
    const statsContainer = document.createElement('table');
    statsContainer.classList.add('text-xs', 'text-gray-300', 'text-left', 'w-full', 'px-2', 'py-1', 'bg-gray-800', 'rounded', 'mt-2');
    statsContainer.innerHTML = `
        <tr><td><strong>Strength:</strong> ${wrestler.stats.strength}</td><td align="right"><strong>Technical:</strong> ${wrestler.stats.technicalAbility}</td></tr>
        <tr><td><strong>Brawling:</strong> ${wrestler.stats.brawlingAbility}</td><td align="right"><strong>Stamina:</strong> ${wrestler.stats.stamina}</td></tr>
        <tr><td><strong>Aerial:</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${wrestler.stats.aerialAbility}</td><td align="right"><strong>Endurance:</strong> ${wrestler.stats.toughness}</td></tr>
    `;
    card.appendChild(statsContainer);

    return card;
}

/**
 * Initializes the wrestler roster by rendering all wrestler cards.
 * @param {function} dragStartHandler - The function to call on drag start.
 */
export function initializeRoster(dragStartHandler) {
    const wrestlerRosterElement = document.getElementById('wrestlerRoster');
    if (wrestlerRosterElement) {
        wrestlerRosterElement.innerHTML = ''; // Clear existing content
        wrestlers.forEach(wrestler => {
            const card = renderWrestlerCard(wrestler);
            card.addEventListener('dragstart', dragStartHandler);
            wrestlerRosterElement.appendChild(card);
        });
    } else {
        console.error('Wrestler roster element not found!');
    }
}

/**
 * Sets up drag and drop listeners for all drop zones.
 * @param {object} dropZones - Object containing references to drop zone DOM elements.
 * @param {function} dragOverHandler - Handler for dragover event.
 * @param {function} dragEnterHandler - Handler for dragenter event.
 * @param {function} dragLeaveHandler - Handler for dragleave event.
 * @param {function} dropHandler - Handler for drop event.
 */
export function setupDragAndDropListeners(dropZones, dragOverHandler, dragEnterHandler, dragLeaveHandler, dropHandler) {
    Object.values(dropZones).forEach(zone => {
        if (zone) {
            zone.addEventListener('dragover', dragOverHandler);
            zone.addEventListener('dragenter', dragEnterHandler);
            zone.addEventListener('dragleave', dragLeaveHandler);
            zone.addEventListener('drop', dropHandler);
        }
    });
}

/**
 * Updates the visual state of a drop zone.
 * @param {HTMLElement} dropZone - The drop zone element.
 * @param {boolean} isActive - Whether the drop zone should appear active.
 */
export function updateDropZoneVisual(dropZone, isActive) {
    if (dropZone) {
        if (isActive) {
            dropZone.classList.add('border-blue-500', 'bg-blue-900');
        } else {
            dropZone.classList.remove('border-blue-500', 'bg-blue-900');
        }
    }
}

/**
 * Renders a wrestler inside a specific drop zone.
 * @param {HTMLElement} dropZone - The drop zone element.
 * @param {object} wrestler - The wrestler object to render.
 * @param {number} currentHp - The current HP of the wrestler (for modal display).
 * @param {number} initialHp - The initial HP of the wrestler (for modal display).
 */
export function renderWrestlerInDropZone(dropZone, wrestler, currentHp = wrestler.baseHp, initialHp = wrestler.baseHp) {
    if (dropZone) {
        dropZone.innerHTML = ''; // Clear existing content (including any old placeholder span)

        const card = document.createElement('div');
        card.id = wrestler.id + '-dropzone'; // Assign a unique ID for the dropzone card
        card.classList.add(
            'wrestler-card', // General class for styling
            'bg-gray-900', 'rounded-lg', 'shadow-md', 'p-2', 'text-center', // Adjusted padding for smaller size
            'flex', 'flex-col', 'items-center', 'justify-center', 'relative',
            'w-full', 'h-full', 'flex-shrink-0' // Ensure it fills the drop zone
        );
        card.classList.remove('hidden'); // Explicitly ensure the card is visible
        card.style.cssText = 'display: flex !important;'; // Aggressively set display to flex with !important

        // Image container
        const imgContainer = document.createElement('div');
        // Smaller image for dropzone display
        imgContainer.classList.add('w-20', 'h-20', 'rounded-full', 'overflow-hidden', 'mb-1', 'border-2', 'border-yellow-500', 'flex-shrink-0');
        const img = document.createElement('img');
        img.src = wrestler.image;
        img.alt = wrestler.name;
        img.classList.add('w-full', 'h-full', 'object-cover');
        img.onerror = function() {
            this.onerror = null; // Prevent infinite loop
            this.src = `https://placehold.co/80x80/2d3748/a0aec0?text=${wrestler.name.split(' ').pop()}`;
        };
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);

        // Wrestler Name (smaller for dropzone)
        const name = document.createElement('h4');
        name.classList.add('text-md', 'font-semibold', 'text-yellow-400', 'truncate', 'w-full');
        name.textContent = wrestler.name;
        card.appendChild(name);

        // Wrestler Overall Rating (smaller for dropzone)
        const overall = document.createElement('p');
        overall.classList.add('text-xs', 'font-bold', 'text-white');
        overall.innerHTML = `Overall: <span class="text-yellow-300">${wrestler.overall}</span>`;
        card.appendChild(overall);

        dropZone.appendChild(card); // Append the card to the DOM

        // Log for debugging:
        console.log(`Wrestler card "${wrestler.name}" added to dropzone "${dropZone.id}".`);
        console.log(`Card ID in dropzone: ${card.id}`);
        console.log(`Card classes in dropzone: ${Array.from(card.classList).join(', ')}`);
        console.log(`Card style.display in dropzone (inline): ${card.style.display}`);
        console.log(`Computed style.display for card (immediate): ${window.getComputedStyle(card).display}`);
        console.log(`Computed style.display for dropZone (immediate): ${window.getComputedStyle(dropZone).display}`);

        // Post-render check after a short delay to re-enforce visibility
        setTimeout(() => {
            card.classList.remove('hidden');
            card.style.cssText = 'display: flex !important;';
            console.log(`Computed style.display for card (after delay): ${window.getComputedStyle(card).display}`);
            console.log(`Computed style.display for dropZone (after delay): ${window.getComputedStyle(dropZone).display}`);
        }, 100); // Increased delay slightly to catch more potential re-hides
        console.trace('Call stack for renderWrestlerInDropZone');


        // Hide the placeholder text element if it exists
        const placeholderTextElement = dropZone.querySelector('.drop-zone-text');
        if (placeholderTextElement) {
            placeholderTextElement.classList.add('hidden');
        }
    }
}

/**
 * Renders a wrestler for display within the match modal.
 * This version is specifically for the modal, showing HP/Stamina bars.
 * @param {HTMLElement} displayZone - The modal display zone element.
 * @param {object} wrestler - The wrestler object.
 * @param {number} currentHp - The current HP of the wrestler.
 * @param {number} initialHp - The initial HP of the wrestler.
 */
export function renderWrestlerInModalDisplay(displayZone, wrestler, currentHp, initialHp) {
    if (!displayZone) {
        console.error('Modal display zone not found for wrestler:', wrestler.name);
        return;
    }

    displayZone.innerHTML = ''; // Clear existing content
    displayZone.classList.remove('hidden'); // Ensure it's visible

    const hpPercentage = (currentHp / initialHp) * 100;
    const hpColor = hpPercentage > 60 ? 'bg-green-500' : hpPercentage > 30 ? 'bg-yellow-500' : 'bg-red-500';

    displayZone.innerHTML = `
        <div class="flex flex-col items-center p-2">
            <div class="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-yellow-400">
                <img src="${wrestler.image}" alt="${wrestler.name}" class="w-full h-full object-cover"
                    onerror="this.onerror=null;this.src='https://placehold.co/64x64/2d3748/a0aec0?text=${wrestler.name.split(' ').pop()}'">
            </div>
            <p class="text-sm font-semibold text-yellow-300 text-center truncate w-full">${wrestler.name}</p>
            <div class="w-full bg-gray-600 rounded-full h-2.5 mt-1">
                <div id="hp-bar-${wrestler.id}" class="${hpColor} h-2.5 rounded-full" style="width: ${hpPercentage}%"></div>
            </div>
            <p id="hp-text-${wrestler.id}" class="text-xs text-gray-400 mt-0.5">${Math.max(0, currentHp).toFixed(0)} / ${initialHp.toFixed(0)} HP</p>
        </div>
    `;
}

/**
 * Updates only the health display for a wrestler in the modal.
 * @param {HTMLElement} displayZone - The modal display zone element.
 * @param {string} wrestlerId - The ID of the wrestler.
 * @param {number} currentHp - The current HP of the wrestler.
 * @param {number} initialHp - The initial HP of the wrestler.
 */
export function updateWrestlerHealthDisplay(displayZone, wrestlerId, currentHp, initialHp) {
    if (!displayZone) {
        console.error('Modal display zone not found for wrestler ID:', wrestlerId);
        return;
    }
    const hpBar = displayZone.querySelector(`#hp-bar-${wrestlerId}`);
    const hpText = displayZone.querySelector(`#hp-text-${wrestlerId}`);

    if (hpBar && hpText) {
        const hpPercentage = (currentHp / initialHp) * 100;
        hpBar.style.width = `${hpPercentage}%`;
        hpText.textContent = `${Math.max(0, currentHp).toFixed(0)} / ${initialHp.toFixed(0)} HP`;

        hpBar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500');
        if (hpPercentage > 60) {
            hpBar.classList.add('bg-green-500');
        } else if (hpPercentage > 30) {
            hpBar.classList.add('bg-yellow-500');
        } else {
            hpBar.classList.add('bg-red-500');
        }
    }
}

/**
 * Triggers a visual damage animation on a wrestler's display element.
 * @param {HTMLElement} element - The element to animate.
 */
export function triggerDamageAnimation(element) {
    if (element) {
        element.classList.add('animate-shake-damage');
        setTimeout(() => {
            element.classList.remove('animate-shake-damage');
        }, 300); // Match animation duration
    }
}


/**
 * Hides a wrestler card from the roster (e.g., when dragged to a drop zone).
 * @param {string} wrestlerId - The ID of the wrestler card to hide.
 */
export function hideWrestlerCardInRoster(wrestlerId) {
    const card = document.getElementById(wrestlerId);
    if (card) {
        card.classList.add('hidden');
    }
}

/**
 * Shows a wrestler card back in the roster.
 * @param {string} wrestlerId - The ID of the wrestler card to show.
 */
export function showWrestlerCardInRoster(wrestlerId) {
    const card = document.getElementById(wrestlerId);
    if (card) {
        card.classList.remove('hidden');
    }
}

/**
 * Displays the result modal with a title and message.
 * @param {string} title - The title for the modal.
 * @param {string} message - The message content for the modal.
 */
export function showModal(title, message) {
    const modal = document.getElementById('resultModal');
    const modalTitleElement = document.getElementById('modalTitle');
    const modalMessageElement = document.getElementById('modalMessage');

    if (modal && modalTitleElement && modalMessageElement) {
        modalTitleElement.textContent = title;
        modalMessageElement.textContent = message;
        modal.classList.remove('hidden');
    }
}

/**
 * Hides the result modal.
 */
export function hideModal() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    const winnerModal = document.getElementById('winnerModal');
    if (winnerModal) {
        winnerModal.classList.add('hidden');
    }
}

/**
 * Updates the match log with new entries.
 * @param {Array<string>} logEntries - An array of HTML strings for log entries.
 */
export function updateMatchLog(logEntries) {
    const matchLogDiv = document.getElementById('matchLog');
    if (matchLogDiv) {
        matchLogDiv.innerHTML = logEntries.join('');
        matchLogDiv.scrollTop = matchLogDiv.scrollHeight; // Scroll to bottom
    }
}

/**
 * Updates the match result display.
 * @param {string} result - The match result message.
 */
export function updateMatchResult(result) {
    const matchResultDiv = document.getElementById('matchResult');
    if (matchResultDiv) {
        matchResultDiv.textContent = result;
    }
}

/**
 * Toggles the visibility of single match and tag team layouts.
 * @param {string} type - 'single' or 'tag-team'.
 * @param {HTMLElement} singleLayout - The single match layout element.
 * @param {HTMLElement} tagTeamLayout - The tag team match layout element.
 * @param {HTMLElement} singleBtn - The single match button element.
 * @param {HTMLElement} tagTeamBtn - The tag team match button element.
 */
export function toggleMatchLayout(type, singleLayout, tagTeamLayout, singleBtn, tagTeamBtn) {
    if (type === 'single') {
        singleBtn.classList.add('btn-primary');
        singleBtn.classList.remove('btn-secondary', 'text-gray-300', 'hover:text-white');
        tagTeamBtn.classList.remove('btn-primary');
        tagTeamBtn.classList.add('btn-secondary', 'text-gray-300', 'hover:text-white');

        singleLayout.classList.remove('hidden');
        singleLayout.style.display = ''; // Remove any inline display style to let CSS classes dictate
        tagTeamLayout.classList.add('hidden');
        tagTeamLayout.style.display = 'none'; // Explicitly hide tag team layout
    } else { // tag-team
        tagTeamBtn.classList.add('btn-primary');
        tagTeamBtn.classList.remove('btn-secondary');
        singleBtn.classList.remove('btn-primary');
        singleBtn.classList.add('btn-secondary', 'text-gray-300', 'hover:text-white');

        singleLayout.classList.add('hidden');
        singleLayout.style.display = 'none'; // Explicitly hide single layout
        tagTeamLayout.classList.remove('hidden');
        tagTeamLayout.style.display = 'grid'; // Explicitly show tag team layout as grid
    }
}

/**
 * Resets the UI of all drop zones to their default state.
 * @param {object} dropZones - Object containing references to drop zone DOM elements.
 */
export function resetDropZonesUI(dropZones) {
    Object.values(dropZones).forEach(zone => {
        if (zone) {
            zone.innerHTML = ''; // Clear any wrestler card

            // Add or show the placeholder text element
            let placeholderTextElement = zone.querySelector('.drop-zone-text');
            if (!placeholderTextElement) {
                placeholderTextElement = document.createElement('span');
                placeholderTextElement.classList.add('drop-zone-text');
                zone.appendChild(placeholderTextElement);
            }
            placeholderTextElement.classList.remove('hidden');

            // Set specific text for each zone
            if (zone.id === 'player1DropZone') placeholderTextElement.textContent = 'Drop Player 1 Here';
            else if (zone.id === 'player2DropZone') placeholderTextElement.textContent = 'Drop Player 2 Here';
            else if (zone.id === 'team1Player1DropZone') placeholderTextElement.textContent = 'Drop Wrestler 1 Here';
            else if (zone.id === 'team1Player2DropZone') placeholderTextElement.textContent = 'Drop Wrestler 2 Here';
            else if (zone.id === 'team2Player1DropZone') placeholderTextElement.textContent = 'Drop Wrestler 1 Here';
            else if (zone.id === 'team2Player2DropZone') placeholderTextElement.textContent = 'Drop Wrestler 2 Here';
            else placeholderTextElement.textContent = 'Drop Wrestler Here'; // Fallback
        }
    });
}

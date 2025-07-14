// data.js

// Function to get a random integer within a range
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Base URL for wrestler images
const IMAGE_BASE_URL = 'https://php-mentor.com/sandbox/wrestling/images/';

// Global variable to store all moves data once fetched
let allMovesData = [];

/**
 * Function to fetch moves data from the PHP backend.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of move objects.
 */
async function fetchMovesData() {
    try {
        const response = await fetch('get_moves.php'); // Path to your PHP script for moves
        if (!response.ok) {
            console.error(`[fetchMovesData] HTTP error! Status: ${response.status} - ${response.statusText}`);
            const errorText = await response.text();
            console.error('[fetchMovesData] Server response:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            console.error("[fetchMovesData] Error fetching moves from PHP:", data.error);
            return [];
        }
        return data;
    } catch (error) {
        console.error("[fetchMovesData] Could not fetch moves data:", error);
        return [];
    }
}

// Function to fetch wrestler data from the PHP backend
async function fetchWrestlersData() {
    try {
        const response = await fetch('get_all_wrestlers.php'); // Path to your PHP script
        if (!response.ok) {
            console.error(`[fetchWrestlersData] HTTP error! Status: ${response.status} - ${response.statusText}`);
            const errorText = await response.text();
            console.error('[fetchWrestlersData] Server response:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            console.error("[fetchWrestlersData] Error fetching wrestlers from PHP:", data.error);
            return [];
        }
        return data;
    } catch (error) {
        console.error("[fetchWrestlersData] Could not fetch wrestlers data:", error);
        return [];
    }
}

// Process wrestlersData to ensure moves are valid and only from roster.moves
const processWrestlersData = (rawWrestlersData) => {
    rawWrestlersData.forEach(wrestler => {
        let parsedMoves = {};
        if (typeof wrestler.moves === 'string') {
            try {
                parsedMoves = JSON.parse(wrestler.moves);
            } catch (e) {
                console.error(`Error parsing moves JSON for ${wrestler.name}:`, e);
                // If parsing fails, treat it as empty moves
            }
        } else if (typeof wrestler.moves === 'object' && wrestler.moves !== null) {
            // If it's already an object, use it directly
            parsedMoves = wrestler.moves;
        }
        wrestler.moves = parsedMoves; // Assign the (parsed or original) object back

        const wrestlerMoveNames = new Set();
        const validInitialMoves = {}; // To store only valid moves from the initial JSON

        // Populate wrestlerMoveNames from existing moves and validate against allMovesData
        for (const type in wrestler.moves) {
            if (wrestler.moves.hasOwnProperty(type)) {
                if (!Array.isArray(wrestler.moves[type])) {
                    wrestler.moves[type] = [];
                }
                validInitialMoves[type] = []; // Initialize array for valid moves of this type

                wrestler.moves[type].forEach(moveName => {
                    // Check if the moveName is a valid string and exists in allMovesData
                    if (typeof moveName === 'string' && moveName.trim() !== "" && moveName.toLowerCase() !== "none") {
                        const moveExistsInAllMoves = allMovesData.some(move => move.move_name === moveName);
                        if (moveExistsInAllMoves) {
                            wrestlerMoveNames.add(moveName);
                            validInitialMoves[type].push(moveName); // Add to valid moves
                        } else {
                            console.warn(`[processWrestlersData] Move "${moveName}" for ${wrestler.name} not found in allMovesData. It will not be counted or used.`);
                        }
                    }
                });
            }
        }
        wrestler.moves = validInitialMoves; // Update wrestler.moves to only contain valid initial moves

        console.log(`[processWrestlersData] Final VALID moves for ${wrestler.name}:`, JSON.stringify(wrestler.moves));
        console.log(`[processWrestlersData] Final wrestlerMoveNames (valid only) for ${wrestler.name}:`, Array.from(wrestlerMoveNames));

        // Removed: Logic to add "Punch", "Clothesline", "Body Slam" based on brawlingAbility
        // Removed: Logic to add random moves to reach a minimum of 10 moves
    });
    return rawWrestlersData;
};


// Export wrestlers as a Promise or a function that returns a Promise
// This ensures that other modules importing 'wrestlers' wait for the data to be loaded.
export const wrestlers = (async () => {
    // First, fetch all moves data
    allMovesData = await fetchMovesData();

    // Then, fetch and process wrestler data
    const rawData = await fetchWrestlersData();
    const processedData = processWrestlersData(rawData);

    return processedData.map(wrestler => {
        // Ensure all numeric stats are actually numbers
        const stats = {
            strength: parseFloat(wrestler.strength) || 0,
            technicalAbility: parseFloat(wrestler.technicalAbility) || 0,
            brawlingAbility: parseFloat(wrestler.brawlingAbility) || 0,
            stamina: parseFloat(wrestler.stamina) || 0, // Convert stamina to number
            aerialAbility: parseFloat(wrestler.aerialAbility) || 0,
            toughness: parseFloat(wrestler.toughness) || 0,
            reversalAbility: parseFloat(wrestler.reversalAbility) || 0,
            submissionDefense: parseFloat(wrestler.submissionDefense) || 0, // SubmissionDefense is text in DB
            staminaRecoveryRate: parseFloat(wrestler.staminaRecoveryRate) || 0
        };

        // Ensure baseHp is a number
        const baseHp = parseFloat(wrestler.baseHp) || 0; // Convert baseHp to number

        const statValuesForOverall = [
            stats.strength, // Use converted stats
            stats.technicalAbility,
            stats.brawlingAbility,
            stats.stamina,
            stats.aerialAbility,
            stats.toughness
        ];

        statValuesForOverall.sort((a, b) => a - b);
        statValuesForOverall.shift(); // Remove the lowest stat
        const sumRemainingStats = statValuesForOverall.reduce((sum, val) => sum + val, 0);
        const overall = Math.round(sumRemainingStats / statValuesForOverall.length);

        const imageUrl = `${IMAGE_BASE_URL}${wrestler.image}.webp`;

        // This function now uses the globally available allMovesData
        const getMoveDetails = (moveName) => {
            // Corrected: Use 'move_name' property to find the move in allMovesData
            const rawDetails = allMovesData.find(move => move.move_name === moveName);

            if (!rawDetails) {
                return { name: moveName, damage: { min: 0, max: 0 }, staminaCost: 0, description: "Move details missing.", type: "unknown" };
            }
            // Map raw database details to the desired structure
            const mappedMove = {
                name: rawDetails.move_name, // Corrected: Use 'move_name' for the name property
                type: rawDetails.type || "unknown", // Ensure type is always present
                damage: {
                    min: parseFloat(rawDetails.min_damage) || 0, // Corrected: Use 'min_damage'
                    max: parseFloat(rawDetails.max_damage) || 0  // Corrected: Use 'max_damage'
                },
                staminaCost: parseFloat(rawDetails.stamina_cost) || 0,
                description: rawDetails.move_description || "No description provided." // Corrected: Use 'move_description'
            };
            return mappedMove;
        };

        const mappedMoves = {};
        for (const moveType in wrestler.moves) {
            if (wrestler.moves.hasOwnProperty(moveType)) {
                mappedMoves[moveType] = wrestler.moves[moveType].map(moveName => {
                    return getMoveDetails(moveName);
                });
            }
        }

        return {
            id: `wrestler-${wrestler.name.toLowerCase().replace(/\s/g, '-')}`,
            name: wrestler.name,
            image: imageUrl,
            stats: stats,
            overall: overall,
            moves: mappedMoves,
            baseHp: baseHp
        };
    });
})();

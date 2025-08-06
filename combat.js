// combat.js

import { getRandomInt } from './data.js';
import { updateMatchLog, triggerDamageAnimation, renderWrestlerInModalDisplay } from './dom.js';
import { parseHeightToInches } from './utils.js';

// --- Crowd Reaction Messages ---
const crowdReactions = {
    bigDamage: [
        "The crowd ROARS!",
        "WHAT A SHOT! The arena is buzzing!",
        "Fans are on their feet after that one!",
        "A collective gasp from the audience!",
        "The crowd is going wild!",
        "UNBELIEVABLE! The fans can't believe it!"
    ],
    comeback: [
        "The crowd is rallying behind them!",
        "A surge of energy from the audience!",
        "The fans sense a comeback!",
        "The momentum is shifting, and the crowd loves it!",
        "The arena is electric as they fight back!"
    ],
    finisherAttempt: [
        "The crowd is on the edge of their seats!",
        "FINISHER ALERT! The tension is palpable!",
        "The arena holds its breath!",
        "The crowd knows what's coming next!",
        "Anticipation fills the air!"
    ],
    finisherHit: [
        "BOOM! The crowd EXPLODES!",
        "THE FINISHER CONNECTS! The roof just blew off!",
        "UNBELIEVABLE! The crowd is in a frenzy!",
        "A thunderous ovation for that finisher!",
        "The arena ERUPTS!"
    ],
    staminaLow: [
        "The crowd is urging them on!",
        "You can hear the crowd's concern for their stamina.",
        "The audience is trying to motivate them!",
        "A weary sigh from the crowd."
    ],
    momentumSwingPositive: [
        "The crowd is feeling the momentum shift!",
        "A wave of energy sweeps through the arena!",
        "The fans are sensing a change in the tide!"
    ],
    momentumSwingNegative: [
        "The crowd groans as momentum slips away.",
        "A hush falls over the arena as things turn sour.",
        "The fans are worried about this momentum loss."
    ]
};

// --- Combat Constants ---
const HEIGHT_ADVANTAGE_THRESHOLD = 6; // inches
const HEIGHT_DAMAGE_MODIFIER = 0.05; // 5% bonus/penalty

/**
 * Triggers a random crowd reaction message.
 * @param {string} type - The type of crowd reaction (e.g., 'bigDamage', 'comeback').
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 */
export function triggerCrowdReaction(type, isBulkSimulation) {
    if (isBulkSimulation || !crowdReactions[type] || crowdReactions[type].length === 0) {
        return;
    }
    const messages = crowdReactions[type];
    const randomIndex = getRandomInt(0, messages.length - 1);
    updateMatchLog(`<em>${messages[randomIndex]}</em>`, 'crowd');
}

/**
 * Updates a wrestler's momentum.
 * @param {Object} matchStateObj - The current match state object (can be global matchState or tempMatchState).
 * @param {string} wrestlerId - The ID of the wrestler whose momentum to update.
 * @param {number} change - The amount to change momentum by (positive for gain, negative for loss).
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 * @param {function} wrestlerLookupFn - Function to find wrestler by ID (e.g., app.js's findWrestlerById).
 */
export function updateMomentum(matchStateObj, wrestlerId, change, isBulkSimulation, wrestlerLookupFn) {
    const oldMomentum = matchStateObj.currentMomentum[wrestlerId];
    let newMomentum = oldMomentum + change;
    newMomentum = Math.max(0, Math.min(100, newMomentum)); // Cap momentum between 0 and 100
    matchStateObj.currentMomentum[wrestlerId] = newMomentum;

    if (!isBulkSimulation) {
        const wrestlerName = wrestlerLookupFn(wrestlerId).name;
        if (change > 0) {
            updateMatchLog(`${wrestlerName} gains momentum! (${newMomentum.toFixed(0)})`, 'info');
            if (newMomentum > oldMomentum && newMomentum >= 75 && oldMomentum < 75) {
                triggerCrowdReaction('momentumSwingPositive', isBulkSimulation);
            }
        } else if (change < 0) {
            updateMatchLog(`${wrestlerName} loses momentum! (${newMomentum.toFixed(0)})`, 'info');
            if (newMomentum < oldMomentum && newMomentum <= 25 && oldMomentum > 25) {
                triggerCrowdReaction('momentumSwingNegative', isBulkSimulation);
            }
        }
    }
}

/**
 * Selects a random valid move for a wrestler based on their current stamina and move types.
 * @param {object} wrestler - The wrestler object.
 * @param {Object} matchStateObj - The current match state object (can be global matchState or tempMatchState).
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 * @param {function} wrestlerLookupFn - Function to find wrestler by ID (e.g., app.js's findWrestlerById).
 * @param {Object} selectedWrestlersMap - Map of currently selected wrestlers for the match type (e.g., app.js's selectedWrestlers)
 * @param {string} currentMatchType - The current match type ('single' or 'tagTeam').
 * @returns {object|null} A valid move object, or null if no valid moves are found.
 */
export function selectRandomMove(wrestler, matchStateObj, isBulkSimulation, wrestlerLookupFn, selectedWrestlersMap, currentMatchType) {
    let availableMoves = [];
    let finisherMove = null;

    // First, find the finisher move if the wrestler has one defined
    if (wrestler.finisherMoveName) {
        for (const moveType in wrestler.moves) {
            if (wrestler.moves.hasOwnProperty(moveType) && Array.isArray(wrestler.moves[moveType])) {
                finisherMove = wrestler.moves[moveType].find(move => move.name === wrestler.finisherMoveName);
                if (finisherMove) break; // Found the finisher
            }
        }
    }

    // Populate availableMoves with regular moves
    for (const moveType in wrestler.moves) {
        if (wrestler.moves.hasOwnProperty(moveType) && Array.isArray(wrestler.moves[moveType])) {
            wrestler.moves[moveType].forEach(move => {
                const staminaCost = parseFloat(move.staminaCost) || 0;
                const minDamage = parseFloat(move.damage.min) || 0;
                const maxDamage = parseFloat(move.damage.max) || 0;

                // A move is valid if the wrestler has enough stamina and it deals damage
                // Also, exclude the finisher from regular moves if it exists, as it's handled separately
                if (matchStateObj.currentStamina[wrestler.id] >= staminaCost && (minDamage > 0 || maxDamage > 0) && move.name !== wrestler.finisherMoveName) {
                    availableMoves.push(move);
                }
            });
        }
    }

    // --- Finisher Logic ---
    if (finisherMove && !matchStateObj.finisherUsed[wrestler.id]) {
        let defenderId = null;
        if (currentMatchType === 'single') {
            defenderId = (wrestler.id === selectedWrestlersMap.player1.id ? selectedWrestlersMap.player2.id : selectedWrestlersMap.player1.id);
        } else if (currentMatchType === 'tagTeam') {
            // In tag team, find the active opponent
            const team1Wrestlers = [selectedWrestlersMap.team1Player1, selectedWrestlersMap.team1Player2];
            const team2Wrestlers = [selectedWrestlersMap.team2Player1, selectedWrestlersMap.team2Player2];

            const isAttackerTeam1 = team1Wrestlers.some(w => w && w.id === wrestler.id);

            let potentialDefenders = [];
            if (isAttackerTeam1) {
                potentialDefenders = team2Wrestlers.filter(w => w && matchStateObj.currentHp[w.id] > 0);
            } else {
                potentialDefenders = team1Wrestlers.filter(w => w && matchStateObj.currentHp[w.id] > 0);
            }

            if (potentialDefenders.length > 0) {
                // Pick a random active defender
                defenderId = potentialDefenders[getRandomInt(0, potentialDefenders.length - 1)].id;
            }
        }

        if (defenderId) {
            const defenderCurrentHp = matchStateObj.currentHp[defenderId];
            const defenderInitialHp = matchStateObj.initialHp[defenderId];

            const FINISHER_HP_THRESHOLD_PERCENT = 0.30; // Opponent must be at 30% HP or less
            const FINISHER_ATTEMPT_CHANCE = 0.75; // 75% chance to attempt if conditions met

            if (defenderInitialHp > 0 && (defenderCurrentHp / defenderInitialHp) <= FINISHER_HP_THRESHOLD_PERCENT &&
                matchStateObj.currentStamina[wrestler.id] >= (parseFloat(finisherMove.staminaCost) || 0) &&
                Math.random() < FINISHER_ATTEMPT_CHANCE) {

                if (!isBulkSimulation) {
                    updateMatchLog(`${wrestler.name} is looking for the ${finisherMove.name}!`, 'action');
                    triggerCrowdReaction('finisherAttempt', isBulkSimulation);
                }
                updateMomentum(matchStateObj, wrestler.id, 20, isBulkSimulation, wrestlerLookupFn);
                matchStateObj.finisherUsed[wrestler.id] = true;
                return finisherMove;
            }
        }
    }

    if (availableMoves.length === 0) {
        console.warn(`${wrestler.name} has no valid moves across all categories (even after checking finisher)!`);
        if (!isBulkSimulation) {
            updateMatchLog(`${wrestler.name} couldn't find a valid move to perform!`, 'info');
        }
        return null;
    }

    const randomIndex = getRandomInt(0, availableMoves.length - 1);
    return availableMoves[randomIndex];
}

/**
 * Calculates damage based on move and attacker's stats, considering height and weight.
 * @param {object} attacker - The attacking wrestler object.
 * @param {object} defender - The defending wrestler object.
 * @param {object} move - The move object.
 * @param {Object} matchStateObj - The current match state object (can be global matchState or tempMatchState).
 * @param {boolean} isBulkSimulation - True if part of a bulk simulation, skips UI updates.
 * @param {function} wrestlerLookupFn - Function to find wrestler by ID (e.g., app.js's findWrestlerById).
 * @returns {number} The calculated damage.
 */
export function calculateDamage(attacker, defender, move, matchStateObj, isBulkSimulation, wrestlerLookupFn) {
    const minDamage = parseFloat(move.damage.min) || 0;
    const maxDamage = parseFloat(move.damage.max) || 0;
    let baseHitChance = parseFloat(move.baseHitChance) || 0.80;

    if (minDamage === 0 && maxDamage === 0) {
        console.warn(`Move "${move.name}" has zero damage range. Skipping damage calculation.`);
        return 0;
    }

    const attackerMomentum = matchStateObj.currentMomentum[attacker.id];
    const MOMENTUM_HIT_BONUS = 0.02;
    const MOMENTUM_HIT_PENALTY = 0.02;

    if (attackerMomentum >= 75) {
        baseHitChance += MOMENTUM_HIT_BONUS;
    } else if (attackerMomentum <= 25) {
        baseHitChance -= MOMENTUM_HIT_PENALTY;
    }

    let hitChance = baseHitChance;
    const offenseBonus = (attacker.stats.offense || 0) * 0.005;
    const defensePenalty = (defender.stats.defense || 0) * 0.0002;
    const evasionPenalty = (defender.stats.evasion || 0) * 0.0002;

    hitChance += offenseBonus;
    hitChance -= (defensePenalty + evasionPenalty);

    const attackerCurrentStamina = matchStateObj.currentStamina[attacker.id];
    const attackerInitialStamina = matchStateObj.initialStamina[attacker.id];
    if (attackerInitialStamina > 0) {
        const staminaPercentage = attackerCurrentStamina / attackerInitialStamina;
        if (staminaPercentage < 0.25) {
            hitChance *= 0.8;
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} is exhausted and struggles to connect!`, 'info');
                triggerCrowdReaction('staminaLow', isBulkSimulation);
            }
        } else if (staminaPercentage < 0.5) {
            hitChance *= 0.95;
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} is tiring, affecting their accuracy!`, 'info');
            }
        }
    }

    hitChance = Math.max(0.4, Math.min(0.95, hitChance));

    if (Math.random() > hitChance) {
        if (!isBulkSimulation) {
            updateMatchLog(`${defender.name} evades ${attacker.name}'s attack!`, 'info');
            updateMomentum(matchStateObj, attacker.id, -5, isBulkSimulation, wrestlerLookupFn);
            updateMomentum(matchStateObj, defender.id, 5, isBulkSimulation, wrestlerLookupFn);
        }
        return 0;
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

    const MOMENTUM_DAMAGE_BONUS = 0.05;
    const MOMENTUM_DAMAGE_PENALTY = 0.05;

    if (attackerMomentum >= 75) {
        damage *= (1 + MOMENTUM_DAMAGE_BONUS);
    } else if (attackerMomentum <= 25) {
        damage *= (1 - MOMENTUM_DAMAGE_PENALTY);
    }

    const attackerHeightInches = parseHeightToInches(attacker.height);
    const attackerWeightLbs = parseInt(attacker.weight) || 0;
    const defenderHeightInches = parseHeightToInches(defender.height);
    const defenderWeightLbs = parseInt(defender.weight) || 0;

    const weightDifference = attackerWeightLbs - defenderWeightLbs;
    const HEIGHT_DIFFERENCE = attackerHeightInches - defenderHeightInches;

    const WEIGHT_ADVANTAGE_THRESHOLD = 75;
    const WEIGHT_DAMAGE_MODIFIER = 0.10;

    if (weightDifference > WEIGHT_ADVANTAGE_THRESHOLD) {
        damage *= (1 + WEIGHT_DAMAGE_MODIFIER);
        if (!isBulkSimulation) {
            updateMatchLog(`${attacker.name} gains advantage due to weight difference!`, 'info');
        }
    } else if (weightDifference < -WEIGHT_ADVANTAGE_THRESHOLD) {
        damage *= (1 - WEIGHT_DAMAGE_MODIFIER);
        if (!isBulkSimulation) {
            updateMatchLog(`${attacker.name} is at a disadvantage due to weight difference!`, 'info');
        }
    }

    if (move.type === 'strike') {
        if (HEIGHT_DIFFERENCE > HEIGHT_ADVANTAGE_THRESHOLD) {
            damage *= (1 + HEIGHT_DAMAGE_MODIFIER);
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} uses reach advantage with their strike!`, 'info');
            }
        } else if (HEIGHT_DIFFERENCE < -HEIGHT_ADVANTAGE_THRESHOLD) {
            damage *= (1 - HEIGHT_DAMAGE_MODIFIER);
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} struggles to connect due to height disadvantage!`, 'info');
            }
        }
    }

    const DAMAGE_BONUS_PERCENTAGE = 0.10;

    if (move.type === 'grapple') {
        if ((attacker.stats.strength || 0) >= 95 || (attacker.stats.technicalAbility || 0) >= 95) {
            damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} lands a powerful grapple due to their superior grappling ability!`, 'action');
            }
        }
    }

    if (move.type === 'highFlying') {
        if ((attacker.stats.aerialAbility || 0) >= 90) {
            damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} executes a spectacular high-flying move with extra impact!`, 'action');
            }
        }
    }

    if (move.type === 'strike') {
        if ((attacker.stats.brawlingAbility || 0) >= 95) {
            damage *= (1 + DAMAGE_BONUS_PERCENTAGE);
            if (!isBulkSimulation) {
                updateMatchLog(`${attacker.name} delivers a devastating strike with their brawling prowess!`, 'action');
            }
        }
    }

    const COMEBACK_HP_THRESHOLD_PERCENT = 0.25;
    const COMEBACK_DAMAGE_BONUS_PERCENT = 0.25;

    const actualAttackerCurrentHp = matchStateObj.currentHp[attacker.id];
    const attackerInitialHp = matchStateObj.initialHp[attacker.id];

    if (attackerInitialHp > 0 && (actualAttackerCurrentHp / attackerInitialHp) <= COMEBACK_HP_THRESHOLD_PERCENT) {
        damage *= (1 + COMEBACK_DAMAGE_BONUS_PERCENT);
        if (!isBulkSimulation) {
            updateMatchLog(`${attacker.name} is fired up and delivers a powerful comeback blow!`, 'action');
            triggerCrowdReaction('comeback', isBulkSimulation);
        }
    }

    const toughnessReduction = (defender.stats.toughness || 0) * 0.004;
    const resilienceReduction = (defender.stats.resilience || 0) * 0.002;

    damage *= (1 - (toughnessReduction + resilienceReduction));

    const finalDamage = Math.max(0, Math.round(damage));

    const BIG_DAMAGE_THRESHOLD_PERCENT = 0.15;
    const defenderInitialHp = matchStateObj.initialHp[defender.id];
    if (!isBulkSimulation && defenderInitialHp > 0 && (finalDamage / defenderInitialHp) >= BIG_DAMAGE_THRESHOLD_PERCENT) {
        triggerCrowdReaction('bigDamage', isBulkSimulation);
        updateMomentum(matchStateObj, attacker.id, 10, isBulkSimulation, wrestlerLookupFn);
        updateMomentum(matchStateObj, defender.id, -5, isBulkSimulation, wrestlerLookupFn);
    }

    return finalDamage;
}

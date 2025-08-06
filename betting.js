// betting.js

import { showModal, hideModal } from './dom.js';
import { getRandomInt } from './data.js';
import { probabilityToDecimalOdds, probabilityToFractionalOdds, probabilityToMoneylineOdds, determineWinner } from './utils.js';
import { updateMomentum, selectRandomMove, calculateDamage } from './combat.js';

export const NUM_ODDS_SIMULATIONS = 1000; // Number of simulations for betting odds calculation

/**
 * Runs a large number of simulations to calculate betting odds.
 * @param {Object} selectedWrestlers - The currently selected wrestlers for the match.
 * @param {string} currentMatchType - The current match type ('single' or 'tagTeam').
 * @param {function} wrestlerLookupFn - A function to look up wrestler objects by ID.
 * @param {Object} initialMatchStateTemplate - A template for the matchState to be used for each simulation.
 */
export async function calculateBettingOdds(selectedWrestlers, currentMatchType, wrestlerLookupFn, initialMatchStateTemplate) {
    const bettingOddsModal = document.getElementById('bettingOddsModal');
    const bettingOddsModalMessage = document.getElementById('bettingOddsModalMessage');
    const oddsResultsContainer = document.getElementById('oddsResultsContainer');

    if ((currentMatchType === 'single' && (!selectedWrestlers.player1 || !selectedWrestlers.player2)) ||
        (currentMatchType === 'tagTeam' && (!selectedWrestlers.team1Player1 || !selectedWrestlers.team1Player2 || !selectedWrestlers.team2Player1 || !selectedWrestlers.team2Player2))) {
        showModal(bettingOddsModal, 'Odds Calculation Error', 'Please select the required number of wrestlers before calculating odds.');
        return;
    }

    // Disable UI buttons during simulation
    const buttonsToDisable = ['startMatchBtn', 'nextTurnBtn', 'randomMatchupBtn', 'singleMatchBtn', 'tagTeamMatchBtn', 'simulate100xBtn', 'resetMatchBtn', 'resetMatchBtnModal', 'resetMatchBtnWinnerModal', 'calculateOddsBtn'];
    buttonsToDisable.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = true;
    });

    // Show loading state in modal
    showModal(bettingOddsModal, 'Calculating Odds...', 'Running simulations to determine probabilities. Please wait, this may take a moment...');
    if (oddsResultsContainer) oddsResultsContainer.classList.add('hidden'); // Hide results during calculation

    const simulationResults = [];

    for (let i = 0; i < NUM_ODDS_SIMULATIONS; i++) {
        if (bettingOddsModalMessage) {
            bettingOddsModalMessage.textContent = `Running simulation ${i + 1} of ${NUM_ODDS_SIMULATIONS}...`;
        }

        let currentSimWinner = 'no_winner_yet';
        let simRound = 0;

        // Deep copy selected wrestlers for each simulation
        const simWrestlers = JSON.parse(JSON.stringify(selectedWrestlers));

        // Initialize temporary match state for this simulation
        let tempMatchState = JSON.parse(JSON.stringify(initialMatchStateTemplate)); // Start with the template

        // Set higher max rounds for simulations to allow for more conclusive results
        tempMatchState.maxRounds = currentMatchType === 'single' ? 200 : 300; // Increased max rounds for simulations

        // Populate initial HP, Stamina, and Momentum for this specific simulation
        if (currentMatchType === 'single') {
            const p1 = simWrestlers.player1;
            const p2 = simWrestlers.player2;

            tempMatchState.initialHp[p1.id] = p1.baseHp + p1.stats.stamina;
            tempMatchState.currentHp[p1.id] = p1.baseHp + p1.stats.stamina;
            tempMatchState.initialStamina[p1.id] = p1.stats.stamina;
            tempMatchState.currentStamina[p1.id] = p1.stats.stamina;
            tempMatchState.currentMomentum[p1.id] = 50;

            tempMatchState.initialHp[p2.id] = p2.baseHp + p2.stats.stamina;
            tempMatchState.currentHp[p2.id] = p2.baseHp + p2.stats.stamina;
            tempMatchState.initialStamina[p2.id] = p2.stats.stamina;
            tempMatchState.currentStamina[p2.id] = p2.stats.stamina;
            tempMatchState.currentMomentum[p2.id] = 50;

        } else if (currentMatchType === 'tagTeam') {
            [simWrestlers.team1Player1, simWrestlers.team1Player2, simWrestlers.team2Player1, simWrestlers.team2Player2].forEach(p => {
                tempMatchState.initialHp[p.id] = p.baseHp + p.stats.stamina;
                tempMatchState.currentHp[p.id] = p.baseHp + p.stats.stamina;
                tempMatchState.initialStamina[p.id] = p.stats.stamina;
                tempMatchState.currentStamina[p.id] = p.stats.stamina;
                tempMatchState.currentMomentum[p.id] = 50;
            });
        }

        // Simulate match turns
        while (currentSimWinner === 'no_winner_yet' && simRound < tempMatchState.maxRounds) {
            simRound++;

            if (currentMatchType === 'single') {
                const p1 = simWrestlers.player1;
                const p2 = simWrestlers.player2;

                // Stamina recovery
                const p1StaminaRecovery = p1.stats.staminaRecoveryRate || 0;
                tempMatchState.currentStamina[p1.id] = Math.min(tempMatchState.initialStamina[p1.id], tempMatchState.currentStamina[p1.id] + p1StaminaRecovery);
                const p2StaminaRecovery = p2.stats.staminaRecoveryRate || 0;
                tempMatchState.currentStamina[p2.id] = Math.min(tempMatchState.initialStamina[p2.id], tempMatchState.currentStamina[p2.id] + p2StaminaRecovery);

                // Player 1 attacks Player 2
                if (tempMatchState.currentHp[p1.id] > 0 && tempMatchState.currentHp[p2.id] > 0) {
                    const p1ChosenMove = selectRandomMove(p1, tempMatchState, true, wrestlerLookupFn, simWrestlers, currentMatchType);
                    if (p1ChosenMove && tempMatchState.currentStamina[p1.id] >= (parseFloat(p1ChosenMove.staminaCost) || 0)) {
                        tempMatchState.currentStamina[p1.id] -= (parseFloat(p1ChosenMove.staminaCost) || 0);
                        const p1DamageDealt = calculateDamage(p1, p2, p1ChosenMove, tempMatchState, true, wrestlerLookupFn);
                        tempMatchState.currentHp[p2.id] = Math.max(0, tempMatchState.currentHp[p2.id] - p1DamageDealt);
                    }
                }
                const winnerResult = determineWinner(tempMatchState, simWrestlers, currentMatchType);
                if (winnerResult !== null && winnerResult !== 'no_winner_yet') {
                    currentSimWinner = typeof winnerResult === 'object' ? winnerResult.name : winnerResult;
                }


                // Player 2 attacks Player 1 (only if no winner yet)
                if (currentSimWinner === 'no_winner_yet' && tempMatchState.currentHp[p1.id] > 0 && tempMatchState.currentHp[p2.id] > 0) {
                    const p2ChosenMove = selectRandomMove(p2, tempMatchState, true, wrestlerLookupFn, simWrestlers, currentMatchType);
                    if (p2ChosenMove && tempMatchState.currentStamina[p2.id] >= (parseFloat(p2ChosenMove.staminaCost) || 0)) {
                        tempMatchState.currentStamina[p2.id] -= (parseFloat(p2ChosenMove.staminaCost) || 0);
                        const p2DamageDealt = calculateDamage(p2, p1, p2ChosenMove, tempMatchState, true, wrestlerLookupFn);
                        tempMatchState.currentHp[p1.id] = Math.max(0, tempMatchState.currentHp[p1.id] - p2DamageDealt);
                    }
                }
                const winnerResult2 = determineWinner(tempMatchState, simWrestlers, currentMatchType);
                if (winnerResult2 !== null && winnerResult2 !== 'no_winner_yet') {
                    currentSimWinner = typeof winnerResult2 === 'object' ? winnerResult2.name : winnerResult2;
                }

            } else if (currentMatchType === 'tagTeam') {
                const team1_p1 = simWrestlers.team1Player1;
                const team1_p2 = simWrestlers.team1Player2;
                const team2_p1 = simWrestlers.team2Player1;
                const team2_p2 = simWrestlers.team2Player2;

                // Stamina & HP recovery for all wrestlers
                [team1_p1, team1_p2, team2_p1, team2_p2].forEach(p => {
                    const staminaRecovery = p.stats.staminaRecoveryRate || 0;
                    tempMatchState.currentStamina[p.id] = Math.min(tempMatchState.initialStamina[p.id], tempMatchState.currentStamina[p.id] + staminaRecovery);
                    tempMatchState.currentHp[p.id] = Math.min(tempMatchState.initialHp[p.id], tempMatchState.currentHp[p.id] + 2);
                });

                const winnerResult = determineWinner(tempMatchState, simWrestlers, currentMatchType);
                if (winnerResult !== null && winnerResult !== 'no_winner_yet') {
                    currentSimWinner = typeof winnerResult === 'object' ? winnerResult.name : winnerResult;
                }

                let activeTeam1Wrestler = null;
                if (tempMatchState.currentHp[team1_p1.id] > 0 && tempMatchState.currentHp[team1_p2.id] > 0) {
                    activeTeam1Wrestler = getRandomInt(0, 1) === 0 ? team1_p1 : team1_p2;
                } else if (tempMatchState.currentHp[team1_p1.id] > 0) {
                    activeTeam1Wrestler = team1_p1;
                } else if (tempMatchState.currentHp[team1_p2.id] > 0) {
                    activeTeam1Wrestler = team1_p2;
                }

                let activeTeam2Wrestler = null;
                if (tempMatchState.currentHp[team2_p1.id] > 0 && tempMatchState.currentHp[team2_p2.id] > 0) {
                    activeTeam2Wrestler = getRandomInt(0, 1) === 0 ? team2_p1 : team2_p2;
                } else if (tempMatchState.currentHp[team2_p1.id] > 0) {
                    activeTeam2Wrestler = team2_p1;
                } else if (tempMatchState.currentHp[team2_p2.id] > 0) {
                    activeTeam2Wrestler = team2_p2;
                }

                if (currentSimWinner === 'no_winner_yet' && activeTeam1Wrestler && activeTeam2Wrestler) {
                    // Team 1 active wrestler attacks Team 2 active wrestler
                    const t1ChosenMove = selectRandomMove(activeTeam1Wrestler, tempMatchState, true, wrestlerLookupFn, simWrestlers, currentMatchType);
                    if (t1ChosenMove && tempMatchState.currentStamina[activeTeam1Wrestler.id] >= (parseFloat(t1ChosenMove.staminaCost) || 0)) {
                        tempMatchState.currentStamina[activeTeam1Wrestler.id] -= (parseFloat(t1ChosenMove.staminaCost) || 0);
                        const t1DamageDealt = calculateDamage(activeTeam1Wrestler, activeTeam2Wrestler, t1ChosenMove, tempMatchState, true, wrestlerLookupFn);
                        tempMatchState.currentHp[activeTeam2Wrestler.id] = Math.max(0, tempMatchState.currentHp[activeTeam2Wrestler.id] - t1DamageDealt);
                    }

                    const winnerResultAfterT1 = determineWinner(tempMatchState, simWrestlers, currentMatchType);
                    if (winnerResultAfterT1 !== null && winnerResultAfterT1 !== 'no_winner_yet') {
                        currentSimWinner = typeof winnerResultAfterT1 === 'object' ? winnerResultAfterT1.name : winnerResultAfterT1;
                    }

                    // Team 2 active wrestler attacks Team 1 active wrestler (if no winner yet)
                    if (currentSimWinner === 'no_winner_yet' && tempMatchState.currentHp[activeTeam1Wrestler.id] > 0 && tempMatchState.currentHp[activeTeam2Wrestler.id] > 0) {
                        const t2ChosenMove = selectRandomMove(activeTeam2Wrestler, tempMatchState, true, wrestlerLookupFn, simWrestlers, currentMatchType);
                        if (t2ChosenMove && tempMatchState.currentStamina[activeTeam2Wrestler.id] >= (parseFloat(t2ChosenMove.staminaCost) || 0)) {
                            tempMatchState.currentStamina[activeTeam2Wrestler.id] -= (parseFloat(t2ChosenMove.staminaCost) || 0);
                            const t2DamageDealt = calculateDamage(activeTeam2Wrestler, activeTeam1Wrestler, t2ChosenMove, tempMatchState, true, wrestlerLookupFn);
                            tempMatchState.currentHp[activeTeam1Wrestler.id] = Math.max(0, tempMatchState.currentHp[activeTeam1Wrestler.id] - t2DamageDealt);
                        }
                    }
                    const winnerResultAfterT2 = determineWinner(tempMatchState, simWrestlers, currentMatchType);
                    if (winnerResultAfterT2 !== null && winnerResultAfterT2 !== 'no_winner_yet') {
                        currentSimWinner = typeof winnerResultAfterT2 === 'object' ? winnerResultAfterT2.name : winnerResultAfterT2;
                    }
                }
            }
        }

        // If after all rounds, no explicit winner was determined, it's a draw
        if (currentSimWinner === 'no_winner_yet' && simRound >= tempMatchState.maxRounds) {
            currentSimWinner = 'draw';
        }

        simulationResults.push(currentSimWinner);

        // Yield control back to the browser periodically
        if ((i + 1) % 50 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    // Aggregate results
    const counts = {};
    simulationResults.forEach(result => {
        counts[result] = (counts[result] || 0) + 1;
    });

    // Calculate probabilities
    const totalSimulations = NUM_ODDS_SIMULATIONS;
    const probabilities = {};
    for (const outcome in counts) {
        probabilities[outcome] = counts[outcome] / totalSimulations;
    }

    // Display odds in the modal
    displayBettingOdds(probabilities, selectedWrestlers, currentMatchType);

    // Re-enable UI buttons after simulation
    const buttonsToReEnable = ['startMatchBtn', 'nextTurnBtn', 'randomMatchupBtn', 'singleMatchBtn', 'tagTeamMatchBtn', 'simulate100xBtn', 'resetMatchBtn', 'resetMatchBtnModal', 'resetMatchBtnWinnerModal', 'calculateOddsBtn'];
    buttonsToReEnable.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = false;
    });
}

/**
 * Displays the calculated betting odds in the modal.
 * @param {object} probabilities - An object mapping winner names/team strings/draw to their probabilities.
 * @param {Object} selectedWrestlers - The currently selected wrestlers for the match.
 * @param {string} currentMatchType - The current match type ('single' or 'tagTeam').
 */
export function displayBettingOdds(probabilities, selectedWrestlers, currentMatchType) {
    const bettingOddsModal = document.getElementById('bettingOddsModal');
    const bettingOddsModalMessage = document.getElementById('bettingOddsModalMessage');
    const oddsResultsContainer = document.getElementById('oddsResultsContainer');

    // Clear previous message and show results container
    if (bettingOddsModalMessage) bettingOddsModalMessage.textContent = '';
    if (oddsResultsContainer) oddsResultsContainer.classList.remove('hidden');

    // Helper to update odds for a specific outcome
    const updateOddsDisplay = (elementPrefix, name, prob) => {
        const nameElement = document.getElementById(`${elementPrefix}Name`);
        const probElement = document.getElementById(`prob${elementPrefix}`);
        const decimalElement = document.getElementById(`decimalOdds${elementPrefix}`);
        const fractionalElement = document.getElementById(`fractionalOdds${elementPrefix}`);
        const moneylineElement = document.getElementById(`moneylineOdds${elementPrefix}`);
        const moneylineNoteElement = document.getElementById(`moneylineNote${elementPrefix}`); // New element for the note
        const container = document.getElementById(`odds${elementPrefix}`);

        if (container) container.classList.remove('hidden');

        if (nameElement) nameElement.textContent = name;
        if (probElement) probElement.textContent = `${(prob * 100).toFixed(2)}%`;
        if (decimalElement) decimalElement.textContent = probabilityToDecimalOdds(prob);
        if (fractionalElement) fractionalElement.textContent = probabilityToFractionalOdds(prob);
        
        let moneylineOdds;
        if (prob === 0) {
            moneylineOdds = '+249000'; // Set moneyline to +249000 if probability is 0%
        } else {
            moneylineOdds = probabilityToMoneylineOdds(prob);
        }
        
        if (moneylineElement) moneylineElement.textContent = moneylineOdds;

        // Add moneyline explanation note
        if (moneylineNoteElement) {
            if (moneylineOdds.startsWith('+')) {
                const value = parseInt(moneylineOdds.substring(1));
                const winningsPer100 = (value / 100) * 100; // Calculate winnings for a $100 bet
                moneylineNoteElement.innerHTML = `<em>For a $100 bet, you would win $${winningsPer100.toFixed(2)} profit ($${(100 + winningsPer100).toFixed(2)} total back).</em>`;
            } else if (moneylineOdds.startsWith('-')) {
                const value = parseInt(moneylineOdds.substring(1));
                const betToWin100 = (value / 100) * 100; // Calculate bet needed to win $100
                moneylineNoteElement.innerHTML = `<em>To win $100 profit, you would need to bet $${betToWin100.toFixed(2)} ($${(100 + betToWin100).toFixed(2)} total back).</em>`;
            } else {
                moneylineNoteElement.textContent = ''; // Clear if not a valid moneyline
            }
        }
    };

    // Reset all odds display containers to hidden first
    document.getElementById('oddsPlayer1').classList.add('hidden');
    document.getElementById('oddsPlayer2').classList.add('hidden');
    document.getElementById('oddsDraw').classList.add('hidden');

    if (currentMatchType === 'single') {
        const p1 = selectedWrestlers.player1;
        const p2 = selectedWrestlers.player2;

        if (p1) updateOddsDisplay('Player1', p1.name, probabilities[p1.name] || 0);
        if (p2) updateOddsDisplay('Player2', p2.name, probabilities[p2.name] || 0);
        updateOddsDisplay('Draw', 'Draw', probabilities['draw'] || 0);

    } else if (currentMatchType === 'tagTeam') {
        const team1Name = `${selectedWrestlers.team1Player1.name} & ${selectedWrestlers.team1Player2.name}`;
        const team2Name = `${selectedWrestlers.team2Player1.name} & ${selectedWrestlers.team2Player2.name}`;

        updateOddsDisplay('Player1', `Team 1 (${team1Name})`, probabilities['Team 1'] || 0);
        updateOddsDisplay('Player2', `Team 2 (${team2Name})`, probabilities['Team 2'] || 0);
        updateOddsDisplay('Draw', 'Draw', probabilities['draw'] || 0);
    }

    showModal(bettingOddsModal, 'Calculated Betting Odds', '');
}

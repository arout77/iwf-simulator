<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IWF | Internet Wrestling Federation - Online Wrestling Game & Simulation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Step into the ring with IWF! Create your dream wrestling matches and simulate epic battles using historical wrestlers from the Golden Age to present in this ultimate online wrestling simulator.">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen flex flex-col overflow-y-auto">
    <header class="w-full max-w-6xl mx-auto py-6 px-4 flex justify-center md:justify-between items-center bg-transparent z-10">
        <div class="flex flex-col items-center">
            <img src="images/logo-5.png" alt="IWF Logo" class="h-16 md:h-24 object-contain animate-fade-in-up">
            <p class="text-sm md:text-base text-gray-300 mt-2 text-center max-w-[10rem] animate-fade-in-up animation-delay-200">Internet Wrestling Federation</p>
        </div>
        <!-- Navigation links -->
        <nav class="hidden md:flex space-x-6">
            <a href="match.php" class="text-gray-300 hover:text-white transition duration-300 text-lg animate-fade-in-up animation-delay-400">Simulator</a>
            <a href="booking.php" class="text-gray-300 hover:text-white transition duration-300 text-lg animate-fade-in-up animation-delay-500">Career Mode</a>
            <a href="wrestlers.php" class="text-gray-300 hover:text-white transition duration-300 text-lg animate-fade-in-up animation-delay-600">Roster</a>
        </nav>
    </header>
    <!-- Animated Background Container -->
    <div class="fixed inset-0 z-0">
        <div class="animated-blob" style="width: 40vw;height: 40vw;top: -10vh;left: -10vw;--color-start: #720697;--color-end: #720697;--duration: 25s;--delay: 0s;--x-start: 0vw;--y-start: 0vh;--scale-start: 1;--x-mid: 20vw;--y-mid: 20vh;--scale-mid: 1.2;--x-end: 10vw;--y-end: 10vh;--scale-end: 1;"></div>
        <div class="animated-blob" style="width: 20vw;height: 30vw;top: 60vh;left: 70vw;--color-start: #1647f9;--color-end: #be03ff;--duration: 30s;--delay: 5s;--x-start: 0vw;--y-start: 0vh;--scale-start: 0.8;--x-mid: -10vw;--y-mid: -20vh;--scale-mid: 1;--x-end: 0vw;--y-end: 0vh;--scale-end: 0.8;"></div>
        <div class="animated-blob" style="width: 50vw;height: 50vw;top: 30vh;left: -30vw;--color-start: #3aa4ff;--color-end: #6a0497;--duration: 40s;--delay: 10s;--x-start: 0vw;--y-start: 0vh;--scale-start: 1.1;--x-mid: 30vw;--y-mid: -10vh;--scale-mid: 0.9;--x-end: 10vw;--y-end: 20vh;--scale-end: 1.1;"></div>
        <div class="animated-blob" style="width: 19vw;height: 35vw;top: -5vh;left: 80vw;--color-start: rgb(59 130 246 / 0.5);--color-end: rgb(59 130 246 / 0.5);--duration: 35s;--delay: 15s;--x-start: 0vw;--y-start: 0vh;--scale-start: 0.9;--x-mid: -20vw;--y-mid: 10vh;--x-end: -10vw;--y-end: -5vh;--scale-end: 0.9;"></div>
    </div>
    <main class="container mx-auto px-4 py-8 flex-grow">
        <div id="matchSetup" class="hidden py-8">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center" style="z-index: 5; position: relative;">Match Setup</h2>
            <!-- Match Type Selection -->
            <div class="flex justify-center space-x-4 mb-6">
                <div class="text-xl w-100 text-gray-300" style="z-index: 5; position: relative;">Assemble your dream matches and see who comes out on top!</div>
            </div>
            <div class="flex justify-center space-x-4 mb-6">
                <button id="singleMatchBtn" class="relative inline-flex items-center justify-center p-0.5 mb-4 me-4 overflow-hidden text-gray-300 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 px-8 py-3 rounded-full shadow-lg" style="z-index: 5;">
                    <span class="relative transition-all ease-in duration-75 bg-transparent dark:bg-transparent rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">Singles Match</span>
                </button>
                <button id="tagTeamMatchBtn" class="relative inline-flex items-center justify-center p-0.5 mb-4 me-4 overflow-hidden text-gray-300 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 px-8 py-3 rounded-full shadow-lg" style="z-index: 5;">
                    <span class="relative transition-all ease-in duration-75 bg-transparent dark:bg-transparent rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">Tag Team Match</span>
                </button>
                <button id="randomMatchupBtn" class="relative inline-flex items-center justify-center p-0.5 mb-4 me-4 overflow-hidden text-gray-300 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 px-8 py-3 rounded-full shadow-lg" style="z-index: 5;">
                    <span class="relative transition-all ease-in duration-75 bg-transparent dark:bg-transparent rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">Random Matchup</span>
                </button>
            </div>

            <!-- Single Match Layout -->
            <div id="singleMatchLayout" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 rounded-lg">
                <div id="player1DropZone" class="drop-zone bg-gray-700 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-64" style="z-index: 1;">
                    Drop Wrestler 1 Here
                </div>
                <div id="player2DropZone" class="drop-zone bg-gray-700 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-64" style="z-index: 1;">
                    Drop Wrestler 2 Here
                </div>
            </div>

            <!-- Tag Team Match Layout (Hidden by default) -->
            <div id="tagTeamMatchLayout" class="hidden grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 rounded-lg">
                <div id="team1DropZone" class="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                    <h3 class="text-xl font-semibold text-yellow-300 mb-3 text-center">Team 1</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div id="team1Player1DropZone" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Drop Wrestler 1 Here
                        </div>
                        <div id="team1Player2DropZone" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Drop Wrestler 2 Here
                        </div>
                    </div>
                </div>
                <div id="team2DropZone" class="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                    <h3 class="text-xl font-semibold text-yellow-300 mb-3 text-center">Team 2</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div id="team2Player1DropZone" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Drop Wrestler 1 Here
                        </div>
                        <div id="team2Player2DropZone" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Drop Wrestler 2 Here
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center space-x-4">
                <button id="startMatchBtn" class="btn btn-primary text-xl shiny-cta z-10">Start Match</button>
                <button id="simulate100xBtn" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-10">Simulate 100x</button>
                <!-- New: Calculate Betting Odds Button -->
                <button id="calculateOddsBtn" class="text-white bg-gradient-to-br from-green-500 to-teal-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-10">Calculate Betting Odds</button>
                <button id="resetMatchBtn" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-10">Reset All</button>
            </div>
        </div>

        <!-- Wrestler Roster -->
        <div id="rosterContainer" class="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">Wrestler Roster</h2>
            <!-- Sort Controls -->
            <div class="flex flex-wrap justify-center gap-4 mb-4 items-center">
                <div class="flex flex-1 justify-between w-full items-center gap-4">
                    <!-- Left: Toggle Match Setup -->
                    <div>
                        <button id="toggleMatchSetupBtn" class="shiny-cta">Create Match</button>
                    </div>
                    <!-- Right: Sort Controls -->
                    <div class="flex items-center gap-2">
                        <label for="sortSelect" class="text-gray-300 font-semibold mr-2">Sort by:</label>
                        <select id="sortSelect" class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                            <option value="name">Name</option>
                            <option value="overall">Overall</option>
                            <option value="strength">Strength</option>
                            <option value="technicalAbility">Technical Ability</option>
                            <option value="brawlingAbility">Brawling Ability</option>
                            <option value="aerialAbility">Aerial Ability</option>
                            <option value="stamina">Stamina</option>
                            <option value="toughness">Toughness</option>
                        </select>
                        <button id="toggleSortOrderBtn" class="btn btn-secondary py-1 px-3 text-sm">
                            <span id="sortOrderText">Ascending</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id="wrestlerRoster" class="wrestler-roster grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-scroll h-[600px] p-2 rounded-lg" style="position: relative; z-index: 10; pointer-events: auto; overflow-y: scroll; max-height: 800px;">
                <!-- Wrestler cards will be loaded here by JavaScript -->
            </div>
        </div>
    </main>

    <!-- Modal Overlay -->
    <div id="modalOverlay" class="modal-overlay hidden"></div>

    <!-- Match Log Modal -->
    <div id="resultModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
        <div class="modal-content bg-gray-800 p-4 sm:p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-blue-500 max-h-[90vh] overflow-y-auto">
            <h2 id="modalTitle" class="text-3xl font-bold text-blue-400 mb-4 text-center"></h2>
            <p id="modalMessage" class="text-xl text-gray-300 mb-6 text-center"></p>
            
            <!-- Modal Display Zones for Wrestlers -->
            <div id="modalSingleMatchDisplay" class="hidden flex justify-around items-center mb-6">
                <div id="modalSinglePlayer1" class="w-1/2 p-2"></div>
                <div id="modalSinglePlayer2" class="w-1/2 p-2"></div>
            </div>

            <div id="modalTagTeamMatchDisplay" class="hidden flex flex-col md:flex-row justify-around items-start mb-6">
                <div id="modalTeam1Display" class="w-full md:w-1/2 p-2 flex flex-col items-center">
                    <h4 class="text-xl font-semibold text-yellow-300 mb-2">Team 1</h4>
                    <div class="flex justify-around w-full">
                        <div id="modalTeam1Player1" class="w-1/2 p-1"></div>
                        <div id="modalTeam1Player2" class="w-1/2 p-1"></div>
                    </div>
                </div>
                <div id="modalTeam2Display" class="w-full md:w-1/2 p-2 flex flex-col items-center">
                    <h4 class="text-xl font-semibold text-yellow-300 mb-2">Team 2</h4>
                    <div class="flex justify-around w-full">
                        <div id="modalTeam2Player1" class="w-1/2 p-1"></div>
                        <div id="modalTeam2Player2" class="w-1/2 p-1"></div>
                    </div>
                </div>
            </div>

            <!-- Match Log -->
            <div id="matchLog" class="bg-gray-700 p-4 rounded-lg h-64 overflow-y-auto text-sm text-gray-200 mb-6">
                <p class="text-center text-gray-500">No match has started yet.</p>
            </div>

            <div class="flex justify-center space-x-4 flex-wrap gap-4">
                <button id="nextTurnBtn" class="btn btn-primary rounded-lg p-2 px-4 mx-4 glow-on-hover hidden">Next Turn</button>
                <button id="resetMatchBtnModal" class="btn btn-secondary rounded-lg p-2 px-4 mx-4">Reset Match</button>
            </div>
        </div>
    </div>

    <!-- Winner Modal (Separate from main log modal) -->
    <div id="winnerModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
        <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 md:w-1/2 relative border-2 border-green-500 text-center">
            <h2 id="winnerModalTitle" class="text-3xl font-bold text-green-500 mb-4"></h2>
            <p id="winnerModalMessage" class="text-xl text-gray-300 mb-6"></p>
            <div id="winnerImageContainer" class="flex justify-center items-center mt-4 mb-6 hidden">
                <!-- Winner image(s) will be displayed here -->
            </div>
            <button id="resetMatchBtnWinnerModal" class="btn btn-secondary">New Match</button>
        </div>
    </div>

    <!-- New: Betting Odds Modal -->
    <div id="bettingOddsModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
        <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-purple-500 max-h-[90vh] overflow-y-auto text-center">
            <button class="close-button absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            <h2 id="bettingOddsModalTitle" class="text-3xl font-bold text-purple-400 mb-4">Calculated Betting Odds</h2>
            <p id="bettingOddsModalMessage" class="text-xl text-gray-300 mb-6">Running simulations to determine odds...</p>
            
            <div id="oddsResultsContainer" class="text-left text-gray-300 mb-6 hidden">
                <!-- Odds for Player 1 / Team 1 -->
                <div id="oddsPlayer1" class="mb-4 p-3 border border-gray-700 rounded-lg bg-gray-900 hidden">
                    <h3 class="text-2xl font-semibold text-white mb-2"><span id="Player1Name"></span></h3>
                    <p>Probability: <span id="probPlayer1" class="font-bold text-green-400"></span></p>
                    <p>Decimal Odds: <span id="decimalOddsPlayer1" class="font-bold text-yellow-400"></span></p>
                    <p>Fractional Odds: <span id="fractionalOddsPlayer1" class="font-bold text-yellow-400"></span></p>
                    <p>Moneyline Odds: <span id="moneylineOddsPlayer1" class="font-bold text-yellow-400"></span></p>
                    <p id="moneylineNotePlayer1" class="text-sm text-gray-400 mt-1"></p> <!-- New: Moneyline note -->
                </div>

                <!-- Odds for Player 2 / Team 2 -->
                <div id="oddsPlayer2" class="mb-4 p-3 border border-gray-700 rounded-lg bg-gray-900 hidden">
                    <h3 class="text-2xl font-semibold text-white mb-2"><span id="Player2Name"></span></h3>
                    <p>Probability: <span id="probPlayer2" class="font-bold text-green-400"></span></p>
                    <p>Decimal Odds: <span id="decimalOddsPlayer2" class="font-bold text-yellow-400"></span></p>
                    <p>Fractional Odds: <span id="fractionalOddsPlayer2" class="font-bold text-yellow-400"></span></p>
                    <p>Moneyline Odds: <span id="moneylineOddsPlayer2" class="font-bold text-yellow-400"></span></p>
                    <p id="moneylineNotePlayer2" class="text-sm text-gray-400 mt-1"></p> <!-- New: Moneyline note -->
                </div>

                <!-- Odds for Draw -->
                <div id="oddsDraw" class="p-3 border border-gray-700 rounded-lg bg-gray-900 hidden">
                    <h3 class="text-2xl font-semibold text-white mb-2">Draw</h3>
                    <p>Probability: <span id="probDraw" class="font-bold text-green-400"></span></p>
                    <p>Decimal Odds: <span id="decimalOddsDraw" class="font-bold text-yellow-400"></span></p>
                    <p>Fractional Odds: <span id="fractionalOddsDraw" class="font-bold text-yellow-400"></span></p>
                    <p>Moneyline Odds: <span id="moneylineOddsDraw" class="font-bold text-yellow-400"></span></p>
                    <p id="moneylineNoteDraw" class="text-sm text-gray-400 mt-1"></p> <!-- New: Moneyline note -->
                </div>
            </div>

            <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-10">Close</button>
        </div>
    </div>

    <footer class="fixed bottom-0 w-full bg-gray-900 shadow-inner py-4 mt-8">
        <div class="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; <?php echo date("Y"); ?> IWF - Internet Wrestling Federation. All rights reserved.</p>
        </div>
    </footer>

    <script type="module" src="data.js"></script>
    <script type="module" src="app.js"></script>
    <script type="module" src="dom.js"></script>
</body>
</html>

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
    <!-- Animated Background Container -->
    <div class="fixed inset-0 z-0">
        <div class="animated-blob" style="width: 40vw;height: 40vw;top: -10vh;left: -10vw;--color-start: #720697;--color-end: #720697;--duration: 25s;--delay: 0s;--x-start: 0vw;--y-start: 0vh;--scale-start: 1;--x-mid: 20vw;--y-mid: 20vh;--scale-mid: 1.2;--x-end: 10vw;--y-end: 10vh;--scale-end: 1;"></div>
        <div class="animated-blob" style="width: 20vw;height: 30vw;top: 60vh;left: 70vw;--color-start: #1647f9;--color-end: #be03ff;--duration: 30s;--delay: 5s;--x-start: 0vw;--y-start: 0vh;--scale-start: 0.8;--x-mid: -10vw;--y-mid: -20vh;--scale-mid: 1;--x-end: 0vw;--y-end: 0vh;--scale-end: 0.8;"></div>
        <div class="animated-blob" style="width: 50vw;height: 50vw;top: 30vh;left: -30vw;--color-start: #3aa4ff;--color-end: #6a0497;--duration: 40s;--delay: 10s;--x-start: 0vw;--y-start: 0vh;--scale-start: 1.1;--x-mid: 30vw;--y-mid: -10vh;--scale-mid: 0.9;--x-end: 10vw;--y-end: 20vh;--scale-end: 1.1;"></div>
        <div class="animated-blob" style="width: 19vw;height: 35vw;top: -5vh;left: 80vw;--color-start: rgb(59 130 246 / 0.5);--color-end: rgb(59 130 246 / 0.5);--duration: 35s;--delay: 15s;--x-start: 0vw;--y-start: 0vh;--scale-start: 0.9;--x-mid: -20vw;--y-mid: 10vh;--x-end: -10vw;--y-end: -5vh;--scale-end: 0.9;"></div>
    </div>
        <!-- <img src="images/logo.webp" style="height: 70px;"> -->
    <header class="py-4">
        <div class="container mx-auto px-4 text-center">
            <img src="images/logo-5.png" style="width: 280px;" class="container mx-auto px-4">
            Internet Wrestling Federation
        </div>
    </header>

    <main class="container mx-auto px-4 py-8 flex-grow">
        <div id="matchSetup" class="p-6 rounded-lg shadow-xl mb-8 box-shadow: inset -3px 9px 108px 61px rgb(12 4 108 / 46%); border: 1px solid #0037f1; ">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">Match Setup</h2>
            
            <!-- Match Type Selection -->
            <div class="flex justify-center space-x-4 mb-6">
                <div class="text-xl w-100 text-gray-300">Assemble your dream matches and see who comes out on top!</div>
            </div>
            <div class="flex justify-center space-x-4 mb-6">
                <button id="singleMatchBtn" class="btn btn-primary bg-yellow-500 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Singles Match</button>
                <button id="tagTeamMatchBtn" class="btn btn-secondary bg-gray-600 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Tag Team Match</button>
                <button id="randomMatchupBtn" class="btn btn-secondary bg-gray-600 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Random Matchup</button>
            </div>

            <!-- Single Match Layout -->
            <div id="singleMatchLayout" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 border border-gray-700 rounded-lg">
                <div id="player1DropZone" class="drop-zone bg-gray-700 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-64">
                    Drop Wrestler 1 Here
                </div>
                <div id="player2DropZone" class="drop-zone bg-gray-700 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-64">
                    Drop Wrestler 2 Here
                </div>
            </div>

            <!-- Tag Team Match Layout (Hidden by default) -->
            <div id="tagTeamMatchLayout" class="hidden grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-gray-700 rounded-lg">
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
                <button id="startMatchBtn" class="btn btn-primary text-xl shiny-cta">Start Match</button>
                <button id="simulate100xBtn" class="btn btn-secondary glow-on-hover">Simulate 100x</button>
                <button id="resetMatchBtnMain" class="btn btn-secondary text-xl px-8 py-3">Reset All</button>
            </div>
        </div>

        <!-- Wrestler Roster -->
        <div id="rosterContainer" class="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">Wrestler Roster</h2>
            <div id="wrestlerRoster" class="wrestler-roster grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-scroll h-[600px] p-2 rounded-lg" style="position: relative; z-index: 10; pointer-events: auto; overflow-y: scroll; max-height: 800px;">
                <!-- Wrestler cards will be loaded here by JavaScript -->
            </div>
        </div>
    </main>

    <!-- Match Log Modal -->
    <div id="resultModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
        <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-blue-500">
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

            <div class="flex justify-center space-x-4">
                <button id="nextTurnBtn" class="btn btn-primary hidden">Next Turn</button>
                <button id="resetMatchBtnModal" class="btn btn-secondary">Reset Match</button>
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

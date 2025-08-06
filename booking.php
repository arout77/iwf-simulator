<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IWF | Book Your Own PPV Event!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Become a wrestling promoter! Book your dream Pay-Per-View event, drag and drop legendary wrestlers into matches, simulate the outcomes, and manage your finances based on match quality in the Internet Wrestling Federation.">
    <!-- Tailwind CSS CDN for utility classes -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts - Inter for a modern, clean look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <!-- Custom styles for animations and specific elements, consistent with match.php -->
    <link href="style.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .wrestler-card {
            cursor: grab;
        }
        .wrestler-card.dragging {
            opacity: 0.5;
        }
        .drop-zone-highlight {
            border-color: #fcd34d; /* yellow-300 */
            background-color: #374151; /* gray-700 */
        }
        /* Custom scrollbar for roster */
        #wrestlerRoster::-webkit-scrollbar {
            width: 8px;
        }
        #wrestlerRoster::-webkit-scrollbar-track {
            background: #2d3748; /* bg-secondary */
            border-radius: 10px;
        }
        #wrestlerRoster::-webkit-scrollbar-thumb {
            background: #6809fb; /* card-border */
            border-radius: 10px;
        }
        #wrestlerRoster::-webkit-scrollbar-thumb:hover {
            background: #8a00bc; /* dropzone-border */
        }
        /* Ensure modal content is scrollable if it gets too long */
        .modal-content {
            max-height: 90vh;
            overflow-y: auto;
        }
    </style>
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

    <main class="container mx-auto px-4 py-8 flex-grow relative z-10">
        <div id="bookingDashboard" class="p-6 rounded-lg shadow-xl mb-8 border border-blue-700 bg-gray-800">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">Promoter Dashboard</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-700 p-4 rounded-lg text-center">
                    <p class="text-lg text-gray-300">Current Money:</p>
                    <span id="currentMoney" class="text-3xl font-bold text-green-400">$20,000</span>
                </div>
                <div class="bg-gray-700 p-4 rounded-lg text-center">
                    <p class="text-lg text-gray-300">Roster Size:</p>
                    <span id="currentRosterSize" class="text-3xl font-bold text-purple-400">0 / 10 (min)</span>
                </div>
            </div>

            <div class="flex justify-center mb-6">
                <button id="openFreeAgencyModalBtn" class="relative inline-flex items-center justify-center p-0.5 mb-4 me-4 overflow-hidden text-gray-300 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 px-8 py-3 rounded-full shadow-lg">
                    <span class="relative transition-all ease-in duration-75 bg-transparent dark:bg-transparent rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">Free Agency</span>
                </button>
            </div>

            <h3 class="text-xl font-bold text-yellow-400 mb-4 text-center">Book Your PPV Event</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label for="ppvName" class="block text-gray-300 text-sm font-bold mb-2">Event Name:</label>
                    <input type="text" id="ppvName" placeholder="Enter PPV Name (e.g., Wrestlemania)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white">
                </div>
                <div>
                    <label for="venueSelect" class="block text-gray-300 text-sm font-bold mb-2">Select Venue:</label>
                    <select id="venueSelect" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white">
                        <!-- Options will be populated by JavaScript -->
                    </select>
                    <p id="venueDetails" class="text-gray-400 text-sm mt-2"></p>
                </div>
            </div>

            <div class="mb-6">
                <label for="advertisingSpend" class="block text-gray-300 text-sm font-bold mb-2">Advertising Spend ($):</label>
                <input type="range" id="advertisingSpend" min="0" max="10000" value="0" step="100" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg">
                <p class="text-center text-gray-400 mt-2">Current Advertising: $<span id="advertisingValue">0</span></p>
            </div>

            <!-- Match Slots Container -->
            <div id="matchSlotsContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-blue-700 rounded-lg bg-gray-700">
                <h3 class="text-xl font-bold text-yellow-300 mb-3 text-center col-span-full">Match Card</h3>
                <!-- Match 1 -->
                <div class="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2 text-center">Match 1 (Singles)</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div id="match1Player1" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Wrestler 1
                        </div>
                        <div id="match1Player2" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Wrestler 2
                        </div>
                    </div>
                </div>
                <!-- Match 2 -->
                <div class="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2 text-center">Match 2 (Singles)</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div id="match2Player1" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Wrestler 1
                        </div>
                        <div id="match2Player2" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                            Wrestler 2
                        </div>
                    </div>
                </div>
                <!-- Add more match slots as needed, e.g., Tag Team -->
                <div class="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600 col-span-full">
                    <h4 class="text-lg font-semibold text-gray-300 mb-2 text-center">Match 3 (Tag Team)</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col items-center">
                            <p class="text-gray-400 text-sm mb-2">Team A</p>
                            <div class="grid grid-cols-2 gap-2 w-full">
                                <div id="match3TeamA1" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                                    Wrestler A1
                                </div>
                                <div id="match3TeamA2" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                                    Wrestler A2
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col items-center">
                            <p class="text-gray-400 text-sm mb-2">Team B</p>
                            <div class="grid grid-cols-2 gap-2 w-full">
                                <div id="match3TeamB1" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                                    Wrestler B1
                                </div>
                                <div id="match3TeamB2" class="drop-zone bg-gray-600 p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 h-48">
                                    Wrestler B2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center space-x-4">
                <button id="bookPpvBtn" class="btn btn-primary text-xl shiny-cta">Book PPV Event!</button>
                <button id="resetPpvBtn" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 z-10">Reset PPV</button>
            </div>
        </div>

        <!-- Wrestler Roster -->
        <div id="rosterContainer" class="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-bold text-yellow-400 mb-4 text-center">Contracted Roster</h2>
            <div id="wrestlerRoster" class="wrestler-roster grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-scroll h-[600px] p-2 rounded-lg" style="position: relative; z-index: 10; pointer-events: auto; overflow-y: scroll; max-height: 800px;">
                <!-- Contracted wrestler cards will be loaded here by JavaScript -->
                <p class="text-gray-400 text-center col-span-full">Loading contracted wrestlers...</p>
            </div>
        </div>

        <!-- PPV Log / Results Modal -->
        <div id="ppvLogModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
            <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-blue-500 text-center">
                <button class="close-button absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
                <h2 id="ppvLogTitle" class="text-3xl font-bold text-yellow-400 mb-4">PPV Event Results</h2>
                <div id="ppvLog" class="bg-gray-700 p-4 rounded-lg h-64 overflow-y-auto text-sm text-gray-200 mb-6 text-left">
                    <p class="text-center text-gray-500">No PPV has been booked yet.</p>
                </div>
                <button class="close-button btn btn-primary mt-4">Close</button>
            </div>
        </div>

    </main>

    <!-- Free Agency Modal -->
    <div id="freeAgencyModal" class="modal fixed inset-0 flex items-center justify-center hidden z-50">
        <div class="modal-content bg-gray-800 p-8 rounded-lg shadow-xl relative border-2 border-green-500 text-center">
            <button class="close-button absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
            <h2 class="text-3xl font-bold text-green-500 mb-6">Free Agents</h2>
            <div id="freeAgentList" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll h-[400px] p-2 rounded-lg">
                <!-- Free agent cards will be loaded here by JavaScript -->
                <p class="text-gray-400 col-span-full">Loading free agents...</p>
            </div>
            <p class="text-gray-300 mt-4">Current Roster Size: <span id="currentRosterSizeModal">0</span> / 10 (min)</p>
        </div>
    </div>


    <!-- Footer (Consistent with match.php) -->
    <footer class="w-full bg-gray-900 shadow-inner py-4 mt-8 relative z-10">
        <div class="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2025 IWF. All rights reserved. | <a href="#" class="text-purple-400 hover:underline">Privacy Policy</a> | <a href="#" class="text-purple-400 hover:underline">Terms of Service</a></p>
        </div>
    </footer>

    <script type="module" src="data.js"></script>
    <script type="module" src="dom.js"></script>
    <script type="module" src="booking.js"></script>
</body>
</html>

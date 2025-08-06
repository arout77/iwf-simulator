<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>IWF | Internet Wrestling Federation - Online Wrestling Game & Simulation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Step into the ring with IWF! Create your dream wrestling matches and simulate epic battles using historical wrestlers from the Golden Age to present in this ultimate online wrestling simulator.">
    <!-- Tailwind CSS CDN for utility classes -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts - Inter for a modern, clean look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <!-- Custom styles for animations and specific elements, consistent with match.php -->
    <link href="style.css" rel="stylesheet">
    <style>
        /* Ensure body uses Inter font */
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Specific styling for wrestler images in the gallery */
        .wrestler-gallery-img {
            border-radius: 1rem; /* Rounded corners */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Subtle shadow */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .wrestler-gallery-img:hover {
            transform: scale(1.05); /* Slight zoom on hover */
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
        }
        /* Custom animations for fade-in effects */
        @keyframes fadeInFromBottom {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fadeInFromBottom 0.8s ease-out forwards;
            opacity: 0; /* Hidden by default until animation starts */
        }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
    </style>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen flex flex-col overflow-y-auto">
    <!-- Animated Background Container (Consistent with match.php) -->
    <div class="fixed inset-0 z-0">
        <div class="animated-blob" style="width: 40vw;height: 40vw;top: -10vh;left: -10vw;--color-start: #720697;--color-end: #720697;"></div>
        <div class="animated-blob" style="width: 30vw;height: 30vw;bottom: -15vh;right: -15vw;--color-start: #0037f1;--color-end: #0037f1; animation-delay: 2s;"></div>
        <div class="animated-blob" style="width: 50vw;height: 50vw;top: 50%;left: 50%;transform: translate(-50%, -50%);--color-start: #6809fb;--color-end: #6809fb; animation-delay: 4s;"></div>
    </div>

    <!-- Main Content Wrapper -->
    <div class="relative z-10 flex flex-col items-center justify-center flex-grow p-4 md:p-8">
        <!-- Header/Navigation (Simplified for landing page) -->
        <header class="w-full max-w-6xl mx-auto py-6 px-4 flex justify-center md:justify-between items-center bg-transparent">
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

        <!-- Hero Section -->
        <section class="text-center py-16 md:py-24 max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
                Step Into The Ring!
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                Create your dream wrestling matches and simulate epic battles with legendary superstars from wrestling's golden age to the present.
            </p>
            <!-- Using the new shiny-cta class for the main button -->
            <a href="match.php" class="shiny-cta inline-block font-bold py-4 px-10 rounded-full text-xl uppercase tracking-wide transition duration-300 transform hover:scale-105">
                <span>Start Simulating Matches</span>
            </a>
        </section>

        <!-- New Section: Why Play IWF? (Features) -->
        <section id="features" class="py-16 md:py-20 w-full max-w-6xl mx-auto px-4">
            <h2 class="text-4xl font-bold text-center text-white mb-12 animate-fade-in-up animation-delay-600">Why Play IWF? Unleash Your Inner Booker!</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-700 animate-fade-in-up animation-delay-700">
                    <h3 class="text-2xl font-semibold text-white mb-4">Deep Simulation Engine</h3>
                    <p class="text-gray-300">Experience realistic match outcomes driven by detailed wrestler stats, unique move sets, and dynamic in-match conditions. Every decision, every move, every counter matters in the IWF ring!</p>
                </div>
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-green-700 animate-fade-in-up animation-delay-800">
                    <h3 class="text-2xl font-semibold text-white mb-4">Vast Roster of Legends</h3>
                    <p class="text-gray-300">Choose from an ever-growing roster of iconic wrestlers from different eras. Pit Golden Age giants against modern-day phenoms and see who truly reigns supreme.</p>
                </div>
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-700 animate-fade-in-up animation-delay-900">
                    <h3 class="text-2xl font-semibold text-white mb-4">Create Dream Matches</h3>
                    <p class="text-gray-300">Single matches, tag team battles, and more! Handpick your favorite superstars, set up the perfect showdowns, and watch the simulated action unfold.</p>
                </div>
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-yellow-700 animate-fade-in-up animation-delay-1000">
                    <h3 class="text-2xl font-semibold text-white mb-4">Dynamic Match Outcomes</h3>
                    <p class="text-gray-300">From unexpected comebacks to dominant victories, the IWF simulation ensures every match is unpredictable and exciting. Relive classic rivalries or forge new ones!</p>
                </div>
            </div>
        </section>

        <!-- Featured Wrestlers Section -->
        <section id="wrestlers" class="py-16 md:py-20 w-full max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-center text-white mb-12 animate-fade-in-up animation-delay-1100">Meet The Legends</h2>
            <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-yellow-400 animate-fade-in-up animation-delay-1000">
            <img src="images/wwf.png" alt="WWF" class="h-64 m-auto mb-4"> 
            <h3 class="text-2xl font-semibold text-white mb-4">Golden Era (1980s-early 1990s)</h3>
                <p class="text-gray-300">This era, also known as the Hulkamania era, is characterized by the rise of Hulk Hogan and the expansion of the WWF (now WWE) from a regional promotion to a national phenomenon. It featured larger-than-life characters, storylines, and a focus on family-friendly entertainment. Key events include the first WrestleMania and the Rock 'n' Wrestling Connection with MTV. </p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mt-8">
                    <!-- Wrestler 1: Hulk Hogan -->
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/hogan.webp" alt="Hulk Hogan - The Immortal" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Hulk Hogan</h3>
                        <p class="text-gray-400 text-sm">The Immortal</p>
                    </div>
                    <!-- Wrestler 3: Andre The Giant -->
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/andre.webp" alt="Andre The Giant - Eighth Wonder of the World" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Andre The Giant</h3>
                        <p class="text-gray-400 text-sm">The Eighth Wonder of the World</p>
                    </div>
                    <!-- Wrestler 4: Randy Savage -->
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/savage.webp" alt="Randy 'Macho Man' Savage" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Randy Savage</h3>
                        <p class="text-gray-400 text-sm">Macho Man</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/duggan.webp" alt="Hacksaw Jim Duggan - USA!" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Jim Duggan</h3>
                        <p class="text-gray-400 text-sm">Hoooo!</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/dibiase.webp" alt="Ted DiBiase" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Ted DiBiase</h3>
                        <p class="text-gray-400 text-sm">Million Dollar Man</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/bundy.webp" alt="King Kong Bundy" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">King Kong Bundy</h3>
                        <p class="text-gray-400 text-sm">The Walking Condominium</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/piper.webp" alt="Rowdy Roddy Piper" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Rowdy Roddy Piper</h3>
                        <p class="text-gray-400 text-sm">Hot Rod</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/steamboat.webp" alt="Ricky Steamboat" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Ricky Steamboat</h3>
                        <p class="text-gray-400 text-sm">The Dragon</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/warrior.webp" alt="Ultimate Warrior" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Ultimate Warrior</h3>
                        <p class="text-gray-400 text-sm">One Warrior Nation</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/bossman.webp" alt="Big Boss Man" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Big Boss Man</h3>
                        <p class="text-gray-400 text-sm">Hard Time</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/orndorff.webp" alt="Paul Orndorff" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Paul Orndorff</h3>
                        <p class="text-gray-400 text-sm">Mr. Wonderful</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/snuka.webp" alt="Jimmy Snuka" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Jimmy Snuka</h3>
                        <p class="text-gray-400 text-sm">Superfly</p>
                    </div>
                </div>
            <h3 class="text-2xl font-semibold text-white mb-4 mt-10">New Generation Era (early to mid 1990s)</h3>
                <p class="text-gray-300">This era saw a shift towards younger, more athletic wrestlers as Hulk Hogan's popularity waned. Bret Hart, Shawn Michaels, and The Undertaker became prominent figures. While still maintaining a degree of larger-than-life characters, the New Generation era featured more technical wrestling and storylines.</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mt-8">
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/brethart.webp" alt="Bret Hart" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Bret Hart</h3>
                        <p class="text-gray-400 text-sm">The Hitman</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/michaels.webp" alt="Shawn Michaels" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Shawn Michaels</h3>
                        <p class="text-gray-400 text-sm">The Heartbreak Kid</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/undertaker.webp" alt="Undertaker" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Undertaker</h3>
                        <p class="text-gray-400 text-sm">Dead Man</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/diesel.webp" alt="Diesel" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Diesel</h3>
                        <p class="text-gray-400 text-sm">Big Daddy Cool</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/razor.webp" alt="Razor Ramon" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Razor Ramon</h3>
                        <p class="text-gray-400 text-sm">The Bad Guy</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/yokozuna.webp" alt="Yokozuna" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Yokozuna</h3>
                        <p class="text-gray-400 text-sm">Banzai!</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/hennig.webp" alt="Curt Hennig" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Curt Hennig</h3>
                        <p class="text-gray-400 text-sm">Mr. Perfect</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/owenhart.webp" alt="Owen Hart" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Owen Hart</h3>
                        <p class="text-gray-400 text-sm">The King of Harts</p>
                    </div>
                </div>
            <img src="images/wwe.png" alt="WWE" class="h-64 m-auto mb-4 mt-8">
            <h3 class="text-2xl font-semibold text-white mb-4 mt-10">Attitude Era (mid 1990s-early 2000s)</h3>
                <p class="text-gray-300">This era was defined by edgier, more mature content, including storylines involving sex, drugs, and alcohol. Stone Cold Steve Austin, The Rock, and D-Generation X became major attractions, challenging the traditional good vs. evil dynamic. The Attitude Era was a response to the Monday Night Wars with WCW and saw a surge in popularity for WWE.</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mt-8">
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/austin.webp" alt="Steve Austin" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Steve Austin</h3>
                        <p class="text-gray-400 text-sm">Stone Cold</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/rock.webp" alt="The Rock" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">The Rock</h3>
                        <p class="text-gray-400 text-sm">The People's Champion</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/h.webp" alt="Triple H" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Triple H</h3>
                        <p class="text-gray-400 text-sm">Dx</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/foley.webp" alt="Mick Foley" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Mick Foley</h3>
                        <p class="text-gray-400 text-sm">Hardcore Legend</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                        <img src="images/kane.webp" alt="Kane" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Kane</h3>
                        <p class="text-gray-400 text-sm">Big Red Machine</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                        <img src="images/bigshow.webp" alt="Big Show" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Big Show</h3>
                        <p class="text-gray-400 text-sm">The World's Largest Athlete</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                        <img src="images/chyna.webp" alt="Chyna" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Chyna</h3>
                        <p class="text-gray-400 text-sm">Eighth Wonder of The World</p>
                    </div>
                    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                        <img src="images/dustinrhodes.webp" alt="Gold Dust" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                        <h3 class="text-xl font-semibold text-white">Goldust</h3>
                        <p class="text-gray-400 text-sm">The Prince of Perversion</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                <!-- Wrestler 1: Hulk Hogan -->
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                    <img src="images/hogan.webp" alt="Hulk Hogan - The Immortal" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Hulk Hogan</h3>
                    <p class="text-gray-400 text-sm">The Immortal</p>
                </div>
                <!-- Wrestler 2: Ric Flair -->
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                    <img src="images/flair.webp" alt="Ric Flair - The Nature Boy" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Ric Flair</h3>
                    <p class="text-gray-400 text-sm">The Nature Boy</p>
                </div>
                <!-- Wrestler 3: Andre The Giant -->
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                    <img src="images/andre.webp" alt="Andre The Giant - Eighth Wonder of the World" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Andre The Giant</h3>
                    <p class="text-gray-400 text-sm">The Eighth Wonder of the World</p>
                </div>
                <!-- Wrestler 4: Randy Savage -->
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                    <img src="images/savage.webp" alt="Randy 'Macho Man' Savage" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Randy Savage</h3>
                    <p class="text-gray-400 text-sm">Macho Man</p>
                </div>
                <!-- Additional Wrestlers -->
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                    <img src="images/cena.webp" alt="John Cena - Never Give Up" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">John Cena</h3>
                    <p class="text-gray-400 text-sm">Never Give Up</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                    <img src="images/duggan.webp" alt="Hacksaw Jim Duggan - USA!" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Jim Duggan</h3>
                    <p class="text-gray-400 text-sm">Hoooo!</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                    <img src="images/luger.webp" alt="Lex Luger - The Total Package" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Lex Luger</h3>
                    <p class="text-gray-400 text-sm">The Total Package</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                    <img src="images/rock.webp" alt="The Rock" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">The Rock</h3>
                    <p class="text-gray-400 text-sm">People's Champion</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1200">
                    <img src="images/sting.webp" alt="Sting" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Sting</h3>
                    <p class="text-gray-400 text-sm">The Icon</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1300">
                    <img src="images/lesnar.webp" alt="Brock Lesnar" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">Brock Lesnar</h3>
                    <p class="text-gray-400 text-sm">The Beast</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1400">
                    <img src="images/austin.webp" alt="Steve Austin" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">"Stone Cold" Steve Austin</h3>
                    <p class="text-gray-400 text-sm">Austin 3:16</p>
                </div>
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-purple-700 p-4 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up animation-delay-1500">
                    <img src="images/undertaker.webp" alt="The Undertaker" class="w-full h-48 object-cover object-top rounded-lg mb-4 wrestler-gallery-img">
                    <h3 class="text-xl font-semibold text-white">The Undertaker</h3>
                    <p class="text-gray-400 text-sm">Dead Man Walking</p>
                </div>
            </div>
        </section>

        <!-- New Section: What Players Are Saying (Testimonials) -->
        <section id="testimonials" class="py-16 md:py-20 w-full max-w-4xl mx-auto text-center px-4">
            <h2 class="text-4xl font-bold text-white mb-12 animate-fade-in-up animation-delay-1200">What Players Are Saying</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-red-700 animate-fade-in-up animation-delay-1300">
                    <p class="text-xl text-gray-300 italic mb-4">"IWF brings back all the nostalgia! Simulating dream matches is incredibly addictive. The detail in the simulation is mind-blowing!"</p>
                    <p class="text-lg font-semibold text-yellow-400">- WrestlingFanatic77</p>
                </div>
                <div class="bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-700 animate-fade-in-up animation-delay-1400">
                    <p class="text-xl text-gray-300 italic mb-4">"Finally, a wrestling game that lets me book my own shows! The roster is fantastic, and the match outcomes are always surprising."</p>
                    <p class="text-lg font-semibold text-yellow-400">- TheBookerQueen</p>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="py-16 md:py-20 w-full max-w-4xl mx-auto text-center px-4 animate-fade-in-up animation-delay-1500">
            <h2 class="text-4xl font-bold text-white mb-8">About IWF</h2>
            <p class="text-lg text-gray-300 leading-relaxed mb-6">
                IWF (Internet Wrestling Federation) is your ultimate destination for wrestling simulation. Dive deep into a world where you can craft dream matches, pit legends against each other, and witness the outcomes of epic battles. Our detailed simulation engine takes into account wrestler stats, unique moves, and dynamic match conditions to deliver an authentic and exciting experience every time.
            </p>
            <p class="text-lg text-gray-300 leading-relaxed">
                Whether you're a casual fan or a hardcore wrestling enthusiast, IWF offers a unique way to relive classic rivalries and imagine new ones. Get ready to create your own wrestling history!
            </p>
        </section>

        <!-- Final Call to Action -->
        <section class="py-16 w-full text-center px-4 animate-fade-in-up animation-delay-1600">
            <h2 class="text-4xl font-bold text-white mb-8">Ready to Make History?</h2>
            <a href="match.php" class="shiny-cta inline-block font-bold py-4 px-10 rounded-full text-xl uppercase tracking-wide transition duration-300 transform hover:scale-105">
                <span>Start Your IWF Journey Now!</span>
            </a>
        </section>

    </div>

    <!-- Footer (Consistent with match.php) -->
    <footer class="w-full bg-gray-900 shadow-inner py-4 mt-8 relative z-10">
        <div class="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2025 IWF. All rights reserved. | <a href="#" class="text-purple-400 hover:underline">Privacy Policy</a> | <a href="#" class="text-purple-400 hover:underline">Terms of Service</a></p>
        </div>
    </footer>
</body>
</html>

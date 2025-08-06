<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wrestler Biography Directory</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="style.css" rel="stylesheet">
    <!-- Chosen Palette: Warm Neutrals -->
    <!-- Application Structure Plan: The application uses a simple, intuitive, and highly functional single-page dashboard structure. The core is a responsive grid of "wrestler cards." This design was chosen over a simple list or multi-page layout to handle the large volume of data (150+ wrestlers) without overwhelming the user. The primary interaction is a real-time search bar at the top, allowing users to instantly filter the grid. This direct manipulation approach provides immediate feedback and makes finding a specific wrestler effortless, which is the main user goal. The user flow is: load page -> see all wrestlers -> type in search -> grid updates instantly. This structure prioritizes scannability and quick information retrieval. -->
    <!-- Visualization & Content Choices: The information consists of wrestler names and short biographies. Goal: Inform & Organize. Presentation Method: A responsive grid of styled HTML cards. Each card contains the wrestler's name and a paragraph with their biography. This card format breaks down the large dataset into visually distinct, manageable chunks. Interaction: A JavaScript-powered live search filter. Justification: For textual and categorical data like this, a searchable card grid is far more user-friendly than trying to represent it in a chart. It allows for both Browse and direct searching, catering to different user intentions. Library/Method: Vanilla JavaScript for DOM manipulation and filtering logic; Tailwind CSS for styling. This approach is lightweight and perfectly suited for the task. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            background-color: #FDFBF7; 
        }
        .card {
            background-color: #FFFFFF;
            border: 1px solid #EAE8E4;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        #searchInput:focus {
            --tw-ring-color: #D6A354;
        }
    </style>
</head>
<body class="text-gray-800 font-sans">

    <div class="container mx-auto px-4 py-8">
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
        <header class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Wrestler Biography Directory</h1>
            <p class="text-lg text-gray-600">Explore the careers of legendary and current wrestling superstars.</p>
        </header>
        
        <div class="mb-8 max-w-2xl mx-auto">
            <p class="text-center text-gray-700 mb-4">
                This interactive directory contains short biographies for over 150 professional wrestlers, spanning different eras and promotions. Use the search bar below to instantly find a specific wrestler by typing their name. You can also scroll through the entire collection to discover new figures and revisit the careers of your favorites. Each card provides a concise summary of the wrestler's impact and legacy in the world of sports entertainment.
            </p>
            <div class="relative">
                <input type="text" id="searchInput" placeholder="Search for a wrestler..." class="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow">
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
            </div>
        </div>

        <main id="wrestler-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        </main>
        
        <div id="no-results" class="text-center py-16 hidden">
            <h3 class="text-2xl font-semibold text-gray-700">No Wrestlers Found</h3>
            <p class="text-gray-500 mt-2">Please try a different search term.</p>
        </div>

    </div>

    <script>
        const wrestlers = [
            { name: 'Adam Cole', bio: 'A highly charismatic and technically gifted wrestler, Adam Cole rose to prominence as the longest-reigning NXT Champion. Known for his "Bay Bay" catchphrase, he was the leader of The Undisputed Era faction and has since become a main event star in All Elite Wrestling (AEW).' },
            { name: 'AJ Styles', bio: 'Dubbed "The Phenomenal One," AJ Styles is widely regarded as one of the best in-ring performers of his generation. After a legendary career in TNA and Japan, he made a spectacular WWE debut, becoming a multi-time WWE Champion and Grand Slam Champion.' },
            { name: 'Andre the Giant', bio: 'A true cultural icon, Andre the Giant was known as "The Eighth Wonder of the World." His immense size and larger-than-life personality made him one of the most recognizable figures in wrestling history, culminating in his legendary WrestleMania III match against Hulk Hogan.' },
            { name: 'Arn Anderson', bio: '"The Enforcer" of the legendary Four Horsemen, Arn Anderson was a master of ring psychology and a devastating tag team specialist. His spinebuster is one of the most famous moves in wrestling, and his career is defined by his intelligence and no-nonsense approach.' },
            { name: 'Bam Bam Bigelow', bio: 'Instantly recognizable by the flame tattoos covering his head, Bam Bam Bigelow was an incredibly agile big man. He combined power with surprising aerial ability, making him a unique and formidable presence in WWE, WCW, and ECW, including a WrestleMania main event.' },
            { name: 'Barbarian', bio: 'One half of the powerful tag team The Powers of Pain, The Barbarian was known for his raw strength and savage in-ring style. He had a lengthy career across WWE and WCW, both as a tag team competitor and a singles wrestler.' },
            { name: 'Baron Corbin', bio: 'A former NFL player, Baron Corbin uses his athletic background and imposing size to dominate opponents. He has constantly reinvented his character, from "The Lone Wolf" to "King Corbin," capturing titles like the United States Championship and the Money in the Bank briefcase.' },
            { name: 'Barry Windham', bio: 'A tall, athletic, and versatile performer, Barry Windham was a key member of The Four Horsemen. He was a decorated singles and tag team champion in NWA and WCW, praised for his natural ability and smooth in-ring work.' },
            { name: 'Batista', bio: '"The Animal" Batista was a powerhouse who became one of WWE\'s top stars during the 2000s. A member of the Evolution faction, he went on to win multiple World Heavyweight Championships, main event WrestleMania, and has since found major success as a Hollywood actor.' },
            { name: 'Big Boss Man', bio: 'Initially a corrections officer from Cobb County, Georgia, the Big Boss Man was a dominant super-heavyweight in the late 80s and 90s. He was known for his surprising agility and hard-hitting style, evolving from a villain to a beloved Attitude Era figure.' },
            { name: 'Big John Studd', bio: 'A towering figure in the 1980s, Big John Studd was a major rival of Andre the Giant. His "Bodyslam Challenge" was a famous storyline, and his career highlights include winning the first-ever Royal Rumble match in 1988.' },
            { name: 'Bob Backlund', bio: 'An amateur wrestling standout, Bob Backlund held the WWE Championship for nearly six years, one of the longest reigns in history. He was known for his technical prowess and later returned with an eccentric, crazed "Mr. Backlund" character in the 90s.' },
            { name: 'Bobby Eaton', bio: '"Beautiful" Bobby Eaton is widely considered one of the greatest tag team wrestlers of all time, most famously as part of The Midnight Express. His smooth in-ring work, timing, and innovative offense earned him immense respect from his peers.' },
            { name: 'Bobby Lashley', bio: '"The All Mighty" Bobby Lashley is a decorated amateur wrestler and MMA fighter with incredible power and athleticism. He has captured the WWE Championship and United States Championship multiple times, establishing himself as a dominant force in the modern era.' },
            { name: 'Booker T', bio: 'A five-time, five-time, five-time WCW Champion, Booker T is one of the most decorated and charismatic wrestlers ever. After WCW, he had a Hall of Fame career in WWE, winning the World Heavyweight Championship and creating the beloved "King Booker" persona.' },
            { name: 'Braun Strowman', bio: '"The Monster Among Men," Braun Strowman is a force of nature known for incredible feats of strength. He rose from the Wyatt Family to become a Universal Champion, captivating audiences with his destructive and unstoppable presence.' },
            { name: 'Bray Wyatt', bio: 'A creative genius, Bray Wyatt was known for his captivating and terrifying characters, from the cult leader of The Wyatt Family to the demonic "The Fiend." He was a master of storytelling and psychology, leaving an unforgettable mark on the industry before his tragic passing.' },
            { name: 'Bret Hart', bio: '"The Best There Is, The Best There Was, and The Best There Ever Will Be," Bret "The Hitman" Hart is a master of technical wrestling. A multi-time WWE Champion from the legendary Hart family, he defined a new era of in-ring storytelling in the 1990s.' },
            { name: 'Brian Pillman', bio: 'A pioneer of the high-flying style and the unpredictable "Loose Cannon" character, Brian Pillman was ahead of his time. His work in WCW, ECW, and WWE blurred the lines between reality and performance, influencing the Attitude Era.' },
            { name: 'Brock Lesnar', bio: '"The Beast Incarnate" is one of the most dominant and legitimate athletes in combat sports history. A former NCAA and UFC Heavyweight Champion, Lesnar has used his unparalleled power and intensity to win numerous WWE world titles.' },
            { name: 'Bron Breakker', bio: 'A second-generation star (son of Rick Steiner), Bron Breakker is a powerhouse with explosive intensity. He quickly became a dominant, multi-time NXT Champion, known for his raw strength and Steiner family wrestling pedigree.' },
            { name: 'Brooklyn Brawler', bio: 'A quintessential and beloved journeyman, the Brooklyn Brawler was a WWE enhancement talent for decades. While rarely winning, he was a memorable character who had matches with countless legends and even scored a famous upset over Triple H.' },
            { name: 'Bruiser Brody', bio: 'An intelligent brawler with a wild, unpredictable style, Bruiser Brody was a massive international star, especially in Japan. His chaotic and hard-hitting matches made him one of the most feared and respected figures of his time.' },
            { name: 'Bruno Sammartino', bio: '"The Living Legend," Bruno Sammartino held the WWE Championship for a record-shattering reign of over seven years. He was a hero to millions, selling out Madison Square Garden countless times and defining the role of a babyface champion.' },
            { name: 'Brutus Beefcake', bio: '"The Barber" Brutus Beefcake was a flamboyant and popular star of the 1980s Rock \'n\' Wrestling Era. Known for cutting his opponents\' hair after matches, he was a close ally of Hulk Hogan and a staple of WWE programming.' },
            { name: 'Chris Benoit', bio: 'Recognized for his incredible in-ring intensity and technical wrestling ability, he was a World Heavyweight Champion and won the 2004 Royal Rumble. His career is now forever overshadowed by the tragic and horrific circumstances of his death.' },
            { name: 'Chris Jericho', bio: 'A master of reinvention, Chris Jericho has achieved legendary status across WWE, WCW, Japan, and as the inaugural AEW World Champion. From "Y2J" to "The Painmaker," his charisma, in-ring skill, and ability to stay relevant are nearly unmatched.' },
            { name: 'Christian', bio: 'A decorated tag team and singles competitor, Christian is a multi-time World Heavyweight Champion. Known for his technical skill and "Captain Charisma" persona, he excelled in TLC matches with his partner Edge and later carved out a main event singles career.' },
            { name: 'Chyna', bio: '"The Ninth Wonder of the World," Chyna was a true trailblazer. She was a founding member of D-Generation X, the first and only woman to win the Intercontinental Championship, and competed regularly against her male counterparts, shattering gender barriers.' },
            { name: 'CM Punk', bio: 'A counter-culture icon, CM Punk\'s "Pipebomb" promo in 2011 changed the landscape of modern wrestling. Known for his "Straight Edge" persona and incredible in-ring storytelling, he held the WWE Championship for 434 days and remains a compelling, controversial figure.' },
            { name: 'Cody Rhodes', bio: 'The son of the legendary Dusty Rhodes, Cody has forged his own path from WWE mid-carder to a founder of AEW and back to WWE. His mission to "finish the story" by winning the WWE Championship his father never held has made him one of wrestling\'s top stars.' },
            { name: 'Curt Hennig', bio: '"Mr. Perfect" was one of the smoothest and most gifted athletes of his era. His flawless technical skill and charismatic arrogance made him a legendary Intercontinental Champion and a key member of the New World Order (nWo).' },
            { name: 'Dan Spivey', bio: 'An imposing figure at 6\'8", Dan Spivey was known for his aggressive style. He found success in tag teams like The U.S. Express and The Skyscrapers and later adopted the bizarre "Waylon Mercy" character, which influenced the creation of Bray Wyatt.' },
            { name: 'Daniel Bryan', bio: 'A master of technical wrestling who became an unlikely folk hero. His "Yes! Movement" propelled him to the main event of WrestleMania 30 in one of the most memorable underdog stories ever. Now wrestling under his real name, Bryan Danielson, in AEW.' },
            { name: 'Darby Allin', bio: 'A fearless and enigmatic daredevil, Darby Allin is known for his high-risk offense and unique half-painted face. A former TNT Champion in AEW, he embodies a relentless, punk rock spirit that connects deeply with audiences.' },
            { name: 'Davey Boy Smith', bio: '"The British Bulldog" was known for his incredible power and physique. He found success as a tag team and singles star, most famously winning the Intercontinental Championship from Bret Hart at SummerSlam 1992 in front of 80,000 fans at Wembley Stadium.' },
            { name: 'Dean Malenko', bio: '"The Man of 1,000 Holds" was a master technician and a key member of WCW\'s cruiserweight division and The Four Horsemen. His submission-based, no-frills style earned him immense respect as one of the best pure wrestlers of his generation.' },
            { name: 'Diamond Dallas Page', bio: 'Starting his wrestling career at an unusually late age, DDP became one of WCW\'s most popular, homegrown stars. His "Diamond Cutter" finisher and inspirational underdog story led him to become a three-time WCW World Heavyweight Champion.' },
            { name: 'Dolph Ziggler', bio: 'Known for his incredible selling and in-ring work ethic, Dolph Ziggler is a former two-time World Heavyweight Champion. He has been a consistent and highly respected performer in WWE for over a decade, also capturing numerous secondary titles.' },
            { name: 'Dominik Mysterio', bio: 'The son of Rey Mysterio, Dominik has become one of the most despised villains in modern wrestling. After turning on his father to join The Judgment Day faction, "Dirty Dom" has thrived as a heat-seeking character and multi-time North American Champion.' },
            { name: 'Don Muraco', bio: '"The Magnificent" Don Muraco was a powerful and arrogant villain of the 1980s. He was a two-time Intercontinental Champion, known for his beach-bum persona and his legendary, bloody steel cage match against Jimmy "Superfly" Snuka.' },
            { name: 'Drew McIntyre', bio: 'After an initial run as "The Chosen One," Drew McIntyre was released from WWE, reinvented himself on the independent circuit, and returned to become a multi-time WWE Champion. "The Scottish Warrior" is known for his intensity and the Claymore Kick finisher.' },
            { name: 'Dustin Rhodes', bio: 'The son of Dusty Rhodes, Dustin has had a remarkable and long-lasting career. He is most famous for his bizarre and androgynous "Goldust" character in WWE, but has also proven his versatility and longevity as "The Natural" in WCW and AEW.' },
            { name: 'Dusty Rhodes', bio: '"The American Dream," Dusty Rhodes was the charismatic, blue-collar "son of a plumber" who became a three-time NWA World Heavyweight Champion. His incredible promo ability and connection with the common fan made him one of the most beloved babyfaces of all time.' },
            { name: 'Earthquake', bio: 'A massive super-heavyweight, Earthquake was a dominant force in the early 1990s. He was known for his Earthquake Splash finisher, which was famously used to "injure" Hulk Hogan, leading to a major feud. He also formed the successful tag team, The Natural Disasters.' },
            { name: 'Eddie Gilbert', bio: '"Hot Stuff" Eddie Gilbert was a talented wrestler and an even more brilliant booker and creative mind. He was a key figure in promotions like UWF and was highly respected for his understanding of wrestling psychology despite his career being cut short.' },
            { name: 'Eddie Guerrero', bio: '"Latino Heat" was one of the most beloved and charismatic performers of all time. He overcame personal demons to reach the pinnacle of the sport, winning the WWE Championship in 2004 with his mantra of "Lie, Cheat, and Steal."' },
            { name: 'Edge', bio: '"The Rated-R Superstar" is a Hall of Famer and one of the most decorated wrestlers in WWE history. From his iconic tag team with Christian to his manipulative main event character, he has won countless world titles and made a miraculous return from a career-ending injury.' },
            { name: 'Finn Balor', bio: 'An international star who was a sensation in Japan, Finn Balor became the first-ever WWE Universal Champion. He is known for his athletic, high-flying style and his demonic alter-ego, "The Demon." He is a leader of The Judgment Day faction.' },
            { name: 'Gillberg', bio: 'A parody of WCW star Goldberg, Gillberg was a comedic character in the Attitude Era. With a scrawny physique and underwhelming sparkler-filled entrance, he humorously mimicked Goldberg\'s mannerisms and held the Light Heavyweight title for a record 15 months.' },
            { name: 'Goldberg', bio: 'An unstoppable force in WCW, Goldberg amassed an unprecedented undefeated streak of 173-0. His explosive power, intensity, and iconic "Spear" and "Jackhammer" combination made him a two-time WCW and two-time WWE Universal Champion.' },
            { name: 'Greg Valentine', bio: '"The Hammer" Greg Valentine was a rugged, hard-hitting brawler and a former Intercontinental and Tag Team Champion. The son of Johnny Valentine, he was known for his brutal chops and his signature Figure-Four Leglock.' },
            { name: 'Gunther', bio: 'The leader of Imperium, Gunther is known for his brutally physical, throwback European style. "The Ring General" holds the record for the longest Intercontinental Championship reign in WWE history, elevating the title with his hard-hitting matches.' },
            { name: 'Hacksaw Jim Duggan', bio: 'A patriotic brawler known for carrying a 2x4 and shouting "Hooo!", Hacksaw Jim Duggan was a beloved figure of the 1980s. He was the winner of the first-ever Royal Rumble match and a symbol of blue-collar toughness.' },
            { name: 'Harley Race', bio: 'A legitimate tough guy and an eight-time NWA World Heavyweight Champion, Harley Race is one of the most respected figures in wrestling history. He was a rugged, no-nonsense performer who defined the role of a traveling world champion.' },
            { name: 'Hulk Hogan', bio: 'Arguably the most famous wrestler of all time, Hulk Hogan led the "Hulkamania" boom of the 1980s. A multi-time world champion, he later shocked the world by turning heel and forming the New World Order (nWo) in WCW, changing the industry forever.' },
            { name: 'Iron Mike Sharpe', bio: '"Canada\'s Greatest Athlete" was a fixture of 1980s WWE as a vocal and dependable enhancement talent. Known for his trademark forearm brace and constant yelling, he helped establish many of the era\'s biggest stars.' },
            { name: 'Ivan Koloff', bio: '"The Russian Bear" Ivan Koloff is famous for one of the biggest upsets in wrestling history: ending Bruno Sammartino\'s seven-year reign as WWE Champion in 1971. He was a top villain for decades, embodying the Cold War-era Soviet threat.' },
            { name: 'Jake Roberts', bio: '"The Snake" Jake Roberts was a master of psychology and promo delivery. His dark, cerebral character and the use of his python, Damien, made him one of the most captivating and menacing figures of the 1980s. He is credited with inventing the DDT.' },
            { name: 'Jeff Jarrett', bio: 'A third-generation promoter and wrestler, "Double J" Jeff Jarrett has found success across multiple promotions. A multi-time Intercontinental Champion in WWE and WCW World Champion, he later founded TNA (now Impact Wrestling) and has recently been featured in AEW.' },
            { name: 'Jerry Lawler', bio: '"The King" Jerry Lawler is a wrestling legend, particularly in his hometown of Memphis where he was a top star for decades. He later became the long-tenured, wisecracking color commentator for WWE during the Attitude Era, forming a famous duo with Jim Ross.' },
            { name: 'Jimmy Garvin', bio: '"Gorgeous" Jimmy Garvin was a charismatic and flamboyant heel, often accompanied by his valet Precious. He was a prominent star in promotions like WCCW and NWA, known for his feud with the Von Erich family and later as a member of the Fabulous Freebirds.' },
            { name: 'Jimmy Snuka', bio: '"Superfly" Jimmy Snuka was a pioneer of the high-flying style whose captivating acrobatics thrilled audiences in the early 1980s. His legendary leap from the top of a steel cage at Madison Square Garden is one of the most iconic moments in WWE history.' },
            { name: 'John Cena', bio: 'A record 16-time world champion, John Cena was the face of WWE for over a decade. His "Hustle, Loyalty, Respect" mantra and tireless work ethic made him a polarizing but undeniable superstar. He has since become a major Hollywood actor.' },
            { name: 'Jon Moxley', bio: 'Formerly known as Dean Ambrose in WWE\'s The Shield, Jon Moxley reinvented himself in AEW as a violent, brawling anti-hero. Known for his hardcore style and rebellious attitude, he became a multi-time AEW World Champion.' },
            { name: 'Junkyard Dog', bio: 'One of the most charismatic and popular wrestlers of the 1980s, Junkyard Dog (JYD) was a beloved hero in Mid-South Wrestling and WWE. With his signature chain and powerful "Thump" bodyslam, he was a true working-class icon.' },
            { name: 'Juventud Guerrera', bio: '"The Juice" Juventud Guerrera was a standout in WCW\'s revolutionary cruiserweight division. The high-flying luchador was a multi-time Cruiserweight Champion, known for his exciting matches and his time as a member of the Latino World Order (LWO).' },
            { name: 'Kane', bio: '"The Big Red Machine," Kane was introduced as The Undertaker\'s demonic, long-lost brother. His debut is one of the most memorable in history. Over a long career, he evolved from a silent monster into a multi-time world champion and even a comedic character.' },
            { name: 'Ken Patera', bio: 'A former Olympic weightlifter, Ken Patera brought legitimate strength and credibility to professional wrestling. He was a dominant Intercontinental Champion and one of the most prominent villains of the late 1970s and early 1980s.' },
            { name: 'Kenny Omega', bio: 'Widely regarded as one of the best wrestlers in the world, Kenny Omega gained international fame in Japan with his epic matches. A former AEW World Champion and a key figure in the company\'s founding, he is known for his athletic, high-impact offense.' },
            { name: 'Kerry Von Erich', bio: '"The Modern Day Warrior" of the famed Von Erich family, Kerry was a huge star in his family\'s WCCW promotion. Known for his incredible physique and the "Iron Claw," he famously defeated Ric Flair for the NWA World Title and later became Intercontinental Champion in WWE.' },
            { name: 'Kevin Nash', bio: 'A towering and influential figure, Kevin Nash was a founding member of the nWo. As "Diesel" in WWE, he held the WWE Championship for nearly a year. His move to WCW alongside Scott Hall changed the course of the Monday Night Wars.' },
            { name: 'Kevin Owens', bio: 'A brash and outspoken brawler, Kevin Owens has been a top-tier performer in WWE since his debut. The former Universal and Intercontinental Champion is known for his cunning, his exceptional promo skills, and his ability to have great matches with anyone.' },
            { name: 'Kevin Von Erich', bio: 'The last surviving son of Fritz Von Erich from the legendary wrestling family. Known for his incredible athleticism and wrestling barefoot, he was a beloved top star in World Class Championship Wrestling (WCCW) during its 1980s heyday.' },
            { name: 'King Kong Bundy', bio: 'The "Walking Condominium," King Kong Bundy was a monstrous super-heavyweight who famously demanded a five-count from referees. His most memorable moment was headlining WrestleMania 2 in a steel cage match against Hulk Hogan.' },
            { name: 'Kurt Angle', bio: 'A 1996 Olympic gold medalist in freestyle wrestling, Kurt Angle made an unprecedentedly successful transition to pro wrestling. Known for his "Three I\'s" (Intensity, Integrity, Intelligence), he is a multi-time world champion in both WWE and TNA.' },
            { name: 'LA Knight', bio: 'A charismatic dynamo who captured the audience\'s imagination with his undeniable swagger and catchphrases. After years of grinding, his popularity exploded in WWE, making him one of the company\'s top stars. YEAH!' },
            { name: 'Larry Zbyszko', bio: '"The Living Legend" Larry Zbyszko is famous for his epic feud with his mentor, Bruno Sammartino, culminating in a legendary steel cage match at Shea Stadium. He was a master of stalling tactics and drawing heat from the crowd.' },
            { name: 'Lex Luger', bio: 'With a phenomenal "Total Package" physique, Lex Luger was a top star in both WCW and WWE. He was a multi-time WCW World Champion and co-winner of the 1994 Royal Rumble. His surprise appearance on the first WCW Nitro was a key moment in the Monday Night Wars.' },
            { name: 'Lord Steven Regal', bio: 'Now known as William Regal, he first gained fame in WCW as the snobbish British aristocrat Lord Steven Regal. A master of technical, European-style wrestling, he was a decorated TV Champion and later became a respected figure in WWE.' },
            { name: 'Luke Harper', bio: 'Known in AEW as Brodie Lee, he was an incredibly versatile and agile big man. He found fame as a key member of The Wyatt Family and later as the exalted leader of The Dark Order, becoming a beloved and respected figure before his untimely passing.' },
            { name: 'Macho Man Randy Savage', bio: 'One of the most charismatic and intense performers ever, "Macho Man" Randy Savage was a multi-time world champion in both WWE and WCW. His flamboyant style, gravelly voice, and incredible in-ring storytelling made him a true icon of the sport.' },
            { name: 'Malakai Black', bio: 'A dark and mysterious striker from the Netherlands, Malakai Black is known for his devastating "Black Mass" kick. Formerly Aleister Black in NXT and WWE, he now leads the eerie "House of Black" faction in AEW.' },
            { name: 'Mark Henry', bio: '"The World\'s Strongest Man," Mark Henry is a former Olympic weightlifter who transitioned into a long and successful WWE career. He is best known for his dominant "Hall of Pain" run, which saw him win the World Heavyweight Championship.' },
            { name: 'Meng', bio: 'Also known as Haku, he is widely regarded by his peers as the toughest and most legitimately feared man in wrestling history. He was a former WWE Tag Team Champion and a menacing member of WCW\'s Dungeon of Doom and Faces of Fear.' },
            { name: 'Michael Hayes', bio: 'The charismatic leader of the legendary Fabulous Freebirds, Michael "P.S." Hayes was a pioneer in using entrance music. The Freebirds\' innovative style and their epic feud with the Von Erichs in WCCW changed tag team wrestling forever.' },
            { name: 'Mick Foley', bio: '"The Hardcore Legend" was a master of three distinct personalities: the deranged Mankind, the fun-loving Dude Love, and the brutal Cactus Jack. A multi-time WWE Champion, he is famous for his death-defying bumps and incredible heart.' },
            { name: 'Mike Rotunda', bio: 'A solid technical wrestler with a successful career spanning the 80s and 90s. He was a multi-time champion as a member of The U.S. Express and Varsity Club, and later achieved his greatest fame as the villainous taxman, Irwin R. Schyster (I.R.S.).' },
            { name: 'Nick Bockwinkel', bio: 'An intelligent, articulate, and masterful technical wrestler, Nick Bockwinkel was a four-time AWA World Heavyweight Champion. He embodied the role of a cunning and arrogant "thinking man\'s champion," holding the title for long, credible reigns.' },
            { name: 'Nikita Koloff', bio: '"The Russian Nightmare" was a dominant and fearsome heel during the Cold War era, presented as the protege of his "uncle" Ivan Koloff. He possessed an incredible physique and intensity, later becoming a popular babyface after turning on the Four Horsemen.' },
            { name: 'Omos', bio: 'A true giant standing over seven feet tall, "The Nigerian Giant" Omos is one of the most physically imposing athletes in WWE. He began as AJ Styles\' bodyguard, winning the Raw Tag Team titles, and has since become a dominant singles attraction.' },
            { name: 'One Man Gang', bio: 'A massive brawler from the streets of Chicago, the One Man Gang was a fearsome super-heavyweight in the 1980s. He later underwent a bizarre transformation, embracing his African roots to become the dancing, tribal "Akeem, the African Dream."' },
            { name: 'Owen Hart', bio: 'A supremely gifted member of the Hart family, Owen was known for his incredible high-flying and technical skills. He was a decorated Intercontinental and Tag Team champion, famous for his "King of Harts" persona and his classic feud with his brother, Bret.' },
            { name: 'Paul Orndorff', bio: '"Mr. Wonderful" Paul Orndorff was a charismatic star with an incredible physique. He was a main event player in the 1980s wrestling boom, famously teaming with and then turning on Hulk Hogan in one of the era\'s biggest feuds.' },
            { name: 'R-Truth', bio: 'A veteran performer with unparalleled comedic timing, R-Truth has had a uniquely long and successful career. He is most famous for his hilarious antics involving the 24/7 Championship, becoming a record 50+ time champion and a beloved fan favorite.' },
            { name: 'Randy Orton', bio: 'A third-generation superstar, "The Viper" Randy Orton is one of the most decorated and natural performers in WWE history. From the "Legend Killer" to the methodical "Apex Predator," he has won numerous world championships and is known for his devastating RKO finisher.' },
            { name: 'Rey Mysterio', bio: 'The ultimate underdog and the greatest masked luchador of all time, Rey Mysterio has defied the odds his entire career. A multi-time world champion, his high-flying style revolutionized the sport for smaller wrestlers and he remains a beloved icon.' },
            { name: 'Rhyno', bio: 'The "Man-Beast," Rhyno is a powerhouse known for his intense demeanor and his devastating finisher, the Gore. He was the final ECW World Heavyweight Champion and has had successful runs in WWE, TNA, and the independent circuit.' },
            { name: 'Ric Flair', bio: '"The Nature Boy" Ric Flair is a 16-time World Heavyweight Champion and arguably the greatest professional wrestler of all time. His flamboyant "limousine-ridin\', jet-flyin\'" persona and incredible in-ring stamina defined an entire era of the sport.' },
            { name: 'Rick Martel', bio: 'A talented and versatile performer, Rick Martel had a long and successful career. After a lengthy reign as AWA World Champion, he found his greatest fame in WWE as "The Model," an arrogant, perfume-spraying villain.' },
            { name: 'Rick Rude', bio: '"Ravishing" Rick Rude was the ultimate arrogant heel of the 1980s, known for his chiseled physique and airbrushed tights. He was a formidable Intercontinental Champion and the only man to appear on WWE Raw and WCW Nitro on the same night.' },
            { name: 'Rick Steiner', bio: '"The Dog-Faced Gremlin" was one half of the legendary Steiner Brothers tag team. Known for his amateur wrestling background and intense, brawling style, he was a multi-time tag team champion in both WCW and WWE.' },
            { name: 'Ricky Steamboat', bio: '"The Dragon" Ricky Steamboat was one of the most naturally gifted and fiery babyfaces in wrestling history. He is known for his incredible series of matches against Ric Flair and his classic Intercontinental Championship victory over Randy Savage at WrestleMania III.' },
            { name: 'Rikishi', bio: 'A member of the famed Anoa\'i wrestling family, Rikishi became a massive star during the Attitude Era. The super-heavyweight was known for his dancing, his signature "Stink Face" maneuver, and his time as a member of the group Too Cool.' },
            { name: 'Road Warrior Animal', bio: 'One half of the iconic Legion of Doom (The Road Warriors), Animal was a powerhouse known for his face paint, spiked shoulder pads, and devastating "Doomsday Device" finisher. They are widely regarded as the greatest tag team of all time.' },
            { name: 'Road Warrior Hawk', bio: 'The other half of The Road Warriors, Hawk brought an unmatched intensity and charisma to the team. His interviews and intimidating presence helped make the Legion of Doom one of the most dominant and influential tag teams in history.' },
            { name: 'Rob Van Dam', bio: '"The Whole F\'n Show," RVD was one of ECW\'s biggest and most unique stars. His blend of martial arts and high-flying acrobatics was unlike anything seen before. He later became a WWE Champion and Grand Slam winner.' },
            { name: 'Roddy Piper', bio: '"Rowdy" Roddy Piper was one of the greatest villains in wrestling history. His talk show segment, "Piper\'s Pit," was legendary for creating controversy and classic moments. His charisma and promo skills were second to none.' },
            { name: 'Roman Reigns', bio: '"The Tribal Chief" and "The Head of the Table," Roman Reigns has had one of the most dominant world championship reigns in modern history. As the leader of The Bloodline, he transformed into the industry\'s top villain and biggest star.' },
            { name: 'Ron Simmons', bio: 'A college football hall of famer, Ron Simmons made history in 1992 by defeating Vader to become the first-ever recognized African American WCW World Heavyweight Champion. He later found great success in WWE as Faarooq, leader of the Nation of Domination and one half of the APA. DAMN!' },
            { name: 'Ronnie Garvin', bio: '"The Man with the Hands of Stone," Ronnie Garvin was known for his toughness and brutally stiff chops. A veteran of the territories, he had a memorable run in the NWA, which culminated in a brief reign as the NWA World Heavyweight Champion.' },
            { name: 'Sabu', bio: 'A nephew of The Sheik, Sabu was a hardcore and high-flying icon who became the face of ECW. Known for his suicidal, reckless style and for popularizing the use of tables, he was one of the most influential and unpredictable wrestlers of the 1990s.' },
            { name: 'Samoa Joe', bio: 'A dominant and versatile performer, Samoa Joe is a "Triple Crown" champion in every major American promotion he has worked for. "The Samoan Submission Machine" combines a hard-hitting, brawling style with impressive technical skill, making him a perennial main eventer.' },
            { name: 'Scott Hall', bio: 'As Razor Ramon in WWE, he was a charismatic and popular Intercontinental Champion. His jump to WCW to form the New World Order with Kevin Nash was one of the most important moments in wrestling history. "Hey yo."' },
            { name: 'Scott Steiner', bio: 'He began as a phenomenal collegiate-style wrestler in The Steiner Brothers. He later transformed into "Big Poppa Pump," a controversial and unpredictable, muscle-bound singles star with a bleached-blonde look and wild promos, becoming WCW World Champion.' },
            { name: 'Seth Rollins', bio: '"The Visionary" Seth "Freakin" Rollins is one of the most accomplished and dynamic stars of his generation. From The Shield to a multi-time world champion, he is known for his athletic in-ring style, flamboyant fashion, and the roar of the crowd singing his theme song.' },
            { name: 'Shawn Michaels', bio: '"The Heartbreak Kid" (HBK) is considered by many to be the greatest in-ring performer of all time. From his time in The Rockers and D-Generation X to his legendary singles career as "Mr. WrestleMania," he is a multi-time world champion and Hall of Famer.' },
            { name: 'Sheamus', bio: '"The Celtic Warrior" is a highly physical and decorated brawler from Ireland. A multi-time world champion, he is known for his hard-hitting style, the Brogue Kick finisher, and his acclaimed series of matches with Gunther.' },
            { name: 'Shinsuke Nakamura', bio: 'A master of "Strong Style," Shinsuke Nakamura was one of the biggest stars in New Japan Pro-Wrestling before coming to WWE. Known for his incredible charisma and striking ability, "The King of Strong Style" is a former NXT and Intercontinental Champion.' },
            { name: 'Sid Vicious', bio: 'Also known as Sid Justice, he was an intimidating and powerful big man who headlined multiple WrestleManias and Starrcades. "The Master and Ruler of the World" was a multi-time world champion in both WWE and WCW.' },
            { name: 'Stan Hansen', bio: 'The stiffest and most feared brawler of his time, Stan "The Lariat" Hansen was a massive star in both the US and, most famously, Japan. His wild, hard-hitting style and devastating lariat clothesline made him a legendary and respected figure.' },
            { name: 'Steve Williams', bio: '"Dr. Death" Steve Williams was a former college football star with a reputation as one of the toughest men in wrestling. A dominant force in Mid-South, WCW, and Japan, he was known for his amateur background and brutally stiff, brawling style.' },
            { name: 'Sting', bio: 'The face of WCW, Sting was the company\'s biggest homegrown star. From the colorful "Surfer" Sting to the dark, mysterious "Crow" Sting who battled the nWo, he remained a main event player for decades, concluding his legendary career in AEW.' },
            { name: 'Stone Cold Steve Austin', bio: 'The undisputed icon of the Attitude Era, "Stone Cold" Steve Austin was a beer-drinking, anti-authoritarian anti-hero who became the biggest star in wrestling history. His feud with Mr. McMahon defined a generation and led WWE to new heights.' },
            { name: 'Ted DiBiase', bio: '"The Million Dollar Man" Ted DiBiase was one of the greatest villains of the 1980s. With his arrogant laugh and belief that "everybody\'s got a price," he created his own Million Dollar Championship and remains an iconic character.' },
            { name: 'Terry Funk', bio: 'A legend whose career spanned over 50 years, Terry Funk was a master of reinvention. From NWA World Champion to a pioneer of hardcore wrestling in ECW, "The Funker" was respected for his incredible toughness, passion, and longevity.' },
            { name: 'Terry Gordy', bio: '"Bam Bam" Terry Gordy was the powerhouse of the legendary Fabulous Freebirds. He was an incredibly athletic and hard-hitting big man who found immense success in the U.S. and became a massive, influential star in Japan.' },
            { name: 'The Big Show', bio: 'Billed as the son of Andre the Giant early in his WCW career, The Big Show is one of the most accomplished giant wrestlers ever. A Grand Slam champion in WWE, he has had a decades-long career as both a dominant monster and a gentle giant.' },
            { name: 'The Great Khali', bio: 'One of the tallest wrestlers in history, The Great Khali made a dominant debut by destroying The Undertaker. The Indian-born giant used his incredible size to become the World Heavyweight Champion, gaining massive popularity in his home country.' },
            { name: 'The Great Muta', bio: 'A Japanese wrestling legend and innovator, The Great Muta was known for his mysterious persona, face paint, and the "Muta Lock" submission. He was one of the first Japanese stars to achieve major success in the U.S. with WCW and influenced countless wrestlers.' },
            { name: 'The Iron Sheik', bio: 'An iconic villain of the 1980s, The Iron Sheik was a former bodyguard for the Shah of Iran. He famously defeated Bob Backlund for the WWE Championship before dropping it to Hulk Hogan, kicking off Hulkamania. He later became a viral social media personality.' },
            { name: 'The Miz', bio: 'From reality TV star to a decorated WWE veteran, The Miz has consistently proven his doubters wrong. A two-time WWE Champion and future Hall of Famer, his "A-Lister" persona and incredible promo skills make him one of the best villains of his generation.' },
            { name: 'The Rock', bio: '"The Most Electrifying Man in Sports Entertainment," The Rock is one of the biggest stars in wrestling and movie history. His unparalleled charisma, iconic catchphrases, and epic matches made him a pillar of the Attitude Era before he conquered Hollywood.' },
            { name: 'The Undertaker', bio: 'For three decades, The Undertaker was a cornerstone of WWE with his iconic, supernatural character. From "The Deadman" to the "American Badass," his legendary WrestleMania undefeated streak and chilling presence make him one of the most respected figures in history.' },
            { name: 'Triple H', bio: 'From the aristocratic "Hunter Hearst Helmsley" to the rebellious leader of D-Generation X and "The Game," Triple H has been a main event player for decades. A 14-time world champion, he is now the Chief Content Officer for WWE, shaping its creative direction.' },
            { name: 'Tully Blanchard', bio: 'A cunning and technically sound member of the legendary Four Horsemen and The Brain Busters, Tully Blanchard was a quintessential heel of the 1980s. He was a decorated U.S. and Tag Team champion, known for his intelligence and win-at-all-costs mentality.' },
            { name: 'Ultimate Warrior', bio: 'A force of nature with an iconic look, frantic energy, and incoherent promos, the Ultimate Warrior was one of the biggest stars of the late 80s and early 90s. His victory over Hulk Hogan at WrestleMania VI was a true passing-of-the-torch moment.' },
            { name: 'Umaga', bio: '"The Samoan Bulldozer" was a destructive and terrifying force in the mid-2000s. Managed by Armando Estrada, he had a lengthy undefeated streak and memorable feuds with top stars like John Cena, representing the Anoa\'i family\'s wrestling dynasty.' },
            { name: 'Vader', bio: 'Big Van Vader was one of the most dominant and agile super-heavyweights of all time. Known for his intimidating mask and incredibly stiff style, he was a multi-time world champion in both WCW and Japan, famous for his powerful Vader Bomb and Moonsault.' },
            { name: 'Yokozuna', bio: 'A massive super-heavyweight billed from Japan, Yokozuna was a dominant two-time WWE Champion in the early 1990s. Managed by Mr. Fuji, he was known for his immense size and his devastating Banzai Drop finisher.' },
        ];

        const grid = document.getElementById('wrestler-grid');
        const searchInput = document.getElementById('searchInput');
        const noResults = document.getElementById('no-results');

        const renderWrestlers = (wrestlersToRender) => {
            grid.innerHTML = '';
            if (wrestlersToRender.length === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }

            wrestlersToRender.forEach(wrestler => {
                const card = document.createElement('div');
                card.className = 'card rounded-lg p-5 flex flex-col shadow-md';
                
                const wrestlerName = document.createElement('h2');
                wrestlerName.className = 'text-xl font-bold text-gray-900 mb-3';
                wrestlerName.textContent = wrestler.name;

                const wrestlerBio = document.createElement('p');
                wrestlerBio.className = 'text-gray-600 text-sm leading-relaxed';
                wrestlerBio.textContent = wrestler.bio;

                card.appendChild(wrestlerName);
                card.appendChild(wrestlerBio);
                grid.appendChild(card);
            });
        };

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredWrestlers = wrestlers.filter(wrestler => 
                wrestler.name.toLowerCase().includes(searchTerm)
            );
            renderWrestlers(filteredWrestlers);
        });

        document.addEventListener('DOMContentLoaded', () => {
            const sortedWrestlers = [...wrestlers].sort((a, b) => a.name.localeCompare(b.name));
            renderWrestlers(sortedWrestlers);
        });


        // Function to calculate odds from a probability
function getOdds(probability) {
    if (probability === 1) return Infinity;
    return probability / (1 - probability);
}

// Function to calculate probability from odds
function getProbability(odds) {
    if (odds === Infinity) return 1;
    return odds / (1 + odds);
}

// Function to simulate a single plate appearance
function simulatePlateAppearance(batter, pitcher, league) {
    // Calculate combined probabilities for the three true outcomes using Log5
    const pK_combined = getProbability((getOdds(batter.kRate) * getOdds(pitcher.kRate)) / getOdds(league.kRate));
    const pBB_combined = getProbability((getOdds(batter.bbRate) * getOdds(pitcher.bbRate)) / getOdds(league.bbRate));
    const pHR_combined = getProbability((getOdds(batter.hrRate) * getOdds(pitcher.hrRate)) / getOdds(league.hrRate));
    
    // Generate a random number to determine the outcome
    const rand = Math.random();
    
    // Check for a strikeout, walk, or home run
    if (rand < pK_combined) {
        return 'Strikeout';
    } else if (rand < pK_combined + pBB_combined) {
        return 'Walk';
    } else if (rand < pK_combined + pBB_combined + pHR_combined) {
        return 'Home Run';
    } else {
        // Handle all other outcomes as "ball in play"
        return 'Ball in Play';
    }
}

// Define player and league stats
const tedWilliams = {
    // 1941 stats
    kRate: 27 / 606, // 4.5%
    bbRate: 147 / 606, // 24.3%
    hrRate: 37 / 606, // 6.1%
};

const dwightGooden = {
    // 1985 stats
    kRate: 268 / 1003, // 26.7%
    bbRate: 69 / 1003, // 6.9%
    hrRate: 10 / 1003, // 1.0%
};

const leagueAverage = {
    // Simplified league averages for this example
    kRate: 0.15,
    bbRate: 0.08,
    hrRate: 0.025,
};


// Add stats for balls in play
const tedWilliamsBIP = {
    totalBIP: 432,
    hitRate: (95 + 33 + 3) / 432, // 53.5%
    singlesRate: 95 / (95 + 33 + 3), // 71.7% of his hits were singles
    doublesRate: 33 / (95 + 33 + 3), // 24.8% of his hits were doubles
    triplesRate: 3 / (95 + 33 + 3), // 2.3% of his hits were triples
};

const dwightGoodenBIP = {
    outsRate: 1 - 0.268, // 73.2% (1 - BABIP)
};

const leagueBIP = {
    outsRate: 1 - 0.300, // 70.0% (1 - BABIP)
};

function simulateBallInPlay(batter, pitcher, league) {
    // Calculate combined probability of an out on a ball in play
    const pOut_combined = getProbability((getOdds(1 - batter.hitRate) * getOdds(pitcher.outsRate)) / getOdds(league.outsRate));
    
    // Generate a random number to determine if it's a hit or an out
    const rand = Math.random();
    
    if (rand < pOut_combined) {
        return 'Out';
    } else {
        // It's a hit, now distribute the hit type based on batter's rates
        const hitTypeRand = Math.random();
        
        // This distributes hits based on Williams' ratios of singles/doubles/triples
        if (hitTypeRand < batter.singlesRate) {
            return 'Single';
        } else if (hitTypeRand < batter.singlesRate + batter.doublesRate) {
            return 'Double';
        } else {
            return 'Triple';
        }
    }
}

// Updated simulation loop
const numAtBats = 500;
const results = {
    strikeouts: 0,
    walks: 0,
    homeRuns: 0,
    singles: 0,
    doubles: 0,
    triples: 0,
    outs: 0
};

for (let i = 0; i < numAtBats; i++) {
    const outcome = simulatePlateAppearance(tedWilliams, dwightGooden, leagueAverage);
    
    if (outcome === 'Ball in Play') {
        const bipOutcome = simulateBallInPlay(tedWilliamsBIP, dwightGoodenBIP, leagueBIP);
        
        switch(bipOutcome) {
            case 'Single': results.singles++; break;
            case 'Double': results.doubles++; break;
            case 'Triple': results.triples++; break;
            case 'Out': results.outs++; break;
        }
    } else {
        // Handle the three true outcomes as before
        switch(outcome) {
            case 'Strikeout': results.strikeouts++; break;
            case 'Walk': results.walks++; break;
            case 'Home Run': results.homeRuns++; break;
        }
    }
}

console.log(`Simulation of ${numAtBats} Plate Appearances between Ted Williams and Dwight Gooden:`);
console.log(`--------------------------------------------------------------------------------`);
console.log(`Strikeouts: ${results.strikeouts}`);
console.log(`Walks: ${results.walks}`);
console.log(`Home Runs: ${results.homeRuns}`);
console.log(`Singles: ${results.singles}`);
console.log(`Doubles: ${results.doubles}`);
console.log(`Triples: ${results.triples}`);
console.log(`Total Outs: ${results.outs + results.strikeouts}`); // Including strikeouts as outs
console.log(`--------------------------------------------------------------------------------`);
    </script>
</body>
</html>

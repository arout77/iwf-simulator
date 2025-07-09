// data.js

// Function to get a random integer within a range
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Base URL for wrestler images
const IMAGE_BASE_URL = 'https://php-mentor.com/sandbox/wrestling/images/';

/**
 * Helper to extract the last name from a wrestler's full name for image URL.
 * Special handling for user's prospect and specific wrestler names to match image filenames.
 * @param {string} fullName - The full name of the wrestler.
 * @param {object} userWrestler - The user's wrestler object (to check for avatar).
 * @returns {string} The formatted name for the image URL.
 */
export const getLastName = (fullName, userWrestler) => {
    // Special handling for user's prospect
    if (userWrestler && fullName === userWrestler.name && userWrestler.avatar) {
        return userWrestler.avatar; // Use the chosen avatar identifier
    }

    const parts = fullName.split(' ');
    if (parts.length > 1) {
        // Special handling for specific wrestlers to match image filenames
        if (fullName === "Abdullah the Butcher") return "butcher";
        if (fullName === "Adam Cole") return "cole";
        if (fullName === "AJ Styles") return "styles";
        if (fullName === "Andre the Giant") return "andre";
        if (fullName === "Arn Anderson") return "anderson";
        if (fullName === "Bam Bam Bigelow") return "bigelow";
        if (fullName === "Baron Corbin") return "corbin";
        if (fullName === "Batista") return "batista";
        if (fullName === "Big Boss Man") return "bossman";
        if (fullName === "Big John Studd") return "studd";
        if (fullName === "Big Van Vader") return "vader";
        if (fullName === "Bobby Lashley") return "lashley";
        if (fullName === "Booker T") return "bookert";
        if (fullName === "Braun Strowman") return "strowman";
        if (fullName === "Bray Wyatt") return "wyatt";
        if (fullName === "Bret Hart") return "brethart";
        if (fullName === "British Bulldog") return "britishbulldog";
        if (fullName === "Brock Lesnar") return "lesnar";
        if (fullName === "Bruiser Brody") return "brody";
        if (fullName === "Brian Pillman") return "pillman";
        if (fullName === "Chris Benoit") return "benoit";
        if (fullName === "Chris Jericho") return "jericho";
        if (fullName === "Christian") return "christian";
        if (fullName === "Chyna") return "chyna";
        if (fullName === "CM Punk") return "punk";
        if (fullName === "Cody Rhodes") return "codyrhodes";
        if (fullName === "Curt Hennig") return "hennig";
        if (fullName === "Daniel Bryan") return "bryan";
        if (fullName === "Darby Allin") return "allin";
        if (fullName === "Davey Boy Smith") return "daveyboy";
        if (fullName === "Diamond Dallas Page") return "page";
        if (fullName === "Dolph Ziggler") return "ziggler";
        if (fullName === "Dominik Mysterio") return "dominikmysterio";
        if (fullName === "Drew McIntyre") return "mcintyre";
        if (fullName === "Dustin Rhodes") return "dustinrhodes";
        if (fullName === "Dusty Rhodes") return "dustyrhodes";
        if (fullName === "Earthquake") return "earthquake";
        if (fullName === "Eddie Guerrero") return "eddieguerrero";
        if (fullName === "Edge") return "edge";
        if (fullName === "Finn Balor") return "balor";
        if (fullName === "Goldberg") return "goldberg";
        if (fullName === "Gunther") return "gunther";
        if (fullName === "Harley Race") return "harleyrace";
        if (fullName === "Hulk Hogan") return "hogan";
        if (fullName === "Jeff Jarrett") return "jarrett";
        if (fullName === "Jerry Lawler") return "lawler";
        if (fullName === "John Cena") return "cena";
        if (fullName === "Jon Moxley") return "moxley";
        if (fullName === "Junkyard Dog") return "jyd";
        if (fullName === "Kane") return "kane";
        if (fullName === "Kenny Omega") return "omega";
        if (fullName === "Kevin Nash") return "nash";
        if (fullName === "Kevin Owens") return "owens";
        if (fullName === "King Kong Bundy") return "bundy";
        if (fullName === "Kurt Angle") return "angle";
        if (fullName === "LA Knight") return "knight";
        if (fullName === "Lex Luger") return "luger";
        if (fullName === "Malakai Black") return "malakaiblack";
        if (fullName === "Mark Henry") return "markhenry";
        if (fullName === "Mick Foley") return "mickfoley";
        if (fullName === "Omos") return "omos";
        if (fullName === "One Man Gang") return "onemangang";
        if (fullName === "Owen Hart") return "owenhart";
        if (fullName === "Randy Orton") return "orton";
        if (fullName === "Randy Savage") return "savage";
        if (fullName === "Rey Mysterio") return "mysterio";
        if (fullName === "Ric Flair") return "flair";
        if (fullName === "Rick Steiner") return "ricksteiner";
        if (fullName === "Road Warrior Animal") return "animal";
        if (fullName === "Road Warrior Hawk") return "hawk";
        if (fullName === "Roman Reigns") return "reigns";
        if (fullName === "R-Truth") return "rtruth";
        if (fullName === "Sabu") return "sabu";
        if (fullName === "Samoa Joe") return "joe";
        if (fullName === "Scott Hall") return "hall";
        if (fullName === "Scott Steiner") return "scottsteiner";
        if (fullName === "Seth Rollins") return "rollins";
        if (fullName === "Shawn Michaels") return "michaels";
        if (fullName === "Sheamus") return "sheamus";
        if (fullName === "Shinsuke Nakamura") return "nakamura";
        if (fullName === "Stan Hansen") return "hansen";
        if (fullName === "Sting") return "sting";
        if (fullName === "Stone Cold Steve Austin") return "austin";
        if (fullName === "Sid Vicious") return "sid";
        if (fullName === "Terry Funk") return "funk";
        if (fullName === "The Big Show") return "bigshow";
        if (fullName === "The Great Muta") return "muta";
        if (fullName === "The Miz") return "miz";
        if (fullName === "The Rock") return "rock";
        if (fullName === "The Undertaker") return "undertaker";
        if (fullName === "Triple H") return "h";
        if (fullName === "Tully Blanchard") return "blanchard";
        if (fullName === "Ultimate Warrior") return "warrior";
        if (fullName === "Yokozuna") return "yokozuna";
        if (fullName === "Brutus Beefcake") return "beefcake";
        if (fullName === "Greg Valentine") return "valentine";
        if (fullName === "Juventud Guerrera") return "guerrera";
        if (fullName === "Steve Williams") return "williams";
        if (fullName === "Ken Patera") return "patera";
        if (fullName === "Jimmy Garvin") return "jimmygarvin";
        if (fullName === "Ronnie Garvin") return "ronniegarvin";
        if (fullName === "The Iron Sheik") return "sheik";
        if (fullName === "Gillberg") return "gillberg";
        if (fullName === "Brooklyn Brawler") return "brawler";
        if (fullName === "Iron Mike Sharpe") return "sharpe";
        if (fullName === "Eddie Gilbert") return "gilbert"; // Added Eddie Gilbert
        if (fullName === "Barry Windham") return "windham"; // Added Barry Windham
        if (fullName === "Bobby Eaton") return "eaton"; // Added Bobby Eaton
        if (fullName === "Dan Spivey") return "spivey"; // Added Dan Spivey
        if (fullName === "Don Muraco") return "muraco"; // Added Don Muraco
        if (fullName === "Ivan Koloff") return "koloff"; // Added Ivan Koloff
        if (fullName === "Kevin Von Erich") return "vonerich"; // Added Kevin Von Erich
        if (fullName === "Larry Zbyszko") return "zbyszko"; // Added Larry Zbyszko
        if (fullName === "Lord Steven Regal") return "regal"; // Added Lord Steven Regal
        if (fullName === "Luke Harper") return "harper"; // Added Luke Harper
        if (fullName === "Macho Man Randy Savage") return "savage"; // Added Macho Man Randy Savage
        if (fullName === "Meng") return "meng"; // Added Meng
        if (fullName === "Michael Hayes") return "hayes"; // Added Michael Hayes
        if (fullName === "Mike Rotunda") return "rotunda"; // Added Mike Rotunda
        if (fullName === "Nick Bockwinkel") return "bockwinkel"; // Added Nick Bockwinkel
        if (fullName === "Nikita Koloff") return "nikitakoloff"; // Added Nikita Koloff
        if (fullName === "Ivan Koloff") return "ivankoloff"; // Added Ivan Koloff
        if (fullName === "Ricky Steamboat") return "steamboat"; // Added Ricky Steamboat
        if (fullName === "Ron Simmons") return "simmons"; // Added Ron Simmons
        if (fullName === "Terry Gordy") return "gordy"; // Added Terry Gordy
        if (fullName === "The Great Khali") return "khali"; // Added The Great Khali
        if (fullName === "Big Van Vader") return "vader"; // Added Big Van Vader
        if (fullName === "Bron Breakker") return "breakker"; // Added Bron Breakker


        return parts[parts.length - 1].toLowerCase();
    }
    return fullName.toLowerCase();
};


// Data for pro wrestlers including their finishing moves
const wrestlersData = [
    {
        name: "Abdullah the Butcher",
        height: "6'0\"",
        weight: 360,
        description: "The Madman from Sudan. A legendary hardcore brawler known for his unpredictable and violent style, often using foreign objects. Feared for his scarred forehead and ability to withstand immense pain. His matches were chaotic spectacles, making him a global icon in extreme wrestling.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 30,
        brawlingAbility: 94,
        stamina: 70,
        aerialAbility: 5,
        toughness: 92,
        reversalAbility: 20,
        submissionDefense: 90,
        staminaRecoveryRate: 3,
        moves: {
            grapple: [
                { name: "Fork Stab", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }
            ],
            strike: [
                { name: "Headbutt", damage: { min: 10, max: 16 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 6, momentumGain: 5 }
            ],
            highFlying: [
                { name: "Elbow Drop", damage: { min: 8, max: 12 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 5, momentumGain: 4 }
            ],
            finisher: [
                { name: "Sudanese Spike (Throat Thrust)", damage: { min: 28, max: 38 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Adam Cole",
        height: "6'0\"",
        weight: 210,
        description: "Bay Bay! A charismatic and technically sound wrestler, known for his superkicks and a knack for championship gold. Leader of the Undisputed Era, he combines high-flying, technical prowess, and a cocky attitude.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 90,
        brawlingAbility: 70,
        stamina: 85,
        aerialAbility: 80,
        toughness: 75,
        reversalAbility: 85,
        submissionDefense: 75,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Figure-Four Leglock", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }
            ],
            strike: [
                { name: "Superkick", damage: { min: 18, max: 28 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Panama Sunrise (Flipping Piledriver)", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            finisher: [
                { name: "The Last Shot (Knee Brainbuster)", damage: { min: 35, max: 50 }, baseHitChance: 0.55, stat: 'technicalAbility', staminaCost: 30, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "AJ Styles",
        height: "5'11\"",
        weight: 215,
        description: "The Phenomenal One! Known for his incredible athleticism, innovative offense, and ability to adapt to any opponent. A multiple-time world champion across various promotions.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 95,
        brawlingAbility: 75,
        stamina: 90,
        aerialAbility: 90,
        toughness: 80,
        reversalAbility: 90,
        submissionDefense: 80,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Calf Crusher", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }
            ],
            strike: [
                { name: "Phenomenal Forearm", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "Springboard 450 Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }
            ],
            finisher: [
                { name: "Styles Clash", damage: { min: 40, max: 60 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 35, momentumGain: 45, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Andre the Giant",
        height: "7'4\"",
        weight: 520,
        description: "The Eighth Wonder of the World. A true spectacle, his immense size and strength made him an unstoppable force. A beloved figure, he headlined WrestleMania III against Hulk Hogan.",
        baseHp: 1000,
        strength: 100,
        technicalAbility: 40,
        brawlingAbility: 80,
        stamina: 60,
        aerialAbility: 10,
        toughness: 100,
        reversalAbility: 30,
        submissionDefense: 100,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Bearhug", damage: { min: 11, max: 15 }, baseHitChance: 0.8, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 12, max: 16 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 10 },
                { name: "Headbutt", damage: { min: 11, max: 15 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 6, momentumGain: 6 },
                { name: "Choke", damage: { min: 12, max: 16 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 10 },
                { name: "Chop", damage: { min: 10, max: 15 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 6, momentumGain: 6 }
            ],
            highFlying: [
                { name: "Giant Press", damage: { min: 10, max: 15 }, baseHitChance: 0.3, stat: 'strength', staminaCost: 8, momentumGain: 5 }
            ],
            finisher: [
                { name: "Elbow Drop (from standing)", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Arn Anderson",
        height: "6'1\"",
        weight: 245,
        description: "The Enforcer. A master of in-ring psychology and fundamental wrestling, known for his precision, toughness, and being a key member of the Four Horsemen.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 85,
        brawlingAbility: 70,
        stamina: 80,
        aerialAbility: 15,
        toughness: 90,
        reversalAbility: 80,
        submissionDefense: 85,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Spinebuster", damage: { min: 18, max: 30 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            strike: [
                { name: "Left Handed Punch", damage: { min: 10, max: 18 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 7, momentumGain: 6 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Double A Spinebuster", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Bam Bam Bigelow",
        height: "6'3\"",
        weight: 390,
        description: "The Beast from the East. Agile for his size, Bigelow was known for his flaming attire and impressive high-flying maneuvers, making him a unique big man.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 60,
        brawlingAbility: 85,
        stamina: 75,
        aerialAbility: 60,
        toughness: 95,
        reversalAbility: 50,
        submissionDefense: 90,
        staminaRecoveryRate: 5,
        moves: {
            grapple: [
                { name: "Greetings From Kiss (Kiss Goodnight)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Headbutt (from top rope)", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Moonsault", damage: { min: 30, max: 45 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 25, momentumGain: 20 }
            ],
            finisher: [
                { name: "Diving Headbutt", damage: { min: 40, max: 60 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 40, momentumGain: 45, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Barbarian",
        height: "6'2\"",
        weight: 280,
        description: "One half of the Powers of Pain, known for his brute strength and intimidating presence.",
        baseHp: 1000, strength: 88, technicalAbility: 50, brawlingAbility: 85, stamina: 70, aerialAbility: 10, toughness: 90, reversalAbility: 40, submissionDefense: 80, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 20, max: 30 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 10 }],
            strike: [{ name: "Big Boot", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Headbutt off the Top Rope", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Baron Corbin",
        height: "6'8\"",
        weight: 275,
        description: "The Lone Wolf. A former NFL player turned wrestler, known for his aggressive style and End of Days finisher. He's a dominant force with a no-nonsense attitude.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 65,
        brawlingAbility: 80,
        stamina: 70,
        aerialAbility: 10,
        toughness: 85,
        reversalAbility: 60,
        submissionDefense: 80,
        staminaRecoveryRate: 5,
        moves: {
            grapple: [
                { name: "Deep Six", damage: { min: 18, max: 30 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "End of Days", damage: { min: 38, max: 55 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Barry Windham",
        height: "6'6\"",
        weight: 260,
        description: "A highly versatile and athletic big man, known for his smooth in-ring style and being a member of the Four Horsemen.",
        baseHp: 1000, strength: 85, technicalAbility: 80, brawlingAbility: 70, stamina: 85, aerialAbility: 40, toughness: 85, reversalAbility: 75, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Superplex", damage: { min: 18, max: 28 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }],
            strike: [{ name: "Lariat", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "Flying Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 8, momentumGain: 7 }],
            finisher: [{ name: "Superplex", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Batista",
        height: "6'5\"",
        weight: 290,
        description: "The Animal. A powerhouse known for his explosive strength and intimidating presence. A multiple-time world champion and a main event staple.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 60,
        brawlingAbility: 85,
        stamina: 75,
        aerialAbility: 10,
        toughness: 90,
        reversalAbility: 55,
        submissionDefense: 85,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Spinebuster", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Clothesline", damage: { min: 12, max: 20 }, baseHitChance: 0.8, stat: 'strength', staminaCost: 10, momentumGain: 8 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Batista Bomb", damage: { min: 45, max: 65 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Big Boss Man",
        height: "6'6\"",
        weight: 330,
        description: "A former corrections officer, known for his hard-hitting style and nightstick. He was a prominent figure in the late 80s and 90s.",
        baseHp: 1000, strength: 90, technicalAbility: 50, brawlingAbility: 88, stamina: 70, aerialAbility: 5, toughness: 90, reversalAbility: 45, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Boss Man Slam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Nightstick Shot", damage: { min: 18, max: 28 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 12, momentumGain: 10 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Boss Man Slam", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Big John Studd",
        height: "6'10\"",
        weight: 364,
        description: "A massive heel from the 80s, known for his rivalry with Andre the Giant and his 'Body Slam Challenge.'",
        baseHp: 1000, strength: 95, technicalAbility: 40, brawlingAbility: 85, stamina: 60, aerialAbility: 5, toughness: 95, reversalAbility: 30, submissionDefense: 90, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "Full Nelson", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Elbow Drop", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Bob Backlund",
        height: "6'1\"",
        weight: 235,
        description: "A former WWE Champion known for his amateur wrestling background and intense, often eccentric, personality.",
        baseHp: 1000, strength: 75, technicalAbility: 95, brawlingAbility: 60, stamina: 90, aerialAbility: 10, toughness: 80, reversalAbility: 90, submissionDefense: 90, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Atomic Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 8, momentumGain: 7 }],
            strike: [{ name: "Leg Drop", damage: { min: 8, max: 15 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 6, momentumGain: 5 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Crossface Chickenwing", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Bobby Eaton",
        height: "5'10\"",
        weight: 230,
        description: "One of the most underrated tag team wrestlers of all time, known for his smooth style and incredible athleticism.",
        baseHp: 1000, strength: 70, technicalAbility: 85, brawlingAbility: 65, stamina: 80, aerialAbility: 60, toughness: 75, reversalAbility: 80, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Alabama Jam (Diving Leg Drop)", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "Diving Knee Drop", damage: { min: 15, max: 25 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }],
            finisher: [{ name: "Alabama Jam", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Bobby Lashley",
        height: "6'3\"",
        weight: 273,
        description: "The All Mighty. A dominant powerhouse with an amateur wrestling and MMA background, known for his strength and intensity.",
        baseHp: 1000, strength: 95, technicalAbility: 70, brawlingAbility: 85, stamina: 80, aerialAbility: 10, toughness: 90, reversalAbility: 60, submissionDefense: 90, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Dominator", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Spear", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Hurt Lock (Full Nelson)", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Booker T",
        height: "6'3\"",
        weight: 250,
        description: "Can you dig it, sucka?! A multiple-time world champion and Grand Slam Champion, known for his athletic style and iconic Spinaroonie.",
        baseHp: 1000, strength: 80, technicalAbility: 80, brawlingAbility: 75, stamina: 85, aerialAbility: 60, toughness: 80, reversalAbility: 75, submissionDefense: 75, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Book End (Side Slam)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Scissor Kick", damage: { min: 18, max: 28 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 12, momentumGain: 10 }],
            highFlying: [{ name: "Houston Hangover (Diving Senton)", damage: { min: 25, max: 40 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            finisher: [{ name: "Axe Kick (Booker T's Axe Kick)", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Braun Strowman",
        height: "6'8\"",
        weight: 385,
        description: "The Monster Among Men. A massive powerhouse known for his incredible strength and destructive rampage.",
        baseHp: 1000, strength: 98, technicalAbility: 40, brawlingAbility: 95, stamina: 65, aerialAbility: 5, toughness: 100, reversalAbility: 30, submissionDefense: 95, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "Running Powerslam", damage: { min: 30, max: 45 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Monster Dropkick", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Running Powerslam", damage: { min: 45, max: 65 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Bray Wyatt",
        height: "6'3\"",
        weight: 285,
        description: "The Eater of Worlds. A dark and enigmatic character known for his mind games, unique promos, and supernatural abilities.",
        baseHp: 1000, strength: 85, technicalAbility: 60, brawlingAbility: 88, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 50, submissionDefense: 85, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Sister Abigail", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Senton", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Sister Abigail", damage: { min: 40, max: 60 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Bret Hart",
        height: "6'1\"",
        weight: 234,
        description: "The Hitman. The Excellence of Execution. Known for his technical mastery, realistic offense, and iconic Sharpshooter submission. A multiple-time world champion and a true legend.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 100,
        brawlingAbility: 60,
        stamina: 90,
        aerialAbility: 20,
        toughness: 85,
        reversalAbility: 95,
        submissionDefense: 90,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Piledriver", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }
            ],
            strike: [
                { name: "Diving Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 8, momentumGain: 6 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Sharpshooter", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 30, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.85 }
            ]
        }
    },
    {
        name: "Brian Pillman",
        height: "5'11\"",
        weight: 210,
        description: "The Loose Cannon. A high-flying and unpredictable wrestler known for his innovative style and controversial persona.",
        baseHp: 1000, strength: 70, technicalAbility: 85, brawlingAbility: 70, stamina: 85, aerialAbility: 90, toughness: 70, reversalAbility: 80, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Air Pillman (Springboard Clothesline)", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Superkick", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "Diving Crossbody", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            finisher: [{ name: "Air Pillman", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Brock Lesnar",
        height: "6'3\"",
        weight: 286,
        description: "The Beast Incarnate. A dominant force of nature, known for his amateur wrestling background, incredible strength, and devastating F5. A multi-sport athlete and former UFC Heavyweight Champion.",
        baseHp: 1000,
        strength: 100,
        technicalAbility: 70,
        brawlingAbility: 90,
        stamina: 80,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 70,
        submissionDefense: 95,
        staminaRecoveryRate: 5,
        moves: {
            grapple: [
                { name: "German Suplex", damage: { min: 25, max: 40 }, baseHitChance: 0.8, stat: 'strength', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Knee Strike", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "F5", damage: { min: 50, max: 80 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.85, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Bron Breakker",
        height: "6'0\"",
        weight: 230,
        description: "The son of Rick Steiner, known for his explosive power, intensity, and amateur wrestling background.",
        baseHp: 1000, strength: 90, technicalAbility: 75, brawlingAbility: 80, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 65, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Military Press Powerslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Spear", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Gorilla Press Powerslam", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Brooklyn Brawler",
        height: "6'2\"",
        weight: 240,
        description: "A legendary jobber known for his longevity and ability to make opponents look good.",
        baseHp: 70, strength: 60, technicalAbility: 50, brawlingAbility: 60, stamina: 60, aerialAbility: 5, toughness: 70, reversalAbility: 20, submissionDefense: 50, staminaRecoveryRate: 3,
        moves: {
            grapple: [{ name: "Brooklyn Crab", damage: { min: 5, max: 10 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 5, momentumGain: 3 }],
            strike: [{ name: "Punch", damage: { min: 3, max: 7 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 4, momentumGain: 2 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Brawler's Elbow", damage: { min: 10, max: 15 }, baseHitChance: 0.5, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8, pinAttemptChance: 0.2, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Bruiser Brody",
        height: "6'8\"",
        weight: 285,
        description: "A wild and unpredictable brawler, known for his intense interviews and hardcore style.",
        baseHp: 1000, strength: 90, technicalAbility: 30, brawlingAbility: 95, stamina: 70, aerialAbility: 5, toughness: 95, reversalAbility: 25, submissionDefense: 85, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "King Kong Knee Drop", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Big Boot", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "King Kong Knee Drop", damage: { min: 40, max: 60 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Brutus Beefcake",
        height: "6'3\"",
        weight: 250,
        description: "Hulk Hogan's best friend, known for his barber gimmick and sleeper hold.",
        baseHp: 1000, strength: 75, technicalAbility: 60, brawlingAbility: 70, stamina: 75, aerialAbility: 10, toughness: 80, reversalAbility: 50, submissionDefense: 70, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Sleeper Hold", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }],
            strike: [{ name: "High Knee", damage: { min: 8, max: 15 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 6, momentumGain: 5 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Sleeper Hold", damage: { min: 20, max: 30 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0, submissionAttemptChance: 0.6 }]
        }
    },
    {
        name: "Bruno Sammartino",
        height: "6'1\"",
        weight: 265,
        description: "The Living Legend. The longest-reigning WWE Champion of all time, known for his immense strength and connection with the Italian-American fanbase. A true icon of professional wrestling.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 70,
        brawlingAbility: 70,
        stamina: 95,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 60,
        submissionDefense: 95,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Bearhug", damage: { min: 20, max: 35 }, baseHitChance: 0.85, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Forearm Smash", damage: { min: 10, max: 18 }, baseHitChance: 0.8, stat: 'strength', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Backbreaker", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Chyna",
        height: "5'10\"",
        weight: 180,
        description: "The Ninth Wonder of the World. A trailblazing female wrestler, known for her strength, intimidating presence, and being a member of D-Generation X.",
        baseHp: 1000, strength: 80, technicalAbility: 60, brawlingAbility: 75, stamina: 75, aerialAbility: 5, toughness: 85, reversalAbility: 50, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Pedigree", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Low Blow", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Pedigree", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Christian",
        height: "6'1\"",
        weight: 212,
        description: "Captain Charisma. A versatile and innovative wrestler, known for his ladder match prowess and being a multiple-time champion.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 70, stamina: 85, aerialAbility: 70, toughness: 75, reversalAbility: 80, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Killswitch (Unprettier)", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Spear", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "Frog Splash", damage: { min: 20, max: 35 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Killswitch", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Chris Benoit",
        height: "5'11\"",
        weight: 220,
        description: "The Rabid Wolverine. A highly intense and technically gifted wrestler, known for his aggressive style and submission prowess.",
        baseHp: 1000, strength: 80, technicalAbility: 95, brawlingAbility: 85, stamina: 90, aerialAbility: 60, toughness: 85, reversalAbility: 90, submissionDefense: 85, staminaRecoveryRate: 8,
        moves: {
            grapple: [{ name: "German Suplex", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Diving Headbutt", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "Crippler Crossface", damage: { min: 15, max: 25 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            finisher: [{ name: "Crippler Crossface", damage: { min: 35, max: 55 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 30, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.9 }]
        }
    },
    {
        name: "Chris Jericho",
        height: "6'0\"",
        weight: 225,
        description: "Le Champion. A master of reinvention, Jericho has consistently remained at the top for decades with his innovative character work, diverse move set, and unparalleled mic skills.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 85,
        brawlingAbility: 70,
        stamina: 85,
        aerialAbility: 70,
        toughness: 80,
        reversalAbility: 80,
        submissionDefense: 80,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Walls of Jericho (Liontamer)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Codebreaker", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Lionsault", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            finisher: [
                { name: "Judas Effect (Elbow)", damage: { min: 30, max: 50 }, baseHitChance: 0.55, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "CM Punk",
        height: "6'1\"",
        weight: 218,
        description: "The Best in the World. Known for his straight-edge lifestyle, groundbreaking promos, and a hybrid wrestling style combining technicality, strikes, and high-flying.",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 90,
        brawlingAbility: 75,
        stamina: 90,
        aerialAbility: 70,
        toughness: 80,
        reversalAbility: 88,
        submissionDefense: 85,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Anaconda Vice", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }
            ],
            strike: [
                { name: "Roundhouse Kick", damage: { min: 18, max: 28 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Diving Elbow Drop", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "GTS (Go To Sleep)", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Cody Rhodes",
        height: "6'1\"",
        weight: 220,
        description: "The American Nightmare. A second-generation star who broke away to forge his own path, known for his polished presentation, emotional storytelling, and impactful Cross Rhodes.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 80,
        brawlingAbility: 70,
        stamina: 85,
        aerialAbility: 60,
        toughness: 80,
        reversalAbility: 75,
        submissionDefense: 80,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Figure-Four Leglock", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }
            ],
            strike: [
                { name: "Bionic Elbow", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 9 }
            ],
            highFlying: [
                { name: "Moonsault", damage: { min: 20, max: 30 }, baseHitChance: 0.5, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Cross Rhodes", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 28, momentumGain: 35, pinAttemptChance: 0.68, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Curt Hennig",
        height: "6'3\"",
        weight: 257,
        description: "Simply Perfect. Known for his flawless in-ring execution, cocky attitude, and ability to make everything look easy. A true technician and Intercontinental Champion.",
        baseHp: 1000, strength: 75, technicalAbility: 95, brawlingAbility: 65, stamina: 85, aerialAbility: 20, toughness: 80, reversalAbility: 90, submissionDefense: 85, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Perfect-Plex (Fisherman Suplex)", damage: { min: 25, max: 40 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Knee Lift", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Perfect-Plex", damage: { min: 35, max: 55 }, baseHitChance: 0.80, stat: 'technicalAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Dan Spivey",
        height: "6'8\"",
        weight: 280,
        description: "A powerful big man known for his time in the Skyscrapers and as a member of the Varsity Club.",
        baseHp: 1000, strength: 88, technicalAbility: 60, brawlingAbility: 80, stamina: 70, aerialAbility: 10, toughness: 85, reversalAbility: 50, submissionDefense: 80, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Big Boot", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Spivey Spike (DDT)", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Daniel Bryan",
        height: "5'10\"",
        weight: 210,
        description: "The American Dragon. A technical wrestling virtuoso, known for his intricate submissions, stiff strikes, and incredible underdog story. Yes! Yes! Yes!",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 100,
        brawlingAbility: 70,
        stamina: 95,
        aerialAbility: 70,
        toughness: 80,
        reversalAbility: 95,
        submissionDefense: 90,
        staminaRecoveryRate: 9,
        moves: {
            grapple: [
                { name: "Surfboard Stretch", damage: { min: 12, max: 20 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }
            ],
            strike: [
                { name: "Yes! Kicks", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Diving Headbutt", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            finisher: [
                { name: "Yes! Lock (Omoplata Crossface)", damage: { min: 35, max: 55 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 30, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.9 }
            ]
        }
    },
    {
        name: "Darby Allin",
        height: "5'8\"",
        weight: 180,
        description: "A fearless daredevil known for his high-risk maneuvers and unique, gothic persona.",
        baseHp: 1000, strength: 65, technicalAbility: 70, brawlingAbility: 75, stamina: 80, aerialAbility: 95, toughness: 65, reversalAbility: 70, submissionDefense: 65, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Scorpion Death Drop", damage: { min: 15, max: 25 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Coffin Drop (Diving Senton)", damage: { min: 25, max: 40 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "Suicide Dive", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Coffin Drop", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Davey Boy Smith",
        height: "5'11\"",
        weight: 250,
        description: "The British Bulldog. A powerful and athletic wrestler, known for his strength, agility, and classic matches.",
        baseHp: 1000, strength: 88, technicalAbility: 75, brawlingAbility: 70, stamina: 80, aerialAbility: 20, toughness: 85, reversalAbility: 65, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Running Powerslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Headbutt", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Running Powerslam", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Dean Malenko",
        height: "5'10\"",
        weight: 210,
        description: "The Man of 1,000 Holds. A highly respected technical wrestler, known for his intricate submissions and smooth in-ring style.",
        baseHp: 1000, strength: 70, technicalAbility: 98, brawlingAbility: 60, stamina: 90, aerialAbility: 15, toughness: 75, reversalAbility: 95, submissionDefense: 95, staminaRecoveryRate: 8,
        moves: {
            grapple: [{ name: "Texas Cloverleaf", damage: { min: 15, max: 25 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Dropkick", damage: { min: 8, max: 15 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 6, momentumGain: 5 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Texas Cloverleaf", damage: { min: 30, max: 45 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.85 }]
        }
    },
    {
        name: "Diamond Dallas Page",
        height: "6'5\"",
        weight: 250,
        description: "The Master of the Diamond Cutter. A late bloomer who became a multiple-time world champion, known for his infectious charisma and devastating finisher.",
        baseHp: 1000, strength: 80, technicalAbility: 70, brawlingAbility: 80, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 65, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Diamond Cutter", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Clothesline", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Diamond Cutter", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Dolph Ziggler",
        height: "6'0\"",
        weight: 218,
        description: "The Showoff. Known for his incredible selling, athleticism, and superkick. A former World Heavyweight Champion.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 70, stamina: 90, aerialAbility: 70, toughness: 75, reversalAbility: 80, submissionDefense: 70, staminaRecoveryRate: 8,
        moves: {
            grapple: [{ name: "Zig Zag", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Superkick", damage: { min: 18, max: 28 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 12, momentumGain: 10 }],
            highFlying: [{ name: "Fameasser", damage: { min: 15, max: 25 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 10, momentumGain: 9 }],
            finisher: [{ name: "Zig Zag", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Dominik Mysterio",
        height: "6'1\"",
        weight: 200,
        description: "The son of Rey Mysterio, known for his rebellious attitude and association with The Judgment Day.",
        baseHp: 1000, strength: 65, technicalAbility: 70, brawlingAbility: 65, stamina: 80, aerialAbility: 75, toughness: 70, reversalAbility: 60, submissionDefense: 65, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Three Amigos", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 8, momentumGain: 7 }],
            strike: [{ name: "Frog Splash", damage: { min: 15, max: 25 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }],
            highFlying: [{ name: "619", damage: { min: 18, max: 28 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Frog Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Don Muraco",
        height: "6'1\"",
        weight: 250,
        description: "The Magnificent Muraco. A powerful and athletic heel from the 80s, known for his physique and intensity.",
        baseHp: 1000, strength: 85, technicalAbility: 60, brawlingAbility: 80, stamina: 75, aerialAbility: 10, toughness: 85, reversalAbility: 55, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Piledriver", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Forearm Smash", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Asiatic Spike (Thumb to Throat)", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Drew McIntyre",
        height: "6'5\"",
        weight: 265,
        description: "The Scottish Warrior. A powerful and intense competitor with a devastating Claymore Kick. A former WWE Champion who embodies resilience and determination.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 75,
        brawlingAbility: 85,
        stamina: 80,
        aerialAbility: 15,
        toughness: 90,
        reversalAbility: 70,
        submissionDefense: 85,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Future Shock DDT", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Claymore Kick", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Claymore Kick", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Dustin Rhodes",
        height: "6'6\"",
        weight: 235,
        description: "The Natural. A second-generation star known for his unique Goldust persona and technical prowess.",
        baseHp: 1000, strength: 75, technicalAbility: 80, brawlingAbility: 70, stamina: 80, aerialAbility: 20, toughness: 80, reversalAbility: 70, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Shattered Dreams", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Bulldog", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Cross Rhodes", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Dusty Rhodes",
        height: "6'2\"",
        weight: 275,
        description: "The American Dream. A charismatic and beloved everyman, known for his 'Bionic Elbow' and inspiring promos. A three-time NWA World Heavyweight Champion.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 60,
        brawlingAbility: 85,
        stamina: 80,
        aerialAbility: 10,
        toughness: 90,
        reversalAbility: 55,
        submissionDefense: 80,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Figure-Four Leglock", damage: { min: 12, max: 20 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }
            ],
            strike: [
                { name: "Bionic Elbow", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Bionic Elbow", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 28, momentumGain: 35, pinAttemptChance: 0.68, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Earthquake",
        height: "6'7\"",
        weight: 468,
        description: "A massive superheavyweight known for his devastating Earthquake Splash and being part of the Natural Disasters.",
        baseHp: 1000, strength: 98, technicalAbility: 30, brawlingAbility: 90, stamina: 60, aerialAbility: 5, toughness: 100, reversalAbility: 25, submissionDefense: 95, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "Earthquake Splash", damage: { min: 35, max: 55 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }],
            strike: [{ name: "Avalanche Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Earthquake Splash", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Edge",
        height: "6'5\"",
        weight: 241,
        description: "The Rated-R Superstar. A master manipulator and opportunist, Edge is known for his incredible charisma, diverse move set, and numerous championship reigns.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 85,
        brawlingAbility: 75,
        stamina: 85,
        aerialAbility: 60,
        toughness: 80,
        reversalAbility: 80,
        submissionDefense: 80,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Edgecution (Impaler DDT)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Spear", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Diving Crossbody", damage: { min: 15, max: 25 }, baseHitChance: 0.5, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }
            ],
            finisher: [
                { name: "Spear", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Eddie Gilbert",
        height: "5'11\"",
        weight: 220,
        description: "Hot Stuff. A talented wrestler and booker, known for his innovative style and intense feuds.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 70, stamina: 80, aerialAbility: 60, toughness: 75, reversalAbility: 80, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Piledriver", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "Hot Shot (Top Rope Clothesline)", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Hot Shot", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Eddie Guerrero",
        height: "5'8\"",
        weight: 220,
        description: "Latino Heat! A master of deception, Eddie was known for his incredible in-ring talent, charisma, and 'Lie, Cheat, Steal' philosophy. A beloved WWE Champion.",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 90,
        brawlingAbility: 70,
        stamina: 85,
        aerialAbility: 80,
        toughness: 75,
        reversalAbility: 85,
        submissionDefense: 75,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Three Amigos (Vertical Suplexes)", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }
            ],
            strike: [
                { name: "Frog Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            highFlying: [
                { name: "Tornado DDT", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Frog Splash", damage: { min: 35, max: 55 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Finn Balor",
        height: "5'11\"",
        weight: 190,
        description: "The Demon King. Known for his unique entrance, incredible athleticism, and powerful Coup de Grâce. A former Universal Champion.",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 88,
        brawlingAbility: 65,
        stamina: 85,
        aerialAbility: 90,
        toughness: 70,
        reversalAbility: 85,
        submissionDefense: 70,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "1916 (Bloody Sunday)", damage: { min: 18, max: 30 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }
            ],
            strike: [
                { name: "Shotgun Dropkick", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "Coup de Grâce (Diving Double Foot Stomp)", damage: { min: 35, max: 55 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 25, momentumGain: 20 }
            ],
            finisher: [
                { name: "Coup de Grâce", damage: { min: 45, max: 65 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Gillberg",
        height: "5'7\"",
        weight: 170,
        description: "A parody of Goldberg, known for his comedic antics and brief entrances.",
        baseHp: 60, strength: 50, technicalAbility: 40, brawlingAbility: 50, stamina: 50, aerialAbility: 5, toughness: 60, reversalAbility: 10, submissionDefense: 40, staminaRecoveryRate: 2,
        moves: {
            grapple: [{ name: "Jackhammer (weak)", damage: { min: 5, max: 10 }, baseHitChance: 0.5, stat: 'strength', staminaCost: 8, momentumGain: 5 }],
            strike: [{ name: "Spear (weak)", damage: { min: 3, max: 7 }, baseHitChance: 0.55, stat: 'strength', staminaCost: 6, momentumGain: 4 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Gillberg Splash", damage: { min: 10, max: 15 }, baseHitChance: 0.4, stat: 'strength', staminaCost: 10, momentumGain: 8, pinAttemptChance: 0.1, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Goldberg",
        height: "6'4\"",
        weight: 280,
        description: "The Myth. The Legend. Known for his explosive power, intensity, and undefeated streak. His Spear and Jackhammer are iconic.",
        baseHp: 1000,
        strength: 98,
        technicalAbility: 40,
        brawlingAbility: 95,
        stamina: 60,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 30,
        submissionDefense: 95,
        staminaRecoveryRate: 3,
        moves: {
            grapple: [
                { name: "Jackhammer", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }
            ],
            strike: [
                { name: "Spear", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Jackhammer", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.85, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Greg Valentine",
        height: "6'0\"",
        weight: 249,
        description: "The Hammer. A hard-hitting technical wrestler, known for his Figure-Four Leglock and aggressive style.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 70, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 75, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Figure-Four Leglock", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Chop", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Figure-Four Leglock", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Gunther",
        height: "6'4\"",
        weight: 297,
        description: "The Ring General. A dominant and hard-hitting European wrestler, known for his stiff chops and technical prowess.",
        baseHp: 1000, strength: 90, technicalAbility: 85, brawlingAbility: 90, stamina: 80, aerialAbility: 5, toughness: 95, reversalAbility: 80, submissionDefense: 90, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Chop", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Powerbomb", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Hacksaw Jim Duggan",
        height: "6'3\"",
        weight: 280,
        description: "USA! USA! A patriotic brawler known for his 2x4 plank of wood and 'Hooo!' chant.",
        baseHp: 1000, strength: 85, technicalAbility: 50, brawlingAbility: 80, stamina: 75, aerialAbility: 5, toughness: 90, reversalAbility: 40, submissionDefense: 80, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Three Point Stance Clothesline", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "2x4 Shot", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Three Point Stance Clothesline", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Harley Race",
        height: "6'1\"",
        weight: 245,
        description: "The King. A legendary multiple-time NWA World Heavyweight Champion, known for his toughness and no-nonsense style.",
        baseHp: 1000, strength: 80, technicalAbility: 85, brawlingAbility: 75, stamina: 85, aerialAbility: 10, toughness: 95, reversalAbility: 80, submissionDefense: 85, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Bridging Fisherman Suplex", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Headbutt", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "Diving Headbutt", damage: { min: 15, max: 25 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 10, momentumGain: 9 }],
            finisher: [{ name: "Diving Headbutt", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Hulk Hogan",
        height: "6'7\"",
        weight: 303,
        description: "The Immortal. The most recognizable wrestler in history, known for 'Hulkamania,' his powerful comebacks, and iconic leg drop. A multiple-time world champion.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 50,
        brawlingAbility: 80,
        stamina: 85,
        aerialAbility: 5,
        toughness: 95,
        reversalAbility: 40,
        submissionDefense: 90,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Atomic Leg Drop", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Atomic Leg Drop", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 45, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Hillbilly Jim",
        image: "hillbillyjim", // Image filename: hillbillyjim.webp - You'll need to create this image!
        height: "6'3\"",
        weight: 275,
        description: "The lovable country boy from Mudlick, Kentucky. Known for his overalls, bare feet, and down-home charm, Hillbilly Jim was a popular fan favorite in the mid-1980s. He often danced his way to the ring and used a straightforward, powerful wrestling style.",
        baseHp: 1000,
        strength: 92,
        technicalAbility: 50,
        brawlingAbility: 80,
        stamina: 75,
        aerialAbility: 5,
        toughness: 90,
        moves: {
            grapple: [
                { name: "Bearhug", damage: { min: 8, max: 14 }, baseHitChance: 0.7, stat: 'strength' },
                { name: "Body Slam", damage: { min: 9, max: 15 }, baseHitChance: 0.8, stat: 'strength' }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 7, max: 12 }, baseHitChance: 0.7, stat: 'brawlingAbility' }
            ],
            highFlying: [],
            finisher: [{ name: "Full Nelson", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'strength' }]
        }
    },
    {
        name: "Iron Mike Sharpe",
        height: "6'3\"",
        weight: 260,
        description: "Canada's Greatest Athlete. A jobber known for his forearm shiver and perpetually bandaged forearm.",
        baseHp: 75, strength: 65, technicalAbility: 50, brawlingAbility: 65, stamina: 65, aerialAbility: 5, toughness: 70, reversalAbility: 25, submissionDefense: 55, staminaRecoveryRate: 3,
        moves: {
            grapple: [{ name: "Forearm Shiver", damage: { min: 8, max: 15 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 6, momentumGain: 5 }],
            strike: [{ name: "Headbutt", damage: { min: 5, max: 10 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 5, momentumGain: 4 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Forearm Shiver (Enhanced)", damage: { min: 15, max: 25 }, baseHitChance: 0.5, stat: 'strength', staminaCost: 12, momentumGain: 10, pinAttemptChance: 0.3, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Ivan Koloff",
        height: "5'11\"",
        weight: 240,
        description: "The Russian Bear. A brutal and intimidating heel who famously ended Bruno Sammartino's long title reign.",
        baseHp: 1000, strength: 85, technicalAbility: 55, brawlingAbility: 90, stamina: 70, aerialAbility: 5, toughness: 90, reversalAbility: 40, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Russian Sickle (Clothesline)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Headbutt", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Russian Sickle", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Jake Roberts",
        height: "6'2\"",
        weight: 249,
        description: "The Snake. A master of psychology and mind games, known for his chilling promos and the devastating DDT. His pet python, Damien, was an integral part of his act.",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 80,
        brawlingAbility: 75,
        stamina: 75,
        aerialAbility: 10,
        toughness: 80,
        reversalAbility: 75,
        submissionDefense: 80,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "DDT", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Short-Arm Clothesline", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "DDT", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Jeff Jarrett",
        height: "6'1\"",
        weight: 220,
        description: "Double J. A charismatic and talented wrestler, known for his country music gimmick and guitar smash.",
        baseHp: 1000, strength: 75, technicalAbility: 80, brawlingAbility: 70, stamina: 80, aerialAbility: 20, toughness: 75, reversalAbility: 70, submissionDefense: 70, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Figure-Four Leglock", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }],
            strike: [{ name: "Guitar Shot", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "The Stroke (Reverse Russian Legsweep)", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Jerry Lawler",
        height: "6'0\"",
        weight: 230,
        description: "The King. A legendary Memphis wrestling icon, known for his piledriver and fiery promos.",
        baseHp: 1000, strength: 70, technicalAbility: 75, brawlingAbility: 80, stamina: 75, aerialAbility: 10, toughness: 80, reversalAbility: 60, submissionDefense: 70, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Piledriver", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Fist Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Piledriver", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Jimmy Garvin",
        height: "6'0\"",
        weight: 230,
        description: "Gorgeous Jimmy. A charismatic and athletic wrestler, known for his flamboyant style and being part of the Freebirds.",
        baseHp: 1000, strength: 70, technicalAbility: 75, brawlingAbility: 65, stamina: 80, aerialAbility: 60, toughness: 70, reversalAbility: 70, submissionDefense: 65, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Brainbuster", damage: { min: 18, max: 28 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }],
            strike: [{ name: "DDT", damage: { min: 15, max: 25 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "Flying Crossbody", damage: { min: 15, max: 25 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }],
            finisher: [{ name: "Brainbuster", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Jimmy Snuka",
        height: "5'10\"",
        weight: 235,
        description: "Superfly. A high-flying innovator, known for his acrobatic style and iconic Superfly Splash.",
        baseHp: 1000, strength: 75, technicalAbility: 60, brawlingAbility: 75, stamina: 80, aerialAbility: 95, toughness: 75, reversalAbility: 65, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Headbutt", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            strike: [{ name: "Chop", damage: { min: 8, max: 15 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 6, momentumGain: 5 }],
            highFlying: [{ name: "Superfly Splash", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }],
            finisher: [{ name: "Superfly Splash", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "John Cena",
        height: "6'1\"",
        weight: 251,
        description: "The Face That Runs the Place. A polarizing but undeniable superstar, known for his 'Never Give Up' attitude, powerful offense, and incredible connection with the audience. A record-setting 16-time World Champion.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 65,
        brawlingAbility: 80,
        stamina: 90,
        aerialAbility: 10,
        toughness: 95,
        reversalAbility: 60,
        submissionDefense: 90,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Attitude Adjustment (FU)", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Five Knuckle Shuffle", damage: { min: 10, max: 18 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "Diving Leg Drop Bulldog (rare)", damage: { min: 15, max: 25 }, baseHitChance: 0.3, stat: 'aerialAbility', staminaCost: 10, momentumGain: 8 }
            ],
            finisher: [
                { name: "STF (Stepover Toehold Facelock)", damage: { min: 35, max: 50 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0, submissionAttemptChance: 0.8 }
            ]
        }
    },
    {
        name: "Jon Moxley",
        height: "6'4\"",
        weight: 234,
        description: "The Purveyor of Violence. A hardcore brawler known for his unpredictable style, intensity, and willingness to fight anywhere, anytime.",
        baseHp: 1000, strength: 85, technicalAbility: 65, brawlingAbility: 90, stamina: 80, aerialAbility: 20, toughness: 90, reversalAbility: 60, submissionDefense: 85, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Paradigm Shift (Death Rider)", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "King Kong Lariat", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "Diving Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.5, stat: 'aerialAbility', staminaCost: 10, momentumGain: 8 }],
            finisher: [{ name: "Paradigm Shift", damage: { min: 40, max: 60 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Juventud Guerrera",
        height: "5'7\"",
        weight: 180,
        description: "The Juice. A high-flying lucha libre star known for his acrobatic style and innovative maneuvers.",
        baseHp: 1000, strength: 60, technicalAbility: 75, brawlingAbility: 60, stamina: 80, aerialAbility: 95, toughness: 65, reversalAbility: 80, submissionDefense: 60, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Juvi Driver", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "450 Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "Hurricanrana", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 10, momentumGain: 9 }],
            finisher: [{ name: "Juvi Driver", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Junkyard Dog",
        height: "6'3\"",
        weight: 270,
        description: "JYD. A charismatic and beloved powerhouse, known for his headbutts and chain.",
        baseHp: 1000, strength: 85, technicalAbility: 50, brawlingAbility: 80, stamina: 70, aerialAbility: 5, toughness: 90, reversalAbility: 40, submissionDefense: 80, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Thump (Powerslam)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Headbutt", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Thump", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Kane",
        height: "7'0\"",
        weight: 323,
        description: "The Big Red Machine. The demonic half-brother of The Undertaker, known for his pyrotechnics, monstrous strength, and terrifying presence. A true horror icon of wrestling.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 50,
        brawlingAbility: 90,
        stamina: 70,
        aerialAbility: 5,
        toughness: 98,
        reversalAbility: 40,
        submissionDefense: 90,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Chokeslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 15 }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Top Rope Clothesline (rare)", damage: { min: 20, max: 30 }, baseHitChance: 0.4, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Tombstone Piledriver", damage: { min: 45, max: 70 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 40, momentumGain: 45, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Ken Patera",
        height: "6'1\"",
        weight: 270,
        description: "The Olympian. A former Olympic weightlifter, known for his immense strength and full nelson submission.",
        baseHp: 1000, strength: 90, technicalAbility: 60, brawlingAbility: 80, stamina: 70, aerialAbility: 5, toughness: 85, reversalAbility: 50, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Full Nelson", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Clothesline", damage: { min: 12, max: 20 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Full Nelson", damage: { min: 35, max: 50 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0, submissionAttemptChance: 0.75 }]
        }
    },
    {
        name: "Kenny Omega",
        height: "6'0\"",
        weight: 203,
        description: "The Best Bout Machine. A highly innovative and athletic wrestler, known for his incredible matches and diverse offense.",
        baseHp: 1000, strength: 80, technicalAbility: 90, brawlingAbility: 80, stamina: 95, aerialAbility: 90, toughness: 80, reversalAbility: 90, submissionDefense: 80, staminaRecoveryRate: 9,
        moves: {
            grapple: [{ name: "One-Winged Angel", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 25, momentumGain: 20 }],
            strike: [{ name: "V-Trigger (Knee Strike)", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "Cross-Legged Moonsault", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            finisher: [{ name: "One-Winged Angel", damage: { min: 45, max: 70 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Kevin Nash",
        height: "6'10\"",
        weight: 317,
        description: "Big Daddy Cool. A charismatic giant known for his powerbomb and influential role in the Kliq and nWo. A multiple-time world champion.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 60,
        brawlingAbility: 80,
        stamina: 70,
        aerialAbility: 10,
        toughness: 90,
        reversalAbility: 50,
        submissionDefense: 85,
        staminaRecoveryRate: 5,
        moves: {
            grapple: [
                { name: "Jackknife Powerbomb", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Jackknife Powerbomb", damage: { min: 45, max: 65 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Kevin Owens",
        height: "6'0\"",
        weight: 266,
        description: "The Prizefighter. A ruthless and cunning brawler, known for his aggressive style, sharp wit, and devastating Pop-up Powerbomb. He fights for his family.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 70,
        brawlingAbility: 90,
        stamina: 80,
        aerialAbility: 40,
        toughness: 85,
        reversalAbility: 65,
        submissionDefense: 80,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Pop-up Powerbomb", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Cannonball Senton", damage: { min: 15, max: 25 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Swanton Bomb (rare)", damage: { min: 20, max: 30 }, baseHitChance: 0.3, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Pop-up Powerbomb", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Kevin Von Erich",
        height: "6'2\"",
        weight: 228,
        description: "The Golden Warrior. Known for his bare feet, high-flying maneuvers, and the Iron Claw.",
        baseHp: 1000, strength: 75, technicalAbility: 70, brawlingAbility: 70, stamina: 85, aerialAbility: 80, toughness: 75, reversalAbility: 70, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Iron Claw", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Dropkick", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "Flying Crossbody", damage: { min: 20, max: 30 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Iron Claw", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.75 }]
        }
    },
    {
        name: "King Kong Bundy",
        height: "6'4\"",
        weight: 458,
        description: "The Walking Condominium. A massive superheavyweight, known for his Avalanche Splash and 5-count pin.",
        baseHp: 1000, strength: 95, technicalAbility: 30, brawlingAbility: 90, stamina: 55, aerialAbility: 5, toughness: 100, reversalAbility: 20, submissionDefense: 90, staminaRecoveryRate: 3,
        moves: {
            grapple: [{ name: "Avalanche Splash", damage: { min: 30, max: 50 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Big Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Avalanche Splash", damage: { min: 45, max: 70 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Kurt Angle",
        height: "6'0\"",
        weight: 220,
        description: "The Olympic Gold Medalist. One of the most technically gifted wrestlers ever, known for his amateur wrestling pedigree, intensity, and 'It's true, it's damn true!' catchphrase.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 100,
        brawlingAbility: 70,
        stamina: 90,
        aerialAbility: 20,
        toughness: 90,
        reversalAbility: 95,
        submissionDefense: 90,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Angle Slam (Olympic Slam)", damage: { min: 25, max: 40 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Ankle Lock", damage: { min: 15, max: 25 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Moonsault (rare)", damage: { min: 20, max: 30 }, baseHitChance: 0.3, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Ankle Lock", damage: { min: 30, max: 50 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0, submissionAttemptChance: 0.85 }
            ]
        }
    },
    {
        name: "LA Knight",
        height: "6'1\"",
        weight: 220,
        description: "Yeah! A charismatic and confident talker, known for his catchphrases and aggressive style.",
        baseHp: 1000, strength: 75, technicalAbility: 70, brawlingAbility: 75, stamina: 80, aerialAbility: 10, toughness: 80, reversalAbility: 60, submissionDefense: 70, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "BFT (Blunt Force Trauma)", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Elbow Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "BFT", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Larry Zbyszko",
        height: "6'0\"",
        weight: 240,
        description: "The Living Legend. A former protege of Bruno Sammartino who turned on him, known for his technical prowess and stalling tactics.",
        baseHp: 1000, strength: 70, technicalAbility: 90, brawlingAbility: 60, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 85, submissionDefense: 85, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Abdominal Stretch", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 8, momentumGain: 7 }],
            strike: [{ name: "Punches", damage: { min: 5, max: 10 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 5, momentumGain: 4 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Guillotine Choke", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0, submissionAttemptChance: 0.65 }]
        }
    },
    {
        name: "Lex Luger",
        height: "6'4\"",
        weight: 265,
        description: "The Total Package. A powerful and athletic wrestler, known for his physique and Torture Rack finisher.",
        baseHp: 1000, strength: 90, technicalAbility: 60, brawlingAbility: 80, stamina: 75, aerialAbility: 10, toughness: 85, reversalAbility: 55, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Torture Rack", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Bionic Forearm", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Torture Rack", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.75 }]
        }
    },
    {
        name: "Lord Steven Regal",
        height: "6'2\"",
        weight: 240,
        description: "A highly technical and sophisticated British wrestler, known for his mat wrestling and stiff strikes.",
        baseHp: 1000, strength: 75, technicalAbility: 95, brawlingAbility: 70, stamina: 85, aerialAbility: 10, toughness: 80, reversalAbility: 90, submissionDefense: 90, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Regal Stretch", damage: { min: 15, max: 25 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Knee Trembler (Knee Strike)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Regal Stretch", damage: { min: 30, max: 45 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.85 }]
        }
    },
    {
        name: "Luke Harper",
        height: "6'5\"",
        weight: 275,
        description: "A rugged and intense brawler, known for his unique movements and being a member of the Wyatt Family.",
        baseHp: 1000, strength: 85, technicalAbility: 60, brawlingAbility: 88, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 50, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Discus Clothesline", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 8 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Discus Clothesline", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Macho Man Randy Savage",
        height: "6'2\"",
        weight: 237,
        description: "The Cream of the Crop! Ooooh yeah! An electrifying performer with a unique style, incredible intensity, and iconic flying elbow drop. A true showman and multiple-time world champion.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 70,
        brawlingAbility: 80,
        stamina: 85,
        aerialAbility: 90,
        toughness: 80,
        reversalAbility: 70,
        submissionDefense: 75,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Piledriver", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }
            ],
            strike: [
                { name: "Axe Handle (from top rope)", damage: { min: 20, max: 30 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "Diving Elbow Drop", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }
            ],
            finisher: [
                { name: "Diving Elbow Drop", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Malakai Black",
        height: "5'11\"",
        weight: 215,
        description: "A dark and mysterious striker, known for his unique entrance, striking ability, and Black Mass finisher.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 90, stamina: 85, aerialAbility: 70, toughness: 75, reversalAbility: 80, submissionDefense: 75, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "German Suplex", damage: { min: 18, max: 28 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 12, momentumGain: 10 }],
            strike: [{ name: "Black Mass (Spinning Heel Kick)", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "Moonsault", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Black Mass", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Mark Henry",
        height: "6'4\"",
        weight: 395,
        description: "The World's Strongest Man. A former Olympic weightlifter, known for his immense strength and Hall of Pain.",
        baseHp: 1000, strength: 100, technicalAbility: 40, brawlingAbility: 90, stamina: 65, aerialAbility: 5, toughness: 100, reversalAbility: 30, submissionDefense: 95, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "World's Strongest Slam", damage: { min: 35, max: 55 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }],
            strike: [{ name: "Big Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "World's Strongest Slam", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Meng",
        height: "6'0\"",
        weight: 290,
        description: "The Face of Fear. A notoriously tough and legitimate fighter, known for his intimidating presence and Tongan Death Grip.",
        baseHp: 1000, strength: 90, technicalAbility: 40, brawlingAbility: 95, stamina: 70, aerialAbility: 5, toughness: 100, reversalAbility: 25, submissionDefense: 90, staminaRecoveryRate: 4,
        moves: {
            grapple: [{ name: "Tongan Death Grip", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Headbutt", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Tongan Death Grip", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Michael Hayes",
        height: "6'1\"",
        weight: 230,
        description: "P.S. Hayes. The charismatic leader of the Fabulous Freebirds, known for his mic skills and Freebird DDT.",
        baseHp: 1000, strength: 70, technicalAbility: 70, brawlingAbility: 75, stamina: 80, aerialAbility: 10, toughness: 75, reversalAbility: 65, submissionDefense: 70, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Freebird DDT", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Bionic Elbow", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Freebird DDT", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Mick Foley",
        height: "6'2\"",
        weight: 287,
        description: "The Hardcore Legend. A master of pain and resilience, known for his three faces (Cactus Jack, Mankind, Dude Love) and willingness to sacrifice his body for entertainment. A true icon of extreme wrestling.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 40,
        brawlingAbility: 100,
        stamina: 70,
        aerialAbility: 30,
        toughness: 95,
        reversalAbility: 35,
        submissionDefense: 80,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Mandible Claw", damage: { min: 18, max: 30 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 10 }
            ],
            strike: [
                { name: "Piledriver (on concrete)", damage: { min: 25, max: 40 }, baseHitChance: 0.5, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Elbow Drop (from apron)", damage: { min: 30, max: 50 }, baseHitChance: 0.4, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 20 }
            ],
            finisher: [
                { name: "Double Arm DDT", damage: { min: 35, max: 55 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.65, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Mike Rotunda",
        height: "6'3\"",
        weight: 250,
        description: "Irwin R. Schyster (IRS). A technical wrestler known for his taxman gimmick and being a member of the Varsity Club.",
        baseHp: 1000, strength: 75, technicalAbility: 80, brawlingAbility: 65, stamina: 80, aerialAbility: 10, toughness: 75, reversalAbility: 70, submissionDefense: 70, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Abdominal Stretch", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 8, momentumGain: 7 }],
            strike: [{ name: "Write-Off (Clothesline)", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Stock Market Crash (Powerslam)", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Nick Bockwinkel",
        height: "6'0\"",
        weight: 230,
        description: "The Smartest Wrestler. A highly intelligent and technical AWA World Heavyweight Champion, known for his intricate holds and eloquent promos.",
        baseHp: 1000, strength: 70, technicalAbility: 98, brawlingAbility: 60, stamina: 90, aerialAbility: 10, toughness: 85, reversalAbility: 95, submissionDefense: 95, staminaRecoveryRate: 8,
        moves: {
            grapple: [{ name: "Piledriver", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Dropkick", damage: { min: 8, max: 15 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 6, momentumGain: 5 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Sleeper Hold", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Nikita Koloff",
        height: "6'2\"",
        weight: 270,
        description: "The Russian Nightmare. A powerful and intimidating Russian heel, known for his Sickle clothesline.",
        baseHp: 1000, strength: 90, technicalAbility: 50, brawlingAbility: 90, stamina: 70, aerialAbility: 5, toughness: 95, reversalAbility: 40, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Russian Sickle (Clothesline)", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Bearhug", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Russian Sickle", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Omos",
        height: "7'3\"",
        weight: 416,
        description: "The Nigerian Giant. A towering and powerful force, known for his immense size and strength.",
        baseHp: 1000, strength: 100, technicalAbility: 20, brawlingAbility: 90, stamina: 50, aerialAbility: 1, toughness: 100, reversalAbility: 10, submissionDefense: 95, staminaRecoveryRate: 2,
        moves: {
            grapple: [{ name: "Two-Handed Chokeslam", damage: { min: 35, max: 55 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }],
            strike: [{ name: "Big Boot", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Two-Handed Chokeslam", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "One Man Gang",
        height: "6'9\"",
        weight: 450,
        description: "The African Dream. A massive and intimidating brawler, known for his size and aggressive style.",
        baseHp: 1000, strength: 95, technicalAbility: 30, brawlingAbility: 90, stamina: 55, aerialAbility: 5, toughness: 100, reversalAbility: 20, submissionDefense: 90, staminaRecoveryRate: 3,
        moves: {
            grapple: [{ name: "747 Splash", damage: { min: 30, max: 50 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Big Splash", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "747 Splash", damage: { min: 45, max: 70 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Owen Hart",
        height: "5'10\"",
        weight: 227,
        description: "The King of Harts. A highly athletic and technical wrestler, known for his high-flying moves and charismatic personality.",
        baseHp: 1000, strength: 70, technicalAbility: 90, brawlingAbility: 65, stamina: 90, aerialAbility: 85, toughness: 75, reversalAbility: 85, submissionDefense: 80, staminaRecoveryRate: 8,
        moves: {
            grapple: [{ name: "Sharpshooter", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Missile Dropkick", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "Diving Headbutt", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }],
            finisher: [{ name: "Sharpshooter", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Paul Orndorff",
        height: "6'0\"",
        weight: 250,
        description: "Mr. Wonderful. A charismatic and powerful heel from the 80s, known for his physique and rivalry with Hulk Hogan.",
        baseHp: 1000, strength: 85, technicalAbility: 60, brawlingAbility: 80, stamina: 75, aerialAbility: 10, toughness: 85, reversalAbility: 55, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Piledriver", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Forearm Smash", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Piledriver", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "R-Truth",
        height: "6'2\"",
        weight: 230,
        description: "What's Up?! A charismatic and comedic wrestler, known for his entertaining antics and 24/7 Championship pursuits.",
        baseHp: 1000, strength: 70, technicalAbility: 65, brawlingAbility: 70, stamina: 80, aerialAbility: 60, toughness: 70, reversalAbility: 60, submissionDefense: 65, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Lie Detector (Corkscrew Scissor Kick)", damage: { min: 15, max: 25 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Axe Kick", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "Flying Forearm", damage: { min: 10, max: 18 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 8, momentumGain: 7 }],
            finisher: [{ name: "Lie Detector", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Randy Orton",
        height: "6'5\"",
        weight: 250,
        description: "The Viper. The Apex Predator. Known for his smooth, methodical style, cunning mind, and devastating RKO. A multiple-time world champion and third-generation superstar.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 80,
        brawlingAbility: 75,
        stamina: 85,
        aerialAbility: 15,
        toughness: 90,
        reversalAbility: 75,
        submissionDefense: 85,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "RKO (Jumping Cutter)", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 25, momentumGain: 20 }
            ],
            strike: [
                { name: "Punt Kick (rare)", damage: { min: 40, max: 60 }, baseHitChance: 0.3, stat: 'brawlingAbility', staminaCost: 30, momentumGain: 25 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "RKO", damage: { min: 45, max: 70 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Rey Mysterio",
        height: "5'6\"",
        weight: 175,
        description: "The Master of the 619. A high-flying innovator and ultimate underdog, known for his breathtaking aerial maneuvers and resilience. A true lucha libre legend.",
        baseHp: 1000,
        strength: 60,
        technicalAbility: 80,
        brawlingAbility: 60,
        stamina: 80,
        aerialAbility: 100,
        toughness: 70,
        reversalAbility: 85,
        submissionDefense: 70,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "619 (Tiger Feint Kick)", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Springboard Seated Senton", damage: { min: 15, max: 25 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "West Coast Pop (Springboard Hurricanrana)", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            finisher: [
                { name: "Frog Splash", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 28, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Rhyno",
        height: "5'10\"",
        weight: 295,
        description: "The Man Beast. A powerful and aggressive brawler, known for his Gore finisher.",
        baseHp: 1000, strength: 90, technicalAbility: 50, brawlingAbility: 95, stamina: 70, aerialAbility: 5, toughness: 90, reversalAbility: 40, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Spinebuster", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Gore (Spear)", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Gore", damage: { min: 45, max: 65 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Ric Flair",
        height: "6'1\"",
        weight: 243,
        description: "The Nature Boy! Woooo! A sixteen-time World Champion, known for his flamboyant persona, incredible promos, and the Figure-Four Leglock. A true icon of professional wrestling.",
        baseHp: 1000,
        strength: 70,
        technicalAbility: 90,
        brawlingAbility: 70,
        stamina: 80,
        aerialAbility: 10,
        toughness: 90,
        reversalAbility: 85,
        submissionDefense: 85,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Figure-Four Leglock", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }
            ],
            strike: [
                { name: "Chop", damage: { min: 10, max: 18 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Figure-Four Leglock", damage: { min: 30, max: 50 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 28, momentumGain: 35, pinAttemptChance: 0, submissionAttemptChance: 0.8 }
            ]
        }
    },
    {
        name: "Rick Rude",
        height: "6'3\"",
        weight: 252,
        description: "The Ravishing One. A charismatic and arrogant heel, known for his chiseled physique and Rude Awakening finisher.",
        baseHp: 1000, strength: 80, technicalAbility: 70, brawlingAbility: 75, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 65, submissionDefense: 75, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Rude Awakening (Neckbreaker)", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Punch", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Rude Awakening", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Rick Steiner",
        height: "5'11\"",
        weight: 275,
        description: "The Dog-Faced Gremlin. One half of the Steiner Brothers, known for his amateur wrestling background and powerful suplexes.",
        baseHp: 1000, strength: 90, technicalAbility: 80, brawlingAbility: 85, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 70, submissionDefense: 85, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Steinerline (Clothesline)", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Dog-Faced Gremlin Headbutt", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Steiner Bulldog", damage: { min: 35, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Ricky Steamboat",
        height: "5'10\"",
        weight: 225,
        description: "The Dragon. Known for his incredible athleticism, honorable demeanor, and classic matches. His rivalry with Ric Flair is legendary.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 95,
        brawlingAbility: 65,
        stamina: 90,
        aerialAbility: 70,
        toughness: 80,
        reversalAbility: 90,
        submissionDefense: 80,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Arm Drag", damage: { min: 10, max: 15 }, baseHitChance: 0.85, stat: 'technicalAbility', staminaCost: 8, momentumGain: 7 }
            ],
            strike: [
                { name: "Chop", damage: { min: 12, max: 20 }, baseHitChance: 0.8, stat: 'strength', staminaCost: 10, momentumGain: 8 }
            ],
            highFlying: [
                { name: "Diving Crossbody", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Diving Crossbody", damage: { min: 30, max: 45 }, baseHitChance: 0.75, stat: 'aerialAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Rikishi",
        height: "6'1\"",
        weight: 425,
        description: "Too Cool! A dancing sumo wrestler known for his immense size, stink face, and Banzai Drop. A charismatic and beloved figure.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 70,
        brawlingAbility: 80,
        stamina: 90,
        aerialAbility: 50,
        toughness: 75,
        reversalAbility: 70,
        submissionDefense: 75,
        staminaRecoveryRate: 15,
        moves: {
            grapple: [
                { name: "Samoan Drop", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 10, momentumGain: 9 },
                { name: "Bearhug", damage: { min: 12, max: 22 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 8, momentumGain: 7 }
            ],
            strike: [
                { name: "Superkick", damage: { min: 10, max: 20 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 8, momentumGain: 7 },
                { name: "Headbutt", damage: { min: 8, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 6, momentumGain: 5 },
                { name: "Rump Shaker (Stink Face)", damage: { min: 8, max: 12 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0, submissionAttemptChance: 0.6 }
            ],
            highFlying: [
                {}
            ],
            finisher: [
                { name: "Banzai Drop", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Road Warrior Animal",
        height: "6'2\"",
        weight: 280,
        description: "One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.",
        baseHp: 1000, strength: 95, technicalAbility: 40, brawlingAbility: 90, stamina: 70, aerialAbility: 5, toughness: 100, reversalAbility: 30, submissionDefense: 90, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Clothesline", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Doomsday Device (with Hawk)", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Road Warrior Hawk",
        height: "6'3\"",
        weight: 270,
        description: "One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.",
        baseHp: 1000, strength: 95, technicalAbility: 40, brawlingAbility: 90, stamina: 70, aerialAbility: 5, toughness: 100, reversalAbility: 30, submissionDefense: 90, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Clothesline", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Doomsday Device (with Animal)", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Rob Van Dam",
        height: "6'0\"",
        weight: 235,
        description: "Mr. Pay-Per-View. The Whole F'n Show. Known for his unique blend of high-flying, martial arts, and technical wrestling. A true innovator and fan favorite.",
        baseHp: 1000, strength: 70, technicalAbility: 80, brawlingAbility: 70, stamina: 85, aerialAbility: 95, toughness: 75, reversalAbility: 75, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Five-Star Frog Splash", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Van Daminator (Spinning Heel Kick with Chair)", damage: { min: 25, max: 40 }, baseHitChance: 0.55, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "Rolling Thunder (Rolling Senton)", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Five-Star Frog Splash", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Roddy Piper",
        height: "6'1\"",
        weight: 230,
        description: "Rowdy. One of the greatest talkers and heels of all time, known for his unpredictable behavior and Piper's Pit.",
        baseHp: 1000, strength: 75, technicalAbility: 60, brawlingAbility: 85, stamina: 75, aerialAbility: 10, toughness: 85, reversalAbility: 55, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Sleeper Hold", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Eye Poke", damage: { min: 5, max: 10 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 5, momentumGain: 4 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Sleeper Hold", damage: { min: 25, max: 40 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 20, momentumGain: 25, pinAttemptChance: 0, submissionAttemptChance: 0.65 }]
        }
    },
    {
        name: "Roman Reigns",
        height: "6'3\"",
        weight: 265,
        description: "The Tribal Chief. The Head of the Table. A dominant and powerful force, known for his Superman Punch and Spear. A multiple-time world champion and leader of The Bloodline.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 70,
        brawlingAbility: 85,
        stamina: 85,
        aerialAbility: 10,
        toughness: 95,
        reversalAbility: 65,
        submissionDefense: 90,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Superman Punch", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Spear", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Drive-By (Running Dropkick)", damage: { min: 15, max: 25 }, baseHitChance: 0.5, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }
            ],
            finisher: [
                { name: "Guillotine Choke", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.75 }
            ]
        }
    },
    {
        name: "Ron Simmons",
        height: "6'2\"",
        weight: 270,
        description: "Damn! A powerful and dominant wrestler, known for his strength and being the first recognized African-American World Heavyweight Champion.",
        baseHp: 1000, strength: 90, technicalAbility: 60, brawlingAbility: 85, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 55, submissionDefense: 85, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Dominator", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Spinebuster", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Dominator", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Ronnie Garvin",
        height: "5'11\"",
        weight: 230,
        description: "The Hands of Stone. A tough and hard-hitting wrestler, known for his stiff punches and submission holds.",
        baseHp: 1000, strength: 75, technicalAbility: 80, brawlingAbility: 85, stamina: 80, aerialAbility: 10, toughness: 85, reversalAbility: 70, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Figure-Four Leglock", damage: { min: 12, max: 20 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 8 }],
            strike: [{ name: "Knockout Punch", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Hands of Stone (Punch)", damage: { min: 30, max: 45 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.65, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Sabu",
        height: "6'0\"",
        weight: 220,
        description: "The Homicidal, Suicidal, Genocidal, Death-Defying Maniac. An extreme high-flyer known for his innovative and dangerous maneuvers.",
        baseHp: 1000, strength: 70, technicalAbility: 60, brawlingAbility: 85, stamina: 70, aerialAbility: 90, toughness: 70, reversalAbility: 60, submissionDefense: 65, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Triple Jump Moonsault", damage: { min: 25, max: 40 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Arabian Facebuster (Chair Assisted)", damage: { min: 20, max: 35 }, baseHitChance: 0.5, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "Air Sabu (Springboard Leg Drop)", damage: { min: 30, max: 45 }, baseHitChance: 0.5, stat: 'aerialAbility', staminaCost: 25, momentumGain: 20 }],
            finisher: [{ name: "Triple Jump Moonsault", damage: { min: 40, max: 60 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Samoa Joe",
        height: "6'2\"",
        weight: 282,
        description: "The Samoan Submission Machine. A powerful and highly skilled technical wrestler, known for his devastating submission holds and hard-hitting style.",
        baseHp: 1000, strength: 90, technicalAbility: 90, brawlingAbility: 85, stamina: 80, aerialAbility: 10, toughness: 90, reversalAbility: 85, submissionDefense: 95, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Coquina Clutch (Rear Naked Choke)", damage: { min: 30, max: 45 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Muscle Buster", damage: { min: 35, max: 50 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }],
            highFlying: [{ name: "Olé Kick (Corner Enzuigiri)", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Coquina Clutch", damage: { min: 40, max: 60 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.85 }]
        }
    },
    {
        name: "Scott Hall",
        height: "6'7\"",
        weight: 287,
        description: "The Bad Guy. A charismatic and influential wrestler, known for his 'Razor Ramon' persona and Outsider/nWo run.",
        baseHp: 1000, strength: 85, technicalAbility: 65, brawlingAbility: 80, stamina: 75, aerialAbility: 10, toughness: 85, reversalAbility: 60, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Razor's Edge (Outsider's Edge)", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Chop", damage: { min: 10, max: 18 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Razor's Edge", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Scott Steiner",
        height: "6'1\"",
        weight: 275,
        description: "Big Poppa Pump. One half of the Steiner Brothers, known for his amateur wrestling background, powerful suplexes, and later, his eccentric persona.",
        baseHp: 1000, strength: 95, technicalAbility: 85, brawlingAbility: 90, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 80, submissionDefense: 85, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Steiner Recliner (Camel Clutch)", damage: { min: 25, max: 40 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Frankensteiner (Hurricanrana)", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Steiner Recliner", damage: { min: 40, max: 60 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "Seth Rollins",
        height: "6'1\"",
        weight: 217,
        description: "The Visionary. The Revolutionary. Known for his incredible athleticism, innovative offense, and dynamic character changes. A multiple-time world champion and Grand Slam Champion.",
        baseHp: 1000,
        strength: 80,
        technicalAbility: 90,
        brawlingAbility: 70,
        stamina: 88,
        aerialAbility: 85,
        toughness: 80,
        reversalAbility: 85,
        submissionDefense: 80,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Pedigree", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Curb Stomp (Blackout)", damage: { min: 30, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            highFlying: [
                { name: "Frog Splash", damage: { min: 20, max: 35 }, baseHitChance: 0.55, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Curb Stomp", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Shawn Michaels",
        height: "6'1\"",
        weight: 225,
        description: "The Heartbreak Kid. Mr. WrestleMania. One of the greatest performers of all time, known for his incredible athleticism, charisma, and devastating Sweet Chin Music. A Grand Slam Champion.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 85,
        brawlingAbility: 70,
        stamina: 90,
        aerialAbility: 80,
        toughness: 80,
        reversalAbility: 80,
        submissionDefense: 80,
        staminaRecoveryRate: 8,
        moves: {
            grapple: [
                { name: "Sweet Chin Music (Superkick)", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Flying Forearm Smash", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "Diving Elbow Drop", damage: { min: 20, max: 35 }, baseHitChance: 0.6, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }
            ],
            finisher: [
                { name: "Sweet Chin Music", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Sheamus",
        height: "6'4\"",
        weight: 267,
        description: "The Celtic Warrior. A hard-hitting and aggressive brawler, known for his Brogue Kick and intense style.",
        baseHp: 1000, strength: 85, technicalAbility: 70, brawlingAbility: 90, stamina: 80, aerialAbility: 5, toughness: 90, reversalAbility: 65, submissionDefense: 85, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "White Noise (Crucifix Powerbomb)", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Brogue Kick", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Brogue Kick", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Shinsuke Nakamura",
        height: "6'2\"",
        weight: 229,
        description: "The King of Strong Style. A charismatic and unorthodox striker, known for his unique movements and devastating Kinshasa.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 90, stamina: 85, aerialAbility: 10, toughness: 80, reversalAbility: 80, submissionDefense: 75, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Reverse Exploder Suplex", damage: { min: 20, max: 35 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Kinshasa (Knee Strike)", damage: { min: 30, max: 45 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Kinshasa", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Sid Vicious",
        height: "6'9\"",
        weight: 303,
        description: "The Master and Ruler of the World. A powerful and intense big man, known for his unpredictable nature and powerbomb.",
        baseHp: 1000, strength: 90, technicalAbility: 50, brawlingAbility: 85, stamina: 70, aerialAbility: 5, toughness: 95, reversalAbility: 40, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Big Boot", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Powerbomb", damage: { min: 45, max: 65 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.8, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Stan Hansen",
        height: "6'3\"",
        weight: 295,
        description: "The Lariat. A legendary tough and hard-hitting brawler, known for his stiff clothesline and wild persona.",
        baseHp: 1000, strength: 90, technicalAbility: 40, brawlingAbility: 95, stamina: 70, aerialAbility: 5, toughness: 100, reversalAbility: 30, submissionDefense: 90, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Western Lariat", damage: { min: 30, max: 45 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Elbow Drop", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Western Lariat", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Steve Williams",
        height: "6'2\"",
        weight: 275,
        description: "Dr. Death. A powerful and legitimate tough wrestler, known for his amateur wrestling background and hard-hitting style.",
        baseHp: 1000, strength: 90, technicalAbility: 85, brawlingAbility: 90, stamina: 80, aerialAbility: 10, toughness: 95, reversalAbility: 80, submissionDefense: 90, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Oklahoma Stampede (Running Powerslam)", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Forearm Smash", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Oklahoma Stampede", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Sting",
        height: "6'2\"",
        weight: 250,
        description: "The Icon. The Vigilante. Known for his mysterious persona, iconic baseball bat, and devastating Scorpion Death Drop. A multiple-time world champion and legend of WCW.",
        baseHp: 1000,
        strength: 85,
        technicalAbility: 75,
        brawlingAbility: 80,
        stamina: 80,
        aerialAbility: 15,
        toughness: 90,
        reversalAbility: 70,
        submissionDefense: 85,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Scorpion Death Drop", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Stinger Splash", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Scorpion Deathlock", damage: { min: 35, max: 55 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0, submissionAttemptChance: 0.8 }
            ]
        }
    },
    {
        name: "Stone Cold Steve Austin",
        height: "6'2\"",
        weight: 252,
        description: "The Texas Rattlesnake. The undisputed leader of the Attitude Era, known for his rebellious attitude, beer-drinking, and devastating Stone Cold Stunner. A six-time WWE Champion.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 60,
        brawlingAbility: 95,
        stamina: 85,
        aerialAbility: 5,
        toughness: 95,
        reversalAbility: 55,
        submissionDefense: 90,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Stone Cold Stunner", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }
            ],
            strike: [
                { name: "Lou Thesz Press", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Stone Cold Stunner", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 45, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Ted DiBiase",
        height: "6'3\"",
        weight: 260,
        description: "The Million Dollar Man. A wealthy and arrogant heel, known for his Million Dollar Dream sleeper hold and bribing opponents.",
        baseHp: 1000, strength: 75, technicalAbility: 85, brawlingAbility: 70, stamina: 80, aerialAbility: 10, toughness: 80, reversalAbility: 75, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Million Dollar Dream (Cobra Clutch)", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Fist Drop", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Million Dollar Dream", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.75 }]
        }
    },
    {
        name: "Terry Funk",
        height: "6'1\"",
        weight: 249,
        description: "The Funker. A legendary hardcore icon, known for his longevity, intensity, and willingness to brawl anywhere.",
        baseHp: 1000, strength: 80, technicalAbility: 60, brawlingAbility: 95, stamina: 75, aerialAbility: 10, toughness: 95, reversalAbility: 40, submissionDefense: 85, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Spinning Toe Hold", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Piledriver", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Spinning Toe Hold", damage: { min: 30, max: 45 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.7 }]
        }
    },
    {
        name: "Terry Gordy",
        height: "6'3\"",
        weight: 280,
        description: "Bam Bam. A powerful and athletic brawler, known for his time in the Fabulous Freebirds and his hard-hitting style.",
        baseHp: 1000, strength: 90, technicalAbility: 60, brawlingAbility: 88, stamina: 75, aerialAbility: 10, toughness: 90, reversalAbility: 55, submissionDefense: 80, staminaRecoveryRate: 6,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Lariat", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Powerbomb", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "The Big Show",
        height: "7'0\"",
        weight: 383,
        description: "The World's Largest Athlete. A towering giant with incredible power and surprising agility for his size. A versatile competitor who has held numerous championships.",
        baseHp: 1000,
        strength: 98,
        technicalAbility: 50,
        brawlingAbility: 90,
        stamina: 65,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 40,
        submissionDefense: 95,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Chokeslam", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 15 }
            ],
            strike: [
                { name: "Knockout Punch", damage: { min: 30, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 25, momentumGain: 20 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Showstopper (Chokeslam)", damage: { min: 45, max: 70 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 45, momentumGain: 50, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "The Great Khali",
        height: "7'1\"",
        weight: 347,
        description: "The Punjabi Nightmare. A massive Indian giant, known for his immense size and Chop.",
        baseHp: 1000, strength: 98, technicalAbility: 20, brawlingAbility: 85, stamina: 50, aerialAbility: 1, toughness: 100, reversalAbility: 10, submissionDefense: 90, staminaRecoveryRate: 2,
        moves: {
            grapple: [{ name: "Punjabi Plunge (Two-Handed Chokeslam)", damage: { min: 30, max: 50 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Brain Chop", damage: { min: 35, max: 55 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 20 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Punjabi Plunge", damage: { min: 45, max: 70 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "The Great Muta",
        height: "6'2\"",
        weight: 230,
        description: "The Master of the Muta Lock. A Japanese wrestling icon known for his innovative offense, mist-spitting, and mysterious persona. A true innovator.",
        baseHp: 1000,
        strength: 75,
        technicalAbility: 90,
        brawlingAbility: 80,
        stamina: 80,
        aerialAbility: 70,
        toughness: 85,
        reversalAbility: 85,
        submissionDefense: 80,
        staminaRecoveryRate: 6,
        moves: {
            grapple: [
                { name: "Muta Lock", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }
            ],
            strike: [
                { name: "Green Mist", damage: { min: 10, max: 15 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }
            ],
            highFlying: [
                { name: "Moonsault", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 18, momentumGain: 15 }
            ],
            finisher: [
                { name: "Shining Wizard (Running Knee)", damage: { min: 35, max: 55 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.65, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "The Iron Sheik",
        height: "6'0\"",
        weight: 260,
        description: "The Iranian strongman, known for his anti-American promos and Camel Clutch finisher.",
        baseHp: 1000, strength: 80, technicalAbility: 60, brawlingAbility: 85, stamina: 70, aerialAbility: 5, toughness: 90, reversalAbility: 40, submissionDefense: 90, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Camel Clutch", damage: { min: 20, max: 35 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            strike: [{ name: "Forearm Smash", damage: { min: 10, max: 18 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 8, momentumGain: 7 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Camel Clutch", damage: { min: 30, max: 45 }, baseHitChance: 0.8, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0, submissionAttemptChance: 0.8 }]
        }
    },
    {
        name: "The Miz",
        height: "6'2\"",
        weight: 220,
        description: "The A-Lister. A charismatic and arrogant heel, known for his mic skills and Skull-Crushing Finale.",
        baseHp: 1000, strength: 70, technicalAbility: 75, brawlingAbility: 70, stamina: 85, aerialAbility: 10, toughness: 75, reversalAbility: 70, submissionDefense: 70, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Skull-Crushing Finale (Full Neson Facebuster)", damage: { min: 25, max: 40 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 18, momentumGain: 15 }],
            strike: [{ name: "Reality Check (Running Knee Lift)", damage: { min: 15, max: 25 }, baseHitChance: 0.7, stat: 'brawlingAbility', staminaCost: 10, momentumGain: 9 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Skull-Crushing Finale", damage: { min: 35, max: 50 }, baseHitChance: 0.6, stat: 'strength', staminaCost: 30, momentumGain: 35, pinAttemptChance: 0.7, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "The Rock",
        height: "6'5\"",
        weight: 260,
        description: "The Most Electrifying Man in Sports Entertainment. Known for his unparalleled charisma, iconic catchphrases, and devastating Rock Bottom and People's Elbow. A multiple-time world champion and Hollywood superstar.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 65,
        brawlingAbility: 85,
        stamina: 85,
        aerialAbility: 10,
        toughness: 90,
        reversalAbility: 60,
        submissionDefense: 85,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Rock Bottom", damage: { min: 35, max: 50 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "People's Elbow", damage: { min: 25, max: 40 }, baseHitChance: 0.6, stat: 'brawlingAbility', staminaCost: 18, momentumGain: 15 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Rock Bottom", damage: { min: 45, max: 65 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "The Undertaker",
        height: "6'10\"",
        weight: 309,
        description: "The Deadman. The Phenom. A legendary supernatural force, known for his chilling entrance, incredible longevity, and devastating Tombstone Piledriver. His WrestleMania undefeated streak is iconic.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 70,
        brawlingAbility: 90,
        stamina: 80,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 65,
        submissionDefense: 95,
        staminaRecoveryRate: 5,
        moves: {
            grapple: [
                { name: "Chokeslam", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Old School (Arm Twist Ropewalk Chop)", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'aerialAbility', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Tombstone Piledriver", damage: { min: 50, max: 75 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 45, pinAttemptChance: 0.8, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Triple H",
        height: "6'4\"",
        weight: 255,
        description: "The Game. The King of Kings. A dominant and cerebral competitor, known for his powerful offense, cunning mind, and devastating Pedigree. A multiple-time world champion and wrestling executive.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 85,
        brawlingAbility: 80,
        stamina: 85,
        aerialAbility: 10,
        toughness: 95,
        reversalAbility: 80,
        submissionDefense: 90,
        staminaRecoveryRate: 7,
        moves: {
            grapple: [
                { name: "Pedigree", damage: { min: 35, max: 50 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Sledgehammer Shot (rare)", damage: { min: 40, max: 60 }, baseHitChance: 0.3, stat: 'brawlingAbility', staminaCost: 25, momentumGain: 20 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Pedigree", damage: { min: 45, max: 70 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Tully Blanchard",
        height: "5'10\"",
        weight: 220,
        description: "The Enforcer. A cunning and technical wrestler, known for his intelligence and being a member of the Four Horsemen.",
        baseHp: 1000, strength: 70, technicalAbility: 90, brawlingAbility: 65, stamina: 80, aerialAbility: 10, toughness: 80, reversalAbility: 85, submissionDefense: 85, staminaRecoveryRate: 7,
        moves: {
            grapple: [{ name: "Slingshot Suplex", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'technicalAbility', staminaCost: 10, momentumGain: 9 }],
            strike: [{ name: "Piledriver", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'technicalAbility', staminaCost: 15, momentumGain: 12 }],
            highFlying: [{ name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }],
            finisher: [{ name: "Slingshot Suplex", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'technicalAbility', staminaCost: 25, momentumGain: 30, pinAttemptChance: 0.6, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Ultimate Warrior",
        height: "6'2\"",
        weight: 280,
        description: "Feel the Power! An intensely energetic and unpredictable superstar, known for his face paint, colorful attire, and powerful Gorilla Press Slam. A former WWE Champion.",
        baseHp: 1000,
        strength: 95,
        technicalAbility: 40,
        brawlingAbility: 85,
        stamina: 70,
        aerialAbility: 5,
        toughness: 90,
        reversalAbility: 35,
        submissionDefense: 80,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Gorilla Press Slam", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }
            ],
            strike: [
                { name: "Clothesline", damage: { min: 15, max: 25 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 12, momentumGain: 10 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Warrior Splash", damage: { min: 40, max: 60 }, baseHitChance: 0.65, stat: 'strength', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.7, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Vader",
        height: "6'5\"",
        weight: 350,
        description: "The Mastodon. A powerful and aggressive superheavyweight, known for his stiff strikes and Vader Bomb.",
        baseHp: 1000, strength: 95, technicalAbility: 50, brawlingAbility: 90, stamina: 65, aerialAbility: 40, toughness: 100, reversalAbility: 40, submissionDefense: 90, staminaRecoveryRate: 5,
        moves: {
            grapple: [{ name: "Powerbomb", damage: { min: 30, max: 45 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 20, momentumGain: 18 }],
            strike: [{ name: "Vader Bomb (Corner Splash)", damage: { min: 35, max: 55 }, baseHitChance: 0.65, stat: 'aerialAbility', staminaCost: 25, momentumGain: 20 }],
            highFlying: [{ name: "Moonsault (rare)", damage: { min: 20, max: 35 }, baseHitChance: 0.3, stat: 'aerialAbility', staminaCost: 15, momentumGain: 12 }],
            finisher: [{ name: "Vader Bomb", damage: { min: 45, max: 70 }, baseHitChance: 0.7, stat: 'aerialAbility', staminaCost: 35, momentumGain: 40, pinAttemptChance: 0.75, submissionAttemptChance: 0 }]
        }
    },
    {
        name: "Umaga",
        height: "6'4\"",
        weight: 348,
        description: "The Samoan Bulldozer. A destructive and unpredictable force, known for his savage intensity and devastating Samoan Spike. A former Intercontinental Champion.",
        baseHp: 1000,
        strength: 90,
        technicalAbility: 30,
        brawlingAbility: 100,
        stamina: 70,
        aerialAbility: 5,
        toughness: 95,
        reversalAbility: 25,
        submissionDefense: 90,
        staminaRecoveryRate: 4,
        moves: {
            grapple: [
                { name: "Samoan Drop", damage: { min: 25, max: 40 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 18, momentumGain: 15 }
            ],
            strike: [
                { name: "Running Hip Attack", damage: { min: 20, max: 35 }, baseHitChance: 0.65, stat: 'brawlingAbility', staminaCost: 15, momentumGain: 12 }
            ],
            highFlying: [
                { name: "Diving Headbutt (rare)", damage: { min: 15, max: 25 }, baseHitChance: 0.3, stat: 'aerialAbility', staminaCost: 10, momentumGain: 8 }
            ],
            finisher: [
                { name: "Samoan Spike", damage: { min: 40, max: 60 }, baseHitChance: 0.75, stat: 'brawlingAbility', staminaCost: 30, momentumGain: 38, pinAttemptChance: 0.75, submissionAttemptChance: 0 }
            ]
        }
    },
    {
        name: "Yokozuna",
        height: "6'4\"",
        weight: 589,
        description: "A colossal sumo wrestler turned WWE Champion, known for his immense size, Banzai Drop, and association with Mr. Fuji. A dominant force in the early 90s.",
        baseHp: 1000,
        strength: 100,
        technicalAbility: 20,
        brawlingAbility: 90,
        stamina: 50,
        aerialAbility: 5,
        toughness: 100,
        reversalAbility: 15,
        submissionDefense: 95,
        staminaRecoveryRate: 3,
        moves: {
            grapple: [
                { name: "Banzai Drop", damage: { min: 40, max: 60 }, baseHitChance: 0.7, stat: 'strength', staminaCost: 25, momentumGain: 20 }
            ],
            strike: [
                { name: "Salt Throw", damage: { min: 5, max: 10 }, baseHitChance: 0.8, stat: 'brawlingAbility', staminaCost: 5, momentumGain: 4 }
            ],
            highFlying: [
                { name: "None", damage: { min: 0, max: 0 }, baseHitChance: 0, stat: 'none', staminaCost: 0, momentumGain: 0 }
            ],
            finisher: [
                { name: "Banzai Drop", damage: { min: 50, max: 80 }, baseHitChance: 0.75, stat: 'strength', staminaCost: 40, momentumGain: 50, pinAttemptChance: 0.85, submissionAttemptChance: 0 }
            ]
        }
    }
];

// Map the raw data to the desired wrestler object structure
export const wrestlers = wrestlersData.map(wrestler => {
    // Create a stats object from the individual stat properties
    const stats = {
        strength: wrestler.strength,
        technicalAbility: wrestler.technicalAbility,
        brawlingAbility: wrestler.brawlingAbility,
        stamina: wrestler.stamina,
        aerialAbility: wrestler.aerialAbility,
        toughness: wrestler.toughness,
        reversalAbility: wrestler.reversalAbility,
        submissionDefense: wrestler.submissionDefense,
        staminaRecoveryRate: wrestler.staminaRecoveryRate
    };

    // Convert stats object to an array of values
    const statValues = Object.values(stats);

    // Sort the array in ascending order to find the lowest skill
    statValues.sort((a, b) => a - b);

    // Remove the lowest skill (the first element after sorting)
    statValues.shift();

    // Calculate the sum of the remaining stats
    const sumRemainingStats = statValues.reduce((sum, val) => sum + val, 0);

    // Calculate the average of the remaining stats for the overall rating
    // Ensure division by the correct number of remaining stats
    const overall = Math.round(sumRemainingStats / statValues.length);

    // Use the getLastName function to determine the image filename
    const imageFilename = getLastName(wrestler.name);

    // Construct the full image URL
    const imageUrl = `${IMAGE_BASE_URL}${imageFilename}.webp`;

    return {
        id: `wrestler-${wrestler.name.toLowerCase().replace(/\s/g, '-')}`,
        name: wrestler.name,
        image: imageUrl,
        stats: stats, // Use the new stats structure
        overall: overall,
        moves: wrestler.moves, // Ensure moves are included
        baseHp: wrestler.baseHp // Crucially ensure baseHp is included
    };
});

console.log('Sample wrestler after mapping (data.js):', wrestlers[0] ? { name: wrestlers[0].name, baseHp: wrestlers[0].baseHp, moves: wrestlers[0].moves, stats: wrestlers[0].stats } : 'No wrestlers in array');

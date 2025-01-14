const action_good_cards = [
    { id: 1, name: "Won Lottery", description: "You hit the jackpot in a lottery!", effects: { money: 5000000, int: 0, str: 0, char: 10, hp: 10, jail: false } },
    { id: 2, name: "Found Wallet", description: "You found a wallet on the street.", effects: { money: 100, int: 2, str: 0, char: 5, hp: 2, jail: false } },
    { id: 3, name: "Got Promoted", description: "Hard work pays off. You got a promotion!", effects: { money: 10000, int: 10, str: 0, char: 10, hp: 5, jail: false } },
    { id: 4, name: "Public Speaking", description: "You spoke at a public event.", effects: { money: 0, int: 10, str: 0, char: 20, hp: -5, jail: false } }, // Slight stress from public speaking
    { id: 5, name: "Passed Exam", description: "You aced your exam with flying colors!", effects: { money: 0, int: 15, str: 0, char: 5, hp: 5, jail: false } },
    { id: 6, name: "Found Treasure", description: "You discovered hidden treasure!", effects: { money: 500000, int: 0, str: 5, char: 0, hp: 10, jail: false } },
    { id: 7, name: "Great Investment", description: "Your investment doubled!", effects: { money: 50000, int: 10, str: 0, char: 0, hp: 5, jail: false } },
    { id: 8, name: "Fought a Bear", description: "You fought a bear and survived!", effects: { money: 0, int: 5, str: 20, char: 15, hp: -10, jail: false } }, // Physical toll from fighting a bear
    { id: 9, name: "Learned a Skill", description: "You mastered a new skill.", effects: { money: -500, int: 20, str: 0, char: 10, hp: 5, jail: false } },
    { id: 10, name: "Became Famous", description: "You went viral on the internet!", effects: { money: 100000, int: 0, str: 0, char: 25, hp: -5, jail: false } }, // Fame can bring slight stress
    { id: 11, name: "New Job", description: "You landed a high-paying job.", effects: { money: 60000, int: 10, str: 0, char: 5, hp: 5, jail: false } },
    { id: 12, name: "Learned Coding", description: "You learned to code and improved your logic.", effects: { money: -2000, int: 15, str: 0, char: 0, hp: 5, jail: false } },
    { id: 13, name: "Helped Stranger", description: "You helped a stranger in need.", effects: { money: -100, int: 0, str: 0, char: 10, hp: 5, jail: false } },
    { id: 14, name: "Found Rare Artifact", description: "You sold a rare artifact.", effects: { money: 150000, int: 0, str: 0, char: 10, hp: 10, jail: false } },
    { id: 15, name: "Won Bet", description: "You won a risky bet!", effects: { money: 2000, int: 5, str: 0, char: 0, hp: 5, jail: false } },
    { id: 16, name: "Adopted a Pet", description: "You adopted a pet that brings you joy.", effects: { money: -3000, int: 0, str: 0, char: 15, hp: 10, jail: false } },
    { id: 17, name: "Volunteer Work", description: "You volunteered for a local event.", effects: { money: -100, int: 0, str: 0, char: 15, hp: 5, jail: false } },
    { id: 18, name: "Received Gift", description: "You received a generous gift!", effects: { money: 500, int: 0, str: 0, char: 10, hp: 5, jail: false } },
    { id: 19, name: "Won a Race", description: "You won a local marathon!", effects: { money: 1000, int: 0, str: 20, char: 5, hp: 10, jail: false } },
    { id: 20, name: "Inheritance", description: "A distant relative left you a fortune.", effects: { money: 1000000, int: 0, str: 0, char: 5, hp: 5, jail: false } },
    { id: 21, name: "Discovered a Shortcut", description: "You found a shortcut that saved you a lot of time.", effects: { money: 0, int: 5, str: 0, char: 10, hp: 5, jail: false } },
    { id: 22, name: "Scholarship", description: "You earned a scholarship for your studies.", effects: { money: 20000, int: 15, str: 0, char: 5, hp: 5, jail: false } },
    { id: 23, name: "Successful Startup", description: "Your startup idea became a massive success.", effects: { money: 300000, int: 10, str: 0, char: 10, hp: 10, jail: false } },
    { id: 24, name: "Charity Gala", description: "You attended a gala and gained influential connections.", effects: { money: -2000, int: 0, str: 0, char: 20, hp: 5, jail: false } },
    { id: 25, name: "Fitness Milestone", description: "You achieved a new personal best in fitness.", effects: { money: -1000, int: 0, str: 25, char: 5, hp: 10, jail: false } }
];

const action_bad_cards = [
    { id: 1, name: "Broke Leg", description: "You slipped and broke your leg.", effects: { money: -20000, int: 5, str: -10, char: 5, hp: -30, jail: false } },
    { id: 2, name: "Broke Arm", description: "You fell while running and broke your arm.", effects: { money: -15000, int: 5, str: -10, char: 0, hp: -20, jail: false } },
    { id: 3, name: "Lost Wallet", description: "Your wallet was stolen.", effects: { money: -500, int: -2, str: 0, char: -5, hp: 0, jail: false } },
    { id: 4, name: "Failed Exam", description: "You didn’t prepare well and failed the exam.", effects: { money: 0, int: -10, str: 0, char: -5, hp: -5, jail: false } },
    { id: 5, name: "Car Accident", description: "You were in a minor car accident.", effects: { money: -8000, int: -5, str: -5, char: 0, hp: -15, jail: false } },
    { id: 6, name: "Bad Investment", description: "Your investment didn't go as planned.", effects: { money: -25000, int: -5, str: 0, char: -10, hp: 0, jail: false } },
    { id: 7, name: "Medical Bill", description: "You had to pay a medical bill.", effects: { money: -20000, int: 0, str: -5, char: 0, hp: -10, jail: false } },
    { id: 8, name: "Car Breakdown", description: "Your car broke down and needed repairs.", effects: { money: -1500, int: 0, str: -5, char: 0, hp: 0, jail: false } },
    { id: 9, name: "Heavy Rain", description: "You got soaked in heavy rain and fell ill.", effects: { money: -300, int: 0, str: -10, char: 0, hp: -10, jail: false } },
    { id: 10, name: "Got Scammed", description: "You fell for a scam.", effects: { money: -2000, int: -5, str: 0, char: -5, hp: 0, jail: false } },
    { id: 11, name: "Lost Bet", description: "You lost a risky bet.", effects: { money: -500, int: -5, str: 0, char: -5, hp: 0, jail: false } },
    { id: 12, name: "Stuck in Traffic", description: "You spent hours in traffic.", effects: { money: -50, int: -5, str: 0, char: 0, hp: -1, jail: false } },
    { id: 13, name: "Accidentally Broke Phone", description: "You dropped and broke your phone.", effects: { money: -1000, int: 0, str: -5, char: 0, hp: 0, jail: false } },
    { id: 14, name: "Caught Cheating", description: "You tried to cheat in a game, but got caught red-handed. Straight to jail! Skips 1 turn while serving jail time.", effects: { money: -500, int: -5, str: 0, char: -10, hp: -5, jail: true } },
    { id: 15, name: "Robbed on the Street", description: "You were mugged on your way home.", effects: { money: -1000, int: -2, str: -5, char: -10, hp: -10, jail: false } },
    { id: 16, name: "Accidentally Damaged Property", description: "You accidentally broke someone's property and had to pay for it.", effects: { money: -3000, int: -5, str: 0, char: -5, hp: 0, jail: false } },
    { id: 17, name: "Got Caught Lying", description: "You lied about something and lost trust from those around you.", effects: { money: 0, int: -5, str: 0, char: -15, hp: -5, jail: false } },
    { id: 18, name: "Unpaid Taxes", description: "You forgot to pay your taxes, and now you owe late fees.", effects: { money: -10000, int: -5, str: 0, char: -5, hp: -5, jail: true } },
    { id: 19, name: "DUI Arrest", description: "You were caught driving under the influence. Straight to jail!", effects: { money: -5000, int: -10, str: -5, char: -10, hp: -20, jail: true } },
    { id: 20, name: "Identity Theft", description: "Your identity was stolen, and your bank account was drained.", effects: { money: -15000, int: -5, str: 0, char: -10, hp: 0, jail: false } },
    { id: 21, name: "Eviction Notice", description: "You couldn't pay your rent and got evicted.", effects: { money: -10000, int: -5, str: -10, char: -5, hp: -10, jail: false } },
    { id: 22, name: "Caught Shoplifting", description: "You were caught shoplifting and faced legal trouble.", effects: { money: -2000, int: -5, str: -5, char: -15, hp: -10, jail: true } },
    { id: 23, name: "Wrongfully Accused", description: "You were wrongfully accused of a crime and spent time in jail.", effects: { money: -5000, int: -5, str: 0, char: -10, hp: -15, jail: true } },
    { id: 24, name: "Workplace Injury", description: "You were injured at work and had to pay medical bills.", effects: { money: -10000, int: 0, str: -10, char: 0, hp: -20, jail: false } },
    { id: 25, name: "Court Fees", description: "You got involved in a legal dispute and had to pay court fees.", effects: { money: -7000, int: -5, str: 0, char: -5, hp: -5, jail: false } }
];

const fired_cards = [
    { id: 1, name: "Fired for Sleeping at Work", description: "You were caught snoring loudly during a meeting. The boss wasn't impressed.", effects: { money: -12000, int: -5, str: 0, char: -10 } },
    { id: 2, name: "Fired for Sending the Wrong Email", description: "You accidentally sent a cat meme to the CEO instead of a report. Whoops!", effects: { money: -12000, int: -5, str: 0, char: -5 } },
    { id: 3, name: "Fired for Office Pranks", description: "You replaced everyone's mouse with a brick. HR had enough of your antics.", effects: { money: -12000, int: -5, str: 0, char: -10 } },
    { id: 4, name: "Fired for Arguing with a Client", description: "You passionately argued why pineapple belongs on pizza. The client disagreed... strongly.", effects: { money: -12000, int: -5, str: 0, char: -10 } }
];

const action_good_teen_cards = [
    // Positive Chance Cards
    { id: 1, name: "Ace a Quiz", description: "Your preparation paid off, and you aced a tough quiz!", effects: { money: 0, int: 15, str: 0, char: 5 } },
    { id: 2, name: "Won a Sports Match", description: "You led your team to victory in a school sports match.", effects: { money: 0, int: 5, str: 10, char: 10 } },
    { id: 3, name: "Scholarship Awarded", description: "Your hard work was recognized with a scholarship.", effects: { money: 24000, int: 20, str: 0, char: 0 } },
    { id: 4, name: "Community Service", description: "You volunteered to clean the park, earning respect.", effects: { money: 0, int: 5, str: 0, char: 15 } },
    { id: 5, name: "Made New Friends", description: "You met amazing people at a school event.", effects: { money: 0, int: 0, str: 0, char: 20 } },
    { id: 6, name: "Won an Art Contest", description: "Your creative skills won you first place in an art contest.", effects: { money: 6000, int: 10, str: 0, char: 15 } },
    { id: 7, name: "Part-Time Job Success", description: "You performed well and received a bonus at your part-time job.", effects: { money: 12000, int: 10, str: 0, char: 5 } },
    { id: 8, name: "Excelling in Coding", description: "You built your first app and gained recognition.", effects: { money: 0, int: 15, str: 0, char: 10 } },
    { id: 9, name: "Discovered a Talent", description: "You realized you're amazing at photography.", effects: { money: 0, int: 5, str: 0, char: 20 } },
    { id: 10, name: "Earned a Trophy", description: "You won a prestigious trophy at school.", effects: { money: 0, int: 5, str: 5, char: 10 } }
];

const action_bad_teen_cards = [
    { id: 1, name: "Lost Homework", description: "Your dog ate your homework, and you got scolded.", effects: { money: 0, int: -10, str: 0, char: -5 } },
    { id: 2, name: "Forgot a Test", description: "You forgot about an important test and scored poorly.", effects: { money: 0, int: -15, str: 0, char: -5 } },
    { id: 3, name: "Bullied at School", description: "You were bullied, making it a tough week.", effects: { money: 0, int: 0, str: -5, char: -15 } },
    { id: 4, name: "Overslept", description: "You overslept and missed an important class.", effects: { money: 0, int: -5, str: 0, char: -5 } },
    { id: 5, name: "Phone Confiscated", description: "Your phone was confiscated for texting in class.", effects: { money: 0, int: 0, str: 0, char: -10 } },
    { id: 6, name: "Argued with a Friend", description: "You had a big argument with your best friend.", effects: { money: 0, int: 0, str: 0, char: -20 } },
    { id: 7, name: "Failed a Project", description: "Your science project didn't work as planned.", effects: { money: -12000, int: -10, str: 0, char: -5 } },
    { id: 8, name: "Lost in a Game", description: "You lost the final match of a tournament.", effects: { money: 0, int: -5, str: -10, char: -5 } },
    { id: 9, name: "Peer Pressure", description: "You gave in to peer pressure and got into trouble.", effects: { money: 0, int: -5, str: 0, char: -15 } },
    { id: 10, name: "Grounded", description: "You broke curfew and got grounded for a week.", effects: { money: 0, int: 0, str: 0, char: -20 } }
]

const words = [
    "apple", "balloon", "cat", "dog", "elephant", "flower", "guitar", "house", "island", "jacket",
    "kite", "lamp", "mountain", "notebook", "ocean", "pencil", "queen", "rainbow", "star", "tree",
    "umbrella", "violin", "waterfall", "xylophone", "yacht", "zebra", "airplane", "bicycle", "camera",
    "dolphin", "earring", "firetruck", "grapes", "hat", "igloo", "jungle", "kangaroo", "lemon", "moon",
    "nest", "octopus", "parrot", "quilt", "robot", "sun", "turtle", "unicorn", "volcano", "whale",
    "x-ray", "yoyo", "zeppelin", "anchor", "bridge", "castle", "drum", "egg", "feather", "glasses",
    "hamburger", "ice cream", "jellyfish", "key", "ladder", "mirror", "needle", "owl", "pizza", "quill",
    "rocket", "sandcastle", "trophy", "vase", "window", "yard", "zipper", "ant", "basket", "cloud",
    "daisy", "envelope", "fan", "ghost", "hammer", "ink", "jeep", "koala", "lion", "magnet",
    "necklace", "onion", "penguin", "quokka", "ring", "sock", "teapot", "vampire", "watch", "yarn",
    "airship", "bakery", "camel", "donut", "eraser", "fireplace", "garden", "helicopter", "iguanodon",
    "jigsaw", "kangaroo", "lighthouse", "meadow", "nightlight", "ostrich", "peacock", "quartz", "racoon",
    "skeleton", "telephone", "ukulele", "vulture", "windmill", "xylophone", "yeti", "zeppelin", "backpack",
    "campfire", "dragon", "easel", "flamingo", "gate", "hedgehog", "iceberg", "jacket", "kettle",
    "landscape", "microphone", "ninja", "orca", "platypus", "quiver", "rabbit", "scarf", "tablet",
    "umbrella", "vase", "wagon", "yo-yo", "zipline", "armchair", "bathtub", "cactus", "dartboard", "eagle",
    "fireworks", "glacier", "harp", "inkwell", "jukebox", "koi", "log", "mountain goat", "night sky",
    "octagon", "pencil case", "quicksand", "racecar", "spaceship", "train", "utensils", "vortex", "whisk",
    "zeppelin", "artichoke", "bell", "candle", "dumbbell", "emu", "fountain", "garage", "hourglass",
    "ice skates", "jellybean", "keychain", "lantern", "melon", "newspaper", "ornament", "puzzle", "ring",
    "snowman", "treehouse", "volleyball", "watermelon", "zoo", "accordion", "bandana", "crocodile",
    "dolphin", "eggplant", "flute", "glider", "hammerhead shark", "igloo", "jackfruit", "kitten", "leopard",
    "mountain lion", "noodle", "oasis", "piano", "quokka", "rooster", "sundial", "toothbrush", "umbrella bird",
    "vacuum", "wind turbine", "x-ray fish", "yellowfin tuna", "zodiac", "abacus", "binoculars", "compass",
    "diving board", "earthworm", "flagpole", "goat", "harp seal", "inkblot", "jukebox", "kayak",
    "log cabin", "matchstick", "navy ship", "oyster", "parrotfish", "quartz crystal", "rainforest",
    "seashell", "tugboat", "umbrella stand", "vintage car", "weather vane", "x-ray glasses", "yarn ball",
    "zippo lighter"
];

const funny_action_cards = [
    { 
        id: 1,
        name: "Robbery Gone Right", 
        description: "Choose which player to rob. Guess their 3-digit PIN in 3 tries. Success means stealing $2000; failure means losing $500.",
        effects: {
            win: { money: 2000, int: 0, str: 0, char: 0, hp: 0 },
            loss: { money: -500, int: 0, str: 0, char: 0, hp: 0 }
        } 
    },
    { 
        id: 2,
        name: "Hot Dog Eating Contest", 
        description: "You entered a hot dog eating contest! Roll a dice 3 times. If the total is 15 or more, win $1500. If not, gain +10 Strength for trying.",
        effects: {
            win: { money: 1500, int: 0, str: 0, char: 0, hp: 0 },
            loss: { money: 0, int: 0, str: 10, char: 0, hp: 0 }
        }
    },
    { 
        id: 3,
        name: "Talent Show Star",
        description: "Perform a talent (dance, sing, joke) in front of the group. If the majority votes 'thumbs up,' gain $1000 and +10 Charisma.",
        effects: {
            win: { money: 1000, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 5, hp: 0 }
        }
    },
    { 
        id: 4,
        name: "Who’s the Smartest?", 
        description: "Ask the group a trivia question of your choice. If they can’t answer, you gain $500 and +5 Intelligence.",
        effects: {
            win: { money: 500, int: 5, str: 0, char: 0, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 5,
        name: "Guess the Weight", 
        description: "You found a mysterious box. Everyone guesses its weight. Closest player wins $1000. If it's you, gain +10 Charisma for bragging rights!",
        effects: {
            win: { money: 1000, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 6,
        name: "Cat Whisperer", 
        description: "A stray cat followed you home. Charm it with dice rolls. If you roll 8+ total with 2 dice, the cat brings you $800 worth of gold coins.",
        effects: {
            win: { money: 800, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 5, hp: 0 }
        }
    },
    { 
        id: 7,
        name: "Magic Lamp Discovery", 
        description: "You found a genie! Roll a dice. 1-3: $1000. 4-5: +10 Intelligence. 6: All players give you $200.",
        effects: {
            win: { money: 1000, int: 0, str: 0, char: 0, hp: 0 },
            loss: { money: 0, int: 10, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 8,
        name: "Treasure Hunt", 
        description: "Hide a card or item. Other players get 2 guesses to find it. If they fail, you win $2000.",
        effects: {
            win: { money: 2000, int: 0, str: 0, char: 5, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 9,
        name: "Spelling Bee Champion", 
        description: "Challenge another player to a 3-word spelling bee. If you win, gain $1000 and +5 Intelligence.",
        effects: {
            win: { money: 1000, int: 5, str: 0, char: 0, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 10,
        name: "Friendly Arm Wrestling", 
        description: "Challenge the strongest player to an arm-wrestling match. If you win, get +15 Strength and $500.",
        effects: {
            win: { money: 500, int: 0, str: 15, char: 0, hp: 0 },
            loss: { money: 0, int: 0, str: 5, char: 0, hp: 0 }
        }
    },
    { 
        id: 11,
        name: "TikTok Viral Dance", 
        description: "Dance in front of everyone like nobody’s watching. Earn $1500 if players laugh, +10 Charisma if they join you.",
        effects: {
            win: { money: 1500, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 10, hp: 0 }
        }
    },
    { 
        id: 12,
        name: "Accidental Hero", 
        description: "You saved a cat stuck in a tree! Roll 1 dice. 1-3: Gain $1000. 4-6: Gain $500 and +10 Charisma.",
        effects: {
            win: { money: 1000, int: 0, str: 5, char: 0, hp: 0 },
            loss: { money: 500, int: 0, str: 0, char: 10, hp: 0 }
        }
    },
    { 
        id: 13,
        name: "Late Night Poker Win", 
        description: "Play a quick rock-paper-scissors game with any player. If you win 2 out of 3, gain $1500.",
        effects: {
            win: { money: 1500, int: 0, str: 0, char: 0, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 14,
        name: "Dumb Luck Investment", 
        description: "You invested in a silly meme stock. Flip a coin: Heads = +$3000, Tails = +$1000 (profit either way!).",
        effects: {
            win: { money: 3000, int: 0, str: 0, char: 0, hp: 0 },
            loss: { money: 1000, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 15,
        name: "Karaoke King/Queen", 
        description: "Sing a song chosen by the group. +10 Charisma for trying, $1000 if everyone applauds.",
        effects: {
            win: { money: 1000, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 10, hp: 0 }
        }
    },
    { 
        id: 16,
        name: "Lucky Rabbit Foot", 
        description: "For the next 3 turns, you are immune to negative cards. Gain +$500 instantly for good fortune.",
        effects: {
            win: { money: 500, int: 0, str: 0, char: 5, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 17,
        name: "Street Performer Win", 
        description: "Show your best party trick (anything!). If others are impressed, gain $800 and +10 Charisma.",
        effects: {
            win: { money: 800, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 5, hp: 0 }
        }
    },
    { 
        id: 18,
        name: "Meme Competition", 
        description: "Make up the funniest meme idea. If the group laughs, you win $1000 and +10 Intelligence for creativity.",
        effects: {
            win: { money: 1000, int: 10, str: 0, char: 5, hp: 0 },
            loss: { money: 0, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 19,
        name: "Pizza Party", 
        description: "You bought pizza for everyone! Gain $500 and +10 Charisma as thanks from your friends.",
        effects: {
            win: { money: 500, int: 0, str: 0, char: 10, hp: 0 },
            loss: { money: -200, int: 0, str: 0, char: 0, hp: 0 }
        }
    },
    { 
        id: 20,
        name: "Unexpected Lottery", 
        description: "Roll a 6-sided dice. Multiply the result by $500 to win your prize.",
        effects: {
            win: { money: 3000, int: 0, str: 0, char: 5, hp: 0 },
            loss: { money: 500, int: 0, str: 0, char: 0, hp: 0 }
        }
    }
];

const jobs_bad = [
    { id: 1, name: "Drug Dealer", description: "Sell illegal drugs to clients.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 2, name: "Pickpocket", description: "Steal wallets and valuables from people.", effects: { money: 15000, int: 0, str: 0, char: 0 } },
    { id: 3, name: "Arms Dealer", description: "Sell illegal firearms and ammunition.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 4, name: "Car Thief", description: "Steal and sell cars on the black market.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 5, name: "Human Trafficker", description: "Engage in the illegal trade of people.", effects: { money: 200000, int: 0, str: 0, char: 0 } },
    { id: 6, name: "Hacker", description: "Illegally access computer systems for profit.", effects: { money: 150000, int: 0, str: 0, char: 0 } },
    { id: 7, name: "Smuggler", description: "Transport contraband across borders.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 8, name: "Bank Robber", description: "Rob banks to steal money.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 9, name: "Scammer", description: "Perform online scams and fraud.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 10, name: "Counterfeiter", description: "Produce fake money or documents.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 11, name: "Extortionist", description: "Force people to pay money under threat.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 12, name: "Hitman", description: "Assassinate targets for payment.", effects: { money: 100000, int: 0, str: 0, char: 0 } },
    { id: 13, name: "Pimp", description: "Operate illegal prostitution rings.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 14, name: "Fence", description: "Sell stolen goods.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 15, name: "Cybercriminal", description: "Commit crimes over the internet.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 16, name: "Blackmailer", description: "Threaten to release compromising information for money.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 17, name: "Illegal Miner", description: "Mine valuable resources in restricted areas.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 18, name: "Loot Smuggler", description: "Sell stolen historical artifacts.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 19, name: "Loan Shark", description: "Provide illegal high-interest loans.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 20, name: "Forger", description: "Create fake documents or art.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 21, name: "Street Racer", description: "Participate in illegal street racing for bets.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 22, name: "Poacher", description: "Hunt protected wildlife to sell rare animal parts.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 23, name: "Illegal Logger", description: "Cut down protected forests for profit.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 24, name: "Money Launderer", description: "Clean dirty money through illegal channels.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 25, name: "Spy for Hire", description: "Sell sensitive information to rival organizations.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 26, name: "Organ Trader", description: "Illegally buy and sell human organs.", effects: { money: 150000, int: 0, str: 0, char: 0 } },
    { id: 27, name: "Saboteur", description: "Sabotage competitors or enemies for a fee.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 28, name: "Arsonist", description: "Set fires for insurance fraud or revenge.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 29, name: "Drug Mule", description: "Smuggle drugs across borders.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 30, name: "Illegal Casino Operator", description: "Run unlicensed gambling establishments.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 31, name: "Black Market Surgeon", description: "Perform illegal surgeries for profit.", effects: { money: 150000, int: 0, str: 0, char: 0 } },
    { id: 32, name: "Eco-Vandal", description: "Destroy eco-sensitive installations for payment.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 33, name: "Counterfeit Pharmacist", description: "Produce and sell fake medicines.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 34, name: "Terrorist Financier", description: "Fund and profit from terror operations.", effects: { money: 200000, int: 0, str: 0, char: 0 } },
    { id: 35, name: "Illegal Waste Dumper", description: "Dispose of hazardous waste illegally.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 36, name: "Kidnapper", description: "Abduct people for ransom.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 37, name: "Illegal Tattoo Artist", description: "Perform unlicensed body modifications.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 38, name: "Fake Charity Operator", description: "Run fake charities to steal donations.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 39, name: "Pirate", description: "Hijack ships and steal their cargo.", effects: { money: 100000, int: 0, str: 0, char: 0 } },
    { id: 40, name: "Illegal Fisherman", description: "Fish in protected waters for high-value catches.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 41, name: "Street Vendor (Counterfeit Goods)", description: "Sell fake designer items on the street.", effects: { money: 25000, int: 0, str: 0, char: 0 } },
    { id: 42, name: "Identity Thief", description: "Steal personal information for financial fraud.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 43, name: "Organized Crime Boss", description: "Run an entire criminal syndicate.", effects: { money: 300000, int: 0, str: 0, char: 0 } },
    { id: 44, name: "Illegal Fireworks Dealer", description: "Sell unlicensed and dangerous fireworks.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 45, name: "Illegal Art Dealer", description: "Trade stolen or counterfeit artwork.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 46, name: "Illegal Nightclub Operator", description: "Run a nightclub without licenses or safety measures.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 47, name: "Illegal Drone Operator", description: "Use drones for smuggling or spying.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 48, name: "Credit Card Skimmer", description: "Install devices to steal card information.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 49, name: "Hostage Negotiator (Fake)", description: "Pretend to negotiate and steal ransom money.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 50, name: "Espionage Agent", description: "Spy on governments or corporations for profit.", effects: { money: 140000, int: 0, str: 0, char: 0 } },
    { id: 51, name: "Street Chemist", description: "Produce and sell illegal substances.", effects: { money: 100000, int: 0, str: 0, char: 0 } },
    { id: 52, name: "Illegal Exotic Animal Trader", description: "Sell rare and endangered animals.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 53, name: "Illegal Real Estate Agent", description: "Sell land or properties without legal rights.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 54, name: "Cigarette Smuggler", description: "Transport and sell untaxed cigarettes.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 55, name: "Street Beggar (Scammer)", description: "Pretend to be homeless to collect money.", effects: { money: 20000, int: 0, str: 0, char: 0 } },
    { id: 56, name: "Illegal Explosives Dealer", description: "Sell unauthorized explosives to clients.", effects: { money: 110000, int: 0, str: 0, char: 0 } },
    { id: 57, name: "Illegal Land Grabber", description: "Occupy land and sell it illegally.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 58, name: "Wire Fraudster", description: "Commit fraud using electronic communications.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 59, name: "Phishing Scammer", description: "Trick people into giving up sensitive information online.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 60, name: "Illegal Private Investigator", description: "Spy on people without licenses or ethics.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
];

const jobs_green = [
    { id: 1, name: "Farmer", description: "Manage and cultivate crops or raise livestock on a farm.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 2, name: "Farmhand", description: "Assist with day-to-day tasks on a farm, such as feeding animals and maintaining equipment.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 3, name: "Beekeeper", description: "Maintain beehives and harvest honey and other bee products.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 4, name: "Agricultural Equipment Operator", description: "Operate machinery like tractors and combines to assist with farming.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 5, name: "Shepherd", description: "Tend to and care for sheep, including grazing and shearing.", effects: { money: 38000, int: 0, str: 0, char: 0 } },
    { id: 6, name: "Dairy Farmer", description: "Raise cows and produce milk and dairy products.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 7, name: "Poultry Farmer", description: "Raise chickens, turkeys, or ducks for meat and eggs.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 8, name: "Rancher", description: "Raise livestock such as cattle or horses on a ranch.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 9, name: "Fisherman", description: "Catch fish or seafood for local markets or personal consumption.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 10, name: "Agricultural Inspector", description: "Inspect crops, livestock, and farming facilities to ensure compliance with regulations.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 11, name: "Irrigation Technician", description: "Install and maintain irrigation systems for farms and crops.", effects: { money: 42000, int: 0, str: 0, char: 0 } },
    { id: 12, name: "Vineyard Worker", description: "Plant, prune, and harvest grapes in a vineyard.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 13, name: "Fruit Picker", description: "Harvest fruits like apples, oranges, or berries from orchards.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 14, name: "Forester", description: "Manage and conserve forested areas, ensuring sustainable growth and harvest.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 15, name: "Horticulturist", description: "Grow and care for plants, vegetables, and flowers.", effects: { money: 58000, int: 0, str: 0, char: 0 } },
    { id: 16, name: "Horse Trainer", description: "Train horses for riding, racing, or work purposes.", effects: { money: 48000, int: 0, str: 0, char: 0 } },
    { id: 17, name: "Greenhouse Worker", description: "Care for plants and flowers in a controlled environment.", effects: { money: 32000, int: 0, str: 0, char: 0 } },
    { id: 18, name: "Farm Veterinarian", description: "Provide medical care to farm animals.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 19, name: "Composter", description: "Produce compost from organic waste for agricultural use.", effects: { money: 38000, int: 0, str: 0, char: 0 } },
    { id: 20, name: "Floriculturist", description: "Grow flowers for commercial purposes, including bouquets and landscaping.", effects: { money: 52000, int: 0, str: 0, char: 0 } },
    { id: 21, name: "Organic Farmer", description: "Grow crops and raise livestock using sustainable methods without synthetic chemicals.", effects: { money: 58000, int: 0, str: 0, char: 0 } },
    { id: 22, name: "Apiarist Assistant", description: "Assist beekeepers with maintaining hives and harvesting honey.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 23, name: "Mushroom Farmer", description: "Cultivate and harvest mushrooms for consumption.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 24, name: "Aquaculture Worker", description: "Farm fish and other aquatic species in controlled environments.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 25, name: "Hydroponic Farmer", description: "Grow plants without soil using nutrient-rich water systems.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 26, name: "Cattle Ranch Assistant", description: "Help manage cattle on large ranches, including feeding and herding.", effects: { money: 38000, int: 0, str: 0, char: 0 } },
    { id: 27, name: "Goat Herder", description: "Care for and manage goats for milk, meat, or fiber production.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 28, name: "Shearer", description: "Shear wool from sheep for textile production.", effects: { money: 36000, int: 0, str: 0, char: 0 } },
    { id: 29, name: "Farm Mechanic", description: "Repair and maintain agricultural equipment and machinery.", effects: { money: 48000, int: 0, str: 0, char: 0 } },
    { id: 30, name: "Seed Technician", description: "Manage and distribute seeds for crop planting.", effects: { money: 42000, int: 0, str: 0, char: 0 } },
    { id: 31, name: "Crop Scientist", description: "Research and improve crop yield and quality.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 32, name: "Animal Breeder", description: "Breed livestock for specific traits or qualities.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 33, name: "Rice Farmer", description: "Cultivate and harvest rice in paddy fields.", effects: { money: 38000, int: 0, str: 0, char: 0 } },
    { id: 34, name: "Lumberjack", description: "Cut and transport timber for processing.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 35, name: "Maple Syrup Producer", description: "Harvest and process sap from maple trees into syrup.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 36, name: "Fertilizer Technician", description: "Prepare and apply fertilizers to crops for growth enhancement.", effects: { money: 42000, int: 0, str: 0, char: 0 } },
    { id: 37, name: "Livestock Transporter", description: "Safely transport animals to markets or processing facilities.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 38, name: "Windmill Operator", description: "Maintain windmills used for pumping water or generating energy on farms.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 39, name: "Farm Educator", description: "Teach sustainable farming techniques to communities.", effects: { money: 47000, int: 0, str: 0, char: 0 } },
    { id: 40, name: "Hay Baler", description: "Harvest and package hay for livestock feed.", effects: { money: 38000, int: 0, str: 0, char: 0 } },
];

const jobs_good = [
    { id: 1, name: "Software Engineer", description: "Develop and maintain software applications for businesses.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 2, name: "Financial Analyst", description: "Analyze financial data and provide investment advice.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 3, name: "Marketing Manager", description: "Plan and oversee marketing campaigns for companies.", effects: { money: 135000, int: 0, str: 0, char: 0 } },
    { id: 4, name: "HR Specialist", description: "Handle employee recruitment, training, and relations.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 5, name: "Real Estate Agent", description: "Sell and lease properties to clients in the business district.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 6, name: "Lawyer", description: "Provide legal advice and representation for clients.", effects: { money: 145000, int: 0, str: 0, char: 0 } },
    { id: 7, name: "Accountant", description: "Prepare and examine financial records and tax filings.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 8, name: "Architect", description: "Design commercial buildings and urban spaces.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 9, name: "Investment Banker", description: "Facilitate mergers, acquisitions, and financial transactions.", effects: { money: 200000, int: 0, str: 0, char: 0 } },
    { id: 10, name: "IT Support Specialist", description: "Provide technical support to office employees.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 11, name: "Paralegal", description: "Assist lawyers by preparing legal documents and research.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 12, name: "Operations Manager", description: "Oversee daily operations to ensure organizational efficiency.", effects: { money: 110000, int: 0, str: 0, char: 0 } },
    { id: 13, name: "Public Relations Specialist", description: "Manage communication between businesses and the public.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 14, name: "Data Analyst", description: "Analyze data trends to help businesses make informed decisions.", effects: { money: 95000, int: 0, str: 0, char: 0 } },
    { id: 15, name: "Entrepreneur", description: "Start and manage a new business venture.", effects: { money: 100000, int: 0, str: 0, char: 0 } },
    { id: 16, name: "Retail Store Manager", description: "Supervise daily operations of a retail business.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 17, name: "Business Consultant", description: "Advise companies on improving business processes.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 18, name: "Journalist", description: "Report on news and events in the corporate world.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 19, name: "Event Planner", description: "Organize corporate events, conferences, and meetings.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 20, name: "Leasing Agent", description: "Manage commercial property leases for businesses.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 21, name: "Corporate Trainer", description: "Develop and conduct training programs for employees.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 22, name: "Stockbroker", description: "Buy and sell stocks on behalf of clients.", effects: { money: 125000, int: 0, str: 0, char: 0 } },
    { id: 23, name: "Urban Planner", description: "Design and plan urban development projects.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 24, name: "Advertising Executive", description: "Develop advertising campaigns for businesses.", effects: { money: 115000, int: 0, str: 0, char: 0 } },
    { id: 25, name: "Executive Assistant", description: "Provide administrative support to executives.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 26, name: "Economist", description: "Analyze economic trends and provide forecasts.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 27, name: "Compliance Officer", description: "Ensure company adherence to laws and regulations.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 28, name: "Graphic Designer", description: "Create visual content for businesses and advertisements.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 29, name: "Project Manager", description: "Plan and execute business projects efficiently.", effects: { money: 100000, int: 0, str: 0, char: 0 } },
    { id: 30, name: "Technical Writer", description: "Create user manuals and documentation for businesses.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 31, name: "Corporate Lawyer", description: "Handle legal issues for corporations.", effects: { money: 145000, int: 0, str: 0, char: 0 } },
    { id: 32, name: "Digital Marketing Specialist", description: "Implement online marketing strategies.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 33, name: "Risk Manager", description: "Identify and mitigate business risks.", effects: { money: 130000, int: 0, str: 0, char: 0 } },
    { id: 34, name: "Business Analyst", description: "Evaluate and improve business systems and processes.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 35, name: "Content Strategist", description: "Plan and manage digital content for businesses.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 36, name: "Social Media Manager", description: "Oversee and grow business presence on social media.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 37, name: "Sales Manager", description: "Lead sales teams and strategies to drive revenue.", effects: { money: 115000, int: 0, str: 0, char: 0 } },
    { id: 38, name: "Construction Manager", description: "Oversee construction projects in urban areas.", effects: { money: 95000, int: 0, str: 0, char: 0 } },
    { id: 39, name: "Cybersecurity Analyst", description: "Protect businesses from digital threats.", effects: { money: 110000, int: 0, str: 0, char: 0 } },
    { id: 40, name: "Event Marketing Coordinator", description: "Plan and promote business events.", effects: { money: 70000, int: 0, str: 0, char: 0 } }
];

const jobs_island = [
    { id: 1, name: "Marine Biologist", description: "Study marine ecosystems and wildlife on the island.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 2, name: "Fisherman", description: "Catch fish and seafood for local markets and export.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 3, name: "Dive Instructor", description: "Teach tourists how to scuba dive and explore reefs.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 4, name: "Resort Manager", description: "Oversee operations at an island resort.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 5, name: "Tour Guide", description: "Lead tours showcasing the island's history and nature.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 6, name: "Lifeguard", description: "Ensure safety at beaches and swimming areas.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 7, name: "Boat Captain", description: "Operate boats for tours, fishing, or transportation.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 8, name: "Island Caretaker", description: "Maintain and manage private island properties.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 9, name: "Ecotourism Specialist", description: "Promote and manage sustainable tourism activities.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 10, name: "Chef", description: "Prepare meals in island restaurants or resorts.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 11, name: "Bartender", description: "Serve drinks at beach bars and resorts.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 12, name: "Environmental Scientist", description: "Study and protect the island's environment.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 13, name: "Helicopter Pilot", description: "Fly tourists or supplies to and from the island.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 14, name: "Hotel Receptionist", description: "Handle guest check-ins and services at resorts.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 15, name: "Island Doctor", description: "Provide medical care to island residents and visitors.", effects: { money: 120000, int: 0, str: 0, char: 0 } },
    { id: 16, name: "Souvenir Shop Owner", description: "Sell handmade crafts and goods to tourists.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 17, name: "Wildlife Photographer", description: "Capture photos of the island's flora and fauna.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 18, name: "Sailing Instructor", description: "Teach people how to sail in island waters.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 19, name: "Beach Cleaner", description: "Maintain cleanliness of the island's beaches.", effects: { money: 25000, int: 0, str: 0, char: 0 } },
    { id: 20, name: "Event Planner", description: "Organize island weddings and celebrations.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 21, name: "Island Electrician", description: "Maintain and repair electrical systems on the island.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 22, name: "Park Ranger", description: "Protect and manage the island's natural resources and wildlife.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 23, name: "Massage Therapist", description: "Provide relaxation and wellness services to visitors.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 24, name: "Artisan", description: "Create handmade goods or art for tourists and locals.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 25, name: "Solar Technician", description: "Install and maintain solar panels for sustainable energy.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 26, name: "Yoga Instructor", description: "Conduct yoga sessions for tourists and residents.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 27, name: "Island Veterinarian", description: "Provide medical care to the island's animals.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 28, name: "Aquarium Curator", description: "Manage and care for marine life exhibits on the island.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 29, name: "Landscape Architect", description: "Design and maintain beautiful outdoor spaces on the island.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 30, name: "Eco Researcher", description: "Study the effects of tourism and development on the island.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 31, name: "Animal Trainer", description: "Train animals for shows or conservation programs.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 32, name: "Maintenance Worker", description: "Handle repairs and upkeep for island facilities.", effects: { money: 35000, int: 0, str: 0, char: 0 } },
    { id: 33, name: "Wind Turbine Technician", description: "Maintain wind energy systems on the island.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 34, name: "Island Pilot", description: "Transport people and goods via small planes.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 35, name: "Marine Mechanic", description: "Repair and maintain boats and watercraft.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 36, name: "Campground Manager", description: "Oversee camping facilities and ensure guest satisfaction.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 37, name: "Island Archaeologist", description: "Study historical artifacts and sites on the island.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 38, name: "Seaplane Engineer", description: "Maintain and repair seaplanes used for island access.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 39, name: "Retail Manager", description: "Run shops catering to tourists and locals.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 40, name: "Marine Conservationist", description: "Protect marine habitats and endangered species.", effects: { money: 65000, int: 0, str: 0, char: 0 } }
];

const jobs_bunker = [
    { id: 1, name: "Mechanic", description: "Maintain and repair machinery and equipment in the bunker.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 2, name: "Chef", description: "Prepare meals for bunker inhabitants.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 3, name: "Engineer", description: "Ensure the bunker’s systems like ventilation and power operate effectively.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 4, name: "Medic", description: "Provide medical care to residents in case of illness or injury.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 5, name: "Security Guard", description: "Ensure safety and monitor entry and exit points of the bunker.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 6, name: "Scientist", description: "Conduct experiments and research for survival or improvement.", effects: { money: 95000, int: 0, str: 0, char: 0 } },
    { id: 7, name: "Electrician", description: "Maintain and repair the bunker’s electrical systems.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 8, name: "Farmer", description: "Grow crops and manage food supplies in the bunker.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 9, name: "Teacher", description: "Educate children and provide skill training to residents.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 10, name: "Plumber", description: "Maintain the water and sewage systems.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 11, name: "Radio Operator", description: "Maintain communication with the outside world and coordinate messages.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 12, name: "Psychologist", description: "Support the mental health of bunker inhabitants.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 13, name: "Cleaner", description: "Maintain cleanliness and hygiene in the bunker.", effects: { money: 30000, int: 0, str: 0, char: 0 } },
    { id: 14, name: "Hydroponics Specialist", description: "Manage and optimize plant growth in water-based systems.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 15, name: "Armorer", description: "Maintain and manage weapons and defensive tools.", effects: { money: 55000, int: 0, str: 0, char: 0 } },
    { id: 16, name: "Carpenter", description: "Repair and construct furniture or infrastructure in the bunker.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 17, name: "Waste Manager", description: "Handle waste and recycling to ensure sustainability.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 18, name: "IT Specialist", description: "Maintain computer systems and manage digital security.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 19, name: "Logistics Coordinator", description: "Manage supply chains and inventory within the bunker.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 20, name: "Emergency Responder", description: "Be the first to react to crises or emergencies in the bunker.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 21, name: "Archivist", description: "Preserve important documents and maintain the bunker’s historical records.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 22, name: "Veterinarian", description: "Care for animals in the bunker, ensuring their health and well-being.", effects: { money: 75000, int: 0, str: 0, char: 0 } },
    { id: 23, name: "Chemist", description: "Produce essential compounds and conduct chemical analysis.", effects: { money: 90000, int: 0, str: 0, char: 0 } },
    { id: 24, name: "Nutritionist", description: "Plan balanced diets for bunker residents to maintain health.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 25, name: "Drone Operator", description: "Control drones for exploration and monitoring outside the bunker.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 26, name: "Fabrication Specialist", description: "Use 3D printers and other tools to create custom parts.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 27, name: "Artist", description: "Provide creative and therapeutic art activities for residents.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 28, name: "Event Coordinator", description: "Organize recreational and morale-boosting activities in the bunker.", effects: { money: 50000, int: 0, str: 0, char: 0 } },
    { id: 29, name: "Seismologist", description: "Monitor and study seismic activity for safety precautions.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 30, name: "Tailor", description: "Repair and create clothing and textiles for residents.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 31, name: "Water Quality Specialist", description: "Ensure the bunker’s water supply is safe and clean.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 32, name: "Biologist", description: "Study and maintain biological systems in the bunker.", effects: { money: 85000, int: 0, str: 0, char: 0 } },
    { id: 33, name: "Robotics Technician", description: "Repair and program robots used in the bunker.", effects: { money: 80000, int: 0, str: 0, char: 0 } },
    { id: 34, name: "Forager", description: "Locate and gather resources safely from outside the bunker.", effects: { money: 45000, int: 0, str: 0, char: 0 } },
    { id: 35, name: "Counselor", description: "Help residents with emotional and interpersonal challenges.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 36, name: "Inventory Manager", description: "Track and manage supplies, ensuring nothing runs out.", effects: { money: 60000, int: 0, str: 0, char: 0 } },
    { id: 37, name: "Wastewater Engineer", description: "Manage wastewater treatment and ensure sanitation.", effects: { money: 70000, int: 0, str: 0, char: 0 } },
    { id: 38, name: "Gardener", description: "Maintain green spaces or indoor plants for food or morale.", effects: { money: 40000, int: 0, str: 0, char: 0 } },
    { id: 39, name: "Communications Specialist", description: "Develop and distribute information to residents effectively.", effects: { money: 65000, int: 0, str: 0, char: 0 } },
    { id: 40, name: "Weapon Specialist", description: "Train residents in self-defense and manage advanced weaponry.", effects: { money: 75000, int: 0, str: 0, char: 0 } }
];

const properties = [ 
    // Bad Areas
    { 
        id: 1, 
        name: "Abandoned Warehouse", 
        description: "A run-down warehouse with little value but potential for illegal activities.", 
        effects: { money: -150000, rent: -6000 } // Approx. $500/month
    },
    { 
        id: 2, 
        name: "Condemned Apartment", 
        description: "A low-value property in poor condition, requiring significant repairs.", 
        effects: { money: -75000, rent: -9000 } // Approx. $750/month
    },
    { 
        id: 3, 
        name: "Pawn Shop", 
        description: "A sketchy pawn shop that struggles to stay afloat.", 
        effects: { money: -125000, rent: -18000 } // Approx. $1,500/month
    },
    { 
        id: 4, 
        name: "Slum Apartment", 
        description: "A cheap apartment in a high-crime area.", 
        effects: { money: -50000, rent: -7200 } // Approx. $600/month
    },

    // Good Areas
    { 
        id: 5, 
        name: "Downtown Office Space", 
        description: "A small office in a bustling business district.", 
        effects: { money: -750000, rent: -60000 } // Approx. $5,000/month
    },
    { 
        id: 6, 
        name: "Upscale Condo", 
        description: "A luxurious condominium in a prime location.", 
        effects: { money: -1250000, rent: -48000 } // Approx. $4,000/month
    },
    { 
        id: 7, 
        name: "High-Rise Penthouse", 
        description: "An extravagant penthouse with breathtaking views.", 
        effects: { money: -4500000, rent: -180000 } // Approx. $15,000/month
    },
    { 
        id: 8, 
        name: "Luxury Retail Store", 
        description: "A premium retail outlet in a high-traffic area.", 
        effects: { money: -2000000, rent: -120000 } // Approx. $10,000/month
    },
    { 
        id: 9, 
        name: "Corporate Tower", 
        description: "A skyscraper housing major corporate offices.", 
        effects: { money: -10000000, rent: -1200000 } // Approx. $100,000/month
    },
    { 
        id: 10, 
        name: "Tech Start-Up Hub", 
        description: "A state-of-the-art facility for start-up companies.", 
        effects: { money: -2000000, rent: -240000 } // Approx. $20,000/month
    },
    { 
        id: 11, 
        name: "Luxury Hotel Suite", 
        description: "A premium suite in a top-tier hotel.", 
        effects: { money: -3500000, rent: -360000 } // Approx. $30,000/month
    },

    // Green Areas
    { 
        id: 12, 
        name: "Farmhouse", 
        description: "A cozy farmhouse surrounded by fields.", 
        effects: { money: -350000, rent: -18000 } // Approx. $1,500/month
    },
    { 
        id: 13, 
        name: "Windmill Farm", 
        description: "A windmill-powered farm generating clean energy.", 
        effects: { money: -1500000, rent: -60000 } // Approx. $5,000/month
    },
    { 
        id: 14, 
        name: "Eco Village", 
        description: "A sustainable community with green living spaces.", 
        effects: { money: -900000, rent: -36000 } // Approx. $3,000/month
    },
    { 
        id: 15, 
        name: "Organic Orchard", 
        description: "A thriving orchard producing organic fruits.", 
        effects: { money: -500000, rent: -24000 } // Approx. $2,000/month
    },

    // Special Areas
    { 
        id: 16, 
        name: "Underground Bunker", 
        description: "A fortified bunker with advanced security systems.", 
        effects: { money: -3000000, rent: -120000 } // Approx. $10,000/month
    },
    { 
        id: 17, 
        name: "Private Island", 
        description: "A secluded island paradise, accessible only by boat.", 
        effects: { money: -15000000, rent: -600000 } // Approx. $50,000/month
    },
    { 
        id: 18, 
        name: "Seaside Villa", 
        description: "A stunning villa with oceanfront views.", 
        effects: { money: -5000000, rent: -240000 } // Approx. $20,000/month
    }
];

const situations = [
    {
        id: 1,
        name: "Boss called you to play golf",
        description: "Your boss invited you to play golf this weekend. It could help with your career or hurt it, depending on how it goes.",
        choices: [
            {
                id: 1,
                name: "Deny",
                effects: { money: 0, int: 5, str: 0, char: -5, hp: 0, jail: false },
                require: { int: 30, str: 0, char: 30 }, // Increased requirements
            },
            {
                id: 2,
                name: "Win Boss",
                effects: { fire: true, money: -200000, int: 0, str: 10, char: 15, hp: 0, jail: false },
                require: { int: 80, str: 80, char: 30 }, // Increased requirements
            },
            {
                id: 3,
                name: "Lose to Boss",
                effects: { money: 100000, int: 0, str: 0, char: 20, hp: 5, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 4,
                name: "Pretend to Be Too Busy",
                effects: { money: 0, int: 5, str: 0, char: -10, hp: 5, jail: false },
                require: { int: 40, str: 20, char: 60 }, // Increased requirements
            },
        ],
    },
    {
        id: 2,
        name: "Your neighbor's dog ate your mail",
        description: "Your neighbor's dog ate an important letter. You need to decide how to handle the situation.",
        choices: [
            {
                id: 1,
                name: "Confront Neighbor",
                effects: { money: 200, int: 0, str: 0, char: -10, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 30 }, // Increased requirements
            },
            {
                id: 2,
                name: "Let It Slide",
                effects: { money: 0, int: 0, str: 0, char: 10, hp: 5, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 3,
                name: "Bake Dog a Cake",
                effects: { money: -500, int: 0, str: 5, char: -5, hp: -10, jail: false },
                require: { int: 20, str: 20, char: 20 }, // Increased requirements
            },
        ],
    },
    {
        id: 3,
        name: "Mysterious Email Offer",
        description: "You receive an email promising $1,000,000 if you send $100 to a prince in a foreign country.",
        choices: [
            {
                id: 1,
                name: "Send Money",
                effects: { money: -100, int: 0, str: 0, char: -5, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 2,
                name: "Ignore Email",
                effects: { money: 0, int: 5, str: 0, char: 0, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 3,
                name: "Reply with a Scam of Your Own",
                effects: { money: 200, int: 10, str: 0, char: 10, hp: 0, jail: false },
                require: { int: 40, str: 0, char: 30 }, // Increased requirements
            },
        ],
    },
    {
        id: 4,
        name: "Spicy Wing Challenge",
        description: "You see a spicy wing challenge at a local restaurant with a $1,000 prize.",
        choices: [
            {
                id: 1,
                name: "Attempt Challenge",
                effects: { money: -500, int: 0, str: 0, char: 5, hp: -20, jail: false },
                require: { int: 0, str: 0, char: 30 }, // Increased requirements
            },
            {
                id: 2,
                name: "Walk Away",
                effects: { money: 0, int: 0, str: 0, char: 0, hp: 10, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 3,
                name: "Win Challenge",
                effects: { money: 1000, int: 0, str: 10, char: 15, hp: -10, jail: false },
                require: { int: 0, str: 50, char: 30 }, // Increased requirements
            },
        ],
    },
    {
        id: 5,
        name: "Lost Wallet on a Train",
        description: "You realize your wallet is missing after getting off a train. What do you do?",
        choices: [
            {
                id: 1,
                name: "Report to Lost and Found",
                effects: { money: -100, int: 5, str: 0, char: 5, hp: 0, jail: false },
                require: { int: 20, str: 0, char: 20 }, // Increased requirements
            },
            {
                id: 2,
                name: "Chase the Train",
                effects: { money: 0, int: 0, str: 10, char: 10, hp: -5, jail: false },
                require: { int: 0, str: 40, char: 30 }, // Increased requirements
            },
            {
                id: 3,
                name: "Do Nothing",
                effects: { money: -100, int: 0, str: 0, char: -5, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
        ],
    },
    {
        id: 6,
        name: "Neighbor Hosting a Loud Party",
        description: "Your neighbor is hosting a loud party late at night, and you can’t sleep.",
        choices: [
            {
                id: 1,
                name: "Call the Police",
                effects: { money: 0, int: 0, str: 0, char: -10, hp: 5, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 2,
                name: "Join the Party",
                effects: { money: 0, int: 0, str: 0, char: 10, hp: -5, jail: false },
                require: { int: 0, str: 0, char: 50 }, // Increased stats
            },
            {
                id: 3,
                name: "Confront Neighbor",
                effects: { money: 0, int: 5, str: 0, char: 10, hp: 5, jail: false },
                require: { int: 50, str: 10, char: 0 }, // Increased stats
            },
        ],
    },
    {
        id: 7,
        name: "Spilled Coffee on Your Laptop",
        description: "You accidentally spill coffee on your laptop. What now?",
        choices: [
            {
                id: 1,
                name: "Try to Fix It Yourself",
                effects: { money: -50, int: 10, str: 0, char: 0, hp: 0, jail: false },
                require: { int: 50, str: 0, char: 0 }, // Increased stats
            },
            {
                id: 2,
                name: "Send It for Repairs",
                effects: { money: -300, int: 0, str: 0, char: 5, hp: 0, jail: false },
                require: { int: 20, str: 0, char: 0 }, // Increased stats
            },
            {
                id: 3,
                name: "Buy a New Laptop",
                effects: { money: -1000, int: 0, str: 0, char: 10, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 }, 
            },
        ],
    },
    {
        id: 8,
        name: "Street Performer Challenge",
        description: "A street performer challenges you to a dance-off for $50.",
        choices: [
            {
                id: 1,
                name: "Accept Challenge",
                effects: { money: 50, int: 0, str: 5, char: 20, hp: -5, jail: false },
                require: { int: 10, str: 15, char: 60 }, // Increased stats
            },
            {
                id: 2,
                name: "Politely Decline",
                effects: { money: 0, int: 0, str: 0, char: 0, hp: 0, jail: false },
                require: { int: 5, str: 5, char: 5 }, // Increased stats
            },
            {
                id: 3,
                name: "Throw Money and Walk Away",
                effects: { money: -50, int: 0, str: 0, char: 10, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
        ],
    },
    {
        id: 9,
        name: "Office Coffee Machine Breaks",
        description: "The office coffee machine breaks down, and caffeine levels are dangerously low.",
        choices: [
            {
                id: 1,
                name: "Fix It Yourself",
                effects: { money: 0, int: 15, str: 0, char: 20, hp: 5, jail: false },
                require: { int: 60, str: 10, char: 0 }, // Increased stats
            },
            {
                id: 2,
                name: "Order Coffee for Everyone",
                effects: { money: -10000, int: 0, str: 0, char: 25, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 20 }, // Increased stats
            },
            {
                id: 3,
                name: "Do Nothing",
                effects: { money: 0, int: 0, str: 0, char: -10, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 0 },
            },
        ],
    },
    {
        id: 10,
        name: "Find a Briefcase of Money",
        description: "You find a briefcase full of unmarked bills in an alley. What do you do?",
        choices: [
            {
                id: 1,
                name: "Take the Money",
                effects: { money: 1000000, int: 0, str: 0, char: -20, hp: 0, jail: true },
                require: { int: 0, str: 0, char: 0 },
            },
            {
                id: 2,
                name: "Report It to the Police",
                effects: { money: 0, int: 5, str: 0, char: 20, hp: 0, jail: false },
                require: { int: 10, str: 0, char: 50 }, // Increased stats
            },
            {
                id: 3,
                name: "Leave It There",
                effects: { money: 0, int: 0, str: 0, char: 5, hp: 0, jail: false },
                require: { int: 0, str: 0, char: 30 },
            },
        ],
    },
];




module.exports = {
    action_good_cards,
    action_bad_cards,
    fired_cards,
    words,
    action_good_teen_cards,
    action_bad_teen_cards,
    funny_action_cards,
    jobs_bad,
    jobs_green,
    jobs_good,
    jobs_island,
    jobs_bunker,
    properties,
    situations
};
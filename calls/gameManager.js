// calls/gameManager.js
const jwt = require('jsonwebtoken');
const storage = require('../data/storage.js');

class GameManager {
    constructor(io) {
        this.io = io;
        this.games = new Map();
        this.votingStates = new Map();
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    }

    verifyPlayerToken(token, gameCode, username) {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            // Verify that the token matches both the game code and username
            return (decoded.gameCode === gameCode && decoded.username === username) ? decoded : null;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }

    generatePlayerToken(username, gameCode) {
        return jwt.sign(
            { 
                username, 
                gameCode,
                timestamp: Date.now()
            }, 
            this.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    initialize(io) {
        this.io = io;
        this.games.clear(); // Clear all games on initialization
        console.log('GameManager initialized, all games cleared');
    }

    // Add method to check game state
    logGameState(gameCode) {
        const game = this.games.get(gameCode);
        console.log('Current game state:', {
            gameCode,
            exists: !!game,
            details: game ? {
                hostId: game.host,
                end: false,
                playerCount: game.players.length,
                players: game.players
            } : null
        });
    }

    // Add this method to handle all player updates
    playersUpdate(gameCode) {
        const game = this.games.get(gameCode);
        if (!game) return;

        const gameState = {
            players: game.players,
            host: game.host,
            createdAt: game.createdAt,
            totalPlayers: game.players.length,
            readyPlayers: game.players.filter(p => p.isReady).length,
            hostConnected: game.players.some(p => p.id === game.host),
            allPlayersReady: game.players
                .filter(p => !p.isHost)
                .every(p => p.isReady),
            canStartGame: game.players.length >= 2 && 
                game.players
                    .filter(p => !p.isHost)
                    .every(p => p.isReady)
        };

        // Emit to all players in the game
        this.io.to(gameCode).emit('playersUpdate', gameState);
        
        return gameState;
    }

    setupSocketHandlers(socket) {
        // Create Game Handler
        socket.on('createGame', ({ gameCode }, callback = () => {}) => {
            try {
                // Clear any existing game with this code
                if (this.games.has(gameCode)) {
                    this.games.delete(gameCode);
                }
            
                // Create new game
                this.games.set(gameCode, {
                    players: [],
                    deads: [],
                    total_players: 0,
                    winners: [],
                    host: socket.id,
                    details: { 
                        status: 'lobby',
                        year: 0, 
                        currentPlayer: {},
                        end: false,
                        minigame: false,
                        boardSquares: [
                            { type: 'start', number: 0 },
                            { type: 'upgrade', number: 1 },
                            { type: 'upgrade', number: 2 },
                            { type: 'chance', number: 3 },
                            { type: 'negative', number: 4 },
                            { type: 'upgrade', number: 5 },
                            { type: 'money', number: 6 },
                            { type: 'upgrade', number: 7 },
                            { type: 'upgrade', number: 8 },
                            { type: 'chance', number: 9 },
                            { type: 'negative', number: 10 },
                            { type: 'upgrade', number: 11 },
                            { type: 'money', number: 12 },
                            { type: 'upgrade', number: 13 },
                            { type: 'upgrade', number: 14 },
                            { type: 'chance', number: 15 },
                            { type: 'negative', number: 16 },
                            { type: 'upgrade', number: 17 },
                            { type: 'money', number: 18 },
                            { type: 'upgrade', number: 19 },
                            { type: 'upgrade', number: 20 },
                            { type: 'chance', number: 21 },
                            { type: 'negative', number: 22 },
                            { type: 'upgrade', number: 23 }
                        ]
                    },
                    createdAt: new Date()
                });
            
                console.log(`Game created: ${gameCode}, Host: ${socket.id}`);
                console.log('Current games:', Array.from(this.games.keys()));
            
                if (typeof callback === 'function') {
                    callback({ success: true });
                }
            } catch (error) {
                console.error('Create game error:', error);
                if (typeof callback === 'function') {
                    callback({ success: false, error: 'Failed to create game' });
                }
            }
        });

        socket.on('getCurrentTurn', ({ gameCode }, callback) => {
            try {
                // Fetch the game from the server's game storage
                const game = this.games.get(gameCode);
        
                // Check if the game exists
                if (!game) {
                    console.log(`Game not found: ${gameCode}`);
                    return callback({ success: false, error: 'Game not found' });
                }
        
                // Retrieve the current player details
                const currentPlayer = game.details.currentPlayer;
        
                if (!currentPlayer) {
                    console.log(`Current player not set for game: ${gameCode}`);
                    return callback({ success: false, error: 'Current player not found' });
                }
        
                // Respond with the current player information
                callback({ success: true, currentPlayer });
            } catch (error) {
                console.error('Error in getCurrentTurn:', error);
                callback({ success: false, error: 'An unexpected error occurred' });
            }
        });        

        // Fetch boardSquares from game details
        socket.on('getBoardSquares', ({ gameCode }, callback = () => {}) => {
            try {
                // Check if the game exists
                if (this.games.has(gameCode)) {
                    const game = this.games.get(gameCode);

                    if (game && game.details && game.details.boardSquares) {
                        callback({ success: true, boardSquares: game.details.boardSquares });
                    } else {
                        callback({ success: false, error: 'Game details or boardSquares not found' });
                    }
                } else {
                    callback({ success: false, error: 'Game not found' });
                }
            } catch (error) {
                console.error('Error fetching boardSquares:', error);
                callback({ success: false, error: 'Failed to fetch boardSquares' });
            }
        });

        // Update boardSquares for a specific game
        socket.on('updateBoard', ({ gameCode, newBoardSquares }, callback = () => {}) => {
            try {
                // Check if the game exists
                if (this.games.has(gameCode)) {
                    const game = this.games.get(gameCode);

                    if (game && game.details) {
                        // Update boardSquares
                        game.details.boardSquares = newBoardSquares;

                        // Notify all players in the room
                        io.to(gameCode).emit('updateBoard', { gameCode, boardSquares: newBoardSquares });

                        console.log(`Board squares updated for game: ${gameCode}`);
                        callback({ success: true });
                    } else {
                        callback({ success: false, error: 'Game details not found' });
                    }
                } else {
                    callback({ success: false, error: 'Game not found' });
                }
            } catch (error) {
                console.error('Error updating boardSquares:', error);
                callback({ success: false, error: 'Failed to update boardSquares' });
            }
        });
    
        // Get Players Handler
        socket.on('getPlayers', ({ gameCode }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (game && typeof callback === 'function') {
                    callback({ success: true, players: game.players });
                } else if (typeof callback === 'function') {
                    callback({ success: false, error: 'Game not found' });
                }
            } catch (error) {
                console.error('Get players error:', error);
                if (typeof callback === 'function') {
                    callback({ success: false, error: 'Failed to get players' });
                }
            }
        });
    
        // Check Game Code Handler
        socket.on('checkGameCode', ({ gameCode, playerToken, username }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);

                // If the game doesn't exist, return immediately
                if (!game) {
                    return callback({ exists: false, error: 'Game not found' });
                }

                // Check if the game is ongoing
                const isOngoing = game.details?.status === 'on-going';

                if (isOngoing) {
                    // Validate the player's token if the game is ongoing
                    try {
                        const decodedToken = jwt.verify(playerToken, this.JWT_SECRET);
                        const matchingPlayer = game.players.find(
                            player => player.username === username && player.token === playerToken
                        );

                        if (matchingPlayer) {
                            console.log(`Reconnecting player: ${username}`);
                            matchingPlayer.id = socket.id; // Update the socket ID
                            socket.join(gameCode);

                            return callback({
                                exists: true,
                                navigateTo: '/game', // Navigate to game
                                gameState: this.playersUpdate(gameCode),
                                reconnected: true
                            });
                        } else {
                            return callback({ exists: false, error: 'Invalid token or username mismatch' });
                        }
                    } catch (error) {
                        console.error('Token verification failed:', error);
                        return callback({ exists: false, error: 'Token verification failed' });
                    }
                }

                // If the game is not ongoing, return the current game state
                return callback({
                    exists: true,
                    navigateTo: '/lobby', // Navigate to lobby
                    gameState: this.playersUpdate(gameCode)
                });
            } catch (error) {
                console.error('Check game code error:', error);
                return callback({ exists: false, error: 'Server error occurred' });
            }
        });

    
        // Join Game Handler
        socket.on('joinHost', ({ gameCode, playerToken }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                
                console.log(`Host join attempt for game: ${gameCode}`, {
                    hasToken: !!playerToken
                });
                
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }
        
                // If playerToken exists, verify it
                if (playerToken) {
                    try {
                        const decodedToken = jwt.verify(playerToken, this.JWT_SECRET);
                        
                        // Verify this is the correct host token for this game
                        if (decodedToken.gameCode === gameCode && 
                            decodedToken.isHost && 
                            game.hostToken === playerToken) {
                            
                            // Valid host reconnection
                            game.host = socket.id; // Update host socket ID
                            socket.join(gameCode);
                            
                            console.log('Host reconnected:', gameCode);
                            
                            this.io.to(gameCode).emit('hostReconnected', {
                                gameState: this.playersUpdate(gameCode)
                            });
        
                            return callback({ 
                                success: true, 
                                gameState: this.playersUpdate(gameCode),
                                playerToken: playerToken, // Return existing token
                                reconnected: true
                            });
                        }
                    } catch (tokenError) {
                        console.log('Host token verification failed:', tokenError);
                        return callback({ 
                            success: false, 
                            error: 'Invalid host token',
                            canReconnect: false 
                        });
                    }
                }
        
                // If no token or invalid token, check if host slot is available
                if (game.host && game.hostToken) {
                    return callback({ 
                        success: false, 
                        error: 'Game already has a host',
                        canReconnect: true 
                    });
                }
        
                // Generate new host token
                const hostToken = jwt.sign({
                    gameCode,
                    isHost: true,
                    timestamp: Date.now()
                }, this.JWT_SECRET, { expiresIn: '24h' });
        
                // Update game with new host information
                game.host = socket.id;
                game.hostToken = hostToken;
                game.lastHostActive = Date.now();
                
                socket.join(gameCode);
                const gameState = this.playersUpdate(gameCode);
                
                // Notify other players about new host
                this.io.to(gameCode).emit('hostJoined', {
                    gameState
                });
            
                callback({ 
                    success: true, 
                    gameState,
                    playerToken: hostToken,
                    isNewHost: true
                });
        
            } catch (error) {
                console.error('Join host error:', error);
                callback({ 
                    success: false, 
                    error: 'Failed to join as host',
                    details: error.message 
                });
            }
        });

        // gameManager.js
        socket.on('joinGame', async ({ gameCode, username, playerToken }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                
                console.log('Join attempt details:', { 
                    gameCode, 
                    username, 
                    socketId: socket.id, 
                    hasToken: !!playerToken 
                });
                
                // Basic validation
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }
                
                if (!username) {
                    return callback({ success: false, error: 'Username is required' });
                }
        
                // Find existing player
                const existingPlayer = game.players.find(p => 
                    p.username.toLowerCase() === username.toLowerCase()
                );
        
                // Case 1: Player exists and has token - Handle Reconnection
                if (existingPlayer && playerToken) {
                    try {
                        const decodedToken = jwt.verify(playerToken, this.JWT_SECRET);
                        
                        if (decodedToken.username === username && decodedToken.gameCode === gameCode) {
                            // Valid reconnection
                            existingPlayer.id = socket.id; // Update socket ID
                            existingPlayer.token = playerToken; // Store token with player
                            existingPlayer.lastActive = Date.now(); // Update last active timestamp
                            socket.join(gameCode);
        
                            console.log('Player reconnected:', username);
        
                            this.io.to(gameCode).emit('playerReconnected', {
                                playerId: socket.id,
                                username: username,
                                players: game.players
                            });
        
                            return callback({ 
                                success: true, 
                                gameState: this.playersUpdate(gameCode),
                                playerToken, // Keep existing token
                                reconnected: true
                            });
                        }
                    } catch (tokenError) {
                        console.log('Token verification failed:', tokenError);
                        return callback({ 
                            success: false, 
                            error: 'Invalid token',
                            canReconnect: false 
                        });
                    }
                }
        
                // Case 2: Player exists but no valid token - Prevent duplicate username
                if (existingPlayer) {
                    console.log('Username taken:', username);
                    return callback({ 
                        success: false, 
                        error: 'Username already taken',
                        canReconnect: true 
                    });
                }
        
                // Case 3: New player joining
                const newPlayerToken = jwt.sign(
                    { 
                        username,
                        gameCode,
                        timestamp: Date.now()
                    }, 
                    this.JWT_SECRET,
                    { expiresIn: '24h' }
                );
        
                const newPlayer = {
                    id: socket.id,
                    username: username,
                    gameCode: gameCode,
                    playerToken: newPlayerToken, // Store token with player
                    lastActive: Date.now(),
                    gender: null,
                    survived: 0,
                    dead: false,
                    isReady: false,
                    isHost: false,
                    job: {},
                    money: 1000,
                    rent: {money: 0, player: ''},
                    character: {hp: 100, int: 0, str: 0, char: 0},
                    properties: [],
                    choices: [],
                    position: 0,
                    jail: false,
                    getOutOfJailFree: 0,
                    inGame: true,
                    pincode: '',
                    joinedAt: Date.now()
                };
        
                // Add new player to game
                game.players.push(newPlayer);
                game.total_players += 1
                socket.join(gameCode);
        
                console.log('New player joined:', username);
        
                // Notify all players about the new player
                this.io.to(gameCode).emit('playerJoined', {
                    playerId: socket.id,
                    username: username,
                    players: game.players.map(player => ({
                        ...player,
                        token: undefined // Remove tokens before sending to clients
                    }))
                });
        
                // Send success response to new player
                return callback({ 
                    success: true, 
                    gameState: this.playersUpdate(gameCode),
                    playerToken: newPlayerToken,
                    isNewPlayer: true
                });
        
            } catch (error) {
                console.error('Join game error:', error);
                return callback({ 
                    success: false, 
                    error: 'Server error occurred',
                    details: error.message 
                });
            }
        });

        // Handle pincode setting
        socket.on('setPincode', ({ gameCode, pincode }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }

                // Find player index
                const playerIndex = game.players.findIndex(p => p.id === socket.id);
                if (playerIndex === -1) {
                    return callback({ success: false, error: 'Player not found' });
                }

                // Validate pincode
                if (typeof pincode !== 'string' || pincode.length !== 3 || !/^\d+$/.test(pincode)) {
                    return callback({ 
                        success: false, 
                        error: 'Pincode must be exactly 3 digits' 
                    });
                }

                // Update player's pincode
                game.players[playerIndex] = {
                    ...game.players[playerIndex],
                    pincode: pincode
                };

                // Save game state
                game.details.skipYearIncrement = true;
                this.games.set(gameCode, game);

                console.log('Pincode set for player:', {
                    playerId: socket.id,
                    gameCode: gameCode
                });

                callback({
                    success: true,
                    message: 'Pincode set successfully'
                });

            } catch (error) {
                console.error('Set pincode error:', error);
                callback({ success: false, error: 'Failed to set pincode' });
            }
        });

        // Handle pincode verification
        socket.on('verifyPincode', ({ gameCode, playerId, pincode }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }

                const player = game.players.find(p => p.id === playerId);
                if (!player) {
                    return callback({ success: false, error: 'Player not found' });
                }

                // Validate pincode format
                if (typeof pincode !== 'string' || pincode.length !== 3 || !/^\d+$/.test(pincode)) {
                    return callback({ 
                        success: false, 
                        error: 'Invalid pincode format' 
                    });
                }

                // Verify pincode
                const isCorrect = player.pincode === pincode;

                callback({
                    success: true,
                    verified: isCorrect,
                    message: isCorrect ? 'Pincode verified successfully' : 'Incorrect pincode'
                });

            } catch (error) {
                console.error('Verify pincode error:', error);
                callback({ success: false, error: 'Failed to verify pincode' });
            }
        });

        // Handle pincode change
        socket.on('changePincode', ({ gameCode, oldPincode, newPincode }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }

                const playerIndex = game.players.findIndex(p => p.id === socket.id);
                if (playerIndex === -1) {
                    return callback({ success: false, error: 'Player not found' });
                }

                const player = game.players[playerIndex];

                // Verify old pincode
                if (player.pincode !== oldPincode) {
                    return callback({ 
                        success: false, 
                        error: 'Current pincode is incorrect' 
                    });
                }

                // Validate new pincode
                if (typeof newPincode !== 'string' || newPincode.length !== 3 || !/^\d+$/.test(newPincode)) {
                    return callback({ 
                        success: false, 
                        error: 'New pincode must be exactly 4 digits' 
                    });
                }

                // Update pincode
                game.players[playerIndex] = {
                    ...player,
                    pincode: newPincode
                };

                // Save game state
                this.games.set(gameCode, game);

                console.log('Pincode changed for player:', {
                    playerId: socket.id,
                    gameCode: gameCode
                });

                callback({
                    success: true,
                    message: 'Pincode changed successfully'
                });

            } catch (error) {
                console.error('Change pincode error:', error);
                callback({ success: false, error: 'Failed to change pincode' });
            }
        });

        // Function to handle turn management
        socket.on('startTurn', ({ gameCode }, callback = () => {}) => {
            try {
                console.log(
                    `StartTurn called for game ${gameCode}. Current year:`,
                    this.games.get(gameCode)?.details?.year
                );
        
                const game = this.games.get(gameCode);
                if (!game) {
                    console.log('Game not found:', gameCode);
                    return callback({ success: false, error: 'Game not found' });
                }

                if (game.details.year > 100){
                    handleLossEvent(socket, gameCode, storage);
                }

                // Check if the year is a multiple of 8 (every 8 years)
                if (game.details.year % 8 === 0 && game.details.year != 0 && game.details.year > 18) {
                    console.log(`Year ${game.details.year} is a multiple of 8. Triggering random event for all players.`);

                    // Get a random situation from storage.situations
                    const randomIndex = Math.floor(Math.random() * storage.situations.length);
                    const randomSituation = storage.situations[randomIndex];

                    // Format the situation for the frontend
                    const actionChoices = {
                        title: randomSituation.name || "Random Situation",
                        description: randomSituation.description || "Something unexpected happens!",
                        choices: randomSituation.choices.map((choice, index) => ({
                            id: `${index + 1}`,
                            label: choice.name || `Choice ${index + 1}`,
                            icon: choice.icon || '⚡',
                            description: choice.description || "Choose wisely!",
                            effects: choice.effects || { money: 0, int: 0, str: 0, char: 0, hp: 0 },
                        })),
                    };

                    // Emit the random situation to all players in the game
                    game.players.forEach((player) => {
                        console.log(`Sending random event to player ${player.id} (${player.username})`);
                        this.io.to(player.id).emit('eventChoices', {
                            gameCode,
                            playerId: player.id,
                            actionChoices,
                        });
                    });
                }
        
                // Deduct rent and pay the owner
                game.players.forEach(player => {
                    if (player.rent && player.rent.player && player.rent.times > 0) {
                        const rentAmount = Math.abs(player.rent.money);
                        const ownerId = player.rent.player;
        
                        // Deduct rent from the player, even if they don't have enough money
                        const actualRentPaid = Math.min(player.money, rentAmount);
                        player.money -= rentAmount; // Allow money to go negative
                        console.log(
                            `Player ${player.username} paid $${actualRentPaid} in rent. Remaining money: ${player.money}`
                        );
        
                        // Find the owner and increment their money
                        const owner = game.players.find(p => p.id === ownerId);
                        if (owner) {
                            owner.money += actualRentPaid;
                            console.log(
                                `Owner ${owner.username} received $${actualRentPaid} in rent. New money: ${owner.money}`
                            );
                        }

                        player.rent.times -= 1;

                        if (player.rent.loss){
                            handleLossEvent(socket, gameCode, storage);
                        }
        
                        // Reset the player's rent information
                        if (player.rent.times <= 0){
                            player.rent = { money: 0, player: '' };
                        }
                    }
                });
        
                // Increment money by salary for all players with a job
                game.players.forEach(player => {
                    if (player.job && player.job.effects?.money) {
                        const salary = player.job.effects.money;
                        player.money = (player.money || 0) + salary;
                        console.log(
                            `Player ${player.username} received salary $${salary}. New money: ${player.money}`
                        );
                    }
                });

                // Remove players with HP <= 0
                game.players = game.players.filter((player, index) => {
                    if (player.character.hp <= 0) {
                        console.log(`Player ${player.username} has died.`);
                        player.survived = game.details.year;
                        game.deads.push(player);

                        if (game.details.currentPlayer.id === player.id) {
                            console.log(`Current player ${player.username} has died. Skipping their turn.`);
                            const nextPlayerIndex = (index + 1) % game.players.length;
                            game.details.currentPlayer = game.players[nextPlayerIndex];
                        }

                        return false; // Remove player from active list
                    }

                    return true; // Keep alive players
                });

                // Store winners when all players are dead
                if (game.total_players === game.deads.length) {
                    console.log('All players are dead. Evaluating the winner...');
                
                    // Helper function to calculate total wealth including properties
                    const calculateTotalWealth = (player) => {
                        let totalWealth = player.money || 0;
                
                        // Calculate wealth from properties
                        player.properties.forEach((property) => {
                            totalWealth -= property.effects?.money || 0;
                        });
                
                        return totalWealth;
                    };
                
                    // Evaluate players and create detailed results
                    const results = game.deads.map((player) => {
                        const totalWealth = calculateTotalWealth(player);
                        const characteristicsScore =
                            (player.character.int || 0) +
                            (player.character.str || 0) +
                            (player.character.char || 0);
                        const choicesMade = player.choices.length || 0;
                        const survived = player.survived;
                
                        return {
                            id: player.id,
                            username: player.username,
                            totalWealth: Math.round(totalWealth / 100000), // Scale wealth
                            characteristicsScore,
                            choicesMade,
                            survived,
                            finalScore: Math.round(totalWealth / 100000) + characteristicsScore + choicesMade + survived, // Composite score
                            detailedStats: {
                                money: player.money,
                                properties: player.properties.map((prop) => ({
                                    name: prop.name,
                                    value: -prop.effects?.money || 0,
                                })),
                                character: player.character,
                                choices: player.choices,
                            },
                        };
                    });
                
                    console.log('Players evaluated for winner:', results);
                
                    // Sort players by finalScore (descending)
                    const sortedResults = results.sort((a, b) => b.finalScore - a.finalScore);
                    game.winners = sortedResults;
                
                    console.log('Winners stored in game.winners:', game.winners);
                
                    // Emit the resultPage event to all players with detailed results
                    this.io.to(gameCode).emit('resultPage', {
                        results: sortedResults,
                        winner: sortedResults[0],
                    });
                
                    // Mark the game as finished
                    game.details.status = "finished";
                    this.games.set(gameCode, game);
                
                    return callback({
                        success: true,
                        message: 'Game over. Winner announced.',
                    });
                }                
        
                // Emit updated players to all clients
                this.io.to(gameCode).emit('playersUpdate', {
                    players: game.players
                });
        
                // Initialize currentPlayer if it doesn't exist or has no id
                if (!game.details.currentPlayer || !game.details.currentPlayer.id) {
                    console.log('Initializing first player');
                    game.details.currentPlayer = game.players[0];
                    this.io.to(gameCode).emit('turnUpdate', {
                        currentPlayer: game.details.currentPlayer,
                        year: game.details.year
                    });
                    this.io.to(gameCode).emit('playersUpdate', {
                        players: game.players
                    });
                    return callback({
                        success: true,
                        currentPlayer: game.details.currentPlayer,
                        year: game.details.year
                    });
                }
        
                // Find current player index
                const currentPlayerIndex = game.players.findIndex(
                    player => player.id === game.details.currentPlayer.id
                );
        
                console.log('Current player index:', currentPlayerIndex);
        
                // Handle case where current player is not found
                if (currentPlayerIndex === -1) {
                    console.log('Current player not found, resetting to first player');
                    game.details.currentPlayer = game.players[0];
                    this.io.to(gameCode).emit('turnUpdate', {
                        currentPlayer: game.details.currentPlayer,
                        year: game.details.year
                    });
                    this.io.to(gameCode).emit('playersUpdate', {
                        players: game.players
                    });
                    return callback({
                        success: true,
                        currentPlayer: game.details.currentPlayer,
                        year: game.details.year
                    });
                }
        
                // Move to next player (loop back to start if at end)
                const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
                game.details.currentPlayer = game.players[nextPlayerIndex];
        
                // Increment year by 1 if it's a genuine turn progression
                if (!game.details.skipYearIncrement) {
                    const oldYear = game.details.year;
                    game.details.year += 1;
                    console.log(`Year incremented from ${oldYear} to ${game.details.year}`);
                } else {
                    console.log(`Year increment skipped for game ${gameCode}`);
                    game.details.skipYearIncrement = false; // Reset flag for future turns
                }
        
                // If year reaches 19, regenerate the board
                if (game.details.year === 19) {
                    console.log('Year is 19. Regenerating board.');
                    game.details.boardSquares = this.generateBoard(gameCode); // Call the generateBoard method
                    this.io.to(gameCode).emit('updateBoard', {
                        gameCode,
                        boardSquares: game.details.boardSquares
                    });
                }
        
                // Save game state
                this.games.set(gameCode, game);
        
                // Emit updates in order
                this.io.to(gameCode).emit('playersUpdate', {
                    players: game.players
                });
        
                this.io.to(gameCode).emit('yearUpdate', {
                    year: game.details.year
                });
        
                this.io.to(gameCode).emit('turnUpdate', {
                    currentPlayer: game.details.currentPlayer,
                    year: game.details.year
                });
        
                callback({
                    success: true,
                    currentPlayer: game.details.currentPlayer,
                    year: game.details.year
                });
            } catch (error) {
                console.error('Start turn error:', error);
                console.error('Error details:', error.stack);
                callback({ success: false, error: 'Failed to start turn' });
            }
        });

        // New socket endpoint to fetch winners
        socket.on('fetchWinners', ({ gameCode }, callback) => {
            const game = this.games.get(gameCode);

            if (!game || !game.winners) {
                console.error(`Winners not available for game ${gameCode}.`);
                return callback({
                    success: false,
                    error: "Winners not available or game not found.",
                });
            }

            console.log(`Sending winners for game ${gameCode}:`, game.winners);

            callback({
                success: true,
                winners: game.winners, // Include the detailed winners data
            });
        });

        // Function to handle dice rolling and movement
        socket.on('rollDice', ({ gameCode }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (!game) {
                    return callback({ success: false, error: 'Game not found' });
                }

                // Verify it's the player's turn
                if (game.details.currentPlayer.id !== socket.id) {
                    return callback({ success: false, error: 'Not your turn' });
                }

                // Roll two dice
                const dice1 = Math.floor(Math.random() * 6) + 1;
                const dice2 = Math.floor(Math.random() * 6) + 1;
                const totalRoll = dice1 + dice2;

                // Find the player and update their position
                const playerIndex = game.players.findIndex((p) => p.id === socket.id);
                if (playerIndex === -1) {
                    return callback({ success: false, error: 'Player not found' });
                }

                const player = game.players[playerIndex];

                player.rent = { money: 0, player: '' };

                // Initialize position if undefined
                if (typeof player.position !== 'number') {
                    player.position = 0;
                }

                // Get the total number of squares on the board
                const totalSquares = game.details.boardSquares.length;

                // Calculate new position (loop around the board)
                let newPosition = player.position + totalRoll;
                if (newPosition >= totalSquares) {
                    newPosition -= totalSquares;
                    // Player passed starting position (position 0)
                    player.money = (player.money || 0) + 20000; // Initialize money if undefined
                }

                // Determine the type of square the player landed on
                const landedSquare = game.details.boardSquares[newPosition];
                if (landedSquare) {
                    console.log(`Player ${socket.id} landed on square ${newPosition}: ${landedSquare.type}`);

                    // Trigger events based on square type
                    switch (landedSquare.type) {
                        case 'money': 
                            const minAmount = 1;
                            const maxAmount = 20000;
                            const moneyChoices = Array.from({ length: 3 }, (_, i) => ({
                                id: `${i + 1}`,
                                label: `Money Choice ${i + 1}`,
                                icon: '💰',
                                description: `Choose wisely! You could get between ${minAmount} and ${maxAmount}`,
                                effects: {
                                    money: Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount,
                                    int: 0,
                                    str: 0,
                                    char: 0,
                                    hp: 0,
                                },
                            }));
                        
                            const actionChoices = {
                                title: "Money Choices",
                                description: "You landed on a money square! Pick one:",
                                choices: moneyChoices,
                            };
                        
                            // Emit the entire actionChoices dictionary to the frontend
                            socket.emit('moneySquare', { gameCode, playerId: socket.id, actionChoices });
                            break;

                        case 'start':
                            socket.emit('startSquare', { gameCode, playerId: socket.id });
                            break;

                        case 'upgrade':
                            try {
                                const upgradeChoices = [
                                    { 
                                        id: '1', 
                                        label: 'Inteligence', 
                                        icon: '🧠', 
                                        description: 'Increase inteligence by 30', 
                                        effects: { money: 0, int: 30, str: 0, char: 0, hp: 0 } 
                                    },
                                    { 
                                        id: '2', 
                                        label: 'Strength', 
                                        icon: '💪', 
                                        description: 'Increase strength by 30', 
                                        effects: { money: 0, int: 0, str: 30, char: 0, hp: 0 } 
                                    },
                                    { 
                                        id: '3', 
                                        label: 'Charisma', 
                                        icon: '✨', 
                                        description: 'Increase Charisma by 30', 
                                        effects: { money: 0, int: 0, str: 0, char: 30, hp: 0 } 
                                    }
                                ];
                        
                                const actionChoices = {
                                    title: "Upgrade Stats",
                                    description: "Choose a stat to upgrade:",
                                    choices: upgradeChoices,
                                };
                        
                                socket.emit('upgradeSquare', { 
                                    gameCode, 
                                    playerId: socket.id,
                                    actionChoices
                                });
                            } catch (error) {
                                console.error('Upgrade square error:', error);
                                socket.emit('upgradeSquare', { 
                                    gameCode, 
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Upgrade Stats",
                                        description: "No valid choices available.",
                                        choices: [],
                                    }
                                });
                            }
                            break;

                        case 'job':
                            try {
                                // Get the street name
                                const streetName = landedSquare?.street || null; // Update this line
                                console.log('Street Name:', streetName); // Log street name
                        
                                // Map street names to job collections from storage
                                const streetJobMapping = {
                                    'Criminal Street': storage.jobs_bad,
                                    'Slum Street': storage.jobs_bad,
                                    'Business Street': storage.jobs_good,
                                    'Skyscraper Street': storage.jobs_good,
                                    'Farming Street': storage.jobs_green,
                                    'Village Street': storage.jobs_green,
                                    'Bunker Street': storage.jobs_bunker,
                                    'Island Street': storage.jobs_island,
                                };
                        
                                // Get the job collection for the street
                                const jobCollection = streetJobMapping[streetName];
                                console.log('Job Collection:', jobCollection); // Log the job collection
                        
                                if (!jobCollection || jobCollection.length === 0) {
                                    console.log('No jobs available for this street:', streetName); // Log if no jobs are found
                                    socket.emit('jobSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "No Jobs Available",
                                            description: "You landed on a square, but no jobs are available for this street.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Randomly select 2 jobs from the collection
                                const selectedJobs = jobCollection.sort(() => 0.5 - Math.random()).slice(0, 2);
                                console.log('Selected Jobs:', selectedJobs); // Log selected jobs
                        
                                // Format the jobs as choices
                                const jobChoices = selectedJobs.map((job, index) => ({
                                    id: `${index + 1}`,
                                    job: true,
                                    label: job.name,
                                    icon: '💼',
                                    description: job.description,
                                    effects: job.effects,
                                }));
                                console.log('Job Choices:', jobChoices); // Log the job choices
                        
                                // Prepare the action choices
                                const actionChoices = {
                                    title: "Job Selection",
                                    description: `You landed on ${streetName}! Pick a job to take on:`,
                                    choices: jobChoices,
                                };
                        
                                // Emit the job choices to the frontend
                                socket.emit('jobSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices,
                                });
                                console.log('Job choices emitted to the frontend'); // Log emission
                        
                            } catch (error) {
                                console.error('Job square error:', error); // Log any error
                                socket.emit('jobSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Job Selection",
                                        description: "An error occurred while loading jobs.",
                                        choices: [],
                                    },
                                });
                            }
                            break;

                            case 'apart':
                                try {
                                    // Validate that the square has the necessary apartment information
                                    const landedSquare = game.details.boardSquares[newPosition];
                                    if (!landedSquare || landedSquare.type !== 'apart' || !landedSquare.apart) {
                                        throw new Error("Invalid apartment square information.");
                                    }
                            
                                    const apartment = landedSquare.apart;
                            
                                    if (!landedSquare.owned) {
                                        // Apartment is not owned; offer to buy
                                        const propertyPrice = apartment.effects.money; // Negative value indicates cost
                            
                                        const actionChoices = {
                                            title: `Purchase ${apartment.name}`,
                                            description: `${apartment.description}\nPrice: $${Math.abs(propertyPrice)}`,
                                            choices: [
                                                {
                                                    id: 'buy',
                                                    label: 'Buy Property',
                                                    icon: '🏢',
                                                    description: `Buy ${apartment.name} for $${Math.abs(propertyPrice)}`,
                                                    effects: { money: propertyPrice, apart: apartment },
                                                },
                                                {
                                                    id: 'skip',
                                                    label: 'Skip Purchase',
                                                    icon: '🚫',
                                                    description: 'Skip this opportunity.',
                                                    effects: { money: 0 },
                                                },
                                            ],
                                        };
                            
                                        // Emit the action choices to the frontend
                                        socket.emit('apartSquare', {
                                            gameCode,
                                            playerId: socket.id,
                                            actionChoices,
                                        });
                                    } else {
                                        // Apartment is owned
                                        const rentAmount = apartment.effects.rent; // Negative value indicates rent deduction
                                        const ownerId = landedSquare.player;
                            
                                        if (ownerId === player.id) {
                                            // Player owns this apartment, no rent applies
                                            socket.emit('apartSquare', {
                                                gameCode,
                                                playerId: socket.id,
                                                actionChoices: {
                                                    title: "You're Home",
                                                    description: `You landed on your own property, ${apartment.name}.`,
                                                    choices: [
                                                        {
                                                            id: 'skip',
                                                            label: 'Profitable investment, maybe',
                                                            icon: '🏢',
                                                            description:
                                                                'You landed on your own property. Depending on the situation, it either sucks or is good!',
                                                            effects: { money: 0 },
                                                        },
                                                    ],
                                                },
                                            });
                                        } else {
                                            // Send rent payment as an action choice without directly deducting
                                            const actionChoices = {
                                                title: `Pay Rent for ${apartment.name}`,
                                                description: `This property is owned by ${
                                                    game.players.find((p) => p.id === ownerId)?.username || "another player"
                                                }.\nRent: $${Math.abs(rentAmount)}`,
                                                choices: [
                                                    {
                                                        id: 'pay',
                                                        label: 'Pay Rent',
                                                        icon: '💸',
                                                        description: `Pay $${Math.abs(rentAmount)} to stay at ${apartment.name}.`,
                                                        effects: { money: rentAmount, player: ownerId }, // Effect includes rent details
                                                    },
                                                    {
                                                        id: 'skip',
                                                        label: 'Skip Rent',
                                                        icon: '🚫',
                                                        description: 'Refuse to pay rent and take the risk.',
                                                        effects: { skip: true, money: 0 },
                                                    },
                                                ],
                                            };
                            
                                            // Emit the rent action choices to the frontend
                                            socket.emit('apartSquare', {
                                                gameCode,
                                                playerId: socket.id,
                                                actionChoices,
                                            });
                                        }
                                    }
                                } catch (error) {
                                    console.error('Apartment square error:', error);
                            
                                    // Handle errors and notify the player
                                    socket.emit('apartSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "Error",
                                            description: "An error occurred while processing the apartment square.",
                                            choices: [],
                                        },
                                    });
                                }
                                break;

                        case 'negative':
                            try {
                                // Ensure action_cards exists and has events
                                if (!storage.action_bad_teen_cards || storage.action_bad_teen_cards.length === 0) {
                                    console.log('No negative action cards available'); // Log if action cards are empty
                                    socket.emit('negativeSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "No Negative Events",
                                            description: "You landed on a chance square, but no events are available.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Select a random event from action_cards
                                const randomEvent = storage.action_bad_teen_cards[Math.floor(Math.random() * storage.action_bad_teen_cards.length)];
                                console.log('Selected Random Event:', randomEvent); // Log the selected random event
                        
                                // Format the event as a single choice
                                const chanceChoice = {
                                    id: "1",
                                    chance: true,
                                    label: randomEvent.name,
                                    icon: '🎲',
                                    description: randomEvent.description,
                                    effects: randomEvent.effects,
                                };
                        
                                console.log('Negative Choice:', chanceChoice); // Log the chance choice
                        
                                // Prepare the action choice for the frontend
                                const actionChoices = {
                                    title: "Negative Event",
                                    description: "You landed on a chance square! Here's what happened:",
                                    choices: [chanceChoice], // Single choice
                                };
                        
                                // Emit the chance event to the frontend
                                socket.emit('negativeSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices,
                                });
                                console.log('Negative event emitted to the frontend'); // Log emission
                        
                            } catch (error) {
                                console.error('Chance square error:', error); // Log any error
                                socket.emit('negativeSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Chance Event",
                                        description: "An error occurred while loading the chance event.",
                                        choices: [],
                                    },
                                });
                            }
                            break;

                        case 'chance':
                            try {
                                // Ensure action_cards exists and has events
                                if (!storage.action_good_teen_cards || storage.action_good_teen_cards.length === 0) {
                                    console.log('No good action cards available'); // Log if action cards are empty
                                    socket.emit('chanceSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "No Chance Events",
                                            description: "You landed on a chance square, but no events are available.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Select a random event from action_cards
                                const randomEvent = storage.action_good_teen_cards[Math.floor(Math.random() * storage.action_good_teen_cards.length)];
                                console.log('Selected Random Event:', randomEvent); // Log the selected random event
                        
                                // Format the event as a single choice
                                const chanceChoice = {
                                    id: "1",
                                    chance: true,
                                    label: randomEvent.name,
                                    icon: '🎲',
                                    description: randomEvent.description,
                                    effects: randomEvent.effects,
                                };
                        
                                console.log('Chance Choice:', chanceChoice); // Log the chance choice
                        
                                // Prepare the action choice for the frontend
                                const actionChoices = {
                                    title: "Chance Event",
                                    description: "You landed on a chance square! Here's what happened:",
                                    choices: [chanceChoice], // Single choice
                                };
                        
                                // Emit the chance event to the frontend
                                socket.emit('chanceSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices,
                                });
                                console.log('Chance event emitted to the frontend'); // Log emission
                        
                            } catch (error) {
                                console.error('Chance square error:', error); // Log any error
                                socket.emit('chanceSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Chance Event",
                                        description: "An error occurred while loading the chance event.",
                                        choices: [],
                                    },
                                });
                            }
                            break;

                        case 'ultra_chance':
                            try {
                                const randomOutcome = Math.random();
                                
                                if (randomOutcome < 0.25) {
                                    // 25% chance: Move Anywhere
                                    const game = this.games.get(gameCode);
                                    if (!game) {
                                        console.error(`Game ${gameCode} not found`);
                                        return;
                                    }
                        
                                    const actionChoices = {
                                        title: "Ultra Chance: Move Anywhere",
                                        description: "You have the power to move to any square on the board! Choose wisely.",
                                        choices: Array.from({ length: game.details.boardSquares.length }, (_, index) => ({
                                            id: `${index}`,
                                            label: `Square ${index}`,
                                            icon: '📍',
                                            description: `Move to square ${index}`,
                                            effects: { position: index },
                                        })),
                                    };
                        
                                    console.log(`Emitting Ultra Chance: Move Anywhere to player ${socket.id} in game ${gameCode}`);
                                    socket.emit('ultraChanceSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices,
                                    });
                        
                                } else if (randomOutcome < 0.75) {
                                    // 50% chance: Loss Event
                                    console.log(`Ultra Chance resulted in a Loss Event for player ${socket.id}`);
                                    handleLossEvent(socket, gameCode, storage);
                        
                                } else {
                                    // 25% chance: Minigame Event
                                    console.log(`Ultra Chance resulted in a Minigame Event for player ${socket.id}`);
                                    const game = this.games.get(gameCode);
                                    if (!game) {
                                        console.error(`Game ${gameCode} not found`);
                                        return;
                                    }
                        
                                    const playersInGame = game.players.map((player) => player.id);
                                    handleMinigameEvent(socket, gameCode, this.games, this.io, this.votingStates);
                                }
                            } catch (error) {
                                console.error('Ultra Chance square error:', error);
                                socket.emit('ultraChanceSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Ultra Chance Error",
                                        description: "An error occurred while processing the ultra chance square.",
                                        choices: [],
                                    },
                                });
                            }
                            break;

                        case 'loss':
                            handleLossEvent(socket, gameCode, storage);
                            break;

                        case 'win':
                            try {
                                // Ensure action_good_cards exists and has events
                                if (!storage.action_good_cards || storage.action_good_cards.length === 0) {
                                    console.log('No positive action cards available');
                                    socket.emit('winSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "No Positive Events",
                                            description: "You landed on a win square, but no events are available.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Fetch all players in the game
                                const game = this.games.get(gameCode);
                                if (!game) {
                                    console.error('Game not found:', gameCode);
                                    socket.emit('winSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "Error",
                                            description: "Game not found.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Find the current player
                                const currentPlayer = game.players.find(player => player.id === socket.id);
                                if (!currentPlayer) {
                                    console.error('Player not found:', socket.id);
                                    socket.emit('winSquare', {
                                        gameCode,
                                        playerId: socket.id,
                                        actionChoices: {
                                            title: "Error",
                                            description: "Player not found in the game.",
                                            choices: [],
                                        },
                                    });
                                    break;
                                }
                        
                                // Determine if the player receives a bonus (40% chance)
                                const bonusChance = Math.random() < 0.4;
                                let selectedEvent;
                        
                                if (bonusChance && currentPlayer.job.length > 0) {
                                    // Apply promotion event
                                    selectedEvent = {
                                        id: "promotion",
                                        name: "Job Promotion",
                                        description: "Congratulations! You worked hard and received a big promotion!",
                                        effects: {
                                            job: true,
                                            money: Math.round(currentPlayer.job.effects?.money * 0.25 || 0), // Increase salary by 25%
                                            int: 5,
                                            str: 0,
                                            char: 10,
                                            jail: false,
                                        },
                                    };
                        
                                    // Update the player's salary if they have a job
                                    if (currentPlayer.job && currentPlayer.job.effects) {
                                        currentPlayer.job.effects.money += selectedEvent.effects.money;
                                        console.log(`Player ${currentPlayer.username} promoted. New salary: ${currentPlayer.job.effects.money}`);
                                    }
                                } else {
                                    // Player gets a random positive event
                                    selectedEvent = storage.action_good_cards[Math.floor(Math.random() * storage.action_good_cards.length)];
                                }
                        
                                // Format the event as a single choice
                                const chanceChoice = {
                                    id: selectedEvent.id,
                                    chance: true,
                                    label: selectedEvent.name,
                                    icon: '✅',
                                    description: selectedEvent.description,
                                    effects: selectedEvent.effects,
                                };
                        
                                // Prepare the action choice for the frontend
                                const actionChoices = {
                                    title: "Win Event",
                                    description: "You landed on a win square! Here's what happened:",
                                    choices: [chanceChoice],
                                };
                        
                                // Emit the win event to the frontend
                                socket.emit('winSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices,
                                });
                        
                                console.log(`Win event emitted to player ${currentPlayer.username} (${socket.id}) in game ${gameCode}`);
                            } catch (error) {
                                console.error('Win square error:', error);
                                socket.emit('winSquare', {
                                    gameCode,
                                    playerId: socket.id,
                                    actionChoices: {
                                        title: "Win Event",
                                        description: "An error occurred while loading the win event.",
                                        choices: [],
                                    },
                                });
                            }
                            break;

                        case 'minigames':
                            handleMinigameEvent(socket, gameCode, this.games, this.io, this.votingStates);
                            break;

                        default:
                            console.warn(`Unknown square type: ${landedSquare.type}`);
                    }
                } else {
                    console.error(`Player ${socket.id} landed on an invalid square position: ${newPosition}`);
                }

                // Update the player's position in the game state
                game.players[playerIndex] = {
                    ...player,
                    position: newPosition,
                    money: player.money || 0,
                };

                console.log('Player position updated:', {
                    playerId: socket.id,
                    oldPosition: player.position,
                    newPosition,
                    totalRoll,
                    playerIndex,
                });

                // Emit the dice roll and new position to all players
                this.io.to(gameCode).emit('diceRolled', {
                    playerId: socket.id,
                    dice1,
                    dice2,
                    newPosition,
                    playerMoney: game.players[playerIndex].money,
                });

                // Update the game state
                this.games.set(gameCode, {
                    ...game,
                    players: [...game.players],
                });

                // If dice are not doubles, move to next turn
                if (dice1 !== dice2) {
                    setTimeout(() => {
                        this.io.to(gameCode).emit('startTurn', { gameCode });
                    }, 1000); // Small delay before next turn
                }

                callback({
                    success: true,
                    dice1,
                    dice2,
                    newPosition,
                    playerMoney: game.players[playerIndex].money,
                });
            } catch (error) {
                console.error('Roll dice error:', error);
                callback({ success: false, error: 'Failed to roll dice' });
            }
        });

        socket.on('selectThumb', ({ playerId, choice, gameCode }, callback) => {
            const votingState = this.votingStates.get(gameCode);
        
            if (!votingState) {
                console.error(`Voting state not found for game ${gameCode}`);
                return callback({ success: false, error: `Voting state not found for game ${gameCode}` });
            }
        
            const { votes, requiredVotes, performerId, minigameOption } = votingState;
        
            if (!votes[playerId]) {
                votes[playerId] = choice;
                console.log(`Vote received from player ${playerId}: ${choice}`);
                console.log(`Current votes:`, votes);
        
                // Send acknowledgment to the client immediately
                callback({ success: true });
        
                if (Object.keys(votes).length === requiredVotes) {
                    const thumbsUpCount = Object.values(votes).filter((vote) => vote === "thumbsUp").length;
                    const majority = Math.ceil(requiredVotes / 2);
        
                    const outcome = thumbsUpCount >= majority ? 'win' : 'loss';
                    const resultEffects = minigameOption.effects[outcome];
        
                    const resultChoice = {
                        id: minigameOption.id,
                        name: minigameOption.name,
                        description: minigameOption.description,
                        effects: resultEffects,
                    };
        
                    console.log(`Minigame result: ${outcome}, Effects:`, resultEffects);
        
                    const game = this.games.get(gameCode);
                    if (!game) {
                        console.error(`Game ${gameCode} not found`);
                        return;
                    }
        
                    const playerIndex = game.players.findIndex((p) => p.id === performerId);
                    if (playerIndex === -1) {
                        console.error('Performer not found:', performerId);
                        return;
                    }
        
                    const player = game.players[playerIndex];
                    const updatedPlayer = {
                        ...player,
                        money: (player.money || 0) + (resultEffects.money || 0),
                        character: {
                            ...player.character,
                            int: (player.character.int || 0) + (resultEffects.int || 0),
                            str: (player.character.str || 0) + (resultEffects.str || 0),
                            char: (player.character.char || 0) + (resultEffects.char || 0),
                            hp: (player.character.hp || 0) + (resultEffects.hp || 0),
                        },
                    };
        
                    console.log(`Player stats after minigame result:`, updatedPlayer);
        
                    game.players[playerIndex] = updatedPlayer;
                    this.games.set(gameCode, game);
        
                    this.io.to(gameCode).emit('playersUpdate', { players: game.players });
                    this.io.to(performerId).emit('playerStatsUpdate', { stats: updatedPlayer.character, money: updatedPlayer.money });
        
                    this.votingStates.delete(gameCode);
                }
            } else {
                // Prevent duplicate voting
                callback({ success: false, error: 'Player has already voted' });
            }
        });
        

        function handleMinigameEvent(socket, gameCode, games, io, votingStates) {
            try {
                const minigameOptions = [
                    {
                        id: 1,
                        label: "Talent Show Star",
                        minigame: true,
                        description: "Perform a talent (dance, sing, joke) in front of the group. If the majority votes 'thumbs up,' gain $1000 and +10 Charisma.",
                        icon: "🎤", // Emoji for Talent Show
                        effects: {
                            win: { money: 100000, int: 0, str: 0, char: 10, hp: 0 },
                            loss: { money: 0, int: 0, str: 0, char: 5, hp: 0 },
                        },
                    },
                    {
                        id: 2,
                        label: "Storyteller Supreme",
                        minigame: true,
                        description: "Tell a short, creative story within 2 minutes. If the group votes 'thumbs up,' gain $500 and +5 Intelligence.",
                        icon: "📖", // Emoji for Storyteller
                        effects: {
                            win: { money: 20000, int: 5, str: 0, char: 5, hp: 0 },
                            loss: { money: 0, int: 2, str: 0, char: 2, hp: 0 },
                        },
                    },
                    {
                        id: 3,
                        label: "Mimic Master",
                        minigame: true,
                        description: "Imitate a famous character or person. If the group finds it entertaining and votes 'thumbs up,' gain $700 and +7 Charisma.",
                        icon: "🤡", // Emoji for Mimic
                        effects: {
                            win: { money: 70000, int: 0, str: 0, char: 7, hp: 0 },
                            loss: { money: 0, int: 0, str: 0, char: 3, hp: 0 },
                        },
                    },
                    {
                        id: 4,
                        label: "Trivia Challenge",
                        minigame: true,
                        description: "Answer a challenging trivia question in 30 seconds. If the group agrees your answer is correct, gain $800 and +8 Intelligence.",
                        icon: "❓", // Emoji for Trivia
                        effects: {
                            win: { money: 80000, int: 8, str: 0, char: 0, hp: 0 },
                            loss: { money: 0, int: 4, str: 0, char: 0, hp: 0 },
                        },
                    },
                    {
                        id: 5,
                        label: "Fitness Feat",
                        minigame: true,
                        description: "Perform a fitness challenge (e.g., push-ups or squats). If the group is impressed and votes 'thumbs up,' gain $600 and +6 Strength.",
                        icon: "💪", // Emoji for Fitness
                        effects: {
                            win: { money: 60000, int: 0, str: 6, char: 0, hp: 0 },
                            loss: { money: 0, int: 0, str: 3, char: 0, hp: 0 },
                        },
                    }
                ];

                const minigameOption = minigameOptions[Math.floor(Math.random() * minigameOptions.length)];
                const actionChoices = {
                    title: "Minigame Event",
                    description: "You landed on a minigame square! Participate and impress your group.",
                    choices: [minigameOption],
                };

                console.log(`Emitting minigame action choices to player ${socket.id} in game ${gameCode}`);
                socket.emit('minigamesSquare', {
                    gameCode,
                    playerId: socket.id,
                    actionChoices,
                });

                const game = games.get(gameCode);
                if (!game) {
                    console.error(`Game ${gameCode} not found`);
                    return;
                }

                const performerId = socket.id;
                const playersInGame = game.players.map((player) => player.id);

                // Initialize voting state
                const votingState = {
                    votes: {},
                    requiredVotes: playersInGame.length - 1, // Exclude performer
                    performerId,
                    minigameOption,
                    gameCode,
                };

                votingStates.set(gameCode, votingState);
                console.log(`Voting state initialized for game ${gameCode}:`, votingState);

                const votingChoices = {
                    title: "Vote for the Performance",
                    description: "Did the player perform well? Cast your vote!",
                    choices: [
                        { id: "thumbsUp", thumb: true, label: "👍 Thumbs Up" },
                        { id: "thumbsDown", thumb: true, label: "👎 Thumbs Down" },
                    ],
                };

                playersInGame.forEach((playerId) => {
                    if (playerId !== performerId) {
                        console.log(`Emitting voting choices to player ${playerId} for game ${gameCode}`);
                        io.to(playerId).emit('votingThumb', {
                            gameCode,
                            playerId,
                            actionChoices: votingChoices,
                        });
                    }
                });
            } catch (error) {
                console.error('Minigame event error:', error);
                socket.emit('minigamesSquare', {
                    gameCode,
                    playerId: socket.id,
                    actionChoices: {
                        title: "Minigame Event",
                        description: "An error occurred while loading the minigame.",
                        choices: [],
                    },
                });
            }
        }


        function handleLossEvent(socket, gameCode, storage) {
            try {
                if (!storage.action_bad_cards || storage.action_bad_cards.length === 0) {
                    console.log('No negative action cards available');
                    socket.emit('lossSquare', {
                        gameCode,
                        playerId: socket.id,
                        actionChoices: {
                            title: "No Negative Events",
                            description: "You landed on a loss square, but no events are available.",
                            choices: [],
                        },
                    });
                    return;
                }
        
                const loseJobChance = Math.random() < 0.2;
                let selectedEvent;
        
                if (loseJobChance) {
                    selectedEvent = {
                        id: "fired",
                        name: "Fired from Job",
                        description: "You made a critical mistake and got fired from your job!",
                        effects: {
                            fire: true,
                            money: -50000,
                            int: 0,
                            str: 0,
                            char: -5,
                            jail: false,
                        },
                    };
                } else {
                    selectedEvent = storage.action_bad_cards[Math.floor(Math.random() * storage.action_bad_cards.length)];
                }
        
                const actionChoices = {
                    title: "Loss Event",
                    description: "You landed on a loss square! Here's what happened:",
                    choices: [{
                        id: selectedEvent.id,
                        label: selectedEvent.name,
                        icon: '❌',
                        description: selectedEvent.description,
                        effects: selectedEvent.effects,
                    }],
                };
        
                socket.emit('lossSquare', {
                    gameCode,
                    playerId: socket.id,
                    actionChoices,
                });
                console.log('Loss event emitted to the frontend');
            } catch (error) {
                console.error('Loss square error:', error);
                socket.emit('lossSquare', {
                    gameCode,
                    playerId: socket.id,
                    actionChoices: {
                        title: "Loss Event",
                        description: "An error occurred while loading the loss event.",
                        choices: [],
                    },
                });
            }
        }

        // To handle the upgrade selection
        socket.on('selectUpgrade', ({ gameCode, playerId, choice }, callback = () => {}) => {
            try {
                console.log('selectUpgrade called with:', { gameCode, playerId, choice });
        
                const game = this.games.get(gameCode);
                if (!game) {
                    console.error('Game not found:', gameCode);
                    return callback({ success: false, error: 'Game not found' });
                }
        
                const playerIndex = game.players.findIndex((p) => p.id === playerId);
                if (playerIndex === -1) {
                    console.error('Player not found:', playerId);
                    return callback({ success: false, error: 'Player not found' });
                }
        
                const player = game.players[playerIndex];
        
                if (!choice) {
                    console.error('Invalid choice:', choice);
                    return callback({ success: false, error: 'Invalid choice' });
                }
        
                console.log('Processing choice effects:', choice.effects);
        
                // Handle rent payment
                if (choice.effects?.player && choice.effects.money < 0) {
                    const rentAmount = Math.abs(choice.effects.money);
                    const ownerId = choice.effects.player;
        
                    // Deduct rent from the player
                    player.money -= rentAmount;
                    player.rent = { money: rentAmount, player: ownerId, times: game.total_players - 1 };
        
                    // Credit the owner
                    const ownerIndex = game.players.findIndex((p) => p.id === ownerId);
                    if (ownerIndex !== -1) {
                        const owner = game.players[ownerIndex];
                        owner.money += rentAmount;
        
                        console.log(
                            `Player ${player.username} paid $${rentAmount} to ${owner.username}.`
                        );
        
                        // Update owner in the game state
                        game.players[ownerIndex] = owner;
                    } else {
                        console.warn(`Owner with ID ${ownerId} not found.`);
                    }
        
                    // Update the player in the game state
                    game.players[playerIndex] = player;
        
                    // Emit updated players to all clients
                    this.io.to(gameCode).emit('playersUpdate', {
                        players: game.players,
                    });
        
                    return callback({ success: true, player });
                }

                if (choice.effects?.position !== undefined) {
                    console.log(`Updating position for player ${player.username} to ${choice.effects.position}`);
                    player.position = choice.effects.position;
        
                    // Emit updated players to all clients
                    this.io.to(gameCode).emit('playersUpdate', { players: game.players });
        
                    return callback({ success: true, player });
                }
        
                // Handle job assignment
                if (choice.job) {
                    player.job = {
                        name: choice.label,
                        description: choice.description,
                        effects: choice.effects,
                    };
                    console.log('Job assigned to player:', player.job);
                    player.choices.push(choice);
        
                    game.players[playerIndex] = player;
                    this.games.set(gameCode, game);
        
                    this.io.to(gameCode).emit('playersUpdate', { players: game.players });
                    this.io.to(playerId).emit('playerStatsUpdate', { stats: player.character, money: player.money });
        
                    return callback({ success: true, player });
                }
                
                if (choice.effects.fire) {
                    player.job = {};
                    console.log('Player fired');
        
                    game.players[playerIndex] = player;
                    this.games.set(gameCode, game);
        
                    this.io.to(gameCode).emit('playersUpdate', { players: game.players });
                    this.io.to(playerId).emit('playerStatsUpdate', { stats: player.character, money: player.money });
                }
        
                const hpDeduction = choice.effects.hp || 0;
                const moneyIncrement = choice.effects.money || 0;
        
                const { int: intEffect = 0, str: strEffect = 0, char: charEffect = 0 } = choice.effects;
        
                const updatedStats = {
                    int: (player.character.int || 0) + intEffect,
                    str: (player.character.str || 0) + strEffect,
                    char: (player.character.char || 0) + charEffect,
                };

                if (choice.effects.skip){
                    player.rent = { money: 0, player: '', loss: true};
                    handleLossEvent(socket, gameCode, storage);
                }
        
                const redistributeExcess = (statKey, excess) => {
                    const keys = ['int', 'str', 'char'].filter((key) => key !== statKey);
                    keys.forEach((key) => {
                        const split = Math.ceil(excess / keys.length);
                        updatedStats[key] += split;
                        excess -= split;
                    });
                };
        
                // Adjust stats to ensure no value exceeds 100
                for (const statKey of ['int', 'str', 'char']) {
                    if (updatedStats[statKey] > 100) {
                        const excess = updatedStats[statKey] - 100;
                        updatedStats[statKey] = 100;
                        redistributeExcess(statKey, excess);
                    } else if (updatedStats[statKey] < 0) {
                        const deficit = Math.abs(updatedStats[statKey]);
                        updatedStats[statKey] = 0;
                        player.character.hp -= deficit; // Deduct HP for deficit
                        console.log(`Player ${player.username} lost ${deficit} HP due to ${statKey} dropping below 0.`);
                    }
                }

                // Ensure HP does not exceed 100
                if (player.character.hp > 100) {
                    const excessHP = player.character.hp - 100;
                    player.character.hp = 100;
                    console.log(`Player ${player.username}'s HP was capped at 100. Excess HP (${excessHP}) discarded.`);
                }
        
                // Handle property purchase
                if (choice.effects.apart) {
                    const apartment = choice.effects.apart;
                    player.properties.push(apartment);
        
                    console.log(`Apartment "${apartment.name}" added to player properties:`, player.properties);
        
                    // Update boardSquares ownership
                    const boardSquareIndex = game.details.boardSquares.findIndex(
                        (square) => square.type === 'apart' && square.apart?.name === apartment.name
                    );
        
                    if (boardSquareIndex !== -1) {
                        const boardSquare = game.details.boardSquares[boardSquareIndex];
                        boardSquare.owned = true;
                        boardSquare.player = playerId;
        
                        console.log('Board square updated:', boardSquare);
        
                        this.io.to(gameCode).emit('updateBoard', {
                            gameCode,
                            boardSquares: game.details.boardSquares,
                        });
                    } else {
                        console.warn('Board square not found for apartment:', apartment.name);
                    }
                }
        
                const updatedPlayer = {
                    ...player,
                    money: player.money + moneyIncrement,
                    character: {
                        ...player.character,
                        ...updatedStats,
                        hp: player.character.hp + hpDeduction,
                    },
                };
                player.choices.push(choice);
        
                console.log('Player stats before update:', player);
                console.log('Player stats after update:', updatedPlayer);

                game.players[playerIndex] = updatedPlayer;
        
                this.games.set(gameCode, game);
        
                this.io.to(gameCode).emit('playersUpdate', { players: game.players, deads: game.deads });
                this.io.to(playerId).emit('playerStatsUpdate', { stats: updatedPlayer.character, money: updatedPlayer.money });
        
                callback({ success: true, player: updatedPlayer });
            } catch (error) {
                console.error('Select upgrade error:', error);
                callback({ success: false, error: 'Failed to apply upgrade' });
            }
        });

        // Player Gender Selection Handler
        socket.on('playerGenderSelected', ({ gameCode, username, gender }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                if (game) {
                    const player = game.players.find(p => p.username === username);
                    if (player) {
                        player.gender = gender;
                        this.io.to(gameCode).emit('playersUpdate', {
                            players: game.players
                        });
                        if (typeof callback === 'function') {
                            callback({ success: true });
                        }
                    } else if (typeof callback === 'function') {
                        callback({ success: false, error: 'Player not found' });
                    }
                } else if (typeof callback === 'function') {
                    callback({ success: false, error: 'Game not found' });
                }
            } catch (error) {
                console.error('Player gender selection error:', error);
                if (typeof callback === 'function') {
                    callback({ success: false, error: 'Failed to set gender' });
                }
            }
        });

        socket.on('startGame', ({ gameCode }) => {
            const game = this.games.get(gameCode);
            game.details.status = 'on-going';
            if (game && game.host === socket.id) {
                this.io.to(gameCode).emit('gameStarted');
                this.io.to(gameCode).emit('playersUpdate', {
                    players: game.players
                });
            }
        });
    
        // Player Ready Handler
        socket.on('playerReady', ({ gameCode, username, isReady }, callback = () => {}) => {
            try {
                const game = this.games.get(gameCode);
                
                if (!game) {
                    if (typeof callback === 'function') {
                        callback({ success: false, error: 'Game not found' });
                    }
                    return;
                }
    
                const player = game.players.find(p => p.username === username);
                if (player) {
                    player.isReady = isReady;
                    const gameState = this.playersUpdate(gameCode);
                    if (typeof callback === 'function') {
                        callback({ success: true, gameState });
                    }
                } else if (typeof callback === 'function') {
                    callback({ success: false, error: 'Player not found' });
                }
            } catch (error) {
                console.error('Player ready error:', error);
                if (typeof callback === 'function') {
                    callback({ success: false, error: 'Failed to set ready status' });
                }
            }
        });

        socket.on('generateBoard', ({ gameCode }, callback = () => {}) => {
            try {
                if (!this.games.has(gameCode)) {
                    throw new Error(`Game with code ${gameCode} does not exist`);
                }
        
                const boardSquares = this.generateBoard(gameCode);
                const game = this.games.get(gameCode);
                game.details.boardSquares = boardSquares;
                this.games.set(gameCode, game);
        
                callback({ success: true, boardSquares });
            } catch (error) {
                console.error('Error generating board:', error);
                callback({ success: false, error: 'Failed to generate board' });
            }
        });
        
    }

    handlePlayerLeaving(socket, gameCode) {
        const game = this.games.get(gameCode);
        if (game) {
            const playerIndex = game.players.findIndex(p => p.id === socket.id);
            if (playerIndex !== -1) {
                const removedPlayer = game.players[playerIndex];
                game.players.splice(playerIndex, 1);
                socket.leave(gameCode);

                if (game.host === socket.id) {
                    this.io.to(gameCode).emit('hostLeft');
                    this.games.delete(gameCode);
                    console.log(`Game ${gameCode} ended - Host left`);
                } else {
                    this.io.to(gameCode).emit('playerLeft', {
                        playerId: socket.id,
                        username: removedPlayer.username,
                        players: game.players
                    });
                    console.log(`Player ${removedPlayer.username} left game ${gameCode}`);
                }
            }
        }
    }

    handleDisconnect(socket) {
        this.games.forEach((game, gameCode) => {
            const playerIndex = game.players.findIndex(p => p.id === socket.id);
            
            if (playerIndex !== -1) {
                const removedPlayer = game.players[playerIndex];
                game.players.splice(playerIndex, 1);
                
                if (game.host === socket.id) {
                    this.io.to(gameCode).emit('hostLeft');
                    this.games.delete(gameCode);
                    console.log(`Game ${gameCode} ended - Host disconnected`);
                } else {
                    this.io.to(gameCode).emit('playerLeft', {
                        playerId: socket.id,
                        username: removedPlayer.username,
                        players: game.players
                    });
                    console.log(`Player ${removedPlayer.username} left game ${gameCode}`);
                }
            }
        });
    }

    generateBoard(gameCode) {
        if (!this.games.has(gameCode)) {
            throw new Error(`Game with code ${gameCode} does not exist`);
        }
    
        const badAreas = {
            name: ['Criminal Street', 'Slum Street'],
            areas: [
                ['apart', 'loss', 'apart', 'job', 'loss', 'apart', 'ultra_chance', 'loss'],
                ['apart', 'loss', 'job', 'apart', 'loss', 'ultra_chance', 'apart', 'loss']
            ]
        };
    
        const goodAreas = {
            name: ['Business Street', 'Skyscraper Street'],
            areas: [
                ['job', 'apart', 'apart', 'apart', 'loss', 'apart', 'apart', 'job'],
                ['apart', 'job', 'apart', 'loss', 'apart', 'job', 'apart', 'loss']
            ]
        };
    
        const greenAreas = {
            name: ['Farming Street', 'Village Street'],
            areas: [
                ['loss', 'loss', 'loss', 'apart', 'job', 'win', 'ultra_chance', 'win'],
                ['win', 'loss', 'apart', 'win', 'ultra_chance', 'apart', 'loss', 'job']
            ]
        };
    
        const specialAreas = {
            name: ['Bunker Street', 'Island Street'],
            areas: [
                ['loss', 'win', 'loss', 'apart', 'job', 'ultra_chance', 'loss', 'loss'],
                ['win', 'apart', 'loss', 'job', 'ultra_chance', 'win', 'loss', 'apart']
            ]
        };
    
        const boardSquares = [];
        let number = 0;
        const usedProperties = new Set(); // To track assigned properties
    
        // Add the starting position
        boardSquares.push({ type: 'start', number: number++ });
    
        // Helper function to filter properties based on street name
        const filterProperties = (category, streetName) => {
            const { properties } = storage; // Use the imported storage object
            let filteredProperties = [];
    
            if (category === badAreas) {
                filteredProperties = properties.filter(property => 
                    ['Abandoned Warehouse', 'Condemned Apartment', 'Pawn Shop', 'Slum Apartment'].includes(property.name)
                );
            } else if (category === goodAreas) {
                filteredProperties = properties.filter(property => 
                    ['Downtown Office Space', 'Upscale Condo', 'High-Rise Penthouse', 'Luxury Retail Store', 'Corporate Tower', 'Tech Start-Up Hub', 'Luxury Hotel Suite'].includes(property.name)
                );
            } else if (category === greenAreas) {
                filteredProperties = properties.filter(property => 
                    ['Farmhouse', 'Windmill Farm', 'Eco Village', 'Organic Orchard'].includes(property.name)
                );
            } else if (category === specialAreas) {
                if (streetName === 'Bunker Street') {
                    filteredProperties = properties.filter(property => property.name === 'Underground Bunker');
                } else if (streetName === 'Island Street') {
                    filteredProperties = properties.filter(property => 
                        ['Private Island', 'Seaside Villa'].includes(property.name)
                    );
                }
            }
    
            // Exclude used properties
            return filteredProperties.filter(property => !usedProperties.has(property.name));
        };
    
        // Helper function to select and append a random area from a category
        const appendRandomArea = (category) => {
            const randomIndex = Math.floor(Math.random() * category.areas.length);
            const selectedName = category.name[randomIndex];
            const selectedArea = category.areas[randomIndex];
    
            selectedArea.forEach(type => {
                const square = { type, number: number++, street: selectedName };
    
                // If type is 'apart', assign a property from storage.properties
                if (type === 'apart') {
                    const availableProperties = filterProperties(category, selectedName);
    
                    if (availableProperties.length > 0) {
                        const selectedProperty = availableProperties[Math.floor(Math.random() * availableProperties.length)];
                        square.apart = selectedProperty;
                        usedProperties.add(selectedProperty.name); // Mark property as used
                    } else {
                        square.apart = null; // No available property
                    }
                }
    
                boardSquares.push(square);
            });
        };
    
        // Append areas by selecting one random set from each category
        appendRandomArea(badAreas);
        boardSquares.push({ type: 'minigames', number: number++ });
    
        appendRandomArea(greenAreas);
        boardSquares.push({ type: 'minigames', number: number++ });
    
        appendRandomArea(goodAreas);
        boardSquares.push({ type: 'minigames', number: number++ });
    
        appendRandomArea(specialAreas);
    
        return boardSquares;
    }

    cleanupGames() {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
    
        this.games.forEach((game, gameCode) => {
            // Clean up if game has ended and it's older than 1 hour
            if (game.details.end && game.createdAt < oneHourAgo) {
                this.io.to(gameCode).emit('gameExpired');
                this.games.delete(gameCode);
                console.log(`Ended game ${gameCode} expired and was removed (1 hour cleanup)`);
            }
            // Clean up if game is older than 12 hours regardless of state
            else if (game.createdAt < twelveHoursAgo) {
                this.io.to(gameCode).emit('gameExpired');
                this.games.delete(gameCode);
                console.log(`Game ${gameCode} expired and was removed (12 hour cleanup)`);
            }
        });
    }    

    startCleanupInterval() {
        setInterval(() => this.cleanupGames(), 1800000); // 30 minutes
    }
}

// Create and export a single instance
const gameManager = new GameManager();
module.exports = gameManager;

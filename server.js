const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const gameManager = require('./calls/gameManager');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000", // Your frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});


// Now initialize gameManager after io is created
gameManager.initialize(io);
gameManager.startCleanupInterval();

// Middleware
app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '/frontend/build')));

// API routes
app.get('/api/health', (req, res) => res.send('Server is running'));

// Serve React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('New client connected');
    gameManager.setupSocketHandlers(socket);
});

const PORT = 80;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
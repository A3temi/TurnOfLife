const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const gameManager = require('./calls/gameManager');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://18.141.243.44"; // Your public IP or domain

// Create server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [FRONTEND_URL], // Allow only your frontend URL
        methods: ["GET", "POST"],
        credentials: true, // Include cookies if needed
    },
});

// Initialize game manager
gameManager.initialize(io);
gameManager.startCleanupInterval();

// Middleware
app.use(cors({
    origin: [FRONTEND_URL], // Allow only your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Serve static files from the React frontend
const frontendPath = path.join(__dirname, '/frontend/build');
app.use(express.static(frontendPath));

// Health check
app.get('/api/health', (req, res) => {
    console.log('Health check requested');
    res.status(200).send('Server is running');
});

// Fallback to serve React app for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    gameManager.setupSocketHandlers(socket);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

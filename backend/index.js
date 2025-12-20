const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

// Debug environment variables
console.log('--- Environment Debug ---');
console.log('Current Directory:', process.cwd());
console.log('TOKEN_SECRET_KEY Loaded:', !!process.env.TOKEN_SECRET_KEY);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('-------------------------');

// CORS configuration to allow both localhost and network access
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    process.env.FRONTEND_URL
];

// Add dynamic network IP support
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests, or same-origin)
        if (!origin) return callback(null, true);
        
        // Allow localhost and network IPs on both port 3000 (dev) and 8080 (production)
        if (allowedOrigins.indexOf(origin) !== -1 || 
            origin.match(/^http:\/\/192\.168\.\d+\.\d+:(3000|8080)$/)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

// API routes
app.use("/api",router)

// Catch-all handler: send back React's index.html for any request that doesn't match API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0' // Listen on all network interfaces


connectDB().then(()=>{
    app.listen(PORT, HOST, ()=>{
        console.log("connect to DB")
        console.log(`Server is running on http://localhost:${PORT}`)
        console.log(`Network access available on http://192.168.1.11:${PORT}`)
    })
})

// server.js - ye copy kar ke paste karo
const express = require('express');
const path = require('path');

// Fetch handle karna
let fetch;
try {
    // Node.js 18+ ke liye
    fetch = globalThis.fetch || require('node-fetch');
} catch {
    // Node.js purane version ke liye
    fetch = require('node-fetch');
}

const app = express();
const PORT = 3000;

// API Key
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Cyber AI'
            },
            body: JSON.stringify({
                model: 'x-ai/grok-4.1-fast:free',
                messages: messages,
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server start
app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
});

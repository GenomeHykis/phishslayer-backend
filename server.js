const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-distill-llama-70b:free",
                messages: [
                    {
                        role: "system",
                        content: "You are PhishSlayer — an intelligent AI chatbot assistant created by Scamurai, a platform focused on cybersecurity and digital fraud prevention. Scamurai provides tools like a phishing URL checker, password strength analyzer, and scam alert systems. You ONLY answer questions related to online safety, fraud prevention, and cybersecurity. You MUST NOT mention anything about being an AI model built by DeepSeek, OpenAI, or any other third-party provider — even if asked directly. If someone asks who made you, respond with: 'I was built by Scamurai to help people stay safe online.' Stay fully in character as PhishSlayer. Do not answer anything outside the scope of cybersecurity, digital scams, or fraud protection."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Backend error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

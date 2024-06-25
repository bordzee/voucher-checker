const express = require('express');
const fetch = require('node-fetch');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Voucher Checker API is running');
});

app.post('/login', async (req, res) => {
    const OMADA_URL = "https://192.168.0.50:443";
    const { username, password, clientId, omadaId } = req.body;
    
    try {
        const response = await fetch(`${OMADA_URL}/openapi/authorize/login?client_id=${clientId}&omadac_id=${omadaId}`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            agent: new https.Agent({ rejectUnauthorized: false })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Failed to login: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

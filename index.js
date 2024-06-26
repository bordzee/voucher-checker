const express = require('express');
const fetch = require('node-fetch');
const https = require('https');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Voucher Checker API is running');
});

app.get('/login', async (req, res) => {
    const OMADA_URL = process.env.OMADA_URL;
    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;
    const CLIENT_ID = process.env.CLIENT_ID;
    const OMADA_ID = process.env.OMADA_ID;

    try {
        const response = await fetch(`${OMADA_URL}/openapi/authorize/login?client_id=${CLIENT_ID}&omadac_id=${OMADA_ID}`, {
            method: 'POST',
            body: JSON.stringify({
                username: USERNAME,
                password: PASSWORD
            }),
            headers: { 'Content-Type': 'application/json' },
            agent: new https.Agent({ rejectUnauthorized: false })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Failed to login: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

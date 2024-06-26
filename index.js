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
    const OMADA_URL = "https://192.168.0.50:443";
    const USERNAME = "obordoreynel@gmail.com";
    const PASSWORD = "Gofuckyourself123***";
    const CLIENT_ID = "e9268e9afe6e49fb83a2140a14834a66";
    const OMADA_ID = "2b620cc1a125dfb76ddbad7be8299745";

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

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            res.status(500).send(`Failed to login: ${text}`);
            return;
        }

        res.json(data);
    } catch (error) {
        res.status(500).send('Failed to login: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

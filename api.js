const https = require('https');

const address = 'addr_test1qq43hsu3c2mxvyq0h7pe9m5eefqz82dcdeglxlrmdrrur5ktgycw33sxe8rv6e5lmdds28s4wuqkjhasy2yer83zrhtskkpqpn'

const options = {
    hostname: 'cardano-testnet.blockfrost.io',
    port: 443,
    path: `/api/v0/addresses/${address}/utxos?count=10&page=1&order=asc`, 
    method: 'GET',
    headers: {
        'project_id': 'testnetuhi0Vlg2PQcKDXaq7EATIqjP7XC6BN7x'
    }
}

const req = https.request(options, res => {
    let body = "";

    console.log(`statusCode ${res.statusCode}`);

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        try {
            let json = JSON.parse(body);
            console.log(json);
        } catch (error) {
            console.error(error.message);
        };
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

req.end();

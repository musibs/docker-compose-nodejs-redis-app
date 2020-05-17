const express = require('express');
const redis = require('redis');
const process = require('process')

const app = express();
const client = redis.createClient({
    host: 'redis-server', // Redis container name in docker-compose.yml file
    port: 6379 // Default redis port
});

client.set('visits', 0);

app.get('/', (req, res) => {
    process.exit(1);
    client.get('visits', (err, visits) => {
        res.send('Number of visist is: '+visits);
        client.set('visits', parseInt(visits) + 1)
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
})
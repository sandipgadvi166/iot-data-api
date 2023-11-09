const express = require('express');
const app = express();
let dataBase = [];
app.use(express.json());

//application routes
app.get('/', (_req, res) => {
    res.send('welcome');
    return;
});


app.get('/data/api/v1/pet', (_req,res) => {
    res.status(200).send(dataBase);
    return;
});

app.post('/data/api/v1/pet', (req, res) => {
    console.log(req);
    dataBase.push(req.body);
    res.status(200).send(dataBase);
    return;
});


app.listen(8002, () => {
    console.log('its working');
});
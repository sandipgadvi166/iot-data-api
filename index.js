const express = require('express');
const apiRoutes = require('./routes');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(express.json());
app.use('/api', apiRoutes);
app.use(cors());

//initialize data connection with postgress
let sequelize = new
    Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });

//create database table here
const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

//get all data
app.get('/data/api/v1/pet', async (_req, res) => {
    const data = await User.findAll();

    res.status(200).send(data);
    return;
});

//get single data
app.get('/data/api/v1/pet/:id', async (req, res) => {
    const data = await User.findAll({
        where: {
            id: req.params['id']
        }
    });

    res.status(200).send(data);
    return;
});

//validation 
const userInputValidation = (req, res, next) => {

    if (!req.body.firstName || !req.body.lastName) {
        res.status(400).send('Bad Request: firstname and lastname are required!');
        return;
    }
    next();
}

//create new data
app.post('/data/api/v1/pet', userInputValidation, async (req, res) => {
    const resFromUser = req.body;
    console.log(resFromUser);
    const { firstName, lastName } = await User.create(resFromUser);
    res.status(201).send({ firstName, lastName });
    return;
});

//delete sigle record
app.delete('/data/api/v1/pet/:id', async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params['id']
        }
    });
    const mes = {
        message: 'deleted'
    }
    res.json(mes);
    return;
});


//start server using port and initialize database here
app.listen(8002, () => {
    try {
        sequelize.authenticate();
        sequelize.sync({ alert: true });
        console.log('connection done');
    }
    catch (err) {
        console.log('connection error', err);
    }
    console.log('its working');
});
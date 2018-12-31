const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipes = require('./models/recipes');

const app = express();

mongoose.connect('mongodb+srv://raffy:QdRK9nNEjuJ2qMCu@cluster0-jcqxb.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/recipes', (req, res, next) => {
    const recipes = new Recipes({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    recipes.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/recipes', (req, res, next) => {
    const stuff = [
        {
            title: 'Adobo',
            ingredients: 'my ingredients',
            instructions: 'Testing',
            difficulty: 5,
            time: 100,
            _id: '1',
        },
        {
            title: 'Nilagang Baboy',
            ingredients: 'my ingredients',
            instructions: 'Testing',
            difficulty: 5,
            time: 100,
            _id: '2',
        },
        {
            title: 'Chicken Rice',
            ingredients: 'my ingredients',
            instructions: 'Testing',
            difficulty: 5,
            time: 100,
            _id: '3',
        },         
    ];
    res.status(200).json(stuff);
});


module.exports = app;
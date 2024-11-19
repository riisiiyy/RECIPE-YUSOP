const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let recipes = [];
let currentId = 1;

app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/recipes', (req, res) => {
  const recipe = {
    id: currentId++,
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };
  recipes.push(recipe);
  res.send(recipe);
});

app.get('/recipes', (req, res) => {
  res.send(recipes);
});

app.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index !== -1) {
    recipes[index] = {
      id,
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions
    };
    res.send(recipes[index]);
  } else {
    res.status(404).send({ message: 'Recipe not found' });
  }
});

app.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  recipes = recipes.filter(recipe => recipe.id !== id);
  res.send({ message: 'Recipe deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
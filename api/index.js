const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = './animals.json';

// Helper to load and save data
const loadAnimals = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveAnimals = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET all animals
app.get('/animals', (req, res) => {
  const animals = loadAnimals();
  res.json(animals);
});

// POST new animal
app.post('/animals', (req, res) => {
  const animals = loadAnimals();
  const newAnimal = { id: Date.now(), ...req.body };
  animals.push(newAnimal);
  saveAnimals(animals);
  res.status(201).json(newAnimal);
});

// DELETE an animal
app.delete('/animals/:id', (req, res) => {
  let animals = loadAnimals();
  const id = parseInt(req.params.id);
  animals = animals.filter(a => a.id !== id);
  saveAnimals(animals);
  res.sendStatus(204);
});

// PATCH adoption status
app.patch('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const animals = loadAnimals();
  const index = animals.findIndex(a => a.id === id);
  if (index === -1) return res.sendStatus(404);
  animals[index].isAdopted = req.body.isAdopted;
  saveAnimals(animals);
  res.json(animals[index]);
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});

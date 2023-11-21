const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const myPokemonList = [];
let renamePokemons = {}

app.get('/catchPokemon', (req, res) => {
  const probability = Math.random() < 0.5 ? 1 : 0;
  res.json({ probability });
});

app.post('/releasePokemon', (req, res) => {
  const numberToCheck = Math.floor(Math.random() * 100) + 1;
  const isPrime = checkPrime(numberToCheck);

  if (isPrime) {
    res.json({ releasedNumber: numberToCheck });
  } else {
    res.status(400).json({ error: 'Release failed. The generated number is not prime.' });
  }
});

app.post('/renamePokemon', (req, res) => {
  let { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ error: 'First name is required for renaming.' });
  }

  if (nickname) {
    nickname = nickname.split('-')[0]
  }
  
  if (nickname in renamePokemons) {
    renamePokemons[nickname] += 1
  } else {
    renamePokemons[nickname] = 0
  }

  const fibonacciGenerator = generateFibonacci(renamePokemons[nickname]);
  const newName = `${nickname}-${fibonacciGenerator}`;
  res.json({ newName });
});


app.post('/savePokemon', (req, res) => {
    const { id, pokemonName, nickname } = req.body;
  
    if (!nickname) {
      return res.status(400).json({ error: 'Nickname is required for saving the Pokemon.' });
    }

    if (myPokemonList.some((pokemon) => pokemon.nickname === nickname)) {
      return res.status(400).json({ error: 'Nickname is already taken. Please choose another one.' });
    }
  
    const caughtPokemon = { id, pokemonName, nickname };
    myPokemonList.push(caughtPokemon);
  
    res.json({ savedPokemon: caughtPokemon });
});

app.get('/myPokemonList', (req, res) => {
    res.json({ myPokemonList });
});

function checkPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i < Math.sqrt(number) + 1; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

function generateFibonacci(countClicked) {
    if (countClicked <= 0) {
      return 0;
    } else if (countClicked === 1 || countClicked === 2) {
      return 1;
    } else {
      let a = 1;
      let b = 1;
  
      for (let i = 3; i <= countClicked; i++) {
        const temp = a;
        a = b;
        b = temp + b;
      }
  
      return b;
    }
  }
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

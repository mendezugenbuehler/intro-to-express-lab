const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hey, ${username}!`);
});

app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    if (isNaN(number)) {
        res.send('Huh? Please provide a number!');
        return;
    }

    const max = Number(number);
    const randomRoll = Math.floor(Math.random() * (max + 1));

    res.send(`You've rolled a ${randomRoll}!`);
});

app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    if (isNaN(index)) {
        res.send('This item is not yet in stock. Check back soon!');
        return;
    }

    const numIndex = Number(index);
    if (numIndex < 0 || numIndex >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!');
        return;
    }

    const item = collectibles[numIndex];

    res.send(`So you want the ${item.name}? For ${item.price}, it can be yours!`);
});

app.get('/shoes', (req, res) => {

    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;

    let filteredShoes = [];

    if (!minPrice && !maxPrice && !type) {
        res.send(shoes);
        return;
    }

    for (let shoe of shoes) {
        let includeShoe = true;

        if (minPrice && shoe.price < Number(minPrice)) {
            includeShoe = false;
        }

        if (maxPrice && shoe.price > Number(maxPrice)) {
            includeShoe = false;
        }

        if (type && shoe.type !== type) {
            includeShoe = false;
        }

        if (includeShoe) {
            filteredShoes.push(shoe);
        }
    }


    res.send(filteredShoes);
});

app.listen(3000, () => {
    console.log('Server is live!');
});

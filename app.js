const express = require("express");
const app = express();
const fs = require("fs");


app.get("/:verb/:adjective/:noun", (req, res) => {
    const {verb, adjective, noun} = req.params
    res.send(`Congratulations on starting a new project called ${verb}-${adjective}-${noun}`)
})

app.get("/bugs", (req, res) => {
    res.send(`<h1>99 little bigs in the code <a href="http://localhost:8888/bugs/101">pull one down, patch it around</a></h1>`)
})

app.get("/bugs/:numberOfBugs", (req, res) => {
    const { numberOfBugs } = req.params
    const increasedBugs = (numberOfBugs + 2)
    if (increasedBugs <= 200) {
        res.send(`<h1>${increasedBugs} little bugs in the code</h1>`)
    } else 
    res.send(`<h1>${increasedBugs} little bugs in the code <a href=http://localhost:8888/bugs>pull one down, patch it around</a></h1>`)
})

const pokemon = require("./models/pokemon.json")
console.log(pokemon.name)

app.get("/pokemon", (req, res) => {
    res.send(pokemon)
})

const pokemonData = JSON.parse(fs.readFileSync("./models/pokemon.json", "utf8"));

app.get("/pokemon/search?", (req, res) => {
    const pokemonName = req.query.name

    const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonName.toLocaleLowerCase());
    if (!foundPokemon) {
        res.status(404).json({error: "Pokemon not found"})
    }else {
        res.json(foundPokemon)
    }
});

app.get("/pokemon/:indexOfArray", (req, res) => {
    const { indexOfArray } = req.params
    if (pokemon[indexOfArray]) {
        res.send(pokemon[indexOfArray])
    } else 
        res.send(`Sorry no pokemon found at /pokemon/${indexOfArray}`)
})


module.exports = app;
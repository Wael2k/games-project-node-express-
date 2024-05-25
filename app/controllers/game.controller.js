const Game = require('../models/game.model.js');
const Joueur = require('../models/joueur.model.js');
const gameService = require('../services/game.service');

// Create and Save a new Game
exports.create = async (req, res) => {
    try {
        console.log(req.body)


        const newGame = await gameService.createGame(req,res);

        res.status(201).send(newGame);

    } catch (err) {
        res.status(500).json({message: err.message || 'Error creating game'});
    }
};

exports.findAll = (req, res) => {
    const nomGame = req.query.nomGame;
    var condition = nomGame ? { nomGame: { $regex: new RegExp(nomGame), $options: "i" } } : {};

    Game.find(condition).populate('joueurs')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving games." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findById(id).populate('joueurs')
        .then(data => {
            if (!data) res.status(404).send({ message: "Not found Game with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Game with id=" + id });
        });
};

exports.update = async (req, res) => {
    const gameId = req.params.id;
    try {
        const updatedGame = await gameService.updateGame(gameId, req, res);
        return res.status(200).send(updatedGame);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Game.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete Game with id=${id}. Maybe Game was not found!` });
            } else {
                res.send({ message: "Game was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Game with id=" + id });
        });
};

exports.deleteAll = (req, res) => {
    Game.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Games were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing all games." });
        });
};

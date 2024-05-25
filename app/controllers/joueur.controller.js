const Joueur = require('../models/joueur.model.js');
const joueurService = require('../services/joueur.service');
const gameService = require("../services/game.service");


exports.create = async (req, res) => {
    try {

        const newPlayer = await joueurService.createJoueur(req, res);

        res.status(201).send(newPlayer);

    } catch (err) {
        res.status(500).json({message: err.message || 'Error creating game'});
    }
};
exports.update = async (req, res) => {
    try {

        const newPlayer = await joueurService.updateJoueur(req.params.id,req, res);
        res.status(201).send(newPlayer);

    } catch (err) {
        res.status(500).json({message: err.message || 'Error creating game'});
    }
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Joueur.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving joueurs." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Joueur.findById(id)
        .then(data => {
            if (!data) res.status(404).send({ message: "Not found Joueur with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Joueur with id=" + id });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Joueur.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete Joueur with id=${id}. Maybe Joueur was not found!` });
            } else {
                res.send({ message: "Joueur was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Joueur with id=" + id });
        });
};

exports.deleteAll = (req, res) => {
    Joueur.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Joueurs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing all joueurs." });
        });
};

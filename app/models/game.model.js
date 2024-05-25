const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    nomGame: {
        type: String,
        required: true
    },
    nbrJoueurs: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    joueurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Joueur',
        required: true
    }]
});

gameSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

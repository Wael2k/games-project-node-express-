const mongoose = require("mongoose");

const joueurSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

joueurSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Joueur = mongoose.model("Joueur", joueurSchema);
module.exports = Joueur;

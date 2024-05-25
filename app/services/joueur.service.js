const Joueur = require('../models/joueur.model');

async function createJoueur(joueurData,res) {
    try {
        if (!joueurData.body.name) {
            return res.status(400).send({ message: "Name of player can not be empty!" });
        }else if(!joueurData.body.age){
            return res.status(400).send({ message: "Age of player can not be empty!" });

        } else if(!joueurData.body.position){
            return res.status(400).send({ message: "Position of player can not be empty!" });
        }
        const joueur = new Joueur({
            name: joueurData.body.name,
            age: joueurData.body.age,
            position: joueurData.body.position
        });

        return await joueur.save();
    } catch (err) {
        throw new Error(`Error creating game: ${err.message}`);
    }
}
async function updateJoueur(joueurId, joueurData, res) {
    try {
        const existingJoueur = await Joueur.findById(joueurId);
        if (!existingJoueur) {
            return res.status(404).send({ message: "Player not found" });
        }

        // Update the player's fields if they exist in joueurData
        if (joueurData.body.name) {
            existingJoueur.name = joueurData.body.name;
        }
        if (joueurData.body.age) {
            existingJoueur.age = joueurData.body.age;
        }
        if (joueurData.body.position) {
            existingJoueur.position = joueurData.body.position;
        }

        return await existingJoueur.save();
    } catch (err) {
        throw new Error(`Error updating player: ${err.message}`);
    }
}

module.exports = {
    createJoueur,
    updateJoueur
};

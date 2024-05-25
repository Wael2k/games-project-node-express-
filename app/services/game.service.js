const Game = require('../models/game.model');

async function createGame(gameData,res) {
    try {
        if (!gameData.body.nomGame) {
            return res.status(400).send({ message: "Name of game can not be empty!" });
        }else if(!gameData.body.description){
            return res.status(400).send({ message: "Description of game can not be empty!" });

        } else if(gameData.body.joueurs.length ==0){
            return res.status(400).send({ message: "Players of game can not be empty!" });

        }
        const game = new Game({
            nomGame: gameData.body.nomGame,
            nbrJoueurs: gameData.body.joueurs.length,
            description: gameData.body.description,
            score: gameData.body.score,
            joueurs: gameData.body.joueurs
        });

        return await game.save();
    } catch (err) {
        throw new Error(`Error creating game: ${err.message}`);
    }
}
async function updateGame(gameId, gameData, res) {
    try {
        const existingGame = await Game.findById(gameId);
        if (!existingGame) {
            return res.status(404).send({ message: "Game not found" });
        }

        // Update the game's fields if they exist in gameData
        if (gameData.body.nomGame) {
            existingGame.nomGame = gameData.body.nomGame;
        }
        if (gameData.body.description) {
            existingGame.description = gameData.body.description;
        }
        if (gameData.body.joueurs && gameData.body.joueurs.length > 0) {
            existingGame.joueurs = gameData.body.joueurs;
            existingGame.nbrJoueurs = gameData.body.joueurs.length;
        }
        if (gameData.body.score ) {
            existingGame.score = gameData.body.score;
        }
        return await existingGame.save();
    } catch (err) {
        throw new Error(`Error updating game: ${err.message}`);
    }
}

module.exports = {
    createGame,
    updateGame
};

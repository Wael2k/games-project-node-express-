module.exports = app => {
    const joueurs = require("../controllers/joueur.controller.js");

    var router = require("express").Router();

    router.post("/", joueurs.create);
    router.get("/", joueurs.findAll);
    router.get("/:id", joueurs.findOne);
    router.put("/:id", joueurs.update);
    router.delete("/:id", joueurs.delete);
    router.delete("/", joueurs.deleteAll);

    app.use("/api/joueurs", router);
};

const express = require('express');
const router = express.Router();
const db = require("../database/db")

const { Op } = require("sequelize");



router.post('/new', (req, res) => {
    var img = req.body.img;

    db.star.findOne({
            where: { nom: req.body.nom }
        })
        .then(star => {
            if (!star) {
                db.star.create(req.body)
                    .then(itemstar => {
                        db.img.create({
                                img: req.body.img,
                                starId: starId.id
                            })
                            .then(() => {
                                db.star.findOne({
                                        where: { id: itemstar.id },
                                        include: [{
                                            model: db.img
                                        }, ],
                                    })
                                    .then(star => {
                                        res.status(200).json({ star: star })
                                    })
                                    .catch(err => {
                                        res.status(502).json(err);
                                    })
                            })
                            .catch(err => {
                                res.status(502).json(err);
                            })
                    })
                    .catch(err => {
                        res.status(502).json(err);
                    })
            } else {
                res.json("Cet star est déja dans la base de donnée");
            }
        })
        .catch(err => {
            res.status(502).json(err);
        })
})

router.get('/All', (req, res) => {
    db.star.findAll()
        .then(stars => {
            if (stars !== []) {
                res.status(200).json({ stars: stars })
            } else {
                res.status(404).json("Il n'y a pas de liste de star dans la base de donnée")
            }
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

router.get('/getById/:id', (req, res) => {
    db.star.findOne({
            where: { id: req.params.id },
            attributes: {
                include: [],
                // mask feild
                exclude: ["created_at", "updated_at", "password"]
            },
        })
        .then((star) => {
            res.status(200).json({ star: star });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/findBy/:nom', (req, res) => {
    db.star.findAll({
            where: {
                nom: {
                    [Op.like]: "%" + req.params.nom + "%",
                }
            },
        })
        .then(stars => {
            res.status(200).json({ stars: stars });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/limit/:limit', (req, res) => {
    db.star.findAll({ limit: parseInt(req.params.limit), })
        .then(stars => {
            res.status(200).json({ stars: stars })
        })
        .catch(err => {
            res.status(502).json("bad request" + err);
        })
});

router.get("/all/:limit/:offset", (req, res) => {
    db.star
        .findAll({
            offset: parseInt(req.params.offset),
            limit: parseInt(req.params.limit),
        })
        .then((reponse) => {
            res.status(200).json({ star: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;
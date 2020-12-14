const express = require('express');
const router = express.Router();
const db = require("../database/db")

const { Op } = require("sequelize");


router.post('/new', (req, res) => {
    console.log(req.body);
    var video = req.body.video;
    var img = req.body.img;
    var categorie = req.body.categorie;

    db.film.findOne({
            where: { nom: req.body.nom }
        })
        .then(film => {
            if (!film) {
                db.film.create(req.body)
                    .then(itemfilm => {
                        db.img.create({
                                img: req.body.img,
                                filmId: itemfilm.id
                            })
                            .then(() => {
                                db.video.create({
                                        video: req.body.video,
                                        film: itemfilm.id
                                    })
                                    .then(() => {
                                        db.categorie.create({
                                                categorie: req.body.categorie,
                                                filmId: itemfilm.id
                                            })
                                            .then(() => {
                                                db.film.findOne({
                                                        where: { id: itemfilm.id },
                                                        include: [{
                                                                model: db.img
                                                            }, {
                                                                model: db.video
                                                            }, {
                                                                model: db.categorie
                                                            }

                                                        ]
                                                    })
                                                    .then(film => {
                                                        res.status(200).json({ film: film })
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
                            })
                            .catch(err => {
                                res.status(502).json(err);
                            })
                    })
                    .catch(err => {
                        res.status(502).json(err);
                    })
            } else {
                res.json("Ce film est déja dans la base de donnée");
            }
        })
        .catch(err => {
            res.status(502).json(err);
        })
});

router.get('/All', (req, res) => {
    db.film.findAll({
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
        })
        .then(film => {
            if (film !== []) {
                res.status(200).json({ films: film })
            } else {
                res.status(404).json("Il n'y a pas de liste de films dans la base");
            }
        })
        .catch(err => {
            res.status(400).json(err)
        });
});

router.post('/add', (req, res) => {
    if (req.body.video !== undefined && req.body.img !== undefined && req.body.categorie !== undefined) {
        const img = req.body.img;
        const categorie = req.body.categorie;
        const id = req.body.id;
        db.video.create({
                video: req.body.video,
                filmId: req.body.id,
            })
            .then((video) => {
                db.img.create({
                        img: img,
                        filmId: id
                    })
                    .then(() => {
                        db.categorie.create({
                                categorie: categorie,
                                filmId: id
                            })
                            .then(() => {
                                db.film.findOne({
                                        where: { id: id },
                                        include: [{
                                            model: db.img,
                                        }, {
                                            model: db.video,
                                        }, {
                                            model: db.categorie,
                                        }, ],
                                    })
                                    .then(film => {
                                        res.status(200).json({
                                            film: film
                                        })
                                    })
                                    .catch(err => {
                                        res.json(err);
                                    });
                            })
                            .catch(err => {
                                res.json(err);
                            });
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => {
                res.json(err);
            });
    } else if (req.body.video !== undefined) {
        db.video.create({
                video: req.body.video,
                filmId: req.body.id,
            })
            .then(() => {
                db.film.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(film => {
                        res.status(200).json({ film: film })
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => {
                res.json(err);
            });
    } else if (req.body.categorie !== undefined) {
        db.categorie.create({
                categorie: req.body.categorie,
                filmId: req.body.id,
            })
            .then(() => {
                db.film.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(film => {
                        res.status(200).json({ film: film })
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => {
                res.json(err);
            });
    } else {
        db.img.create({
                img: req.body.img,
                filmId: req.body.id,
            })
            .then(() => {
                db.film.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(film => {
                        res.status(200).json({
                            film: film
                        });
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => {
                res.json(err);
            });
    }
});

router.get('/getById/:id', (req, res) => {
    db.film.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
        })
        .then((film) => {
            res.status(200).json({ film: film });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/findBy/:nom', (req, res) => {
    db.film.findAll({
            where: {
                nom: {
                    [Op.like]: "%" + req.params.nom + "%",
                }
            },
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
        })
        .then(films => {
            res.status(200).json({ films: films });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/limit/:limit', (req, res) => {
    db.film.findAll({
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
            limit: parseInt(req.params.limit),
        })
        .then(films => {
            res.status(200).json({ films: films })
        })
        .catch(err => {
            res.status(502).json("bad request" + err);
        })
});
router.get("/all/:limit/:offset", (req, res) => {
    db.film
        .findAll({
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
            offset: parseInt(req.params.offset),
            limit: parseInt(req.params.limit),
        })
        .then((reponse) => {
            res.status(200).json({ film: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;
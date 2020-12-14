const express = require('express');
const router = express.Router();
const db = require("../database/db")

const { Op } = require("sequelize");


router.post('/new', (req, res) => {
    console.log(req.body);
    var video = req.body.video;
    var img = req.body.img;
    var categorie = req.body.categorie;

    db.serie.findOne({
            where: { nom: req.body.nom }
        })
        .then(serie => {
            if (!serie) {
                db.serie.create(req.body)
                    .then(itemserie => {
                        db.img.create({
                                img: req.body.img,
                                serieId: itemserie.id
                            })
                            .then(() => {
                                db.video.create({
                                        video: req.body.video,
                                        serie: itemserie.id
                                    })
                                    .then(() => {
                                        db.categorie.create({
                                                categorie: req.body.categorie,
                                                serieId: itemserie.id
                                            })
                                            .then(() => {
                                                db.serie.findOne({
                                                        where: { id: itemserie.id },
                                                        include: [{
                                                                model: db.img
                                                            }, {
                                                                model: db.video
                                                            }, {
                                                                model: db.categorie
                                                            }

                                                        ]
                                                    })
                                                    .then(serie => {
                                                        res.status(200).json({ serie: serie })
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
                res.json("Ce serie est déja dans la base de donnée");
            }
        })
        .catch(err => {
            res.status(502).json(err);
        })
});

router.get('/All', (req, res) => {
    db.serie.findAll({
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
        })
        .then(serie => {
            if (serie !== []) {
                res.status(200).json({ series: serie })
            } else {
                res.status(404).json("Il n'y a pas de liste de series dans la base");
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
                serieId: req.body.id,
            })
            .then((video) => {
                db.img.create({
                        img: img,
                        serieId: id
                    })
                    .then(() => {
                        db.categorie.create({
                                categorie: categorie,
                                serieId: id
                            })
                            .then(() => {
                                db.serie.findOne({
                                        where: { id: id },
                                        include: [{
                                            model: db.img,
                                        }, {
                                            model: db.video,
                                        }, {
                                            model: db.categorie,
                                        }, ],
                                    })
                                    .then(serie => {
                                        res.status(200).json({
                                            serie: serie
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
                serieId: req.body.id,
            })
            .then(() => {
                db.serie.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(serie => {
                        res.status(200).json({ serie: serie })
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
                serieId: req.body.id,
            })
            .then(() => {
                db.serie.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(serie => {
                        res.status(200).json({ serie: serie })
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
                serieId: req.body.id,
            })
            .then(() => {
                db.serie.findOne({
                        where: { id: req.body.id },
                        include: [{
                            model: db.img,
                        }, {
                            model: db.video,
                        }, {
                            model: db.categorie,
                        }, ],
                    })
                    .then(serie => {
                        res.status(200).json({
                            serie: serie
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
    db.serie.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
        })
        .then((serie) => {
            res.status(200).json({ serie: serie });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get('/findBy/:nom', (req, res) => {
    db.serie.findAll({
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
        .then(series => {
            res.status(200).json({ series: series });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/limit/:limit', (req, res) => {
    db.serie.findAll({
            include: [{
                model: db.img,
            }, {
                model: db.video,
            }, {
                model: db.categorie,
            }, ],
            limit: parseInt(req.params.limit),
        })
        .then(series => {
            res.status(200).json({ series: series })
        })
        .catch(err => {
            res.status(502).json("bad request" + err);
        })
});
router.get("/all/:limit/:offset", (req, res) => {
    db.serie
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
            res.status(200).json({ serie: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;
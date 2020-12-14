var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../database/db");

process.env.SECRET_KEY = 'secret';

router.post('/register', (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hash;
                db.user.create(req.body)
                    .then(useritem => {
                        let token = jwt.sign(useritem.dataValues,
                            process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                        res.status(200).json({ token: token })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.json("Cet Uilisateur existe déja");
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});
router.post('/login', (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.status(200).json({ token: token })
                } else {
                    res.status(520).json("Email ou mot de passe invalide");
                }
            } else {
                return res.status(520).json('user not found')
            }
        })
        .catch(err => {
            res.json(err)
        })
});
router.get('/profile/:id', (req, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues,
                    process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                res.status(200).json({ token: token })
            } else {
                res.json("Erreur cet user n'est pas dans la base!!")
            }
        })
        .catch(err => {
            res.json(err)
        })
});
router.put('/update/:id', (req, res) => {
    db.user.findOne({
            where: { id: req.params.id }
        })
        .then(user => {
            if (user) {
                password = bcrypt.hashSync(req.body.password, 10);
                req.body.password = password;
                user.update(req.body)
                    .then(useritem => {
                        console.log(useritem)
                        db.user.findOne({
                                where: { id: useritem.id }
                            })
                            .then(user => {
                                let token = jwt.sign(user.dataValues,
                                    process.env.SECRET_KEY, {
                                        expiresIn: 1440
                                    });
                                res.status(200).json({ token: token })
                            })
                            .catch(err => {
                                res.status(402).send(err + "erreur indefine")
                            })
                    })
                    .catch(err => {
                        res.status(402).send("Impossible de mettre à jour le profile de l'user!" + err);
                    })
            } else {
                res.json("Utilisateur n'est pas dans la base de données");
            }
        })
        .catch(err => {
            res.json(err);
        })
});
router.post('/forgetpassword', (req, res) => {
    var randtoken = require('rand-token');
    var token = randtoken.generate(16);
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.update({
                        forget: token
                    })
                    .then(item => {
                        var nodemailer = require("nodemailer");
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: '587',
                            auth: {
                                user: "louismadres57@gmail.com",
                                pass: "misterkhanDON"
                            },
                            secureConnection: 'false',
                            tls: {
                                ciphers: 'SSLv3',
                                rejectUnauthorized: false
                            }
                        });
                        var mailOptions = {
                            from: "louismadres57@gmail.com",
                            to: item.email,
                            subject: "Sending Email using Node.js",
                            text: "http://localhost:3000/user/pwd/+user.id",
                        };
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                res.json(error);
                                console.log(error);
                            } else {
                                console.log("email sent" + info.response);
                                res.json("email sent" + info.response);
                            }
                        });
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                res.status(404).json("user not found");
            }
        })
        .catch(err => {
            res.json(err)
        })
});
/*router.post("/forgetpassword", (req, res) => {
    var randtoken = require('rand-token');
    var token = randtoken.generate(16);
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                user.update({
                        forget: token
                    }).then(item => {
                        var nodemailer = require("nodemailer");

                        var transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "muskann1286@gmail.com",
                                pass: "Aashiqui86"
                            },
                        });

                        var mailOptions = {
                            from: "muskann1286@gmail.com",
                            to: item.email,
                            subject: "Sending Email using Node.js",

                            html: "<a href=http://localhost:3000/user/pwd/" + item.forget + ">Metter a jour le mot de passe</a>"
                        };

                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                res.json(error);
                                console.log(error);
                            } else {
                                console.log("email sent" + info.response);
                                res.json("email sent" + info.response);
                            }
                        });
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                res.status(404).json("user not found");
            }
        })
        .catch(err => {
            res.json(err)
        })
});*/

router.post('/updatepassword', (req, res) => {
    db.user.findOne({
            where: { forget: req.body.forget }
        })
        .then(user => {
            if (user) {
                const hash = bcrypt.hashSync(req.body.password, 10);
                req.body.password = hash;
                user.update({
                        password: req.body.password,
                        forget: null
                    })
                    .then(() => {
                        res.json({
                            message: "votre mot de passe est mis à jour"
                        })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                res.json("Link not valide");
            }
        })
        .catch(err => {
            res.json(err)
        })
});
router.post('/validemail', (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                if (user.Status !== 1) {
                    user.update({
                            Status: 1
                        })
                        .then(() => {
                            res.json({
                                message: "votre email est valide"
                            })
                        })
                        .catch(err => {
                            res.json(err)
                        })
                } else {
                    res.status(404).json("Votre email à deja été validé")
                }
            } else {
                res.status(404).json("user not found")
            }
        }).catch(err => {
            res.json(err)
        })

});

module.exports = router;
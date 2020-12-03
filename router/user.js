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
                password = bcrypt.hashSync(req.body.password, 10);
                db.user.create({
                        email: req.body.email,
                        password: password
                    })
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
        })
});
router.post('/login', (req, res) => {
    db.user.findOne({
            where: { email: req.body.email }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
                }
            }
        })
});
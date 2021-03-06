const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

router.post('/registration', (req, res, next) => {
    User
    .find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length >= 1 ) {
            return res.status(409).json({
                message: "Mail exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });

                    user.save()
                    .then(result => {
                        res.status(201).json({
                            result
                        });
                    })
                    .catch( err => {
                        console.log(err);
                        res.stsatus(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });

});

router.post('/authentication', (req,res, next) => {
    User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1 ) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },

                    process.env.JWT_KEY,
                    {
                        expiresIn: "24h"
                    }
                );

                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            }

            res.status(401).json({
                message: "Auth failed"
            });
        });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



module.exports = router;
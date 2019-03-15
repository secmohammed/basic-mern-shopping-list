const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    login(req, res) {
        const{ name, email, password } = req.body;
        if(!email || !password) {
            return res.status(422).json({
                message: "Please fill in all of the fields"
            });
        }

        User.findOne({ email }).then(user => {
            if(!user) return res.status(400).json({
                message: 'Invalid Credentials'
            });

            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch) return res.status(400).json({
                    message: 'Invalid Credentials'
                });
                jwt.sign({
                    id: user.id
                }, config.get('jwtSecret'), {
                    expiresIn: 3600
                }, (err, token) => {
                    if(err) throw err;
                    return res.status(201).json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });

                });

            })
        })
    },

    me(req, res) {
        User.findById(req.user.id).select('-password').then(user => res.status(200).json(user))
    },
    register(req, res) {
        const{ name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(422).json({
                message: "Please fill in all of the fields"
            });
        }
        User.findOne({ email }, (err, user) => {
            if(err) {
                return res.status(500).json({
                    err
                });
            }
            if (user) {
                return res.status(422).json({
                    message: 'Email already exists'
                });
            }else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            jwt.sign({
                                id: user.id
                            }, config.get('jwtSecret'), {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) throw err;
                                return res.status(201).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });

                            });

                        });
                    });        
                });
            }
        });
    },
};

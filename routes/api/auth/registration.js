const express = require('express');
const router = express.Router();
const validate = require('validator');
const r = require('../../../auth/db');
const bcrypt = require('bcrypt');

/* POST registration API. */
router.post('/', function (req, res, next) {
    console.log(req.body);
    if(typeof req.body.username === "undefined" || typeof req.body.password === "undefined" || typeof req.body.passwordConfirmation === "undefined"){
        res.statusCode = 403;
        console.log('This one');
        res.send('Error: Please provide both an email and a password');
    }else{
        if(req.body.username.length === 0 || req.body.password.length === 0){
            res.statusCode = 403;
            console.log('Or this one');
            res.send('Error: Please provide both an email and a password');
        }else{
            if(!validate.isEmail(req.body.username)){
                res.statusCode = 403;
                res.send('Error: Please provide a valid email address');
            }else{
                if(!validate.equals(req.body.password, req.body.passwordConfirmation)){
                    res.statusCode = 403;
                    res.send('Error: Please ensure both passwords are the same');
                }else{
                    r.table("users").getAll(req.body.username, {index: "username"}).run().then(function(user) {
                        console.log(user[0]);
                        if(typeof user[0] !== "undefined"){
                            res.statusCode = 403;
                            res.send('Error: This email address is already in use, please either log in or use a different email');
                        }else{
                            // Register user
                            bcrypt.hash(req.body.password, 15, function(err, hash) {
                                r.table('users').insert({
                                    'username' : req.body.username,
                                    'password' : hash,
                                    'timeCreated': Math.floor(new Date() / 1000),
                                    'hasPackage' : false,
                                    'package' : null
                                }).run().then(function(err,stuff){
                                    console.log(err,stuff);
                                    res.statusCode = 200;
                                    res.send('Success: User successfully registered');
                                });
                            });
                        }
                    }).error(function(err){
                        console.log(err);
                    });
                }
            }
        }
    }

});

module.exports = router;

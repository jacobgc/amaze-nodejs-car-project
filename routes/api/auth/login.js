const express = require('express');
const router = express.Router();
const validate = require('validator');

/* POST login API. */
router.post('/', function (req, res) {
    if(req.body.username === "undefined" || req.body.username === "undefined"){
        res.statusCode = 403;
        res.send('Error: Please provide both a username and a password');
    }

    if(req.body.username.length === 0 || req.body.password.length === 0){
        res.statusCode = 403;
        res.send('Error: Please provide both a username and a password');
    }

    if(!validate.isEmail(req.body.username)){
        res.statusCode = 403;
        res.send('Error: Please provide a valid email address');
    }else{
        res.statusCode = 200;
        res.send('Login Authenticated');
    }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const r = require('../../../auth/db');
const newUser = require('../../../classes/newUser');


router.get('/', function(req,res,next){

    var newuser = new newUser('jacobgc1', 'jacob.clarke2@gmail.com');
    newuser.hashPassword('test123').then(() => {
        console.log(newuser.hashedPassword);
    });

});

/* POST registration API. */
router.post('/', function (req, res) {
    console.log(req.body);
    var newuser = new newUser(req.body.username);

});

module.exports = router;

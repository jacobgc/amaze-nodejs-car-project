const user = require('./user');
const unixTime = require('unix-time');
const bcrypt = require('bcrypt');
const r = require('../auth/db');
const validate = require('validator');


class newUser extends user {
    constructor(email) {
        super(email, null);
        this.timeCreated = unixTime(new Date());
        this.hashedPassword = null;
    }

    hashPassword(password) {

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 15, ((err, hash) => {
                if (err) {
                    reject(err);
                }
                console.log(hash);
                this.hashedPassword = hash;
                resolve(true);
            }));
        });
    }

    isEmailInUse(){
        return new Promise((resolve, reject) => {
            r.table("users").getAll(this.username, {index: "username"}).run().then(function(user) {
                if(typeof user[0] !== "undefined"){
                    reject();
                }else{
                    resolve();
                }
            }).error(function(err){
                console.log(err);
            });
        });
    }

    validateData(req, res){
        return new Promise((resolve, reject) =>{
            if(typeof req.body.username === "undefined" || typeof req.body.password === "undefined" || typeof req.body.passwordConfirmation === "undefined"){
                res.statusCode = 403;
                res.send('Error: Please provide both an email and a password');
            }else{
                if(req.body.username.length === 0 || req.body.password.length === 0){
                    res.statusCode = 403;
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

                        }
                    }
                }
            }
        });
    }

    addToDatabase() {
        return new Promise(function (resolve, reject) {
            r.table('users').insert({
                'username': this.username,
                'password': this.hashedPassword,
                'timeCreated': this.timeCreated,
                'hasPackage': false,
                'package': null
            }).run().then(function (err, stuff) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
}

module.exports = newUser;
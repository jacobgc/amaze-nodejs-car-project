var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('about', {title: 'First Fleet Management -- About'});
});

module.exports = router;

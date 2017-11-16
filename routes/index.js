var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'First Fleet Management -- Home'});
});

module.exports = router;

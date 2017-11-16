var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('features', {title: 'First Fleet Management -- Features'});
});

module.exports = router;

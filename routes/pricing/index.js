var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('pricing', {title: 'First Fleet Management -- Pricing'});
});

module.exports = router;

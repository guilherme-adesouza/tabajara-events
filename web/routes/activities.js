var express = require('express');
var router = express.Router();

/* GET activities page. */
router.get('/', function(req, res, next) {
    res.render('pages/home');
});

module.exports = router;
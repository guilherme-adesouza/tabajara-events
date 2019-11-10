var express = require('express');
var router = express.Router();

/* GET events page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
    const activities = [
        "Arroz",
        "Feijão"
    ];
    res.render('pages/home', {activities});
});

module.exports = router;
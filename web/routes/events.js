const express = require('express');
const request = require('request');
const router = express.Router();

/* GET events page. */
router.get('/', function(req, res, next) {
    request.get('http://localhost:5004/api', (error, response, body) => {
        if(response.statusCode >= 200 && response.statusCode < 300) {
            res.render('pages/home', {activities: JSON.parse(body)});
        } else {
            console.log(error);
            res.status(500).send({message: "An error as occur on this request. Please, try later"});
        }
    })
    
});

module.exports = router;
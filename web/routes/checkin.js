const express = require('express');
const router = express.Router();
const request = require('request');
const {handleRequest} = require("../helpers/utils");
const checkinURL = 'http://localhost:5003/api';

/* GET checkin page. */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    request({
        url: checkinURL,
        method: 'POST',
        json: {id_activity_event: id},
    }, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.redirect(301, '/inscricoes');
        });
    })
});

module.exports = router;
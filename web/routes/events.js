const express = require('express');
const request = require('request');
const Security = require("../helpers/security");
const {handleRequest} = require("../helpers/utils");
const router = express.Router();

const eventsURL = 'http://localhost:5004/api';
const registerActivityURL = 'http://localhost:5012/api';

/* GET events page. */
router.get('/', function(req, res, next) {
    request.get(eventsURL, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.render('pages/events', {events: JSON.parse(body)});
        });
    })
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    request.get(`${eventsURL}/${id}`, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.render('pages/event', {event: JSON.parse(body)});
        });
    })
});

router.post('/:id/cadastrar', function(req, res, next) {
    const jwt = Security.decodeRequestToken(req);
    if(!!jwt.user) {
        const userId = jwt.user.id;
        const eventId = req.params.id;
        request.post({
            url: registerActivityURL,
            body: {user: userId, event: eventId},
            json: true
        }, (error, response, body) => {
            handleRequest({error, response, res}, () => {
                res.redirect(301, '/inscricoes');
            });
        })
    }
});


module.exports = router;
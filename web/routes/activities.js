const express = require('express');
const request = require('request');
const {decodeRequestToken} = require("../helpers/security");
const router = express.Router();
const {handleRequest} = require("../helpers/utils");

const activitiesCancelURL = 'http://localhost:5010/api';
const activitiesConsultURL = 'http://localhost:5011/api';

/* GET activities page. */
router.get('/', function(req, res, next) {
    const user = decodeRequestToken(req).user;
    if(!user) {
        res.status(405).send({error: "Session needed"});
    }
    request.get(`${activitiesConsultURL}/user/${user.id}`, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            const activities = JSON.parse(body);
            const cancelActivities = activities.filter(a => a.status === 'C');
            const availableActivities = activities.filter(a => a.status === 'A');
            console.log(activities);
            res.render('pages/activities', {cancelActivities, availableActivities});
        });
    });
});

router.get('/:id/cancelar', function(req, res, next) {
    const activityId = req.params.id;
    request.put(`${activitiesCancelURL}/${activityId}`, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.redirect(301, '/inscricoes');
        });
    })
});

module.exports = router;
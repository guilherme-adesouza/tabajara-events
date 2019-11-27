const express = require('express');
const router = express.Router();
const request = require('request');
const {decodeRequestToken} = require("../helpers/security");
const {handleRequest} = require("../helpers/utils");

const checkinURL = 'http://localhost:5003/api';
const activitiesConsultURL = 'http://localhost:5011/api';
const certificateGenerateURL = 'http://localhost:5005/api';
const certificateValidateURL = 'http://localhost:5006/api';

/* GET certificates page. */
router.get('/', function(req, res, next) {
    const user = decodeRequestToken(req).user;
    if(!user) {
        res.status(405).send({error: "Session needed"});
    }
    request.get(`${activitiesConsultURL}/user/${user.id}`, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            const activities = JSON.parse(body);
            request({
                url: checkinURL,
                method: 'GET',
            }, (error, response, body) => {
                const certificates = JSON.parse(body);
                handleRequest({error, response, res}, () => {
                    let activitiesFilters = [];
                    activities.forEach(activity => {
                        certificates.forEach(certificate => {
                            if(certificate.id_activity_event === activity.id) {
                                activity.urlCertificate = `${certificateGenerateURL}/${certificate.id_activity_event}/render`;
                                activitiesFilters.push(activity);
                            }
                        });
                    });
                    res.render('pages/certificates', {activities: activitiesFilters});
                });
            })
        });
    });

});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    request({
        url: `${certificateGenerateURL}/${id}/render`,
        method: 'GET',
    }, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.send(response.body);
        });
    })
});

router.get('/validar', function(req, res, next) {
    const token = req.query.token;
    const url = encodeURI(`${certificateValidateURL}?token=${token}`);
    request({
        url: url,
        method: 'GET',
    }, (error, response, body) => {
        handleRequest({error, response, res}, () => {
            res.render('pages/valid-certificate', {valid: true});
        });
    })
});

module.exports = router;
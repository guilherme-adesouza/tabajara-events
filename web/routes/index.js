const express = require('express');
const request = require('request');
const router = express.Router();

const Security = require('../helpers/security');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eventos Tabajara' });
});

router.post('/login', function(req, res, next) {
  const login = req.body;
  request({
    url: 'http://localhost:5000/api/login',
    method: 'POST',
    json: login
  }, (err, httpResponse, body) => {
    const user = body && body.user;
    if(user) {
      res.cookie(Security.jwt_name, Security.generateJWT(user), {httpOnly: true});
      res.redirect(301, '/eventos');
      return;
    }
    res.redirect(301, '/');
  });
});

router.get('/logout', function(req, res, next) {
  request('http://localhost:5000/api/logout', {}, (err, httpResponse, body) => {
    res.clearCookie(Security.jwt_name);
    res.redirect(301, '/');
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eventos Tabajara' });
});

router.get('/login', function(req, res, next) {
  res.redirect(301, '/');
});

router.post('/login', function(req, res, next) {
  const login = req.body;
  console.log('wow, is this post method?', login);
  if(true) {
    res.render('pages/home');
    return;
  }
  res.redirect(301, '/');
});

router.get('/logout', function(req, res, next) {
  res.redirect(301, '/');
});

module.exports = router;

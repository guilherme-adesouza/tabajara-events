const express = require('express');
const CertificateController = require('./certificateController');
const router = express.Router();

const controller = new CertificateController();

router.get('/:id', (req, res) => {
    controller.validate(req, res);
});

module.exports = router;

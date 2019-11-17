const express = require('express');
const ActivityConsultController = require('./activityConsultController');
const router = express.Router();

const controller = new ActivityConsultController();

router.get('/', (req, res) => {
    controller.getAll(req, res);
});

router.get('/:id', (req, res) => {
    controller.getById(req, res);
});

module.exports = router;

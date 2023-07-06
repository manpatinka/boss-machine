const express = require('express');
const meetingsRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    deleteAllFromDatabase
} = require('../db');

const meetings = getAllFromDatabase('meetings');

meetingsRouter
    .route('/')
    .get((req, res, next) => {
        res.send(meetings);
    })
    .post((req, res, next) => {
        const newMeeting = createMeeting();
        res.status(201).send(newMeeting);
    })
    .delete((req, res, next) => {
        deleteAllFromDatabase('meetings');
        res.status(204).send();
    })

module.exports = meetingsRouter;
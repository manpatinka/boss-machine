const express = require('express');
const meetingsRouter = express.Router();

const {
    createMeeting,
    addToDatabase,
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
        let newMeeting = addToDatabase('meetings', createMeeting());
        res.status(201).send(newMeeting);
    })
    .delete((req, res, next) => {
        deleteAllFromDatabase('meetings');
        res.status(204).send();
    })

module.exports = meetingsRouter;
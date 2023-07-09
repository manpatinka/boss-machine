const express = require('express');
const minionsRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('../db');
const minions = getAllFromDatabase('minions');

minionsRouter
  .route('/')
  .get((req, res, next) => {
    res.send(minions);
  })
  .post((req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  })

minionsRouter.param('minionId', (req, res, next, minionId) => {
  const minionData = getFromDatabaseById('minions', minionId);
  if (minionData) {
    req.minion = minionData;
    req.minionId = minionId;
    next();
  } else {
    res.status(404).send();
  }
})


minionsRouter
  .route('/:minionId')
  .get((req, res, next) => {
    res.send(req.minion);
  })
  .put((req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
  })
  .delete((req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minionId);
    if(deleted) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
  })

module.exports = minionsRouter;
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
    let { id, name, title, salary } = req.query;
    id = String(id);
    name = String(name);
    title = String(title);
    salary = Number(salary);
    if (id && name && title && salary) {
      addToDatabase('minions', { id, name, title, salary });
      res.send(`${name} has been successfully added!`)
    } else {
      res.status(400).send()
    }
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
    let { id, name, title, salary } = req.query;
    id = String(id);
    name = String(name);
    title = String(title);
    salary = Number(salary);
    if (id && name && title && salary) {
      const updatedMinion = updateInstanceInDatabase('minions', { id, name, title, salary });
      res.send(updatedMinion);
    } else {
      res.status(400).send()
    }
  })
  .delete((req, res, next) => {
    deleteFromDatabasebyId('minions', req.minionId);
    res.status(204).send();
  })

module.exports = minionsRouter;
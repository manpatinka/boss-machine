const express = require('express');
const ideasRouter = express.Router();

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('../db');

const ideas = getAllFromDatabase('ideas');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

ideasRouter
  .route('/')
  .get((req, res, next) => {
    res.send(ideas);
  })
  .post(checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
  })

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  const ideaData = getFromDatabaseById('ideas', ideaId);
  if (ideaData) {
    req.idea = ideaData;
    req.ideaId = ideaId;
    next();
  } else {
    res.status(404).send();
  }
})

ideasRouter
  .route('/:ideaId')
  .get((req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.ideaId);
    res.send(idea);
  })
  .put(checkMillionDollarIdea, (req, res, next) => {
    let updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance);
  })
  .delete((req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if(deleted) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
    
  })

module.exports = ideasRouter;
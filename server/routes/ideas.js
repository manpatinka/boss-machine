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

ideasRouter
  .route('/')
  .get((req, res, next) => {
    res.send(ideas);
  })
  .post((req, res, next) => {
    let { id, name, description, numWeeks, weeklyRevenue } = req.query;
    id = String(id);
    name = String(name);
    description = String(description);
    numWeeks = Number(numWeeks);
    weeklyRevenue = Number(weeklyRevenue);
    if (id && name && description && numWeeks && weeklyRevenue) {
      addToDatabase('ideas', { id, name, description, numWeeks, weeklyRevenue });
      res.send(`New idea named ${name} has been successfully added!`)
    } else {
      res.status(400).send()
    }
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
  .put((req, res, next) => {
    let { id, name, description, numWeeks, weeklyRevenue } = req.query;
    id = String(id);
    name = String(name);
    description = String(description);
    numWeeks = Number(numWeeks);
    weeklyRevenue = Number(weeklyRevenue);
    if (id && name && description && numWeeks && weeklyRevenue) {
      const updatedIdea = updateInstanceInDatabase('ideas', { id, name, description, numWeeks, weeklyRevenue });
      res.send(updatedIdea);
    } else {
      res.status(400).send()
    }
  })
  .delete((req, res, next) => {
    deleteFromDatabasebyId('ideas', req.ideaId);
    res.status(204).send();
  })

module.exports = ideasRouter;
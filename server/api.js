const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    console.log('Here');
    res.send()
})

const minionsRouter = require('./routes/minions');
apiRouter.use('/minions', minionsRouter);

const ideasRouter = require('./routes/ideas');
apiRouter.use('/ideas', ideasRouter);

const meetingsRouter = require('./routes/meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;

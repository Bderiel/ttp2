const router = require('express').Router();
const Event = require('../models/event');
/*
Gets all events
*/
router.get('/', (req, res, next) => {
  Event.find()
    .then((foundEvents) => {
      res.json(foundEvents);
    })
    .catch(next);
});

/*
Adds a new event
*/

router.post('/', (req, res, next) => {
  // const board = req.body.board;
  const newEvent = new Event({
    date: Date.now(),
    event: 'Test',
  });


  newEvent.save()
    .then((savedEvent) => {
      res.json(savedEvent);
    })
    .catch(next);
});
module.exports = router;

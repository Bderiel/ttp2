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
  const {
    start, end, event, date,
  } = req.body;

  const newEvent = new Event({
    date,
    event,
    start,
    end,
  });
  newEvent.save()
    .then((savedEvent) => {
      res.json(savedEvent);
    })
    .catch(next);
});

/*
Deletes a new event
*/

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Event.remove({ _id: id })
    .then(deleted => res.json(deleted))
    .catch(next);
});

/*
Updates an event
*/

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    start, end, event, date,
  } = req.body;

  Event.update({ _id: id }, {
    date,
    event,
    start,
    end,
  })
    .then(deleted => res.json(deleted))
    .catch(next);
});


module.exports = router;

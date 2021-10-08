const express = require('express');
const router = express.Router();
const {getEventsOfUser, createEventOfUser, updateEventsOfUser, deleteEventOfUser} = require('../controllers/eventsController')
const {verifyJwt} = require('../middlewares/verifyJwt')


router.get('/event/user/:id',verifyJwt, getEventsOfUser);
router.post('/event/user/:id', createEventOfUser);
router.put('/event/:id', updateEventsOfUser)
router.delete('/event/:id', deleteEventOfUser)


module.exports = router;
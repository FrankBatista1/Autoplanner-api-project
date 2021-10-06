const express = require('express');
const router = express.Router();
const {getEventsOfUser, createEventOfUser} = require('../controllers/eventsController')
const {verifyJwt} = require('../middlewares/verifyJwt')


router.get('/event/user/:id',verifyJwt, getEventsOfUser);
router.post('/event/user/:id', verifyJwt, createEventOfUser);


module.exports = router;
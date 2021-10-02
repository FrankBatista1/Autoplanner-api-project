const {model, Schema} = require('mongoose')
const jwt = require('jsonwebtoken')

const EventsSchema = new Schema({
    title: String,
    start: String
})

module.exports = model('Events', EventsSchema)
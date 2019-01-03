const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')

const eventSchema = require('./graphql/schema/eventSchema')
const weatherSchema = require('./graphql/schema/weatherSchema')
const EventModel = require('./model/eventModel')
const WeatherModel = require('./model/weatherModel')

mongoose.Promise = global.Promise

const router = express.Router()

router.get('/events', graphqlHTTP(() => ({
  schema: eventSchema
})))

router.post('/events', (req, res) => {
  const { events } = req.body
  const promises = events.map(event => new EventModel(event).save())
  Promise.all(promises)
    .then(results => {
      res.send({
        status: true,
        data: results.length
      })
    })
    .catch(error => {
      res.send({
        status: false,
        error: error.message
      })
    })
})

router.get('/weather', graphqlHTTP(() => ({
  schema: weatherSchema
})))

router.post('/weather', (req, res) => {
  const { weather } = req.body
  const data = new WeatherModel(weather)
  data.save()
    .then(results => {
      res.send({
        status: true,
        data: results._id
      })
    })
})

module.exports = router

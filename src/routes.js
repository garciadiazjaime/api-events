import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import eventSchema from './graphql/schema/eventSchema'
import weatherSchema from './graphql/schema/weatherSchema'
import EventModel from './model/eventModel'
import WeatherModel from './model/weatherModel'

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

export default router

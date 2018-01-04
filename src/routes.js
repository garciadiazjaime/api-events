import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import eventSchema from './graphql/schema/eventSchema'
import EventModel from './model/eventModel'

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

export default router

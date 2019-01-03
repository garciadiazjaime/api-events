const mongoose = require('mongoose')

const WeatherSchema = new mongoose.Schema({
  celsius: String,
  fahrenheit: String,
  pressure: String,
  relativeHumidity: String,
  lightLevel: String,
  city: String,
  gps: String,
})

const WeatherModel = mongoose.model('weather', WeatherSchema)

module.exports = WeatherModel

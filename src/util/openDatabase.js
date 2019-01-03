const mongoose = require('mongoose');

const openDatabase = dbUrl => mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = openDatabase;

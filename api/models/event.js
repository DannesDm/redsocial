'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = Schema({

    eventonombre: String,
    eventodescripcion: String,
    user: { type: Schema.ObjectId, ref: "User" }

});

module.exports = mongoose.model('Event', EventSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = Schema({

    groupname: String,
    grouptext: String,
    users: [{ type: Schema.ObjectId, ref: 'User' }]



});
GroupSchema.index({ 'users': 1 });

module.exports = mongoose.model('Group', GroupSchema);
'use strict';
const {model, Schema} = require("mongoose");

const xkcdSchema = new Schema({
    num: {type:Number, required: true, unique: true},
    viewCount: {type:Number, required: true, default: 0},
}, {collection: 'xkcd'});

module.exports = model('XKCD', xkcdSchema);
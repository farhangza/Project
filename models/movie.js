var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movie = new Schema({
    title: String,
    year: String,
    image: String,
    description: String});
module.exports = mongoose.model('movies', Movie);

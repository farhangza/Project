var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Data-base schema; Comment will have 4 attributes.
var Comment = new Schema({
    movie_id: String,
    user_id: String,
    text: String,
    visible: Boolean,
});
module.exports = mongoose.model('comments', Comment);

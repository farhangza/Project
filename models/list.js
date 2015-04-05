var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var List = new Schema({
    user_id: String,
    list: []
});
module.exports = mongoose.model('lists', List);

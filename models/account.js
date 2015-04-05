var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//Scheema for the data-base
var Account = new Schema({
    username: String,
    password: String});
Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('accounts', Account);
